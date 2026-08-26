import json
import logging
import os

logger = logging.getLogger(__name__)

BEDROCK_MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "amazon.titan-text-express-v1")
BEDROCK_REGION = os.getenv("AWS_REGION", os.getenv("AWS_DEFAULT_REGION", "us-east-1"))


def build_prompt(trip):
    return f"""You are an expert travel planner. Create a detailed day-by-day itinerary for a trip with the following details:

- Destination: {trip.destination}
- Country: {trip.country}
- Duration: {trip.days} days
- Budget: {trip.budget:g} {trip.currency}
- Travel month: {trip.travel_month}
- Trip category: {trip.category}
- Season: {trip.season}

For EACH day of the trip, structure the plan into exactly three sections:

1. Morning: Provide exactly 2-3 specific morning activities.
2. Afternoon: Recommend cultural sites (museums, temples, historical landmarks) and authentic local experiences.
3. Evening: Suggest dinner spots (local restaurants, street food, or specific dishes) and nightlife/entertainment options.

Make every activity specific and actionable by naming real places, neighborhoods, or dishes. Format your answer as plain text, using exactly this structure for every day:

Day {{day}}: Exploring <area or theme>

Morning:
- <activity>
- <activity>

Afternoon:
- <activity>
- <activity>

Evening:
- <activity>
- <activity>
"""


def _sample_itinerary(trip):
    blocks = []
    for day in range(1, trip.days + 1):
        blocks.append(
            f"""Day {day}: Exploring {trip.destination}

Morning:
- Visit the most iconic landmark in {trip.destination} early to avoid the crowds.
- Take a leisurely stroll through the old town and stop by a traditional local bakery.
- Enjoy a cup of local coffee at a cozy neighborhood cafe.

Afternoon:
- Explore a must-see cultural site such as a museum, temple, or historical landmark.
- Experience an authentic local activity alongside residents to learn about the culture.

Evening:
- Enjoy dinner at a well-known local restaurant serving regional specialties.
- Experience the vibrant nightlife and city lights around the city center."""
        )
    return "\n\n".join(blocks)


def _invoke_bedrock(prompt):
    import boto3

    client = boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)

    if BEDROCK_MODEL_ID.startswith("anthropic"):
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2048,
            "messages": [{"role": "user", "content": prompt}],
        }
        response = client.invoke_model(
            modelId=BEDROCK_MODEL_ID,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body),
        )
        result = json.loads(response["body"].read())
        return result["content"][0]["text"]

    body = {
        "inputText": prompt,
        "textGenerationConfig": {
            "maxTokenCount": 2048,
            "temperature": 0.7,
            "topP": 0.9,
        },
    }
    response = client.invoke_model(
        modelId=BEDROCK_MODEL_ID,
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body),
    )
    result = json.loads(response["body"].read())
    return result["results"][0]["outputText"]


def generate_itinerary(trip):
    prompt = build_prompt(trip)
    try:
        return _invoke_bedrock(prompt)
    except Exception as exc:
        logger.warning(
            "Bedrock call failed for trip %s, returning sample itinerary: %s",
            getattr(trip, "id", "?"),
            exc,
        )
        return _sample_itinerary(trip)
