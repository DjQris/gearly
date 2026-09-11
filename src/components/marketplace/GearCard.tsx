import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { img } from "@/data/images";
import { formatNaira, type Gear } from "@/data/gear";
import { RatingStars } from "@/components/ui/RatingStars";
import { AvailabilityLabel } from "@/components/ui/AvailabilityLabel";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

export function GearCard({ item }: { item: Gear }) {
  return (
    <Link
      href={`/gear/${item.id}`}
      className="group block rounded-card focus-visible:outline-accent"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-3">
        <Image
          src={img(item.images[0], 700, 525)}
          alt={item.images[0].alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        <div className="absolute right-3 top-3">
          <FavoriteButton label={item.name} />
        </div>
        <div className="absolute left-3 top-3">
          <span className="rounded bg-bg/60 px-2 py-1 text-[10px] font-medium uppercase tracking-label text-ink backdrop-blur-md">
            {item.categoryLabel}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-medium leading-snug text-ink group-hover:text-white">
              {item.name}
            </h3>
            <p className="mt-0.5 text-sm text-ink-muted">{item.brand}</p>
          </div>
          <RatingStars rating={item.rating} showValue size={13} className="shrink-0 pt-0.5" />
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-ink-secondary">
          <MapPin className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
          {item.location}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <p className="text-ink">
            <span className="tnum text-lg font-semibold">
              {formatNaira(item.price)}
            </span>
            <span className="text-sm text-ink-muted"> / day</span>
          </p>
          <AvailabilityLabel status={item.availability} />
        </div>
      </div>
    </Link>
  );
}
