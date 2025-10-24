## Dependencies
- Groq Cloud API Key
- Turso SQLite DB URL and Auth token.

## Getting Started
- Create ```.env``` file in root (refer ```.env.example``` for keys creation)
- Install project dependencies
```
pnpm install
```
- [**Optional**] Write your own schema in ```schema.ts``` or use the one with product and sales. 
- [**Optional**] Seeding data via ```seed.ts```(change this file for any new tables) or use the given datasets.

- **NOTE**: The Agent uses aiPermittedTablesView for sensitive DB table masking (views and object can also be added). Please make use of this to hide any db objects from Agent Select queries. 
- Add your db objects in the below view in ```schema.ts``` accordingly and make sure the view is on your Turso DB.
```
export const aiPermittedTablesView = sqliteView(
    'ai_permitted_tables_view',
    {
        type: text('type'),
        name: text('name'),
        tbl_name: text('tbl_name'),
        sql: text('sql'),
    },
).as(sql
    `
    SELECT type, name, tbl_name, sql
    FROM sqlite_master
    WHERE (type = 'table' OR type = 'view')
      AND sql IS NOT NULL
      AND tbl_name NOT LIKE '\\__%' ESCAPE '\\'
      AND tbl_name NOT IN (
        'sqlite_sequence', 
        'movies', 
        'actors'
        )
      AND name NOT IN (
        'ai_permitted_tables_view'
        )
    `
);
```
- Generate DB tables
```
pnpm db:generate
```
- Migrate DB tables to Turso DB
```
pnpm db:migrate
```
- Seed the DB
```
npx bun run src/db/seed.ts
```
- Build local setup
```
pnpm build
```
- Finally, run the development server:
```
pnpm dev
```

## Begin Chat
Open [http://localhost:3000](http://localhost:3000) with your browser, to begin the **Vinz Query-osity SQL AI Agent** chat window for your AI powered SQL chat!


## Msc
This is a [Next.js](https://nextjs.org) project.