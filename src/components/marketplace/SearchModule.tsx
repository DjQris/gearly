"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar } from "lucide-react";
import { cities } from "@/data/gear";
import { Button } from "@/components/ui/Button";

// Compact booking-style search: query + location + dates.
export function SearchModule() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (location) params.set("city", location);
    router.push(`/browse${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-card border border-line bg-surface-2/80 p-2 backdrop-blur-xl shadow-2xl shadow-black/40"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.6fr_1fr_1fr_auto]">
        {/* Query */}
        <label className="flex items-center gap-3 rounded bg-bg/60 px-4 py-3 md:py-0">
          <Search className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
          <span className="sr-only">What are you looking for?</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cameras, lenses, lighting, audio…"
            className="h-full w-full bg-transparent py-3 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none md:py-4"
          />
        </label>

        {/* Location */}
        <label className="flex items-center gap-3 rounded bg-bg/60 px-4 md:border-l md:border-line">
          <MapPin className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
          <span className="sr-only">Location</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-full w-full appearance-none bg-transparent py-3 text-[15px] text-ink focus:outline-none md:py-4"
          >
            <option value="" className="bg-surface-2">Any location</option>
            {cities.map((c) => (
              <option key={c} value={c} className="bg-surface-2">
                {c}
              </option>
            ))}
          </select>
        </label>

        {/* Dates */}
        <label className="flex items-center gap-3 rounded bg-bg/60 px-4 md:border-l md:border-line">
          <Calendar className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
          <span className="sr-only">Rental dates</span>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            placeholder="Rental dates"
            className="h-full w-full bg-transparent py-3 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none md:py-4"
          />
        </label>

        <Button type="submit" size="lg" className="md:h-auto md:px-8">
          Search
        </Button>
      </div>
    </form>
  );
}
