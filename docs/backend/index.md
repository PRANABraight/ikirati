# Backend Documentation

The backend service is built with Node.js, Express, and MySQL (`mysql2`). It provides JWT-based authentication and a stories API, and in production serves the built frontend as static files.

> **Note:** Site content (stories, recipes, songs, elders, vocabulary, events, crafts, gallery) is managed in **Sanity CMS** and fetched directly by the frontend. The Express API is a standalone community-stories backend and is not currently consumed by the frontend.

## Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

For development:
```bash
npm run dev
```

For production (build first):
```bash
npm run build
npm start
```

Lint and test:
```bash
npm run lint
npm test
```

## Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`.

| Variable | Description |
|---|---|
| `PORT` | The port the server runs on (default: 4000) |
| `NODE_ENV` | `development` or `production` |
| `JWT_SECRET` | Secret key for JWT signing. **Required in production** — the server exits if unset or set to a known placeholder. |
| `FRONTEND_URL` | Allowed CORS origin (default: `http://localhost:5173`) |
| `TRUST_PROXY` | Set to `1` when behind a reverse proxy/load balancer so rate limiting keys on real client IPs |
| `DB_HOST` / `DB_PORT` | MySQL host and port (default: `localhost:3306`) |
| `DB_USER` / `DB_PASSWORD` | MySQL credentials. **Required in production.** |
| `DB_NAME` | Database name (default: `ikirati`) |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX_REQUESTS` | General rate limiter |
| `AUTH_RATE_LIMIT_WINDOW_MS` / `AUTH_RATE_LIMIT_MAX_REQUESTS` | Stricter limiter for `/api/auth` |

## API Structure

The API is organized into routes located in `src/routes`.

### `/api/auth`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | public | Register (email + strong password). Always forces `role: user`. |
| POST | `/login` | public | Returns a JWT (1 day expiry) and the user object. |
| GET | `/profile` | Bearer token | Returns the decoded token user. |

### `/api/stories`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | public | List all stories |
| GET | `/:id` | public | Get one story |
| GET | `/user/me` | Bearer token | Current user's stories |
| POST | `/` | Bearer token | Create a story |
| PUT | `/:id` | owner or admin | Update a story |
| DELETE | `/:id` | owner or admin | Delete a story |

Unmatched `/api/*` paths return a JSON 404; unexpected errors return a generic JSON 500 (details are logged server-side only).

## Database

Tables (`users`, `stories`) are created automatically on startup by `initDatabase()` in `src/db.ts`. There is no migration tool — schema changes are made by editing that function.
