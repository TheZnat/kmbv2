import { IRouteFn } from "../../../../types/socket";
import { world as worldService } from "../../../services/hello/world";

export const world: IRouteFn = async (socket, data) => {
    try {
        const result = await worldService({ name: data.name });
        return result;
    } catch (error) {
        console.log("Error in world:", error);
        throw error; // отправляем ошибку клиенту 
    }
};
