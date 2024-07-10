"use client";
import Game from "@/components/templates/game";
import styles from "./../home.module.css";
import React, { useState } from "react";
export interface IMessage {
  userId: number;
  value: string;
}
const Page = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    { userId: 0, value: "Available" },
    { userId: 1, value: "Ready" },
    { userId: 0, value: "Started" },
  ]);
  function addMessage(message: string) {
    setMessages((messages) => [...messages, { value: message, userId: 0 }]);
  }
  return (
    <div className={styles.content}>
      <Game messages={messages} addMessage={addMessage} />
    </div>
  );
};

export default Page;
