# KelanaAI

AI Travel Planner — build with Python, Next.js & Amazon Bedrock.

## Structure

```
kelana-ai/
├── README.md
├── backend/
│   ├── main.py                    # Presentation layer (FastAPI REST API)
│   ├── database.py                # SQLAlchemy engine & session
│   ├── models.py                  # Trip ORM model
│   ├── schemas.py                 # Pydantic schemas
│   ├── requirements.txt
│   └── services/
│       ├── trip_service.py        # Business logic
│       └── bedrock_service.py     # Amazon Bedrock itinerary generation
└── frontend/
    ├── src/app/page.tsx           # Homepage (hero, form, destinations)
    ├── src/components/            # TripForm & Footer
    └── public/                    # Hero & destination images
```

## Sessions

### Session 1: Trip Summary Generator

Console app that takes destination, country, days, budget, currency, and travel month, then prints a trip summary.

### Session 2: Recommendation Engine

- Trip category (Backpacker / Standard / Luxury)
- Travel season (Peak / Holiday / Regular)
- Daily budget calculation
- Recommended places
- Modular service architecture (business logic separated from presentation)

### Session 3: REST API

- FastAPI app with GET endpoints for recommendations and transportations.

### Session 4: PostgreSQL Persistence

- SQLAlchemy ORM with a PostgreSQL `trips` table.
- Full CRUD REST API:
  - `POST /api/v1/trips`
  - `GET /api/v1/trips`
  - `GET /api/v1/trips/{id}`
  - `PUT /api/v1/trips/{id}` (recalculates `category` & `daily_budget` from new `budget`)
  - `DELETE /api/v1/trips/{id}` (returns 404 when not found)

### Session 5: Amazon Bedrock Integration

- `bedrock_service.py` builds a rich prompt that instructs the model to produce a
  structured daily itinerary (Morning / Afternoon / Evening).
- `POST /api/v1/trips/{id}/generate` generates the itinerary via Amazon Bedrock and
  saves it to the `ai_recommendation` column in PostgreSQL.
- The model ID is configurable via `BEDROCK_MODEL_ID` (default `amazon.titan-text-express-v1`).
- If Bedrock is unreachable or unconfigured, a deterministic sample itinerary is returned
  so the endpoint stays usable.

### Session 6: Frontend Homepage

- Next.js (App Router) + Tailwind CSS homepage with a hero image, trip planning form,
  popular destinations, and a footer.
- Fully responsive: the form grid stacks vertically on mobile.
- The form calls the backend (`POST /api/v1/trips` + `POST /api/v1/trips/{id}/generate`)
  and renders the returned AI itinerary.

## Run

```bash
# 1. Create a virtualenv and install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# 2. Start the API (Swagger UI at http://localhost:8000/docs)
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/kelana_ai \
BEDROCK_MODEL_ID=amazon.titan-text-express-v1 \
AWS_REGION=us-east-1 \
  uvicorn main:app --app-dir backend --reload

# 3. Start the frontend (http://localhost:3000)
cd frontend
npm install
npm run dev
```

## Roadmap

- [x] Trip Summary Generator (console, Python)
- [x] Recommendation Engine (console, Python)
- [x] REST API (FastAPI)
- [x] PostgreSQL persistence (SQLAlchemy CRUD)
- [x] Amazon Bedrock itinerary generation
- [x] Frontend homepage (Next.js + Tailwind)
- [ ] Trip planner backed by Amazon Bedrock
