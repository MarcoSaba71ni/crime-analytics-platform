# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SafeSweden AI is a civic-tech platform that visualizes Swedish crime data through interactive maps, dashboards, and AI-generated plain-language summaries. It uses only aggregated, public datasets.

## Planned Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Recharts, Leaflet |
| Backend | FastAPI (Python) |
| Database | MySQL |
| Auth | Supabase or JWT |
| AI | LLM API for crime-trend summaries |
| Data pipeline | Python scripts for cleaning/ingesting public crime datasets |

## Intended Architecture

The project is a monorepo with two top-level directories: `frontend/` and `backend/`.

- **Frontend** is a Vite+React SPA. Route-level code splitting. Map views use Leaflet with GeoJSON overlays and heatmap layers. Charts use Recharts. Auth state lives in a context provider; protected routes redirect unauthenticated users.
- **Backend** is a FastAPI app. Routes are organized by domain (auth, crimes, areas, ai). The AI summary endpoint calls an external LLM and is rate-limited. Crime data is pre-aggregated — raw records are never served to the client.
- **Database** uses MySQL. Location is stored as `lat`/`lng` decimal columns (MySQL spatial POINT optional). Crime records have the shape: `id, title, type, location, date, severity, description`.
- **Data pipeline** is a set of standalone Python scripts (`pipeline/`) that fetch, clean, and load public BRÅ datasets into MySQL. These run offline / on a schedule, not as part of the web server.

## Development Commands

These will be filled in once scaffolding is complete. Expected entry points:

```
# Frontend
cd frontend && npm run dev       # dev server
cd frontend && npm run build     # production build
cd frontend && npm run lint      # ESLint

# Backend
cd backend && uvicorn main:app --reload   # dev server
cd backend && pytest                      # run all tests
cd backend && pytest tests/test_crimes.py # run single test file

# Pipeline
cd pipeline && python ingest.py          # run data ingestion
```

## Key Constraints

- Never serve raw/individual crime records — only aggregated counts by zone and time period.
- All public-facing data must come from official Swedish sources (BRÅ).
- AI summary endpoints must be rate-limited and must not expose raw LLM prompts to clients.
- Auth-protected routes: saved areas, watchlist, and any personalized features.
