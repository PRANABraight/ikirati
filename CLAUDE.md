# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ikirati (Kirati Heart) — cultural heritage platform for the Kirati people (eastern Himalayas): interactive timeline, cultural archive, oral traditions/stories, community hub.

Monorepo, two independent npm workspaces (no shared package manager workspace config — root `package.json` just shells out):

- `backend/` — Express + TypeScript + MySQL (mysql2) API
- `frontend/` — React 18 + TypeScript + Vite + Tailwind CSS

## Commands

Run from repo root (delegates into `backend/`/`frontend/` via `cd`):

```
npm run install:all     # install root + backend + frontend deps
npm run dev             # run backend and frontend dev servers concurrently
npm run build           # build frontend only (production bundle served by backend)
npm start               # run backend in production (serves frontend/dist as static files)
```

Backend (`cd backend`):
```
npm run dev             # ts-node src/index.ts, no watch/reload
npm run build           # tsc -> dist/
npm start               # node dist/index.js (requires build first)
```

Frontend (`cd frontend`):
```
npm run dev             # vite dev server (localhost:5173)
npm run build           # tsc -b && vite build
npm run lint            # eslint .
npm run preview         # preview production build
```

No test suite exists in either package.

Docs (mkdocs, `docs/` + `mkdocs.yml`, nav: Home/Backend/Frontend) build separately via mkdocs tooling, not npm.

## Architecture

### Backend (`backend/src`)

Layered Express app, single entrypoint `index.ts`:

- `index.ts` — app setup order matters: helmet (CSP) -> CORS (origin from `FRONTEND_URL`) -> `express.json()` -> general rate limiter -> routes -> static frontend serving -> SPA catch-all (`app.get('*')` serves `frontend/dist/index.html` for any non-`/api` path). In production the backend serves the built frontend directly from `../../frontend/dist`, so backend and frontend build/deploy as one unit.
- `db.ts` — single `mysql2/promise` connection pool exported as default; `initDatabase()` runs `CREATE TABLE IF NOT EXISTS` for `users` and `stories` on every server start (no migration files/tool — schema changes are made by editing this function).
- `routes/*.ts` — thin route definitions only; wire path + middleware chain (auth, validation) to controller functions. No logic lives here.
- `controllers/*.ts` — request handling + validation chains (`express-validator`), calling into models.
- `models/*.ts` — one class per table (`Story`, `User`) with static methods wrapping raw parameterized SQL via the pool. No ORM.
- `middleware/authMiddleware.ts` — `authenticateJWT` verifies the Bearer token and attaches `req.user` (shape declared in `types.ts` via `declare global { namespace Express { interface Request { user?: AuthUser } } }`).
- `middleware/roleMiddleware.ts` — `requireAuth` (any logged-in user) and `requireAdmin` (role === 'admin'), applied after `authenticateJWT` in route chains.

Auth pattern: JWT bearer token, `role` is `'admin' | 'user'` stored on the user row; route protection = `authenticateJWT` then `requireAuth`/`requireAdmin` stacked in that order.

Two rate limiters in `index.ts`: a general one on all routes, and a stricter `authLimiter` applied only to `/api/auth`.

`JWT_SECRET` falls back to `'secret'` with a startup warning if unset — must be set via `.env` (see `backend/.env.example`) for anything beyond local dev.

### Frontend (`frontend/src`)

Standard Vite React Router SPA:

- `main.tsx` -> `App.tsx` defines all routes inside a single `Layout` (`components/Layout.tsx`) wrapping `Navigation` + `Footer`.
- `pages/*.tsx` — one component per route (Home, Stories, Crafts, Elders, Archive, Language, Events, Timeline, Gallery); pages are the unit of feature work.
- `components/*.tsx` — shared UI: modals (`StoryModal`, `TimelineModal`, `ShareModal`), `AudioPlayer`, `ScrollReveal` (Framer Motion/ScrollReveal-based reveal-on-scroll wrapper used throughout pages), `LoadingScreen` (shown for a fixed 2.5s on app mount, see `App.tsx`).
- `data/index.ts` — static content/data used by pages (distinct from the backend-served `stories` API — check here first before assuming content comes from the API).

No frontend state management library or API client abstraction currently exists — assume direct `fetch` calls to the backend API when wiring pages to backend data.
