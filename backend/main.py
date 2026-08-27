from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Trip
from schemas import TripCreate, TripResponse, TripUpdate
from services.bedrock_service import generate_itinerary
from services.trip_service import (
    calculate_daily_budget,
    get_recommended_places,
    get_travel_season,
    get_trip_category,
)

Base.metadata.create_all(bind=engine)
with engine.begin() as conn:
    conn.execute(
        text("ALTER TABLE trips ADD COLUMN IF NOT EXISTS ai_recommendation TEXT")
    )
    conn.execute(
        text(
            "ALTER TABLE trips ADD COLUMN IF NOT EXISTS travel_style "
            "VARCHAR NOT NULL DEFAULT 'Solo'"
        )
    )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/recommendations")
async def recommendations():
    return ["Tokyo Tower", "Mount Fuji", "Shibuya"]


@app.get("/api/v1/transportations")
async def transportations():
    return ["Bus", "Train", "Flight"]


@app.post("/api/v1/trips", response_model=TripResponse, status_code=201)
async def create_trip(payload: TripCreate, db: Session = Depends(get_db)):
    trip = Trip(
        destination=payload.destination,
        country=payload.country,
        days=payload.days,
        budget=payload.budget,
        currency=payload.currency,
        travel_month=payload.travel_month,
        travel_style=payload.travel_style,
        category=get_trip_category(payload.budget),
        daily_budget=calculate_daily_budget(payload.budget, payload.days),
        season=get_travel_season(payload.travel_month),
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip


@app.get("/api/v1/trips", response_model=list[TripResponse])
async def list_trips(db: Session = Depends(get_db)):
    return db.query(Trip).all()


@app.get("/api/v1/trips/{trip_id}", response_model=TripResponse)
async def get_trip(trip_id: int, db: Session = Depends(get_db)):
    trip = db.get(Trip, trip_id)
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@app.put("/api/v1/trips/{trip_id}", response_model=TripResponse)
async def update_trip(trip_id: int, payload: TripUpdate, db: Session = Depends(get_db)):
    trip = db.get(Trip, trip_id)
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")

    trip.budget = payload.budget
    trip.category = get_trip_category(payload.budget)
    trip.daily_budget = calculate_daily_budget(payload.budget, trip.days)

    db.commit()
    db.refresh(trip)
    return trip


@app.delete("/api/v1/trips/{trip_id}", status_code=204)
async def delete_trip(trip_id: int, db: Session = Depends(get_db)):
    trip = db.get(Trip, trip_id)
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")

    db.delete(trip)
    db.commit()
    return None


@app.post("/api/v1/trips/{trip_id}/generate", response_model=TripResponse)
async def generate_trip_itinerary(trip_id: int, db: Session = Depends(get_db)):
    trip = db.get(Trip, trip_id)
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")

    trip.ai_recommendation = generate_itinerary(trip)
    db.commit()
    db.refresh(trip)
    return trip
