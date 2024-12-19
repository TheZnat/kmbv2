import React, { useState, useRef } from "react";
import styles from "./ChatInput.module.scss";
import buttonIcon from "../../assets/chat/send.svg";

const ChatInput: React.FC = () => {
  const [values, setValues] = useState({ message: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null); // Исправлено на HTMLDivElement

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (values.message.trim()) {
      console.log("Сообщение отправлено:", values.message);
      setValues({ message: "" });
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.background = "var(--Primary-Black)";
    }
    if (divRef.current) {
      divRef.current.style.background = "var(--Primary-Black)";
      divRef.current.style.border = "none";
    }
  };

  return (
    <div className={styles.container} ref={divRef}>
      <input
        className={styles.input}
        type="text"
        placeholder="Start typing"
        name="message"
        value={values.message}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={inputRef}
        autoComplete="off"
      />
      <button className={styles.button} type="button" onClick={handleSend}>
        <img src={buttonIcon} alt="send" className={styles.buttonIcon} />
      </button>
    </div>
  );
};

export default ChatInput;
