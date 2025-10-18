import { tool } from 'ai';
import { z } from 'zod';
import { db } from '../../db/client';
import { products, sales } from '../../db/schema';
import { sql } from 'drizzle-orm';

const databaseQuery = tool({
    execute: async ({ query }) => {
        console.log("Query:", query);

        // const result = await db.execute(sql`select * from ${users} where ${users.age} > 25`);
        // console.log(result);

        return query;
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