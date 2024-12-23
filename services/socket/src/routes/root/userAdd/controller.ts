import { IRouteFn } from "../../../../types/socket";
import { userAdd as userAddService } from "../../../services/userAdd/usersAdd";

export const userAdd: IRouteFn = async (socket, data) => {
    try {
        const result = await userAddService({ name: data.name }, socket);
        return result;
    } catch (error) {
        console.log("Error add user:", error);
        throw error; // отправляем ошибку клиенту
    }
};