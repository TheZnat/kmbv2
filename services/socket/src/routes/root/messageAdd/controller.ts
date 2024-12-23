import { IRouteFn } from "../../../../types/socket";
import { messageAdd as messageAddService } from "../../../services/messageAdd/messageAdd";

export const messageAdd: IRouteFn = async (socket, data) => {
    try {
        const result = await messageAddService(
            { name: data.name, messageText: data.messageText, id: data.id },
            socket
        );
        return result;
    } catch (error) {
        console.log("Error leave user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
