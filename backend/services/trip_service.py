def get_trip_category(budget):
    if budget < 1000:
        return "Backpacker"
    elif budget <= 3000:
        return "Standard"
    else:
        return "Luxury"


def get_travel_season(travel_month):
    month = travel_month.lower()
    if month == "december":
        return "Peak Season"
    elif month == "june":
        return "Holiday Season"
    else:
        return "Regular Season"


def calculate_daily_budget(budget, days):
    return budget / days


def get_recommended_places():
    return [
        "Tokyo Tower",
        "Shibuya",
        "Mount Fuji",
    ]
