import Image from "next/image";
import type { Metadata } from "next";
import { Banknote, SlidersHorizontal, ShieldCheck, Users, Upload, CalendarRange, Inbox, Wallet } from "lucide-react";
import { img, photo } from "@/data/images";
import { gear, formatNaira } from "@/data/gear";
import { faqs } from "@/data/faq";
import { Button } from "@/components/ui/Button";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "List Your Gear — Gearly",
  description:
    "List your cameras, lenses, lighting and production equipment on Gearly and earn whenever another creator hires them.",
};

const values = [
  { icon: Banknote, title: "Earn on your terms", body: "Set your own daily rate and deposit. Your gear earns whenever it would otherwise sit unused." },
  { icon: SlidersHorizontal, title: "You stay in control", body: "Choose your availability, approve every booking, and decide who you rent to." },
  { icon: Users, title: "Verified renters", body: "Rent to creators with verified profiles, ratings and rental history." },
  { icon: ShieldCheck, title: "Protected rentals", body: "Clear deposits and rental conditions on every listing, agreed before handover." },
];

const steps = [
  { n: "01", icon: Upload, title: "List your gear", body: "Add photos, specs and the accessories included." },
  { n: "02", icon: CalendarRange, title: "Set availability", body: "Your daily rate, deposit and free dates." },
  { n: "03", icon: Inbox, title: "Accept bookings", body: "Review and confirm requests that suit you." },
  { n: "04", icon: Wallet, title: "Get paid", body: "Paid out for every completed rental." },
];

// Illustrative monthly earning potential (~12 rental days a month).
const examples = gear.filter((g) => ["sony-fx6", "aputure-600d", "dji-mavic3", "dji-rs4"].includes(g.id));

export default function ListYourGearPage() {
  return (
    <div className="pt-24 lg:pt-0">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden lg:min-h-[88vh]">
        <Image src={img(photo.creatorUrban, 2000)} alt="A creator with their production equipment" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 to-transparent" />
        <div className="shell relative w-full pb-16 pt-24 lg:pb-24">
          <div className="max-w-3xl">
            <SectionLabel className="mb-6">For Owners</SectionLabel>
            <h1 className="text-hero">Your gear could be working.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-secondary">
              Have cameras, lenses, lighting, audio equipment or production gear
              sitting unused? List them on Gearly and earn whenever another
              creator hires them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#" size="lg">Start Listing</Button>
              <Button href="/how-it-works" size="lg" variant="secondary">How Owner Rentals Work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionLabel className="mb-4">Why List on Gearly</SectionLabel>
          <SectionHeading className="max-w-2xl">Make your equipment earn its keep.</SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 4) * 0.05} className="rounded-card border border-line bg-surface-2 p-7">
              <v.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-medium text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Earnings */}
      <section className="border-y border-line bg-surface-2 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel className="mb-4">Earning Potential</SectionLabel>
            <SectionHeading className="max-w-2xl">See what your gear could earn.</SectionHeading>
            <p className="mt-4 text-ink-secondary">Estimates based on roughly 12 rental days a month.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((g, i) => (
              <Reveal key={g.id} delay={(i % 4) * 0.05} className="overflow-hidden rounded-card border border-line bg-bg">
                <div className="relative aspect-[4/3] bg-surface-3">
                  <Image src={img(g.images[0], 500, 375)} alt={g.images[0].alt} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="truncate text-sm font-medium text-ink">{g.name}</p>
                  <p className="mt-1 text-xs text-ink-muted">{formatNaira(g.price)} / day</p>
                  <p className="tnum mt-4 text-2xl font-semibold text-accent">
                    {formatNaira(g.price * 12)}
                  </p>
                  <p className="text-xs text-ink-muted">est. / month</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-ink-muted">* Illustrative estimates for design purposes, not guaranteed earnings.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionLabel className="mb-4">How It Works</SectionLabel>
          <SectionHeading className="max-w-2xl">List in minutes. Earn for years.</SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={(i % 4) * 0.05}>
              <div className="flex items-center justify-between">
                <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <span className="tnum text-sm text-ink-muted">{step.n}</span>
              </div>
              <h3 className="mt-5 text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="shell pb-20 lg:pb-28">
        <Reveal>
          <SectionLabel className="mb-4">FAQ</SectionLabel>
          <SectionHeading>Owner questions, answered.</SectionHeading>
        </Reveal>
        <Reveal delay={0.05} className="mt-10">
          <Accordion items={faqs.slice(2, 8)} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src={img(photo.setBlue, 2000)} alt={photo.setBlue.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-bg/85" />
        <div className="shell relative py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-display">Start earning from your gear today.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/#" size="lg">Start Listing</Button>
              <Button href="/browse" size="lg" variant="secondary">Browse Gear</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
