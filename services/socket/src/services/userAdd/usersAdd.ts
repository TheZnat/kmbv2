import fs from "fs/promises";
import path from "path";
import { generateRandomString } from "../../utils/string/generateRandomString";
import { Socket } from "socket.io";

interface IArgs {
    name: string;
}

interface IResult {
    message: string;
    status: string;
    id?: string;
}

export const userAdd = async (
    { name }: IArgs,
    socket: Socket
): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(
                filePath,
                JSON.stringify({ participants: [], messages: [] }, null, 2)
            );
        }

        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const participants: { name: string; id: string }[] =
            data.participants || [];

        if (participants.some((participant) => participant.name === name)) {
            return {
                message: "Error: name is already taken",
                status: "error",
            };
        }

        const newParticipant = { name, id: generateRandomString(4) };
        participants.push(newParticipant);

        await fs.writeFile(
            filePath,
            JSON.stringify({ ...data, participants }, null, 2)
        );

        // Уведомляем остальных участников
        socket.broadcast.emit("participants-updated", {
            action: "add",
            participant: newParticipant,
        });

        return {
            message: "User added successfully",
            status: "success",
            id: newParticipant.id,
        };
    } catch (error) {
        console.error("Error while joining room:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
