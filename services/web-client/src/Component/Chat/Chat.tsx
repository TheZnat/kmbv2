import React, { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import ChatInput from "../ChatInput/ChatInput";
import { useSocket } from "../SocketContext/SocketContext";
import ListMessages from "../ListMessages/ListMessages";
import SOCKET_EVENTS from "../../socket/socketEvents";
import { IMessage } from "../../types/index";
import Stub from "../../assets/chat/pic.svg";

const Chat: React.FC = () => {
  const { emitEvent, onEvent, offEvent } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("id") || "";
 

  useEffect(() => {
    emitEvent(SOCKET_EVENTS.MESSAGES_GET, null, (err: any, res: any) => {
      if (err) {
        setError(`Ошибка: ${err.message}`);
        return;
      }
      if (res.status === "success" && Array.isArray(res.message)) {
        setMessages(res.message);
      }
    });

    onEvent(SOCKET_EVENTS.MESSAGES_UPDATED, (update: any) => {
      if (update.action === "add") {
        setMessages((prevMessages) => [...prevMessages, update.data]);
      }
    });

    return () => {
      offEvent(SOCKET_EVENTS.MESSAGES_UPDATED);
    };
  }, [emitEvent, onEvent, offEvent]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Chat</h2>
      </div>
      {messages.length === 0 ? (
        <div className={styles.stubBody}>
          <div className={styles.stub}>
            <img src={Stub} />
            <p className={styles.stubTitle}>No messages yet</p>
          </div>
        </div>
      ) : (
        <div className={styles.body}>
          <ListMessages messages={messages} userId={userId} />
        </div>
      )}
      <div className={styles.bg}></div>
      <div className={styles.footer}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
