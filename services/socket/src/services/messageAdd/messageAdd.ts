import { generateRandomString } from "../../utils/string/generateRandomString";
import { Socket } from "socket.io";
import { formatTime } from "../../utils/function/dataTime";
import { writeDatabase } from "../../utils/database/writeDatabase";
import { readDatabase } from "../../utils/database/readDatabase";

// const CHAT_ROOM = "chatRoom"; // Константа для комнаты

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
    socket: Socket,
): Promise<IResult> => {
    try {
        const data = await readDatabase();
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

        await writeDatabase(updatedData);

        socket.emit("messages-updated", {
            action: "add",
            data: newMessage,
        });
        socket.broadcast.emit("messages-updated", {
            action: "add",
            data: newMessage,
        });

        // socket.to(CHAT_ROOM).emit("messages-updated", {
        //     action: "add",
        //     data: newMessage,
        // });

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
