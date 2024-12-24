import fs from "fs/promises";
import path from "path";
const getFilePath = () => path.join(__dirname, "../../../bd/bd.json");


export const writeDatabase = async (data: any) => {
    try {
        const filePath = getFilePath();
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing database:", error);
        throw new Error("Failed to write database");
    }
};