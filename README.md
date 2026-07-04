# Ikirati (Kirati Heart)

**Ikirati** is a digital sanctuary dedicated to preserving, celebrating, and sharing the rich cultural heritage of the Kirati people of the eastern Himalayas — the Rai, Limbu, Yakkha, and Sunuwar communities.

## 🌟 Key Features

- **Interactive Timeline** — a visual journey through Kirati history, from ancient origins to the modern cultural revival.
- **Cultural Archive** — traditional recipes, folk songs (with audio), and cultural stories.
- **Oral Traditions** — myths and legends like Sumnima & Paruhang, passed down through generations.
- **Elders & Language** — recorded wisdom from community elders and a growing vocabulary archive for Kirati languages.
- **Events & Gallery** — community gatherings and a visual archive.

## 🛠️ Technology Stack

| Layer | Stack |
|---|---|
| Frontend (`frontend/`) | React 18, TypeScript, Vite, Tailwind CSS, React Router, Lucide icons |
| Content (`studio/`) | Sanity CMS (Studio v6) — all site content is fetched from Sanity via GROQ |
| Backend (`backend/`) | Express + TypeScript + MySQL, JWT auth (standalone community-stories API) |
| Docs (`docs/`) | MkDocs Material |

## 🚀 Getting Started

```bash
npm run install:all     # install root + backend + frontend + studio deps
npm run dev             # backend (port 4000) + frontend (port 5173)
```

Environment:
- `backend/.env` — see `backend/.env.example` (MySQL credentials, `JWT_SECRET`)
- `frontend/.env` — see `frontend/.env.example` (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`)

Quality checks:
```bash
npm run lint            # ESLint on backend + frontend
npm test                # Jest (backend) + Vitest (frontend)
npm run build           # production frontend bundle
```

Sanity Studio:
```bash
cd studio && npm run dev    # http://localhost:3333
```

Full documentation lives in [`docs/`](docs/) (MkDocs).

---

*Preserving the past, inspiring the future.*
