"use client";

import { useState } from "react";

type FormState = {
  destination: string;
  country: string;
  days: string;
  budget: string;
  currency: string;
  travel_month: string;
  travel_style: string;
};

const INITIAL_STATE: FormState = {
  destination: "",
  country: "",
  days: "",
  budget: "",
  currency: "USD",
  travel_month: "",
  travel_style: "Solo",
};

const CURRENCIES = ["USD", "IDR", "EUR", "JPY", "SGD", "MYR"];
const TRAVEL_STYLES = ["Solo", "Couple", "Family"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30";
const labelClasses = "mb-1.5 block text-sm font-medium text-slate-700";

export default function TripForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<string | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    try {
      const payload = {
        destination: form.destination,
        country: form.country,
        days: Number(form.days),
        budget: Number(form.budget),
        currency: form.currency,
        travel_month: form.travel_month,
        travel_style: form.travel_style,
      };

      const createRes = await fetch(`${apiUrl}/api/v1/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create trip. Please check your input.");
      }

      const trip = await createRes.json();
      const generateRes = await fetch(
        `${apiUrl}/api/v1/trips/${trip.id}/generate`,
        { method: "POST" }
      );

      if (!generateRes.ok) {
        throw new Error("Failed to generate itinerary. Please try again.");
      }

      const result = await generateRes.json();
      setItinerary(result.ai_recommendation ?? "No itinerary returned.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 lg:col-span-2 lg:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">
          Plan your trip
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Tell us where you want to go and let KelanaAI handle the rest.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="destination" className={labelClasses}>
              Destination
            </label>
            <input
              id="destination"
              type="text"
              required
              placeholder="e.g. Tokyo"
              value={form.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="country" className={labelClasses}>
              Country
            </label>
            <input
              id="country"
              type="text"
              required
              placeholder="e.g. Japan"
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="days" className={labelClasses}>
              Days
            </label>
            <input
              id="days"
              type="number"
              required
              min={1}
              placeholder="5"
              value={form.days}
              onChange={(e) => updateField("days", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="budget" className={labelClasses}>
              Budget
            </label>
            <input
              id="budget"
              type="number"
              required
              min={0}
              step="any"
              placeholder="1500"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="currency" className={labelClasses}>
              Currency
            </label>
            <select
              id="currency"
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
              className={inputClasses}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="travel_month" className={labelClasses}>
              Travel Month
            </label>
            <select
              id="travel_month"
              required
              value={form.travel_month}
              onChange={(e) => updateField("travel_month", e.target.value)}
              className={inputClasses}
            >
              <option value="" disabled>
                Select month
              </option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="travel_style" className={labelClasses}>
              Travel Style
            </label>
            <select
              id="travel_style"
              value={form.travel_style}
              onChange={(e) => updateField("travel_style", e.target.value)}
              className={inputClasses}
            >
              {TRAVEL_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating itinerary…" : "Generate itinerary"}
        </button>

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
      </form>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-3 lg:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Your AI itinerary
        </h3>
        {itinerary ? (
          <pre className="mt-4 flex-1 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm">
            {itinerary}
          </pre>
        ) : (
          <div className="mt-4 flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
            Fill in the form and hit &ldquo;Generate itinerary&rdquo; to see your
            personalized day-by-day plan here.
          </div>
        )}
      </div>
    </div>
  );
}
