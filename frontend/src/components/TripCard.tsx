import { countryToFlag, formatCurrency, type Trip } from "@/lib/trip";

const CATEGORY_STYLES: Record<string, string> = {
  Backpacker: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Standard: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Luxury: "bg-violet-50 text-violet-700 ring-violet-600/20",
};

const CATEGORY_ICONS: Record<string, string> = {
  Backpacker: "🎒",
  Standard: "🧳",
  Luxury: "💎",
};

const STYLE_STYLES: Record<string, string> = {
  Family: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Solo: "bg-teal-50 text-teal-700 ring-teal-600/20",
  Couple: "bg-pink-50 text-pink-700 ring-pink-600/20",
};

const STYLE_ICONS: Record<string, string> = {
  Family: "👨‍👩‍👧",
  Solo: "🧑‍💼",
  Couple: "💑",
};

function badgeClass(styles: Record<string, string>, key: string): string {
  return styles[key] ?? "bg-slate-50 text-slate-700 ring-slate-600/20";
}

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl ring-1 ring-slate-200"
            role="img"
            aria-label={`Flag of ${trip.country}`}
          >
            {countryToFlag(trip.country)}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {trip.destination}
            </h3>
            <p className="text-sm text-slate-500">{trip.country}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(trip.budget, trip.currency)}
          </p>
          <p className="text-xs text-slate-400">total budget</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass(
            CATEGORY_STYLES,
            trip.category
          )}`}
        >
          <span aria-hidden="true">{CATEGORY_ICONS[trip.category] ?? "📍"}</span>
          {trip.category}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass(
            STYLE_STYLES,
            trip.travel_style
          )}`}
        >
          <span aria-hidden="true">{STYLE_ICONS[trip.travel_style] ?? "✨"}</span>
          {trip.travel_style}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 text-center">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Days
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">
            {trip.days}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Month
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">
            {trip.travel_month}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Daily
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">
            {formatCurrency(trip.daily_budget, trip.currency)}
          </dd>
        </div>
      </dl>

      {trip.ai_recommendation ? (
        <details className="group mt-5">
          <summary className="cursor-pointer list-none text-sm font-semibold text-teal-600 transition hover:text-teal-700">
            <span className="group-open:hidden">View itinerary ▾</span>
            <span className="hidden group-open:inline">Hide itinerary ▴</span>
          </summary>
          <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
            {trip.ai_recommendation}
          </pre>
        </details>
      ) : (
        <p className="mt-5 text-xs italic text-slate-400">
          No itinerary generated yet.
        </p>
      )}
    </article>
  );
}
