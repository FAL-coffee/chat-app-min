import type { NextPage } from "next";
import { db, onSnapshot, query } from "@/plugin/firebase";
import React, { useEffect, useState } from "react";
import { addDoc, collection, orderBy } from "firebase/firestore";

const Room: NextPage = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const post = async (value: string) => {
    const data = {
      value: value,
      postedAt: new Date(),
    };
    const messagesRef = await collection(db, "messages");
    await addDoc(messagesRef, {
      ...data,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("postedAt", "desc"));
    onSnapshot(q, (snapshot) => {
      snapshot
        .docChanges()
        .reverse()
        .forEach(async (change) => {
          if (change.type === "added") {
          }
        });
    });
  }, []);

  return (
    <>
      {messages.map((message, i) => {
        <div key={i}>{message}</div>;
      })}
    </>
  );
};

export default Room;
