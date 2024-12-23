import { IRouteFn } from "../../../../types/socket";
import { messageGet as messageGetService } from "../../../services/messageGet/messageGet";

export const messageGet: IRouteFn = async (socket, data) => {
    try {
        const result = await messageGetService();
        return result;
    } catch (error) {
        console.log("Error leave user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
