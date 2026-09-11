import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ChevronRight,
  MapPin,
  Truck,
  Wallet,
  CalendarX,
  Clock,
  BadgeCheck,
  Check,
} from "lucide-react";
import { gear, gearById, formatNaira } from "@/data/gear";
import { ownerById } from "@/data/owners";
import { reviews } from "@/data/reviews";
import { img } from "@/data/images";
import { RatingStars } from "@/components/ui/RatingStars";
import { AvailabilityLabel } from "@/components/ui/AvailabilityLabel";
import { GearGallery } from "@/components/marketplace/GearGallery";
import { BookingPanel } from "@/components/marketplace/BookingPanel";
import { StickyMobileCTA } from "@/components/marketplace/StickyMobileCTA";
import { GearCard } from "@/components/marketplace/GearCard";

export function generateStaticParams() {
  return gear.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = gearById(id);
  if (!item) return { title: "Gear not found — Gearly" };
  return {
    title: `${item.name} — ${formatNaira(item.price)}/day — Gearly`,
    description: item.description,
  };
}

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = gearById(id);
  if (!item) notFound();

  const owner = ownerById(item.ownerId);
  const related = gear
    .filter((g) => g.categorySlug === item.categorySlug && g.id !== item.id)
    .slice(0, 3);

  return (
    <div className="pb-28 pt-24 lg:pb-24 lg:pt-32">
      <div className="shell">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-ink-muted" aria-label="Breadcrumb">
          <Link href="/browse" className="transition-colors hover:text-ink">Browse</Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          <Link href={`/browse?category=${item.categorySlug}`} className="transition-colors hover:text-ink">
            {item.categoryLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="truncate text-ink-secondary">{item.name}</span>
        </nav>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label mb-3 inline-block">{item.categoryLabel}</span>
            <h1 className="text-display max-w-3xl">{item.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-secondary">
              <span className="text-ink">{item.brand}</span>
              <RatingStars rating={item.rating} reviews={item.reviews} size={14} />
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                {item.location}
              </span>
              <AvailabilityLabel status={item.availability} />
            </div>
          </div>
          <p className="shrink-0 text-ink">
            <span className="tnum text-3xl font-semibold">{formatNaira(item.price)}</span>
            <span className="text-ink-muted"> / day</span>
          </p>
        </div>

        {/* Main grid */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div className="min-w-0">
            <GearGallery images={item.images} />

            {/* Mobile booking */}
            <div className="mt-8 lg:hidden">
              <BookingPanel item={item} />
            </div>

            {/* Description */}
            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">About this gear</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
                {item.description}
              </p>
            </section>

            {/* Specs */}
            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">Equipment details</h2>
              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                {item.specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 bg-bg px-5 py-4">
                    <dt className="text-sm text-ink-muted">{s.label}</dt>
                    <dd className="text-right text-sm text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Included */}
            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">What&apos;s included</h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {item.included.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 text-ink-secondary">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
            </section>

            {/* Owner */}
            {owner && (
              <section className="mt-12">
                <h2 className="text-2xl font-medium text-ink">Meet the owner</h2>
                <div className="mt-6 flex flex-col gap-6 rounded-card border border-line bg-surface-2 p-6 sm:flex-row sm:items-center">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-surface-3">
                    <Image
                      src={img(owner.avatar, 200, 200)}
                      alt={owner.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium text-ink">{owner.name}</p>
                      {owner.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
                          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {owner.location} · Member since {owner.memberSince}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span className="flex items-center gap-1.5 text-ink-secondary">
                        <RatingStars rating={owner.rating} showValue size={13} />
                      </span>
                      <span className="tnum text-ink-secondary">{owner.rentals} rentals</span>
                      <span className="text-ink-secondary">Responds {owner.responseTime}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Rental information */}
            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">Rental information</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <RentalInfo icon={MapPin} title="Pickup location" body={item.location} />
                <RentalInfo
                  icon={Truck}
                  title="Delivery"
                  body={item.delivery ? "Delivery available within the owner's city" : "Pickup only"}
                />
                <RentalInfo icon={Wallet} title="Deposit" body={`${formatNaira(item.deposit)} refundable`} />
                <RentalInfo
                  icon={CalendarX}
                  title="Cancellation"
                  body="Free cancellation up to 48 hours before the rental starts."
                />
                <RentalInfo
                  icon={Clock}
                  title="Late returns"
                  body="A per-day late fee applies for returns after the agreed time."
                />
                <RentalInfo
                  icon={BadgeCheck}
                  title="Condition"
                  body={`${item.condition} — inspected before each rental.`}
                />
              </div>
            </section>

            {/* Reviews */}
            <section className="mt-12">
              <h2 className="text-2xl font-medium text-ink">Reviews</h2>
              <div className="mt-6 flex items-center gap-6 rounded-card border border-line bg-surface-2 p-6">
                <div className="text-center">
                  <div className="tnum text-5xl font-semibold text-ink">{item.rating.toFixed(1)}</div>
                  <RatingStars rating={item.rating} showValue={false} size={14} className="mt-2 justify-center" />
                  <p className="mt-2 text-xs text-ink-muted">{item.reviews} reviews</p>
                </div>
                <p className="text-sm leading-relaxed text-ink-secondary">
                  Renters consistently rate this listing for accurate descriptions,
                  clean equipment and smooth handover.
                </p>
              </div>

              <ul className="mt-6 space-y-6">
                {reviews.map((r) => (
                  <li key={r.id} className="border-b border-line pb-6 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-surface-3">
                        <Image src={img(r.avatar, 100, 100)} alt={r.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">{r.name}</p>
                        <p className="text-xs text-ink-muted">{r.date}</p>
                      </div>
                      <RatingStars rating={r.rating} showValue={false} size={12} className="ml-auto" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{r.body}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column — desktop booking */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingPanel item={item} />
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-16">
            <h2 className="text-2xl font-medium text-ink">More {item.categoryLabel.toLowerCase()}s</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <GearCard key={g.id} item={g} />
              ))}
            </div>
          </section>
        )}
      </div>

      <StickyMobileCTA price={item.price} />
    </div>
  );
}

function RentalInfo({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-card border border-line bg-surface-2 p-5">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-secondary">{body}</p>
      </div>
    </div>
  );
}
