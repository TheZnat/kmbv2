import fs from "fs/promises";
import path from "path";
import { generateRandomString } from "../../utils/string/generateRandomString";
import { Socket } from "socket.io";
import { formatTime } from "../../utils/function/dataTime";

interface IArgs {
    name: string;
    messageText: string;
    id: string;
}

interface IMessage {
    messageId: string;
    userId: string;
    name: string;
    messageText: string;
    createdAt: string;
}

interface IResult {
    message: string;
    status: string;
    dataMessages?: IMessage;
}

export const messageAdd = async (
    { name, messageText, id }: IArgs,
    socket: Socket
): Promise<IResult> => {
    const filePath = path.join(__dirname, "../../../bd/bd.json");

    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);
        const messages: IMessage[] = data.messages || [];

        const newMessage: IMessage = {
            messageId: generateRandomString(10),
            userId: id,
            name,
            messageText,
            createdAt: formatTime(new Date()),
        };

        messages.push(newMessage);

        const updatedData = {
            participants: data.participants || [],
            messages,
        };

        await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

        
        socket.emit("messages-updated", {
            action: "add",
            data: newMessage,
        });
        socket.broadcast.emit("messages-updated", {
            action: "add",
            data: newMessage,
        });

        return {
            message: "Message added successfully",
            status: "success",
            dataMessages: newMessage,
        };
    } catch (error) {
        console.error("Error while adding message:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
