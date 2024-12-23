import fs from "fs/promises";
import path from "path";

interface IParticipant {
    name: string;
    messageId: string;
    userId: string;
    createdAt: string;
    messageText: string;
}
interface IResult {
    message: string | IParticipant[];
    status: string;
}

export const messageGet = async (): Promise<IResult> => {
    try {
        const filePath = path.join(__dirname, "../../../bd/bd.json");
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);
        return {
            message: data.messages,
            status: "success",
        };
    } catch (e: any) {
        console.error("user retrieval error", e);
        return {
            message: "error receiving message",
            status: "error",
        };
    }
};
