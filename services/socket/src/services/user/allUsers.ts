import fs from "fs/promises";
import path from "path";
import { generateRandomString } from "../../utils/string/generateRandomString";

interface IArgs {
    name: string;
}
interface IResult {
    message: string;
    status: string;
}

export const userAdd = async ({ name }: IArgs): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        // Проверяем, существует ли каталог и создаем его, если нет
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Проверяем, существует ли файл, и создаем его с пустыми данными, если он отсутствует
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(
                filePath,
                JSON.stringify({ participants: [] }, null, 2)
            );
        }

        // Читаем данные из файла
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const participants: { name: string; id: string }[] =
            data.participants || [];

        // Проверяем, не занято ли имя
        if (participants.some((participant) => participant.name === name)) {
            return {
                message: "Error if name is already taken",
                status: "error",
            };
        }

        const newParticipant = { name, id: generateRandomString(4) };
        participants.push(newParticipant);

        await fs.writeFile(filePath, JSON.stringify({ participants }, null, 2));

        return {
            message: "User added successfully",
            status: "success",
        };
    } catch (error) {
        console.error("Error while joining room:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
