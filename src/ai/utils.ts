import * as schema from '../db/schema';
import { getTableName } from 'drizzle-orm';

export function generateSchemaDescription(): string {
    const tableDescriptions: string[] = [];
    const tables = schema as Record<string, any>;

    for (const key in tables) {
        if (tables[key] && tables[key]._ === 'sqliteTable') {
            const table = tables[key];
            const tableName = getTableName(table);
            
            const columnDescriptions: string[] = [];
            const columns = table[Symbol.for('drizzle:columns')];

            for (const columnName in columns) {
                const column = columns[columnName];
                const columnType = column.dataType;
                const isNotNull = column.notNull ? ', NOT NULL' : '';
                const isPrimaryKey = column.primaryKey ? ', PRIMARY KEY' : '';
                
                let foreignKeyInfo = '';
                if (column.references) {
                    const referencedTable = column.references.refTable;
                    const referencedColumn = column.references.columns[0];
                    foreignKeyInfo = `, FOREIGN KEY to ${getTableName(referencedTable)}.${referencedColumn.name}`;
                }

                columnDescriptions.push(
                    `    - ${column.name} (${columnType}${isNotNull}${isPrimaryKey}${foreignKeyInfo})`
                );
            }

            tableDescriptions.push(
                `Table: ${tableName}\n${columnDescriptions.join('\n')}`
            );
        }
    }

    return tableDescriptions.join('\n\n');
}
