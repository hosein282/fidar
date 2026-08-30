<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/26ca2cfd-3a1f-479a-95d1-f6bbfd5e86c1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Database (Prisma ORM)

This project uses [Prisma](https://www.prisma.io) as the database layer (MySQL).

- Schema: `prisma/schema.prisma`
- Client singleton: `src/app/api/lib/prisma.ts`
- Data access: `src/app/api/lib/store.ts`
- Connection string lives in `DATABASE_URL` (see `.env.example`).

Useful commands:

```bash
npm run db:generate   # regenerate the Prisma Client after editing the schema
npm run db:migrate    # create/apply a migration (init)
npm run db:push       # push schema changes straight to the database
npm run db:studio     # open Prisma Studio at http://localhost:5555
```

A plain-SQL version of the schema stays in `database/schema.sql` for reference.
