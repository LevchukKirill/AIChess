"use client";
import styles from "./chat.module.css";
import chatSendButton from "@/scripts/chatSendButton";

import { useState } from "react";
import ChatMessages from "../chatMessage/ChatMessages";
import { IMessage } from "@/app/test/page";
const Chat = (props: any) => {
  const [message, setMessage] = useState<string>("");
  // const messages = [id: "1", message1: "message 1"];
  return (
    <div className={styles.chat}>
      <span className={styles.chat__header}>Чат</span>
      <div className={styles.chat__box}>
        <ChatMessages messages={props.messages} />
      </div>
      <div className={styles.chat__footer}>
        <input
          placeholder="пиши в чат лох"
          className={styles.chat__input}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        ></input>
        <div></div>
        <button
          className={styles.chat__send__button}
          onClick={() => {
            props.addMessage(message);
            setMessage("");
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
export default Chat;
