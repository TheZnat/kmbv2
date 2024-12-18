import React, { useEffect, useState } from "react";
import { useSocket } from "../../Component/SocketContext/SocketContext";
import styles from "./Room.module.scss";

interface IParticipant {
  name: string;
  id: string;
}

const Room: React.FC = () => {
  const { emitEvent } = useSocket(); // Получаем сокет
  const [users, setUsers] = useState<IParticipant[] | null>(null); // Ответ от сервера
  const [loading, setLoading] = useState(true); // Статус загрузки страницы
  const [error, setError] = useState(""); // Ошибка, если она есть

  useEffect(() => {
    emitEvent("user:get", null, (err: any, res: any) => {
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

  // if (error) {
  //   return (
  //     <div className="error">
  //       <h2>{error}</h2>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <div className={styles.camerasArea}>
        {users?.map((user) => (
          <div key={user.id} className={styles.camera}>
            <p style={{ color: "white" }}>
              {user.name} (ID: {user.id})
            </p>
          </div>
        ))}
      </div>

      <div className={styles.chat}>
        <p>Chat aa</p>
      </div>
    </div>
  );
};

export default Room;
