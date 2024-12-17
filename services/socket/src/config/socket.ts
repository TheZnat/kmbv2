import { Server } from "socket.io";

import { auth } from "../services/socket/auth";
import { onConnection } from "../services/socket/onConnection";



// Конфигурация для CORS
const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors: {
        origin: "*", // Допустимые источники, например, ["http://localhost:3000"]
        methods: ["GET", "POST"],
    },
};

const io = new Server(socketConfig);

io.use(auth);

io.on("connection", onConnection);

export { io };
