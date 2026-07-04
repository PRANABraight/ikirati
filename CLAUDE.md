# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ikirati (Kirati Heart) — cultural heritage platform for the Kirati people (eastern Himalayas): interactive timeline, cultural archive, oral traditions/stories, elders, language, events, gallery.

Monorepo, three independent npm packages (no shared workspace config — root `package.json` just shells out):

- `frontend/` — React 18 + TypeScript + Vite + Tailwind CSS SPA. **Content comes from Sanity CMS**, fetched client-side via GROQ.
- `studio/` — Sanity Studio v6 managing all content types (story, recipe, song, elder, vocabularyEntry, event, craft, galleryImage).
- `backend/` — Express + TypeScript + MySQL (mysql2) API with JWT auth and a stories CRUD. **Not consumed by the frontend** — it's a standalone community API kept hardened; in production it also serves `frontend/dist` as static files.

## Commands

Run from repo root (delegates into packages via `cd`):

```
npm run install:all     # install root + backend + frontend + studio deps
npm run dev             # backend (4000) + frontend (5173) dev servers
npm run build           # build frontend production bundle
npm start               # backend in production (serves frontend/dist)
npm run lint            # eslint on backend + frontend
npm test                # jest (backend) + vitest (frontend)
```

Per package: `backend/` has `dev/build/start/test/lint` (jest + supertest, eslint flat config); `frontend/` has `dev/build/lint/test/preview` (vitest + Testing Library); `studio/` has `dev/build/deploy` (studio runs at localhost:3333, no tests).

Docs (mkdocs, `docs/` + `mkdocs.yml`, nav: Home/Backend/Frontend/Studio) build separately via mkdocs tooling, not npm. CI (`.github/workflows/test.yml`) runs lint + test for backend and frontend on push/PR to main.

## Architecture

### Frontend (`frontend/src`)

- `App.tsx` — all routes lazy-loaded (`React.lazy`) inside a single `Layout`, wrapped in `ErrorBoundary`; catch-all `*` → `NotFoundPage`. Short (~800ms) branded `LoadingScreen` on mount.
- `lib/sanity.ts` — Sanity client (`VITE_SANITY_PROJECT_ID`/`VITE_SANITY_DATASET` from env), `urlFor` (images), `urlForFile` (audio). Never expose `SANITY_API_TOKEN` via a `VITE_` var.
- `hooks/useSanityQuery.ts` — the standard data-fetch pattern: `{data, loading, error, retry}`. Every Sanity-backed page renders `LoadingSection`/`ErrorSection`/`EmptySection` from `components/DataState.tsx` — follow this pattern for new pages.
- `hooks/useScrollY.ts` — rAF-throttled scroll position for parallax heroes; `hooks/usePageMeta.ts` — per-page `<title>` + meta description.
- `components/Modal.tsx` — accessible dialog primitive (focus trap, Esc, scroll lock, focus restore). `StoryModal`, `TimelineModal`, `ShareModal`, and the Gallery lightbox all build on it — new modals must too.
- `pages/*.tsx` — one component per route. Sanity-backed: Stories, Archive, Crafts, Elders, Language, Events, Gallery. Static-data (`data/index.ts`): Home (`stories` carousel), Timeline (`timeline`).
- Tailwind: custom animations (`fade-in`, `scale-up`, `blob`, …) are defined in `tailwind.config.js`; `@tailwindcss/typography` provides `prose`. Never build class names dynamically (`delay-${i}`) — JIT can't see them; use static class arrays or inline styles.
- Contribution CTAs are `mailto:pranab.rai@coss.org.in` links — no form backend exists.

### Studio (`studio/`)

Schemas in `schemaTypes/*.ts` using `defineType`/`defineField` with `@sanity/icons`; register new types in `schemaTypes/index.ts`. Frontend pages show an empty state until documents are published.

### Backend (`backend/src`)

Layered Express app, single entrypoint `index.ts`:

- `index.ts` — order matters: trust-proxy (via `TRUST_PROXY` env) → helmet CSP (no `unsafe-inline` scripts) → CORS (`FRONTEND_URL`) → `express.json()` → general rate limiter → routes (`/api/auth` with stricter `authLimiter`, `/api/stories`) → static frontend → catch-all (JSON 404 for `/api/*`, SPA index.html otherwise) → global error handler (generic 500, logs server-side).
- `config.ts` — `getJwtSecret()`: lazy read, **exits in production** if `JWT_SECRET` unset/placeholder; dev falls back with a warning. Use it instead of reading `process.env.JWT_SECRET` directly.
- `db.ts` — mysql2 pool; exits in production if `DB_USER`/`DB_PASSWORD` unset. `initDatabase()` runs `CREATE TABLE IF NOT EXISTS` on start (no migration tool — edit this function for schema changes).
- `routes/*.ts` → `controllers/*.ts` (express-validator chains) → `models/*.ts` (static methods, parameterized SQL only, no ORM).
- Auth: JWT bearer; `authenticateJWT` then `requireAuth`/`requireAdmin`. Registration always forces `role: 'user'` and returns a generic error for duplicate emails (no enumeration).
- Tests: unit tests beside sources; route-level integration tests in `src/routes/*.test.ts` use supertest with mocked models and `JWT_SECRET` set in the test file.
