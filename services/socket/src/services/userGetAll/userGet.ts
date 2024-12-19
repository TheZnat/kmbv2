import fs from "fs/promises";
import path from "path";

interface IParticipant {
    name: string;
    id: string;
}
interface IResult {
    message: string | IParticipant[] | object;
    status: string;
}

export const userGet = async (): Promise<IResult> => {
    try {
        const filePath = path.join(__dirname, "../../../bd/bd.json");
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);
        return {
            message: data.participants,
            status: "success",
        };
    } catch (e: any) {
        console.error("user retrieval error", e);
        return {
            message: "user retrieval error",
            status: "error",
        };
    }
};
