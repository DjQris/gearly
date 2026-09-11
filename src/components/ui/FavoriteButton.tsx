"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

export function FavoriteButton({
  label = "gear",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive((v) => !v);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-bg/50 backdrop-blur-md transition-all duration-200 hover:bg-bg/70 active:scale-90",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          active ? "fill-accent text-accent scale-110" : "text-ink"
        )}
        strokeWidth={1.5}
      />
    </button>
  );
}
