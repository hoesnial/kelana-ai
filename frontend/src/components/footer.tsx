const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Plan a Trip", href: "#plan" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#about" },
];

const RESOURCES = [
  { label: "API Docs", href: "http://localhost:8000/docs" },
  { label: "GitHub", href: "https://github.com/hoesnial/kelana-ai" },
  { label: "Amazon Bedrock", href: "https://aws.amazon.com/bedrock/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="text-xl font-bold text-white">
              Kelana<span className="text-teal-400">AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Your AI travel companion. Plan smarter trips with personalized
              itineraries powered by Amazon Bedrock.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-teal-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              {RESOURCES.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition hover:text-teal-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {year} KelanaAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
