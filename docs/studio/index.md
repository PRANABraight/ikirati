# Sanity Studio Documentation

The `studio/` directory contains the Sanity Studio used to manage all site content. The frontend fetches this content directly from Sanity's CDN via GROQ queries.

## Setup

```bash
cd studio
npm install
npm run dev   # Studio at http://localhost:3333
```

Deploy the hosted studio:
```bash
npm run deploy
```

## Content Types

| Schema | Used by page | Key fields |
|---|---|---|
| `story` | Stories (`source: legend`), Archive (`source: cultural-story`) | title, text, author, image, link, source |
| `recipe` | Archive → Recipes | name, difficulty, time, content, ingredients, prep, image |
| `song` | Archive → Songs | name, type, audio (file), duration, content, link (YouTube) |
| `elder` | Elders | name, age, specialty, quote, image, audio |
| `vocabularyEntry` | Language | word, language (Limbu/Rai/Yakkha/Sunuwar), translation, pronunciation, example, audio |
| `event` | Events | title, date, location, eventType, description, link |
| `craft` | Crafts | title, description, image, difficulty, timeToLearn |
| `galleryImage` | Gallery | title, description, image, category |

Pages show a friendly "coming soon" empty state until documents of the matching type are published.

## Frontend connection

The frontend reads `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` from `frontend/.env` (see `frontend/.env.example`). Never put a write token (`SANITY_API_TOKEN`) in a `VITE_`-prefixed variable — anything with that prefix ships in the public bundle.
