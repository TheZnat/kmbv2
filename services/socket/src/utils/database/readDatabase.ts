import fs from "fs/promises";
import path from "path";
const getFilePath = () => path.join(__dirname, "../../../bd/bd.json");

export const readDatabase = async () => {
    try {
        const filePath = getFilePath();
        const fileData = await fs.readFile(filePath, "utf-8");
        return JSON.parse(fileData);
    } catch (error) {
        console.error("Error reading database:", error);
        throw new Error("Failed to read database");
    }
};
