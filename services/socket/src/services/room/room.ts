import fs from "fs/promises";
import path from "path";

// Тип для ответа
interface IResult {
    message: string;
}

export const checkRoom = async (): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        let fileData: string;
        // Пробуем прочитать файл
        try {
            fileData = await fs.readFile(filePath, "utf-8");
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code === "ENOENT") {
                // Если файла нет, создаем его
                const initialData = { participants: [] };
                await fs.writeFile(
                    filePath,
                    JSON.stringify(initialData, null, 2)
                );
                fileData = JSON.stringify(initialData);
            } else {
                throw err; // Пробрасываем другие ошибки
            }
        }

        // Парсим данные из файла
        const data = JSON.parse(fileData);
        const participants = data.participants || [];

        // Проверяем, если комната полна
        if (participants.length >= 4) {
            return { message: "Room is full" };
        }

        // Если комната не полна
        return { message: "Room is available" };
    } catch (error) {
        console.error("Error while checking room:", error);
        return { message: "Error while checking room" }; // Сообщение об ошибке
    }
};
