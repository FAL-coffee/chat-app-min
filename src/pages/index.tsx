import type { NextPage } from "next";
import { db, onSnapshot, query } from "@/plugin/firebase";
import React, { useEffect, useState } from "react";
import { addDoc, collection, orderBy, Timestamp } from "firebase/firestore";

type TMessage = {
  value: string;
  at: Timestamp;
};

const Room: NextPage = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [value, setValue] = useState<string>("");
  const post = async () => {
    const data = {
      value: value,
      at: new Date(),
    };
    console.log(data);
    const messagesRef = await collection(db, "messages");
    await addDoc(messagesRef, {
      ...data,
    });
  };

  useEffect(() => {
    const tempMessages: TMessage[] = [];
    const q = query(collection(db, "messages"), orderBy("at", "desc"));
    onSnapshot(q, (snapshot) => {
      snapshot
        .docChanges()
        .reverse()
        .forEach(async (change) => {
          if (change.type === "added") {
            await tempMessages.push({ ...(change.doc.data() as TMessage) });
          }
          await setMessages([...tempMessages]);
        });
    });
  }, []);

  return (
    <>
      {messages.map((message, i) => (
        <div key={i}>{message.value}</div>
      ))}
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={post}>送信</button>
      </div>
    </>
  );
};

export default Room;
