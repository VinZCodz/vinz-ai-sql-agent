import { tool } from 'ai';
import { z } from 'zod';

const databaseQuery = tool({
    execute: async ({ query }) => {
        console.log("Query:", query);
        return "";
    },
    name: "databaseQuery",
    description: 'Call to query the database',
    inputSchema: z.object({
        query: z.string().describe('SQL query'),
    })
});

export const tools = {
    databaseQuery
}