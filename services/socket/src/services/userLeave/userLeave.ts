import fs from "fs/promises";
import path from "path";
import { Socket } from "socket.io";

interface Participant {
    name: string;
    id: string;
}

interface IResult {
    message: string;
    status: string;
}

interface IArgs {
    id: string;
}

export const userLeave = async (
    { id }: IArgs,
    socket: Socket
): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        // Чтение данных из файла
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        // Фильтрация участников
        const updatedParticipants: Participant[] = data.participants.filter(
            (participant: Participant) =>
                String(participant.id).trim() !== String(id).trim()
        );

        // Если участник не найден
        if (updatedParticipants.length === data.participants.length) {
            return {
                message: "Participant not found",
                status: "error",
            };
        }

        // Если список участников пуст, очищаем сообщения
        if (updatedParticipants.length === 0 && data.messages.length > 0) {
            data.messages = []; // Очищаем сообщения
        }

        // Записываем обновленные данные в файл
        await fs.writeFile(
            filePath,
            JSON.stringify(
                { participants: updatedParticipants, messages: data.messages },
                null,
                2
            )
        );

        // Уведомление других клиентов об обновлении списка участников
        socket.broadcast.emit("participants-updated", { action: "remove", id });

        return {
            message: "Participant removed successfully",
            status: "success",
        };
    } catch (error) {
        console.error("Error while removing participant:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
