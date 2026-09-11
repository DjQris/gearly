"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { gear, brands, cities, formatNaira, type Availability, type Condition } from "@/data/gear";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";
import { GearCard } from "./GearCard";
import { SortSelect, type SortValue } from "./SortSelect";
import { Button } from "@/components/ui/Button";

const availabilityOptions: Availability[] = ["available", "limited", "unavailable"];
const availabilityLabels: Record<Availability, string> = {
  available: "Available",
  limited: "Limited",
  unavailable: "Unavailable",
};
const conditionOptions: Condition[] = ["New", "Like New", "Excellent", "Good"];
const PRICE_MIN = 5000;
const PRICE_MAX = 70000;

type Filters = {
  categories: string[];
  brands: string[];
  cities: string[];
  maxPrice: number;
  availability: Availability[];
  minRating: number;
  conditions: Condition[];
};

const emptyFilters: Filters = {
  categories: [],
  brands: [],
  cities: [],
  maxPrice: PRICE_MAX,
  availability: [],
  minRating: 0,
  conditions: [],
};

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function BrowseClient() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortValue>("recommended");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Seed from URL (?category= / ?q= / ?city=)
  useEffect(() => {
    const cat = params.get("category");
    const q = params.get("q");
    const city = params.get("city");
    setFilters((f) => ({
      ...f,
      categories: cat ? [cat] : f.categories,
      cities: city ? [city] : f.cities,
    }));
    if (q) setQuery(q);
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = gear.filter((g) => {
      if (q && !`${g.name} ${g.brand} ${g.categoryLabel}`.toLowerCase().includes(q)) return false;
      if (filters.categories.length && !filters.categories.includes(g.categorySlug)) return false;
      if (filters.brands.length && !filters.brands.includes(g.brand)) return false;
      if (filters.cities.length && !filters.cities.includes(g.city)) return false;
      if (g.price > filters.maxPrice) return false;
      if (filters.availability.length && !filters.availability.includes(g.availability)) return false;
      if (filters.minRating && g.rating < filters.minRating) return false;
      if (filters.conditions.length && !filters.conditions.includes(g.condition)) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].reverse();
        break;
    }
    return list;
  }, [query, filters, sort]);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.cities.length +
    filters.availability.length +
    filters.conditions.length +
    (filters.minRating ? 1 : 0) +
    (filters.maxPrice < PRICE_MAX ? 1 : 0);

  const filterBody = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.name}
            checked={filters.categories.includes(c.slug)}
            onChange={() => setFilters((f) => ({ ...f, categories: toggle(f.categories, c.slug) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price / day">
        <div className="px-1">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={1000}
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full accent-accent"
            aria-label="Maximum price per day"
          />
          <div className="mt-2 flex justify-between text-xs text-ink-muted">
            <span className="tnum">{formatNaira(PRICE_MIN)}</span>
            <span className="tnum text-ink">
              Up to {formatNaira(filters.maxPrice)}
              {filters.maxPrice >= PRICE_MAX ? "+" : ""}
            </span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => setFilters((f) => ({ ...f, brands: toggle(f.brands, b) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Location">
        {cities.map((c) => (
          <CheckRow
            key={c}
            label={c}
            checked={filters.cities.includes(c)}
            onChange={() => setFilters((f) => ({ ...f, cities: toggle(f.cities, c) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        {availabilityOptions.map((a) => (
          <CheckRow
            key={a}
            label={availabilityLabels[a]}
            checked={filters.availability.includes(a)}
            onChange={() => setFilters((f) => ({ ...f, availability: toggle(f.availability, a) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        {[4.5, 4, 0].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-3 py-1 text-sm text-ink-secondary hover:text-ink">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => setFilters((f) => ({ ...f, minRating: r }))}
              className="h-4 w-4 accent-accent"
            />
            {r === 0 ? "Any rating" : `${r}+ stars`}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Condition">
        {conditionOptions.map((c) => (
          <CheckRow
            key={c}
            label={c}
            checked={filters.conditions.includes(c)}
            onChange={() => setFilters((f) => ({ ...f, conditions: toggle(f.conditions, c) }))}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="shell pb-24 pt-28 lg:pt-36">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="label mb-4 inline-block">Browse Gear</span>
        <h1 className="text-display">Find the right gear for the job.</h1>
      </div>

      {/* Search bar */}
      <div className="mt-8 flex items-center gap-3 rounded border border-line bg-surface-2 px-4">
        <Search className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cameras, lenses, lighting, audio…"
          className="h-14 w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
          aria-label="Search gear"
        />
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-secondary">
          <span className="tnum text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "result" : "results"}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded border border-line bg-surface-2 px-4 text-sm text-ink lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
            Filters
            {activeCount > 0 && (
              <span className="tnum grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs text-bg">
                {activeCount}
              </span>
            )}
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-medium text-ink">Filters</h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters(emptyFilters)}
                  className="text-xs text-ink-muted transition-colors hover:text-accent"
                >
                  Clear all
                </button>
              )}
            </div>
            {filterBody}
          </div>
        </aside>

        {/* Results grid */}
        <div>
          {results.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item) => (
                <GearCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-card border border-dashed border-line py-24 text-center">
              <p className="text-lg text-ink">No gear matches your filters.</p>
              <p className="mt-2 text-sm text-ink-muted">
                Try widening your search or clearing a filter.
              </p>
              <Button onClick={() => { setFilters(emptyFilters); setQuery(""); }} variant="secondary" className="mt-6">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSheetOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-bg p-5">
            <div className="sticky -top-5 -mx-5 mb-4 flex items-center justify-between border-b border-line bg-bg px-5 py-4">
              <h2 className="text-lg font-medium text-ink">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            {filterBody}
            <div className="sticky bottom-0 -mx-5 mt-6 flex gap-3 border-t border-line bg-bg px-5 py-4">
              <Button variant="secondary" className="flex-1" onClick={() => setFilters(emptyFilters)}>
                Clear all
              </Button>
              <Button className="flex-1" onClick={() => setSheetOpen(false)}>
                Show {results.length} results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label mb-3">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 py-1 text-sm transition-colors",
        checked ? "text-ink" : "text-ink-secondary hover:text-ink"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-sm accent-accent"
      />
      {label}
    </label>
  );
}
