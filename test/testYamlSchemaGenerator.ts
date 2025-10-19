// import { writeFileSync } from 'fs';
// import { dump } from 'yaml';
// import * as schema from '../src/db/schema';

// // A helper function to process Drizzle table definitions.
// function processDrizzleSchema(drizzleSchema: typeof schema) {
//   const schemaDefinition: Record<string, any> = {};

//   for (const [key, table] of Object.entries(drizzleSchema)) {
//     if (typeof table === 'object' && table !== null && 'getSQL' in table) {
//       // @ts-expect-error Drizzle's internal properties are not publicly typed,
//       // but we can access them for introspection.
//       const tableData = table._.columns;
//       const columns: Record<string, any> = {};

//       for (const column of Object.values(tableData) as any[]) {
//         const columnDefinition: Record<string, any> = {
//           type: column.dataType,
//           name: column.name,
//           primaryKey: column.primaryKey,
//           notNull: column.notNull,
//           unique: column.unique,
//           references: column.references?.ref()._.__name,
//         };
//         columns[column.name] = columnDefinition;
//       }
//       schemaDefinition[key] = { tableName: table._.name, columns };
//     }
//   }

//   return schemaDefinition;
// }

// // Convert the Drizzle schema to a plain JavaScript object.
// const convertedSchema = processDrizzleSchema(schema);

// // Serialize the object to a YAML string.
// const yamlContent = dump(convertedSchema);

// // Write the YAML string to a file.
// writeFileSync('./src/test/drizzle-schema.yaml', yamlContent, 'utf8');

// console.log('Successfully converted Drizzle schema to drizzle-schema.yaml');
