import { tool } from 'ai';
import { z } from 'zod';
import type {DrizzleReadOnlyExecutor} from '../services/drizzleReadOnlyExecutor';

export const createTools = (dependencies: ToolDependencies) => {
    const { queryExecutor } = dependencies;

    const databaseQuery = tool({
        execute: async ({ query }) => {
            try {
                return await queryExecutor.executeReadOnlyQuery(query);
            } catch (e) {
                return `Failed unexpectedly: ${e}`;
            }
        },
        name: "databaseQuery",
        description: 'Call to query the database using read-only SQL SELECT statements.',
        inputSchema: z.object({
            query: z.string().describe('The read-only SQL SELECT query.'),
        })
    });

    return {
        databaseQuery
    };
}

interface ToolDependencies {
    queryExecutor: DrizzleReadOnlyExecutor;
}