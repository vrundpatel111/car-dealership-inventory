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

## 🧪 Test Credentials
To test the application, you can register a new user, or use the pre-configured admin account (if populated via tests):
- **Admin**: Create an account and manually set the role to `ADMIN` in the database, or run the test suites to auto-generate one.

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
- **Architecture & Planning**: Used AI to brainstorm the cleanest approach to satisfy the requirements without over-engineering (e.g., choosing SQLite, standardizing the Controller-Service pattern).
- **Test-Driven Development**: Used the AI to strictly enforce the Red-Green-Refactor cycle, ensuring tests were written *before* the implementation logic.
- **Boilerplate & CSS**: Used AI to accelerate writing Tailwind utility classes and basic Express boilerplate, allowing me to focus on core business logic and architecture.
- **Verification**: All code was reviewed, understood, and executed under my direct supervision to ensure it meets strict software engineering standards.
