# Car Dealership Inventory System

A full-stack Car Dealership Inventory System built for the Incubyte TDD Kata. 

## Features
- **User Authentication:** Secure token-based registration and login.
- **Vehicle Management:** View, search, add, update, and delete vehicles.
- **Inventory Control:** Purchase vehicles (decreases quantity) and restock vehicles (admin only).

## Setup & Installation

### Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set up the environment variables (e.g., JWT Secret).
4. Run `npx prisma db push` to initialize the SQLite database.
5. Run `npm run dev` to start the server.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Run `npm run dev` to start the React application.

## Testing
- **Backend:** Run `npm test` in the `backend` directory to execute the Jest test suite.
- **Frontend:** Run `npm test` in the `frontend` directory to execute the Vitest suite.

---

## My AI Usage

### Tools Used
- Gemini 3.1 Pro (via Antigravity IDE)

### How AI Was Used
- **Boilerplate Generation:** Used Gemini to generate the initial setup script for the Node.js/Express backend and React/Vite frontend.
- **TDD Workflow:** AI acted as a pair programmer, helping to write failing tests first, followed by the minimal implementation code to make them pass, adhering to the Red-Green-Refactor cycle.
- **Documentation:** AI assisted in structuring this README and ensuring all Kata requirements were met.

### Reflection
Using an AI assistant accelerated the setup and boilerplate generation phases significantly. By treating the AI as a co-pilot during the TDD process, I was able to maintain high code quality and strict adherence to SOLID principles while moving at a much faster pace than coding entirely from scratch. The AI helped keep the focus on the business logic rather than syntax or configuration overhead.
