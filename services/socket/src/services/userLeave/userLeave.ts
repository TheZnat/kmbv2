import fs from "fs/promises";
import path from "path";

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

export const userLeave = async ({ id }: IArgs): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        console.log("Participants before:", data.participants); // Для отладки

        // Преобразуем ID в строку для надежного сравнения и удаляем пробелы
        const updatedParticipants: Participant[] = data.participants.filter(
            (participant: Participant) =>
                String(participant.id).trim() !== String(id).trim()
        );

        console.log("Participants after:", updatedParticipants); // Для отладки

        if (updatedParticipants.length === data.participants.length) {
            return {
                message: "Participant not found",
                status: "error",
            };
        }

        // Запись обновленного списка участников в файл
        await fs.writeFile(
            filePath,
            JSON.stringify({ participants: updatedParticipants }, null, 2)
        );

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
