export type Trip = {
  id: number;
  destination: string;
  country: string;
  days: number;
  budget: number;
  currency: string;
  travel_month: string;
  travel_style: string;
  category: string;
  daily_budget: number;
  season: string;
  ai_recommendation: string | null;
};

const COUNTRY_CODES: Record<string, string> = {
  australia: "au",
  brazil: "br",
  canada: "ca",
  china: "cn",
  france: "fr",
  germany: "de",
  greece: "gr",
  india: "in",
  indonesia: "id",
  italy: "it",
  japan: "jp",
  korea: "kr",
  "south korea": "kr",
  malaysia: "my",
  mexico: "mx",
  netherlands: "nl",
  "new zealand": "nz",
  portugal: "pt",
  singapore: "sg",
  spain: "es",
  switzerland: "ch",
  thailand: "th",
  turkey: "tr",
  uk: "gb",
  "united kingdom": "gb",
  us: "us",
  usa: "us",
  "united states": "us",
  vietnam: "vn",
};

export function countryToFlag(country: string): string {
  const code = COUNTRY_CODES[country.trim().toLowerCase()];
  if (!code) return "🌍";
  return code
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

export function formatCurrency(budget: number, currency: string): string {
  const hasDecimals = Math.round(budget) !== budget;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(budget);
  return `${currency} ${formatted}`;
}
