import { readDatabase } from "../../utils/database/readDatabase";
import { MAX_COUNT_USERS } from "../../const/room/index";

interface IResult {
    message: string;
}

export const checkRoom = async (): Promise<IResult> => {
    try {
        let data = await readDatabase();
        const participants = data.participants || [];
        if (participants.length >= MAX_COUNT_USERS) {
            return { message: "Room is full" };
        }
        return { message: "Room is available" };
    } catch (error) {
        console.error("Error while checking room:", error);
        return { message: "Error while checking room" };
    }
};
