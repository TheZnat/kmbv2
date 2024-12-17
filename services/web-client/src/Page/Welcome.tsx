import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Form from "../Component/Form/Form";
import Warning from "../Component/Warning/Warning";

// Подключение к серверу
const socket = io("http://localhost:3000");

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [response, setResponse] = useState(""); // Ответ от сервера
  const [error, setError] = useState(""); // Ошибка, если есть
  const [roomStatus, setRoomStatus] = useState(true); // Статус комнаты
  const [loading, setLoading] = useState(true); // Статус загрузки страницы

  // Проверяем комнату при загрузке страницы
  useEffect(() => {
    socket.emit("check:room", null, (err: any, res: any) => {
      if (err) {
        setError(`Ошибка: ${err.message || "Неизвестная ошибка"}`);
        setLoading(false);
        return;
      }
      setRoomStatus(res.message);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (name: string) => {
    if (!name.trim()) {
      setError("Имя не может быть пустым!"); 
      return;
    }
    setError("");

    // Добавляем пользователя в комнату
    socket.emit("user:add", { name }, (err: any, res: any) => {
      if (err) {
        setError(`Ошибка: ${err.message || "Неизвестная ошибка"}`);
        return;
      }

      // Проверяем корректность ответа
      if (res && res.message) {
        setResponse(res.message);

        // Устанавливаем флаг авторизации в localStorage
        localStorage.setItem("isAuthenticated", "true");

        // Редиректим на страницу комнаты после успешного добавления
        navigate("/room");
      } else {
        setError("Некорректный ответ от сервера при добавлении пользователя");
      }
    });
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
