import { IRouteFn } from "../../../../types/socket";
import { userAdd as userAddService } from "../../../services/user/allUsers";

export const userAdd: IRouteFn = async (socket, data) => {
    try {
        const result = await userAddService({ name: data.name });
        return result;
    } catch (error) {
        console.log("Error add user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
