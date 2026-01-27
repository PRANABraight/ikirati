# Backend Documentation

The backend service is built with Node.js and Express. It handles the core business logic, database interactions, and authentication for the Ikirati platform.

## Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Start the server:
```bash
npm start
```
For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`.

| Variable | Description |
|Str|---|
| `PORT` | The port the server runs on (default: 3000) |
| `DATABASE_URL` | Connection string for the database |
| `JWT_SECRET` | Secret key for JWT authentication |

## API Structure

The API is organized into routes located in `src/routes`.

- `/api/auth`: Authentication routes (login, register)
- `/api/stories`: Operations related to cultural stories
- `/api/users`: User management

*(Detailed API reference to be added)*
