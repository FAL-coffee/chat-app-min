import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import {
  db,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  // startAfter,
  limit,
  setDoc,
  Timestamp,
  deleteDoc,
} from "@/plugin/firebase";
import { IUser } from "@types";
import { Profile } from "@components/templates";
import {
  ListTab,
  UserInformation,
  ChatRoomBarList,
  UserBarList,
} from "@/components/organisms";
import { useBelongRooms } from "@hooks";
import * as routes from "@routes";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<IUser>({
    displayName: "user is not found",
    email: "user is not found",
    uid: "404",
  });
  // const [belongRooms, setBelongRooms] = useState<IChatRoom[]>([]);
  const [belongRooms, loading, doFetchBelongRooms] = useBelongRooms();
  const [follows, setFollows] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [following, setFollowing] = useState<boolean>(false);

  useEffect(() => {
    setFollows([]);
    setFollowers([]);
    setFollowing(false);
    (async () => {
      const userRef = doc(db, "users", `${router.query.id}`);
      const userSnap = await getDoc(userRef);
      doFetchBelongRooms(userSnap);
      const userSnapData = userSnap.data() as IUser;
      if (!userSnapData) return;
      setUserData(userSnapData);

      // follows取得
      const followsQuery = query(
        collection(db, "users", `${router.query.id}`, "follows"),
        orderBy("followAt", "asc"),
        limit(20)
      );
      const followsSnapShots = await getDocs(followsQuery);
      const tempFollows: IUser[] = [];
      await followsSnapShots.forEach(async (doc) => {
        const ref = await getDoc(doc.data().user);
        await tempFollows.push(ref.data() as IUser);
        await setFollows([...tempFollows]);
      });

      // followers取得
      const followersQuery = query(
        collection(db, "users", `${router.query.id}`, "followers"),
        orderBy("followedAt", "asc"),
        limit(20)
      );
      const followersSnapShots = await getDocs(followersQuery);
      const tempFollowers: IUser[] = [];
      await followersSnapShots.forEach(async (doc) => {
        const ref = await getDoc(doc.data().user);
        await tempFollowers.push(ref.data() as IUser);
        await setFollowers([...tempFollowers]);
      });

      // // 自身が該当userではない場合、該当userをfollowしているかをsetする
      if (!currentUser) return;
      if (currentUser.uid !== userSnapData.uid) {
        const docRef = doc(
          db,
          "users",
          currentUser.uid,
          "follows",
          userSnapData.uid
        );
        const docSnap = await getDoc(docRef);
        await setFollowing(docSnap.exists());
      }
    })();
  }, [router.query.id, currentUser, doFetchBelongRooms]);

  const handleUnFollow = async (uid: string) => {
    if (!currentUser) return;
    if (uid === currentUser.uid) return;
    // currentUser/followsからuidのdocumentを削除する
    await deleteDoc(doc(db, "users", currentUser.uid, "follows", uid));
    // uidのアカウント/followersからcurrentUser.uidのdocumentを削除する
    await deleteDoc(doc(db, "users", uid, "followers", currentUser.uid));
    // reloadにより情報を最新化する
    router.reload();
  };

  const handleFollow = async (uid: string) => {
    if (!currentUser) return;
    if (uid === currentUser.uid) return;
    // currentUser/followsにuidのdocumentを追加する
    await setDoc(doc(db, "users", currentUser.uid, "follows", uid), {
      user: doc(db, `users/${uid}`),
      followAt: Timestamp.now(),
    });
    // uidのアカウント/followersにcurrentUser.uidのdocumentを追加する
    await setDoc(doc(db, "users", uid, "followers", currentUser.uid), {
      user: doc(db, `users/${currentUser.uid}`),
      followedAt: Timestamp.now(),
    });
    // reloadにより情報を最新化する
    router.reload();
  };

  const handleSendMessage = async (uid: string) => {
    if (!currentUser) return;
    if (uid === currentUser.uid) return;
    // users/currentUser.uid/follows/uidのtalkに参照が設定されているか
    const talkRef = doc(db, "users", currentUser.uid, "talks", uid);
    const talkDoc = await getDoc(talkRef);

    // talkDocが存在していない場合
    if (!talkDoc.exists()) {
      const dmRef = await addDoc(collection(db, "talks"), {
        member: [doc(db, `users/${uid}`), doc(db, `users/${currentUser.uid}`)],
        type: "direct message",
        createdAt: Timestamp.now(),
      });

      await setDoc(doc(db, "users", currentUser.uid, "talks", uid), {
        user: doc(db, `users/${uid}`),
        talk: doc(db, `talks/${dmRef.id}`),
      });
      await setDoc(doc(db, "users", uid, "talks", currentUser.uid), {
        user: doc(db, `users/${currentUser.uid}`),
        talk: doc(db, `talks/${dmRef.id}`),
      });

      return router.push({
        pathname: `${routes.ROOM}/${dmRef.id}`,
        query: { type: "talk" },
      });
    }

    // talkDocが存在している場合
    // talkDoc.data().talkが存在している場合（talkチャンネルが開設済）
    if (!!talkDoc.data().talk)
      router.push({
        pathname: `${routes.ROOM}/${talkDoc.data().talk.id}`,
        query: { type: "talk" },
      });
    // talk.data().talkが存在していない場合、開設処理を行いuserDocs.talksに相手ユーザーidで情報を登録する
    else if (!talkDoc.data().talk) {
      const dmRef = await addDoc(collection(db, "talks"), {
        member: [doc(db, `users/${uid}`), doc(db, `users/${currentUser.uid}`)],
        type: "direct message",
        createdAt: Timestamp.now(),
      });

      await setDoc(doc(db, "users", currentUser.uid, "talks", uid), {
        user: doc(db, `users/${uid}`),
        talk: doc(db, `talks/${dmRef.id}`),
      });
      await setDoc(doc(db, "users", uid, "talks", currentUser.uid), {
        user: doc(db, `users/${currentUser.uid}`),
        talk: doc(db, `talks/${dmRef.id}`),
      });

      return router.push({
        pathname: `${routes.ROOM}/${dmRef.id}`,
        query: { type: "talk" },
      });
    }
  };

  const handleOpenProfile = (uid: string) => {
    // plofile/$idを表示する
    router.push(`${routes.PROFILE}/${uid}`);
  };

  const handleOpenChatRoom = (id: string) => {
    // /room/$idを表示する
    router.push({
      pathname: `/${routes.ROOM}/${id}`,
      query: { type: "chat" },
    });
  };

  const handleChatRoomSearch = (id: string) => {
    // /room/searchを表示する。その時、検索条件を保持する。
    //  => &tagId=${id}みたいな感じで、パラメータとして渡すことが出来るのが理想
    // router.push({ pathname: "/room/search/", query: { tagIds: [id] } });
  };

  return (
    <Layout title="Profile">
      <Profile
        userInformationArea={
          <UserInformation
            user={userData}
            isMe={currentUser ? currentUser?.uid === userData.uid : false}
            following={following}
            freezeDirectMessage={false}
            onUnFollowClick={handleUnFollow}
            onFollowClick={handleFollow}
            onSendMessageClick={handleSendMessage}
          />
        }
        listTabArea={
          <ListTab
            tabs={[
              {
                name: "follow",
                component: (
                  <UserBarList
                    users={follows}
                    onUserClick={handleOpenProfile}
                  />
                ),
              },
              {
                name: "follower",
                component: (
                  <UserBarList
                    users={followers}
                    onUserClick={handleOpenProfile}
                  />
                ),
              },
              {
                name: "room",
                component: !loading ? (
                  <ChatRoomBarList
                    chatRooms={belongRooms}
                    onOpenClick={handleOpenChatRoom}
                    onUserClick={handleOpenProfile}
                    onTagClick={handleChatRoomSearch}
                  />
                ) : (
                  <></>
                ),
              },
            ]}
          />
        }
      />
    </Layout>
  );
};

export default ProfilePage;
