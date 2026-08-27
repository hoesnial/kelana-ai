"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TripCard from "@/components/TripCard";
import Footer from "@/components/footer";
import type { Trip } from "@/lib/trip";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const PAGE_SIZE = 10;

type Status = "loading" | "error" | "ready";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadTrips() {
      try {
        const res = await fetch(`${API_URL}/api/v1/trips`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: Trip[] = await res.json();
        if (!cancelled) {
          setTrips(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    loadTrips();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(trips.length / PAGE_SIZE));
  const visibleTrips = useMemo(
    () => trips.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [trips, page]
  );

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-white">
            Kelana<span className="text-teal-400">AI</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 sm:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/trips" className="text-white">
              Trip History
            </Link>
          </div>
          <Link
            href="/"
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            Plan New Trip
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Trip History
            </h1>
            <p className="mt-2 text-slate-500">
              All your planned journeys, saved in one place.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700"
          >
            + Plan a Trip
          </Link>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center">
            <p className="text-rose-700">
              Could not load your trips. Make sure the backend is running at{" "}
              <code className="rounded bg-rose-100 px-1.5 py-0.5">
                {API_URL}
              </code>
              .
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {status === "ready" && trips.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-16 text-center">
            <p className="text-3xl" aria-hidden="true">
              🧳
            </p>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No trips yet
            </h2>
            <p className="mt-2 text-slate-500">
              Start planning your first adventure to see it here.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Plan your first trip
            </Link>
          </div>
        )}

        {status === "ready" && trips.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        pageNumber === page
                          ? "bg-teal-600 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
