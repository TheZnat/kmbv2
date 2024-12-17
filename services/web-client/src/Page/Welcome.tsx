import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Component/Form/Form";
import Warning from "../Component/Warning/Warning";
import { useSocket } from "../Component/SocketContext/SocketContext";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { socket, emitEvent, isSocketReady } = useSocket(); // Получаем сокет и состояние готовности

  const [name, setName] = useState("");
  const [response, setResponse] = useState(""); // Ответ от сервера
  const [error, setError] = useState(""); // Ошибка, если есть
  const [roomStatus, setRoomStatus] = useState(true); // Статус комнаты
  const [loading, setLoading] = useState(true); // Статус загрузки страницы

  useEffect(() => {
    if (isSocketReady) {
      setLoading(true); // Начинаем загрузку при инициализации
      emitEvent("check:room", null, (err: any, res: any) => {
        if (err) {
          setError(`Произошла ошибка: ${err.message}`);
          setRoomStatus(false);
        } else {
          if (res?.message === "Room is full") {
            setError("Комната заполнена!");
            setRoomStatus(false);
          } else {
            setRoomStatus(true);
          }
        }

        setLoading(false); // Завершаем процесс загрузки
      });
    }
  }, [isSocketReady, emitEvent]);

  const handleSubmit = (name: string) => {
    if (!name.trim()) {
      setError("Имя не может быть пустым!");
      return;
    }
    setError("");

    // Добавляем пользователя в комнату
    if (socket) {
      socket.emit("user:add", { name }, (res: any) => {
        if (res?.error) {
          setError(`Ошибка: ${res.error || "Неизвестная ошибка"}`);
          return;
        }

        if (res?.message) {
          setResponse(res.message);

          localStorage.setItem("isAuthenticated", "true");
          navigate("/room");
        } else {
          setError("Некорректный ответ от сервера при добавлении пользователя");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {roomStatus ? (
        <Form onSubmit={handleSubmit} disabled={!roomStatus} />
      ) : (
        <Warning />
      )}
    </div>
  );
};

export default Welcome;
