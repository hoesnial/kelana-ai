from services.trip_service import (
    get_trip_category,
    get_travel_season,
    calculate_daily_budget,
    get_recommended_places,
)


def main():
    destination = input("Destination: ")
    country = input("Country: ")
    days = int(input("Days: "))
    budget = float(input("Budget: "))
    currency = input("Currency: ")
    travel_month = input("Travel Month: ")

    category = get_trip_category(budget)
    season = get_travel_season(travel_month)
    daily_budget = calculate_daily_budget(budget, days)
    recommended_places = get_recommended_places()

    print("============================")
    print("KelanaAI")
    print("============================")
    print(f"Destination  : {destination}")
    print(f"Country      : {country}")
    print(f"Days         : {days}")
    print(f"Budget       : {budget:g} {currency}")
    print(f"Category     : {category}")
    print(f"Daily Budget : {daily_budget:g} {currency}/Day")
    print(f"Travel Month : {travel_month}")
    print(f"Season       : {season}")
    print()
    print("Recommended Places")
    for place in recommended_places:
        print(f"- {place}")


if __name__ == "__main__":
    main()
