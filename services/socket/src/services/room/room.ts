import fs from "fs";
import path from "path";

export const checkRoom = async () => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        // Проверяем, существует ли файл
        if (!fs.existsSync(filePath)) {
            // Если файла нет, создаем его с пустым массивом участников
            fs.writeFileSync(
                filePath,
                JSON.stringify({ participants: [] }, null, 2)
            );
        }

        // Читаем данные из файла
        const fileData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const participants: { name: string; id: string }[] =
            data.participants || [];

        // Проверяем, меньше ли 4 участников
        const isRoomNotFull = participants.length < 4;

        return {
            message: isRoomNotFull, // true, если участников меньше 4
        };
    } catch (error) {
        console.error("Error while checking room:", error);
        return {
            message: false, // Если произошла ошибка, считаем, что комната заполнена
        };
    }
};
