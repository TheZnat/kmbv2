import React, { useState } from "react";
import styles from "./ButtonRoom.module.scss";
import cn from "classnames";

import video from "../../assets/chat/video-icon.svg";
import audio from "../../assets/chat/audio-icon.svg";
import exit from "../../assets/chat/exit-icon.svg";
import { useSocket } from "../SocketContext/SocketContext";
import { useNavigate } from "react-router-dom";

const SOCKET_EVENTS = {
  USER_LEAVE: "user:leave",
};

interface ServerResponse {
  status: string;
  message: string;
}

const ButtonRoom = () => {
  const { emitEvent } = useSocket();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handlerExitButton = () => {
    const storeUserId = String(localStorage.getItem("id"));
    console.log("storeUserId:", storeUserId); // Логирование ID из localStorage
    if (!storeUserId) {
      setError("Не найден id пользователя.");
      return;
    }

    emitEvent(
      SOCKET_EVENTS.USER_LEAVE,
      { id: storeUserId }, // Обновляем объект с данными для передачи
      (err: any, res: ServerResponse) => {
        if (err) {
          setError(`Произошла ошибка: ${err.message}`);
        } else {
          if (res.status === "error") {
            setError(`${res.message}`);
          } else {
            // Очищаем данные о пользователе в localStorage
            localStorage.removeItem("id");
            localStorage.setItem("isAuthenticated", "false");

            navigate("/"); // Перенаправление на главную страницу
          }
        }
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bthContainer}>
        <button className={cn(styles.videoSwitch, styles.button)}>
          <img src={video} alt="button for video switch" />
        </button>
        <button className={cn(styles.audioSwitch, styles.button)}>
          <img src={audio} alt="button for audio switch" />
        </button>
        <button
          className={cn(styles.exit, styles.button)}
          onClick={handlerExitButton}
        >
          <img src={exit} alt="exit" />
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ButtonRoom;
