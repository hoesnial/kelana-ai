# KelanaAI

AI Travel Planner — build with Python, Next.js & Amazon Bedrock.

## Structure

```
kelana-ai/
├── README.md
├── backend/
│   ├── main.py                    # Presentation layer (console app)
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

## Run

```bash
python3 backend/main.py
```

## Roadmap

- [x] Trip Summary Generator (console, Python)
- [x] Recommendation Engine (console, Python)
- [ ] Frontend (Next.js)
- [ ] Trip planner backed by Amazon Bedrock
