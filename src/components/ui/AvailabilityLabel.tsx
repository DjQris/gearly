import { cn } from "@/lib/cn";
import type { Availability } from "@/data/gear";

const config: Record<
  Availability,
  { label: string; dot: string; text: string }
> = {
  available: { label: "Available", dot: "bg-accent", text: "text-ink" },
  limited: {
    label: "Limited availability",
    dot: "bg-amber-400",
    text: "text-ink",
  },
  unavailable: {
    label: "Unavailable",
    dot: "bg-ink-muted",
    text: "text-ink-muted",
  },
};

// Availability is conveyed with both a text label and a dot — never colour alone.
export function AvailabilityLabel({
  status,
  className,
}: {
  status: Availability;
  className?: string;
}) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium",
        c.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} aria-hidden />
      {c.label}
    </span>
  );
}
