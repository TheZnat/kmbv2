import { IRouteFn } from "../../../../types/socket";
import { checkRoom as checkRoomService } from "../../../services/room/room";

export const checkRoom: IRouteFn = async (socket, data) => {
    try {
        const result = await checkRoomService();
        return result;
    } catch (error) {
        console.log("Error add user:", error);
        throw error; 
    }
};
