import React, { useEffect, useState } from "react";
import { useSocket } from "../../Component/SocketContext/SocketContext";
import styles from "./Room.module.scss";
import Chat from "../../Component/Chat/Chat";
import ButtonRoom from "../../Component/ButtonRoom/ButtonRoom";

interface IParticipant {
  name: string;
  id: string;
}


// нужно чтобы при удаление или добавление новых пользователей
// users внутри ButtonRoom через  обновлялось состояние и происходил перерендер 

const Room: React.FC = () => {
  const { emitEvent } = useSocket(); // Получаем сокет
  const [users, setUsers] = useState<IParticipant[] | null>(null); // Ответ от сервера
  const [loading, setLoading] = useState(true); // Статус загрузки страницы
  const [error, setError] = useState(""); // Ошибка, если она есть

  useEffect(() => {
    emitEvent("user:getAll", null, (err: any, res: any) => {
      if (err) {
        setError("Error connecting to server");
        setLoading(false);
        return;
      }
      if (res.status === "error") {
        setError(`${res.message}`);
      } else {
        setUsers(res.message);
      }
      setLoading(false);
    });
  }, [emitEvent]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.camerasArea}>
        <div className={styles.cameras}>
          {users?.map((user) => (
            <div key={user.id} className={styles.camera}>
              <p style={{ color: "white" }}>
                {user.name} (ID: {user.id})
              </p>
            </div>
          ))}
        </div>
      </div>

      <Chat />

      <ButtonRoom />
    </div>
  );
};

export default Room;
