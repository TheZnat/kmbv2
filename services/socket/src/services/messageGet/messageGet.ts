import { readDatabase } from "../../utils/database/readDatabase";

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
        const data = await readDatabase();
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
