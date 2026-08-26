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
│       └── trip_service.py        # Business logic
└── frontend/
    └── .gitkeep
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

## Run

```bash
# 1. Create a virtualenv and install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# 2. Start the API (Swagger UI at http://localhost:8000/docs)
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/kelana_ai \
  uvicorn main:app --app-dir backend --reload
```

## Roadmap

- [x] Trip Summary Generator (console, Python)
- [x] Recommendation Engine (console, Python)
- [x] REST API (FastAPI)
- [x] PostgreSQL persistence (SQLAlchemy CRUD)
- [ ] Frontend (Next.js)
- [ ] Trip planner backed by Amazon Bedrock
