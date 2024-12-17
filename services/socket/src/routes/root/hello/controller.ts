import { IRouteFn } from "../../../../types/socket";
import { world as worldService } from "../../../services/hello/world";

export const world: IRouteFn = async (socket, data) => {
    try {
        // Вызываем сервис для обработки логики
        const result = await worldService({ name: data.name });
        return result; // Возвращаем сообщение клиенту
    } catch (error) {
        console.error("Error in world controller:", error);
        throw error; // Отправляем ошибку клиенту
    }
};
