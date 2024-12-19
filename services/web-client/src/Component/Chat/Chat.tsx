import React from "react";
import styles from "./Chat.module.scss";
import ChatInput from "../ChatInput/ChatInput";

const Chat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Chat</h2>
      </div>
      <div className={styles.body}>
        {/* Пример сообщений */}
        <div className={styles.message}>
          <div>
            <p className={styles.name}>
              Max
            </p>
          </div>
          <div className={styles.subtitle}>
            <p>Message 1</p>
            <span>15:20</span>
          </div>
        </div>
        <p>Message 2</p>
        <p>Message 3</p>
        {/* Дополнительные сообщения будут прокручиваться */}
      </div>
      <div className={styles.footer}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
