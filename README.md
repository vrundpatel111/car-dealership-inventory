# Car Dealership Inventory System

A full-stack, test-driven web application for managing car dealership inventory, built for the Incubyte technical assessment.

## 🚀 Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL (Hosted on Neon)
- **Testing**: Jest, Supertest

## 🛠️ Local Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Note: The project uses a live PostgreSQL database hosted on Neon. The connection URL is safely stored in the backend `.env` file.*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will be running at `http://localhost:5173`.

## 🔐 Roles & Access Control

This app has two roles: `USER` (default) and `ADMIN`.

| Feature | USER | ADMIN |
|---|---|---|
| Browse vehicles | ✅ | ✅ |
| Search & filter | ✅ | ✅ |
| Purchase a vehicle | ✅ | ✅ |
| Add new vehicle | ❌ | ✅ |
| Update vehicle | ❌ | ✅ |
| Delete vehicle | ❌ | ✅ |
| Restock vehicle | ❌ | ✅ |
| Admin Panel (UI) | ❌ Hidden | ✅ Visible |

### How to create an Admin user
All registered users start as `USER` by default. To promote a user to `ADMIN`, run the following SQL directly on the Neon PostgreSQL database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

Once their role is updated, they will see the **Admin Panel** link in the navbar on their next login.

## 📸 Screenshots
*(Insert your screenshots here)*
- `Dashboard View`
- `Admin Panel`
- `Purchase Flow`

## ✅ Test Report
The backend was built using strict Test-Driven Development (Red-Green-Refactor).
```bash
cd backend
npx jest
```
```text
PASS  src/__tests__/auth.test.ts (14.413 s)
PASS  src/__tests__/vehicle.test.ts (15.696 s)

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        18.489 s
Ran all test suites.
```

## 🤖 My AI Usage

**Tool used:** Antigravity (Gemini-powered AI coding assistant)

I used AI as a **pair programmer** throughout this project — not as a replacement for thinking, but as a tool to go faster and enforce better practices. Here is an honest breakdown:

### What I used AI for (~60–70% of the work):

| Area | How AI was used |
|---|---|
| **Architecture & Planning** | Brainstormed the Controller → Service → Prisma layer pattern, chose PostgreSQL on Neon as the hosted database |
| **TDD enforcement** | AI helped write tests *first* (Red), then I directed the implementation (Green), then we refactored together |
| **Search endpoint** | AI generated the initial `searchVehicles` service function with Prisma `contains` + price range filters |
| **Boilerplate** | Express routes, middleware wiring, Prisma schema — AI generated first drafts that I reviewed and corrected |
| **UI & CSS** | Tailwind class combinations, component structure, light theme design system |
| **Deployment config** | CORS setup, `VITE_API_URL` env variable pattern, Railway/Vercel deployment steps |

### What I did manually (~30–40%):

- All architectural decisions (which tech stack, how to structure the project, what the DB schema should look like)
- Reviewed and understood **every line of AI-generated code** before accepting it
- Identified bugs (e.g. register endpoint not returning a JWT, `/search` route ordering issue with `/:id`)
- Directed the TDD cycle — AI wrote the test body, I decided what to test and why
- Manually tested all flows in the browser

### My reflection:

Using AI made me ~3× faster on boilerplate and syntax, but it did **not** replace the need to understand the code. Every time I used AI output without fully understanding it, I caught a bug or a design issue. The most valuable skill was knowing *what to ask* the AI and *when to override it*.

> All commits where AI was used include the `Co-authored-by: Antigravity` trailer in the commit message, as required by the project guidelines.
