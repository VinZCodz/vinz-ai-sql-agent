import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { sql, SQL, DrizzleConfig } from 'drizzle-orm';
import * as schema from '../db/schema';
type DrizzleDB = LibSQLDatabase<typeof schema>;

export class DrizzleReadOnlyExecutor {
    private db: DrizzleDB;

    constructor(db: DrizzleDB) {
        this.db = db;
    }

    public async executeReadOnlyQuery(rawQuery: string) {
        const normalizedQuery = rawQuery.trim().replace(/\s+/g, ' ');

        if (!READ_ONLY_REGEX.test(normalizedQuery)) {
            console.error(`Blocked dangerous query attempt: ${normalizedQuery}`);
            throw new SecurityError(
                'Only SELECT statements are permitted, and the query contains forbidden keywords.',
                'Query failed security validation.'
            );
        }

        try {
            console.log("Query:", normalizedQuery);
            return await this.db.all(sql.raw(normalizedQuery));
        } catch (error) {
            // console.error('Error executing raw Drizzle query:', error)
            throw error;
        }
    }
}

// A strict list of DML/DDL keywords that are forbidden.
const FORBIDDEN_KEYWORDS = [
    'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'DROP', 'ALTER', 'CREATE',
    'ATTACH', 'DETACH', 'PRAGMA', 'REINDEX', 'VACUUM', 'REPLACE', 'GRANT',
    'REVOKE', 'BEGIN', 'COMMIT', 'ROLLBACK', 'SAVEPOINT'
].join('|');

const READ_ONLY_REGEX = new RegExp(
    `^\\s*SELECT(?:(?!\\b(?:${FORBIDDEN_KEYWORDS})\\b)[\\s\\S]*?)$`,
    'i' // Case-insensitive matching
);

export class SecurityError extends Error {
    constructor(cause: string, message: string) {
        super(`[SQL Security Violation] ${message}`);
        this.name = 'SecurityError';
        this.cause = cause;
        this.message = message;
    }
}