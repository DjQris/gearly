import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function RatingStars({
  rating,
  size = 14,
  showValue = true,
  reviews,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
  className?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5${reviews ? `, ${reviews} reviews` : ""}`}
    >
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.5}
            className={i < rounded ? "fill-accent text-accent" : "text-line"}
          />
        ))}
      </span>
      {showValue && (
        <span className="tnum text-sm text-ink">
          {rating.toFixed(1)}
          {reviews !== undefined && (
            <span className="text-ink-muted"> · {reviews}</span>
          )}
        </span>
      )}
    </span>
  );
}
