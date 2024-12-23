import React, { useEffect, useRef } from "react";
import styles from "./ListMessages.module.scss";
import cn from "classnames";
import { ListMessagesProps } from "./ListMessages.props";

const ListMessages: React.FC<ListMessagesProps> = ({ messages, userId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getMessageClass = (message: IMessage, index: number) => {
    if (index > 0 && messages[index - 1].userId !== message.userId) {
      return styles.newMessage;
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          className={cn(styles.message, getMessageClass(message, index), {
            [styles.myMessage]: message.userId === userId,
            [styles.otherMessage]: message.userId !== userId,
          })}
          key={message.messageId}
          ref={index === messages.length - 1 ? messagesEndRef : null}
        >
          <div>
            <p className={styles.name}>{message.name}</p>
          </div>
          <div className={cn(styles.subtitle, styles.animate)}>
            <p>{message.messageText}</p>
            <span>{message.createdAt}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListMessages;
