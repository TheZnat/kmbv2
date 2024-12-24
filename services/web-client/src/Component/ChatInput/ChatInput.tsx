import React, { useState, useRef } from "react";
import styles from "./ChatInput.module.scss";
import buttonIcon from "../../assets/chat/send.svg";
import { useSocket } from "../SocketContext/SocketContext";
import SOCKET_EVENTS from "../../socket/socketEvents";

interface FormValues {
  message: string;
  name: string;
}

interface ServerResponse {
  status: string;
  message: string;
  id?: string;
}

const ChatInput: React.FC = () => {
  const { emitEvent } = useSocket();
  const userName = localStorage.getItem("name") || "";
  const userId = localStorage.getItem("id") || "";
  const [values, setValues] = useState<FormValues>({
    message: "",
    name: userName,
  });
  const [error, setError] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!values.message.trim()) {
      setError("Сообщение не может быть пустым");
      return;
    }

    setError("");

    emitEvent(
      SOCKET_EVENTS.MESSAGE_ADD,
      { messageText: values.message, name: values.name, id: userId },
      (err: any, res: ServerResponse) => {
        if (err) {
          setError(`Произошла ошибка при отправке: ${err.message}`);
          return;
        }

        if (res.status === "success") {
          setValues((prev) => ({ ...prev, message: "" }));
        } else {
          setError(res.message);
        }
      }
    );
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <>
      <div className={`${styles.container} ${isFocused ? styles.focused : ""}`}>
        <input
          className={`${styles.input} ${isFocused ? styles.inputFocused : ""}`}
          type="text"
          placeholder="Start typing"
          name="message"
          value={values.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button className={styles.button} type="button" onClick={handleSend}>
          <img src={buttonIcon} alt="send" className={styles.buttonIcon} />
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
};

export default ChatInput;
