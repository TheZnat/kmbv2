import { generateRandomString } from "../../utils/string/generateRandomString";
import { Socket } from "socket.io";
import { readDatabase } from "../../utils/database/readDatabase";
import { writeDatabase } from "../../utils/database/writeDatabase";


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
    try {
        let data = await readDatabase();

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

        await writeDatabase({ ...data, participants });


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
        console.error("Error while adding user:", error);
        return {
            message: "An unexpected error occurred",
            status: "error",
        };
    }
};
