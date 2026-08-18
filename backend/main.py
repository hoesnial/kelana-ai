from fastapi import FastAPI
from fastapi.responses import JSONResponse
from services.trip_service import (
    get_trip_category,
    get_travel_season,
    calculate_daily_budget,
    get_recommended_places,
)

app = FastAPI()


@app.get("/api/v1/recommendations")
async def recommendations():
    return ["Tokyo Tower", "Mount Fuji", "Shibuya"]


@app.get("/api/v1/transportations")
async def transportations():
    return ["Bus", "Train", "Flight"]
