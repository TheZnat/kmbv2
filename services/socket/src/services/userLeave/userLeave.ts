import { readDatabase } from "../../utils/database/readDatabase";
import { writeDatabase } from "../../utils/database/writeDatabase";
import { Socket } from "socket.io";

interface Participant {
    name: string;
    id: string;
}

interface IResult {
    message: string;
    status: string;
}

interface IArgs {
    id: string;
}

export const userLeave = async (
    { id }: IArgs,
    socket: Socket
): Promise<IResult> => {
    try {
        const data = await readDatabase();

        const updatedParticipants: Participant[] = data.participants.filter(
            (participant: Participant) =>
                String(participant.id).trim() !== String(id).trim()
        );

        if (updatedParticipants.length === data.participants.length) {
            return {
                message: "Participant not found",
                status: "error",
            };
        }

        if (updatedParticipants.length === 0 && data.messages.length > 0) {
            data.messages = [];
        }

        await writeDatabase({
            participants: updatedParticipants,
            messages: data.messages,
        });

        socket.broadcast.emit("participants-updated", { action: "remove", id });

        return {
            message: "Participant removed successfully",
            status: "success",
        };
    } catch (error) {
        console.error("Error while removing participant:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
