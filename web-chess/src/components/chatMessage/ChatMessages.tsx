"use client";
import React from "react";
import styles from "./chatMessage.module.css";
// import { useState } from "react";

const ChatMessages = (props: any) => {
  // if (props)
  console.log(props);
  const messages = props?.messages;
  return messages.map((message: any) => {
    return (
      <div className="flex flex-row">
        <div className={styles.user__icon__mini}>{message.id}</div>
        <h5 className={styles.player__message}>{message.value}</h5>
      </div>
    );
  });
};

export default ChatMessages;
