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
In building this project, I used an AI coding assistant (Gemini/Antigravity) as a collaborative pair programmer.
- **Architecture & Planning**: Used AI to brainstorm the cleanest approach to satisfy the requirements without over-engineering (e.g., choosing PostgreSQL on Neon as a hosted database, standardizing the Controller-Service pattern).
- **Test-Driven Development**: Used the AI to strictly enforce the Red-Green-Refactor cycle, ensuring tests were written *before* the implementation logic.
- **Boilerplate & CSS**: Used AI to accelerate writing Tailwind utility classes and basic Express boilerplate, allowing me to focus on core business logic and architecture.
- **Verification**: All code was reviewed, understood, and executed under my direct supervision to ensure it meets strict software engineering standards.
