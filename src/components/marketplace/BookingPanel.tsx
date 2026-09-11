"use client";

import { useState } from "react";
import { Minus, Plus, MessageSquare, Check, ShieldCheck } from "lucide-react";
import { formatNaira, type Gear } from "@/data/gear";
import { AvailabilityLabel } from "@/components/ui/AvailabilityLabel";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";

export function BookingPanel({ item }: { item: Gear }) {
  const [days, setDays] = useState(1);
  const [checked, setChecked] = useState(false);
  const serviceFee = Math.round(item.price * days * 0.1);
  const subtotal = item.price * days;
  const total = subtotal + serviceFee;

  return (
    <div className="rounded-card border border-line bg-surface-2 p-6">
      <div className="flex items-end justify-between">
        <p className="text-ink">
          <span className="tnum text-2xl font-semibold">{formatNaira(item.price)}</span>
          <span className="text-ink-muted"> / day</span>
        </p>
        <RatingStars rating={item.rating} reviews={item.reviews} size={14} />
      </div>

      <div className="mt-4">
        <AvailabilityLabel status={item.availability} />
      </div>

      {/* Duration selector */}
      <div className="mt-6">
        <label className="label mb-2 block">Rental duration</label>
        <div className="flex items-center justify-between rounded border border-line bg-bg px-2 py-2">
          <button
            type="button"
            onClick={() => setDays((d) => Math.max(1, d - 1))}
            aria-label="Decrease days"
            className="grid h-9 w-9 place-items-center rounded text-ink transition-colors hover:bg-white/5 disabled:opacity-40"
            disabled={days <= 1}
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="tnum text-sm text-ink">
            {days} {days === 1 ? "day" : "days"}
          </span>
          <button
            type="button"
            onClick={() => setDays((d) => Math.min(30, d + 1))}
            aria-label="Increase days"
            className="grid h-9 w-9 place-items-center rounded text-ink transition-colors hover:bg-white/5"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Price breakdown */}
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between text-ink-secondary">
          <dt>
            {formatNaira(item.price)} × {days} {days === 1 ? "day" : "days"}
          </dt>
          <dd className="tnum text-ink">{formatNaira(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-secondary">
          <dt>Service fee</dt>
          <dd className="tnum text-ink">{formatNaira(serviceFee)}</dd>
        </div>
        <div className="flex justify-between text-ink-secondary">
          <dt>Refundable deposit</dt>
          <dd className="tnum text-ink">{formatNaira(item.deposit)}</dd>
        </div>
        <div className="mt-3 flex justify-between border-t border-line pt-3 text-base">
          <dt className="font-medium text-ink">Total</dt>
          <dd className="tnum font-semibold text-ink">{formatNaira(total)}</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3">
        <Button
          size="lg"
          className="w-full"
          onClick={() => setChecked(true)}
          disabled={item.availability === "unavailable"}
        >
          {checked ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2} /> Available for your dates
            </>
          ) : (
            "Check Availability"
          )}
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <MessageSquare className="h-4 w-4" strokeWidth={1.5} /> Message Owner
        </Button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
        You won&apos;t be charged until the owner accepts.
      </p>
    </div>
  );
}
