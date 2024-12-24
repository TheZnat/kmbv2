import { readDatabase } from "../../utils/database/readDatabase";

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
        const data = await readDatabase();
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
