# AutoBrain AI — Backend (Node + Express + Prisma)

Requirements:
- Node 18+
- PostgreSQL (local or remote)
- yarn or npm

Quick start:
1. Copy environment file
   cp .env.example .env
   Fill DATABASE_URL and JWT_SECRET

2. Install
   npm install

3. Generate Prisma client
   npx prisma generate

4. Run migrations (creates schema on DB)
   npx prisma migrate dev --name init

5. Seed demo user & car (optional)
   npm run seed

6. Start dev server
   npm run dev

API:
- POST /api/auth/register { name, email, password } -> { token, user }
- POST /api/auth/login { email, password } -> { token, user }
- GET /api/me -> authenticated user info
- POST /api/instant-analyze (Bearer token required) { userId?, carId, audioUrl? } -> mocked instant analysis
- POST /api/predict-60days (Bearer token required) { userId?, carId, lastAnalysisId? } -> mocked 60-day prediction
- GET /api/analyses?userId=... (Bearer token required) -> list of analyses

Notes:
- For MVP we mock the AI processing; simulated delay of 2-3 seconds and random outputs.
- Prisma models are in prisma/schema.prisma. Use Prisma Studio with `npm run prisma:studio` to inspect DB.