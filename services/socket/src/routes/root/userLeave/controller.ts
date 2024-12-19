import { IRouteFn } from "../../../../types/socket";
import { userLeave as userLeaveService } from "../../../services/userLeave/userLeave";

export const userLeave: IRouteFn = async (socket, data) => {
    try {
        console.log("Received data:", data); // Логирование полученных данных
        const result = await userLeaveService({ id: data.id });
        console.log("Service result:", result); // Логирование результата
        return result;
    } catch (error) {
        console.log("Error leave user:", error);
        throw error; // отправляем ошибку клиенту
    }
};
