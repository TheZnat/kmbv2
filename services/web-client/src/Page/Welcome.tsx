import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Component/Form/Form";
import Warning from "../Component/Warning/Warning";
import { useSocket } from "../Component/SocketContext/SocketContext";

interface ServerResponse {
  status: string;
  message: string;
  id?: string;
}

const SOCKET_EVENTS = {
  CHECK_ROOM: "check:room",
  USER_ADD: "user:add",
};
const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { emitEvent, isSocketReady } = useSocket();
  const [name, setName] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // Ответ от сервера
  const [error, setError] = useState<string>("");
  const [isRoomAvailable, setIsRoomAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isSocketReady) {
      setLoading(true);
      emitEvent(
        SOCKET_EVENTS.CHECK_ROOM,
        null,
        (err: any, res: ServerResponse) => {
          if (err) {
            setError(`Произошла ошибка: ${err.message}`);
            setIsRoomAvailable(false);
          } else {
            if (res.status === "error") {
              setError(`${res.message}`);
              setIsRoomAvailable(false);
            } else {
              setIsRoomAvailable(true);
            }
          }

          setLoading(false);
        }
      );
    }
  }, [isSocketReady, emitEvent]);

  const handleSubmit = (name: string) => {
    if (!name.trim()) {
      setError("Имя не может быть пустым!");
      return;
    }
    setError("");

    emitEvent(
      SOCKET_EVENTS.USER_ADD,
      { name },
      (err: any, res: ServerResponse) => {
        if (res.status === "error") {
          setError(`${res.message}`);
          return;
        } else {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("id", `${res.id}`);

          navigate("/room");
        }
      }
    );
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
      {isRoomAvailable ? (
        <Form onSubmit={handleSubmit} disabled={!isRoomAvailable} />
      ) : (
        <Warning />
      )}
    </div>
  );
};

export default Welcome;
