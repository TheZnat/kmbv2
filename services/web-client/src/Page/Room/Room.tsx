import React, { useEffect, useState } from "react";
import { useSocket } from "../../Component/SocketContext/SocketContext";
import styles from "./Room.module.scss";
import Chat from "../../Component/Chat/Chat";
import ButtonRoom from "../../Component/ButtonRoom/ButtonRoom";
import SOCKET_EVENTS from "../../socket/socketEvents";
import ButtonChat from "../../Component/ButtonChat/ButtonChat";
import VideoStreams from "../../Component/VideoStreams/VideoStreams";

interface IParticipant {
  name: string;
  id: string;
}

const Room: React.FC = () => {
  const { emitEvent, onEvent, offEvent } = useSocket();
  const [users, setUsers] = useState<IParticipant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  useEffect(() => {
    emitEvent(SOCKET_EVENTS.USER_GET, null, (err: any, res: any) => {
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

    onEvent(SOCKET_EVENTS.PARTICIPANTS_UPDATE, (update) => {
      if (update.action === "remove") {
        setUsers(
          (prevUsers) =>
            prevUsers?.filter((user) => user.id !== update.id) || []
        );
      } else if (update.action === "add") {
        setUsers((prevUsers) => [...prevUsers, update.participant]);
      }
    });

    return () => {
      offEvent(SOCKET_EVENTS.PARTICIPANTS_UPDATE);
    };
  }, [emitEvent, onEvent, offEvent]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <VideoStreams users={users || []} />
      {isChatVisible && <Chat />}
      <ButtonRoom />
      <ButtonChat
        isChatVisible={isChatVisible}
        toggleChatVisibility={toggleChatVisibility}
      />
    </div>
  );
};

export default Room;
