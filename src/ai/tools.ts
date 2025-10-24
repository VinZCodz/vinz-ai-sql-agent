import { tool } from 'ai';
import { z } from 'zod';
import type { DrizzleReadOnlyExecutor } from '../services/drizzleReadOnlyExecutor';

export const createTools = (dependencies: ToolDependencies) => {
    const { queryExecutor } = dependencies;

    const dbTableNames = tool({
        name: 'dbTableNames',
        description: 'Call to get the array of names of **All** tables or views, that are permitted for querying.',
        inputSchema: z.object({}),
        execute: async () => {
            try {
                return await queryExecutor.getTableNames();
            } catch (e) {
                return `Failed to fetch permitted tables: ${e}`;
            }
        },
    });

    const dbTableSchema = tool({
        name: 'dbTableSchema',
        description: 'Call to get to know the schema structure by passing the name of the table or view.',
        inputSchema: z.object({
            tableName: z.string().describe('The name of the table or view to get its schema definition.'),
        }),
        execute: async ({ tableName }) => {
            try {
                return await queryExecutor.getTableSchema(tableName);
            } catch (e) {
                return `Failed to fetch schema for ${tableName}: ${e}`;
            }
        },
    });

    const dbQuery = tool({
        name: "dbQuery",
        description: 'Call to query the database using read-only SQL SELECT statements.',
        inputSchema: z.object({
            query: z.string().describe('The read-only SQL SELECT query.'),
        }),
        execute: async ({ query }) => {
            try {
                return await queryExecutor.executeReadOnlyQuery(query);
            } catch (e) {
                return `Failed unexpectedly: ${e}`;
            }
        },
    });

    return {
        dbTableNames,
        dbTableSchema,
        dbQuery,
    };
}

interface ToolDependencies {
    queryExecutor: DrizzleReadOnlyExecutor;
}