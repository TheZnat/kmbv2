import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

interface SocketContextProps {
  socket: Socket | null;
  emitEvent: (
    event: string,
    data: any,
    callback: (err: any, res: any) => void
  ) => void;
  onEvent: (event: string, callback: (data: any) => void) => void;
  offEvent: (event: string, callback: (data: any) => void) => void;
  isSocketReady: boolean; // Новый флаг готовности сокета
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [isSocketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (!SOCKET_URL) {
      console.error(
        "VITE_SOCKET_URL is not defined in the environment variables"
      );
      return;
    }

    socketRef.current = io(SOCKET_URL, {
      transports: ["polling", "websocket"],
    });

    socketRef.current.on("connect", () => {
      setSocketReady(true);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const emitEvent = (
    event: string,
    data: any,
    callback: (err: any, res: any) => void
  ) => {
    socketRef.current?.emit(event, data, callback);
  };

  const onEvent = (event: string, callback: (data: any) => void) => {
    socketRef.current?.on(event, callback);
  };

  const offEvent = (event: string, callback: (data: any) => void) => {
    socketRef.current?.off(event, callback);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        emitEvent,
        onEvent,
        offEvent,
        isSocketReady,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
