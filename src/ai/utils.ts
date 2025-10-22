import fs from "fs/promises";

export async function getSchemas(): Promise<string> {
   return await fs.readFile("./src/db/schema.ts", "utf-8");//TODO: Dependent on code-first/code-as-truth design. Can be enhanced. 
}