import Image from "next/image";
import type { Metadata } from "next";
import { Search, CalendarCheck, Clapperboard, Upload, Sliders, Inbox, Banknote } from "lucide-react";
import { img, photo } from "@/data/images";
import { faqs } from "@/data/faq";
import { Button } from "@/components/ui/Button";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "How It Works — Gearly",
  description:
    "How renting and listing creative equipment on Gearly works — for creators and for gear owners.",
};

const creatorSteps = [
  { n: "01", icon: Search, title: "Find it", body: "Search Gearly by category, location and dates. Compare listings, specs, prices and owner ratings side by side until you find the right kit." },
  { n: "02", icon: CalendarCheck, title: "Book it", body: "Choose your rental dates and send a booking request straight to the owner. You won't be charged until they accept." },
  { n: "03", icon: Clapperboard, title: "Create", body: "Pick up or receive your equipment, shoot your project, and return it safely at the end of your rental period." },
];

const ownerSteps = [
  { n: "01", icon: Upload, title: "List your gear", body: "Add your equipment with photos, specifications and the accessories included." },
  { n: "02", icon: Sliders, title: "Set your availability", body: "Choose your daily rate, deposit and the dates your gear is free to rent." },
  { n: "03", icon: Inbox, title: "Accept bookings", body: "Review requests, message renters, and confirm the ones that work for you." },
  { n: "04", icon: Banknote, title: "Get paid", body: "Hand over the gear and get paid out for every completed rental." },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-28 lg:pt-36">
      {/* Header */}
      <section className="shell">
        <Reveal className="max-w-4xl">
          <SectionLabel className="mb-5">How It Works</SectionLabel>
          <h1 className="text-hero">From idea to equipment.</h1>
          <p className="mt-6 max-w-xl text-lg text-ink-secondary">
            Gearly connects creators who need equipment with owners who have gear
            to hire. Here&apos;s how both sides of the marketplace work.
          </p>
        </Reveal>
      </section>

      {/* Creators */}
      <section className="shell mt-20 lg:mt-28">
        <Reveal>
          <SectionLabel className="mb-4">For Creators</SectionLabel>
          <SectionHeading className="max-w-2xl">Rent the gear you need, when you need it.</SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {creatorSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06} className="rounded-card border border-line bg-surface-2 p-8">
              <div className="flex items-center justify-between">
                <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <span className="tnum text-sm text-ink-muted">{step.n}</span>
              </div>
              <h3 className="mt-6 text-2xl font-medium text-ink">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-secondary">{step.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button href="/browse" size="lg">Browse Gear</Button>
        </Reveal>
      </section>

      {/* Owners */}
      <section className="mt-20 border-y border-line bg-surface-2 py-20 lg:mt-28 lg:py-28">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative order-last aspect-[4/5] overflow-hidden rounded-card bg-surface-3 lg:order-first">
              <Image
                src={img(photo.photographer, 800)}
                alt={photo.photographer.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <SectionLabel className="mb-4">Own Gear?</SectionLabel>
              <h2 className="text-display">Turn your equipment into income.</h2>
              <p className="mt-6 max-w-lg text-ink-secondary">
                List gear you already own and earn whenever another creator hires
                it. You stay in control of pricing, availability and who you rent to.
              </p>
              <div className="mt-10 space-y-6">
                {ownerSteps.map((step) => (
                  <div key={step.n} className="flex gap-5 border-t border-line pt-6">
                    <span className="tnum shrink-0 text-sm text-accent">{step.n}</span>
                    <div>
                      <h3 className="text-lg font-medium text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm text-ink-secondary">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button href="/list-your-gear" size="lg" className="mt-10">List Your Gear</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell mt-20 lg:mt-28">
        <Reveal>
          <SectionLabel className="mb-4">FAQ</SectionLabel>
          <SectionHeading>Questions, answered.</SectionHeading>
        </Reveal>
        <Reveal delay={0.05} className="mt-10">
          <Accordion items={faqs} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative mt-20 overflow-hidden lg:mt-28">
        <Image src={img(photo.rigOnSet, 1280, undefined, 50)} alt={photo.rigOnSet.alt} fill loading="lazy" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-bg/80" />
        <div className="shell relative py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-display">Ready to make your next shot?</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/browse" size="lg">Browse Gear</Button>
              <Button href="/list-your-gear" size="lg" variant="secondary">List Your Gear</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
