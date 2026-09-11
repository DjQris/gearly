"use client";

import { formatNaira } from "@/data/gear";
import { Button } from "@/components/ui/Button";

// Sticky booking bar shown on mobile equipment detail pages.
export function StickyMobileCTA({ price }: { price: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <p className="text-ink">
          <span className="tnum text-lg font-semibold">{formatNaira(price)}</span>
          <span className="text-sm text-ink-muted"> / day</span>
        </p>
        <Button size="md" className="px-8">
          Check Availability
        </Button>
      </div>
    </div>
  );
}
