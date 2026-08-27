import Image from "next/image";
import Footer from "@/components/footer";
import TripForm from "@/components/trip-form";

const DESTINATIONS = [
  {
    name: "Tokyo",
    country: "Japan",
    image: "/tokyo.jpg",
    tag: "City & Culture",
  },
  {
    name: "Paris",
    country: "France",
    image: "/paris.jpg",
    tag: "Romance & Art",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/bali.jpg",
    tag: "Beach & Serenity",
  },
];

const FEATURES = [
  {
    title: "AI-Generated Itineraries",
    description:
      "Personalized day-by-day plans with morning, afternoon, and evening activities.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Smart Budgeting",
    description:
      "Get trip categories and daily budget breakdowns tailored to your wallet.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Local Experiences",
    description:
      "Cultural sites, hidden gems, and authentic recommendations for every trip.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold text-white">
            Kelana<span className="text-teal-400">AI</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 sm:flex">
            <a href="#plan" className="transition hover:text-white">
              Plan a Trip
            </a>
            <a href="#destinations" className="transition hover:text-white">
              Destinations
            </a>
            <a href="/trips" className="transition hover:text-white">
              Trip History
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>
          <a
            href="#plan"
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Scenic view of a travel destination at dusk"
            fill
            preload
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
              AI-Powered Travel Planning
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Plan your dream trip in minutes
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              KelanaAI builds personalized day-by-day itineraries — from morning
              adventures to the best dinner spots — powered by Amazon Bedrock.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#plan"
                className="w-full rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-500 sm:w-auto"
              >
                Start Planning
              </a>
              <a
                href="#destinations"
                className="w-full rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
              >
                Explore Destinations
              </a>
            </div>
          </div>
        </section>

        <section id="plan" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Build your perfect itinerary
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Enter your trip details and get a structured, AI-generated plan in
              seconds.
            </p>
          </div>
          <TripForm />
        </section>

        <section id="destinations" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Popular destinations
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                Hand-picked places our travelers love the most.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DESTINATIONS.map((destination) => (
                <article
                  key={destination.name}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`${destination.name}, ${destination.country}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      {destination.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-slate-500">{destination.country}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Why travel with KelanaAI
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Everything you need to plan a memorable journey, in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
