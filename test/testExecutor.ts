import { db } from '../src/db/client';
import { DrizzleReadOnlyExecutor, SecurityError } from '../src/services/drizzleReadOnlyExecutor';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../src/db/schema';
import { getSchemas } from '@/ai/utils';

type DrizzleDB = LibSQLDatabase<typeof schema>;
const mockDbInstance = db as unknown as DrizzleDB;
const queryExecutor = new DrizzleReadOnlyExecutor(mockDbInstance);

async function testExecutor() {
    console.log('--- Testing Drizzle Read-Only Executor ---');

    // SAFE Query
    try {
        const safeQuery = "SELECT id, name, price FROM products WHERE price > 50.00 ORDER BY price DESC";
        console.log(`\nAttempting SAFE Query: ${safeQuery}`);
        const result = await queryExecutor.executeReadOnlyQuery(safeQuery);
        console.log('✅ Success (Read-Only Data):', result);
    } catch (e) {
        console.error('❌ Failed unexpectedly:', (e as Error).cause, (e as Error).message);
    }

    // UNSAFE Query (DML/DDL injection attempt)
    try {
        const unsafeQuery = "UPDATE products SET stock_quantity = 0 WHERE name = 'Keyboard'; --";
        console.log(`\nAttempting UNSAFE Query: ${unsafeQuery}`);
        await queryExecutor.executeReadOnlyQuery(unsafeQuery);
        console.log('Should not reach here: Query executed successfully (BUG)');
    } catch (e) {
        if (e instanceof SecurityError) {
            console.log(`✅ Successfully Blocked (SecurityError):${(e as Error).cause}, ${(e as Error).message}`);
        } else {
            console.error('❌ Failed for the wrong reason:', (e as Error).cause, (e as Error).message);
        }
    }

    // UNSAFE Query (case-insensitive DML check)
    try {
        const unsafeQuery2 = "SeLeCt * FRoM products; dRoP TABLE products; --";
        console.log(`\nAttempting UNSAFE Query (DROP): ${unsafeQuery2}`);
        await queryExecutor.executeReadOnlyQuery(unsafeQuery2);
        console.log('Should not reach here: Query executed successfully (BUG)');
    } catch (e) {
        if (e instanceof SecurityError) {
            console.log(`✅ Successfully Blocked (SecurityError): ${(e as Error).cause}, ${(e as Error).message}`);
        } else {
            console.log(`✅ Successfully Blocked (DB error): ${(e as Error).cause}, ${(e as Error).message}`);
        }
    }

    // Valid SELECT with extra whitespace
    try {
        const safeQuery3 = "   SELECT name, stock_quantity from products  WHERE   id = 2  ";
        console.log(`\nAttempting SAFE Query with extra whitespace: ${safeQuery3}`);
        const result = await queryExecutor.executeReadOnlyQuery(safeQuery3);
        console.log('✅ Success (Read-Only Data):', result);
    } catch (e) {
        console.error('❌ Failed unexpectedly:', (e as Error).message);
    }
}


testExecutor();
