"use client";

import { ChevronDown } from "lucide-react";

export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest Listings" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortValue;
  onChange: (v: SortValue) => void;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="h-11 cursor-pointer appearance-none rounded border border-line bg-surface-2 pl-4 pr-10 text-sm text-ink focus:outline-none focus-visible:outline-accent"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface-2">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 h-4 w-4 text-ink-muted"
        strokeWidth={1.5}
      />
    </label>
  );
}
