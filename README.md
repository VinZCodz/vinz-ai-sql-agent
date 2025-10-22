## Dependencies
- Groq Cloud API Key
- Turso SQLite DB URL and Auth token.

## Getting Started
- Create ```.env``` file in root (refer ```.env.example``` for keys creation)
- [**Optional**] Write your own schema in ```schema.ts``` or use the one with product and sales. 
- [**Optional**] Seeding data via ```seed.ts```(change this file for any new tables) or use the given datasets.
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