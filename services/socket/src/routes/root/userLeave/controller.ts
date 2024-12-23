import { IRouteFn } from "../../../../types/socket";
import { userLeave as userLeaveService } from "../../../services/userLeave/userLeave";

export const userLeave: IRouteFn = async (socket, data) => {
    try {
        const result = await userLeaveService({ id: data.id }, socket);
        return result;
    } catch (error) {
        console.log("Error leave user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
