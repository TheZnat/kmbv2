import { Socket } from "socket.io";
import { rootRouter } from "../../routes";
import { logger } from "../../config/logger";

// const CHAT_ROOM = "chatRoom";
export const onConnection = (socket: Socket) => {
    logger.info(`socket:connected; ${socket.id}`);
    // socket.join(CHAT_ROOM);
    // console.log(socket.rooms);
    rootRouter.subscribe(socket);
};
