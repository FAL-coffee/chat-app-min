import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { db, onSnapshot, query } from "@/plugin/firebase";
import React, { FormEvent, useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { useAuth } from "@/context/AuthContext";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  Timestamp,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { NextPage } from "next";

import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { ChatRoom } from "@components/templates";
import { IMessage, IUser } from "@types";

interface TempMessage {
  postedAt: Timestamp;
  value: string;
  user: DocumentReference;
}

const Room: NextPage = () => {
  const { currentUser } = useAuth();
  const [text, setText] = useState<string>();
  const [tempMessages, setTempMessages] = useState<Array<TempMessage>>([]);
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const post = async (value: string) => {
    if (!value || !currentUser || !currentUser.uid) return;
    const data = {
      value: value,
      postedAt: Timestamp.now(),
      user: doc(db, "users/" + currentUser.uid),
    };
    const messagesRef = await collection(
      db,
      "chats",
      `${router.query.id}`,
      "messages"
    );
    await addDoc(messagesRef, {
      ...data,
    });
  };

  const router = useRouter();
  useEffect(() => {
    let snappedTempMessages: Array<IMessage> = [];
    const q = query(
      collection(db, "chats", `${router.query.id}`, "messages"),
      orderBy("postedAt", "desc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      snapshot
        .docChanges()
        .reverse()
        .forEach(async (change) => {
          if (change.type === "added") {
            const userSnap = await getDoc(change.doc.data().user);
            snappedTempMessages.push({
              ...(change.doc.data() as TempMessage),
              user: userSnap.data() as IUser,
            });
          }
          await setMessages([...snappedTempMessages]);
        });
    });
  }, [router.query.id]);

  return (
    <Layout title={router.query.id ? router.query.id : ""}>
      <ChatRoom
        ChatDisplayArea={
          <Chats
            messages={messages}
            user={
              currentUser
                ? currentUser
                : { uid: "", displayName: "", email: "" }
            }
          />
        }
        MessagePostForm={<MessagePostForm onSubmit={post} />}
      />
    </Layout>
  );
};

export default Room;
