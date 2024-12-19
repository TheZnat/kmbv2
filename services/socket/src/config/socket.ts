import { Server } from 'socket.io';
import { auth } from '../services/socket/auth';
import { onConnection } from '../services/socket/onConnection';

const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors:{
        origin: '*', //  добавить разрешенные ссылки в .env
        methods: ['GET', 'POST'],
    },
};

const io = new Server(socketConfig);

io.use(auth);

io.on('connection', onConnection);

export { io };
