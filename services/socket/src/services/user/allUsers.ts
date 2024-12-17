import fs from "fs";
import path from "path";
import { generateRandomString } from "../../utils/string/generateRandomString";

interface IArgs {
    name: string;
}

export const userAdd = async ({ name }: IArgs) => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    // Проверяем, существует ли каталог и файл
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        // Если файла нет, создаем его с пустым массивом участников
        fs.writeFileSync(
            filePath,
            JSON.stringify({ participants: [] }, null, 2)
        );
    }

    try {
        // Читаем данные из файла
        const fileData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const participants: { name: string; id: string }[] =
            data.participants || [];

        // Проверяем, переполнена ли комната
        if (participants.length >= 4) {
            return {
                message: "error", // Ошибка, если переполнена
            };
        }

        // Проверяем, не занят ли имя
        if (participants.some((participant) => participant.name === name)) {
            return {
                message: "error", // Ошибка, если имя уже занято
            };
        }

        // Добавляем нового участника с уникальным id
        const newParticipant = { name, id: generateRandomString(4) };
        participants.push(newParticipant);

        // Сохраняем обновленный список участников в файл
        fs.writeFileSync(filePath, JSON.stringify({ participants }, null, 2));

        return {
            message: `${participants.length}`, // Количество участников
        };
    } catch (error) {
        console.error("Error while joining room:", error);
        return {
            message: "error", // Ошибка
        };
    }
};
