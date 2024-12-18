import { IRouteFn } from "../../../../types/socket";
import { userGet as userGetService } from "../../../services/userGet/userGet";

export const userGet: IRouteFn = async (socket, data) => {
    try {
        const result = await userGetService();
        return result;
    } catch (error) {
        console.log("Error get user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
