from typing import Optional

from pydantic import BaseModel, ConfigDict


class TripCreate(BaseModel):
    destination: str
    country: str
    days: int
    budget: float
    currency: str
    travel_month: str


class TripUpdate(BaseModel):
    budget: float


class TripResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    destination: str
    country: str
    days: int
    budget: float
    currency: str
    travel_month: str
    category: str
    daily_budget: float
    season: str
    ai_recommendation: Optional[str] = None
