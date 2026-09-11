import Image from "next/image";
import { ShieldCheck, Lock, FileText, Star, PackageCheck } from "lucide-react";
import { img, photo } from "@/data/images";
import { categories } from "@/data/categories";
import { featuredGear } from "@/data/gear";
import { testimonials } from "@/data/testimonials";
import { stats } from "@/data/stats";
import { faqs } from "@/data/faq";
import { Button } from "@/components/ui/Button";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RatingStars } from "@/components/ui/RatingStars";
import { CountUp } from "@/components/ui/CountUp";
import { Accordion } from "@/components/ui/Accordion";
import { SearchModule } from "@/components/marketplace/SearchModule";
import { CategoryTile } from "@/components/marketplace/CategoryTile";
import { GearCard } from "@/components/marketplace/GearCard";

const creatorSteps = [
  { n: "01", title: "Find it", body: "Search Gearly for the equipment you need, filtered by category, location and dates." },
  { n: "02", title: "Book it", body: "Choose your dates and book directly from the owner in a few taps." },
  { n: "03", title: "Create", body: "Pick up or receive your equipment and get to work on your next project." },
];

const ownerSteps = [
  { n: "01", title: "List your gear" },
  { n: "02", title: "Set your availability" },
  { n: "03", title: "Accept bookings" },
  { n: "04", title: "Get paid" },
];

const trust = [
  { icon: ShieldCheck, title: "Verified owners", body: "Identity and profile verification before any listing goes live." },
  { icon: Lock, title: "Secure bookings", body: "Every rental transaction is kept organised and protected in one place." },
  { icon: FileText, title: "Transparent listings", body: "Clear pricing, full equipment details, availability and rental conditions." },
  { icon: Star, title: "Reviews", body: "See what other creators experienced before you book." },
  { icon: PackageCheck, title: "Equipment protection", body: "Deposits, responsibility and protection policies stated plainly on every listing." },
];

export default function HomePage() {
  return (
    <>
      {/* ————————————————————————— HERO ————————————————————————— */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src={img(photo.camNeon, 1600, undefined, 72)}
          alt={photo.camNeon.alt}
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover object-[18%_center] motion-reduce:animate-none"
        />
        {/* Lighter overlays so the camera reads on the right; left stays dark for text */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0A0A0A_0%,rgba(10,10,10,0.45)_45%,rgba(10,10,10,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0A0A0A_0%,rgba(10,10,10,0.55)_40%,transparent_75%)]" />

        <div className="shell relative w-full pb-12 pt-40 lg:pb-20 lg:pt-48">
          <div className="max-w-4xl">
            <SectionLabel className="mb-6 animate-fade-up">Rent the gear. Make the work.</SectionLabel>
            <h1 className="text-hero animate-fade-up [animation-delay:90ms]">
              The gear behind
              <br />
              your next shot.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-secondary animate-fade-up [animation-delay:180ms]">
              Discover and hire professional cameras, lenses, lighting and
              production equipment from creators near you — available exactly
              when you need it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:270ms]">
              <Button href="/browse" size="lg">
                Browse Gear
              </Button>
              <Button href="/list-your-gear" size="lg" variant="secondary">
                List Your Gear
              </Button>
            </div>
          </div>

          <div className="mt-10 max-w-4xl animate-fade-up [animation-delay:360ms] lg:mt-14">
            <SearchModule />
          </div>
        </div>
      </section>

      {/* ————————————————————————— CATEGORIES ————————————————————————— */}
      <section id="categories" className="scroll-mt-20 py-20 lg:py-28">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel className="mb-4">Explore Gear</SectionLabel>
              <SectionHeading className="max-w-2xl">
                Everything you need to make the shot.
              </SectionHeading>
            </div>
            <Button href="/browse" variant="tertiary" withArrow className="mb-1">
              View all gear
            </Button>
          </Reveal>

          {/* Horizontal scroll on mobile, grid on larger screens */}
          <Reveal
            delay={0.05}
            className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5"
          >
            {categories.map((c) => (
              <CategoryTile
                key={c.slug}
                category={c}
                className="w-[60%] shrink-0 snap-start sm:w-[42%] md:w-auto"
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ————————————————————————— FEATURED GEAR ————————————————————————— */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel className="mb-4">Featured Gear</SectionLabel>
              <SectionHeading className="max-w-2xl">
                Popular equipment, ready when you are.
              </SectionHeading>
            </div>
            <Button href="/browse" variant="tertiary" withArrow className="mb-1">
              View all gear
            </Button>
          </Reveal>

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGear.slice(0, 6).map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.05}>
                <GearCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————————————— HOW IT WORKS ————————————————————————— */}
      <section className="border-y border-line bg-surface-2 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel className="mb-4">How It Works</SectionLabel>
            <SectionHeading className="max-w-2xl">
              From idea to equipment.
            </SectionHeading>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {creatorSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="tnum text-sm text-accent">{step.n}</div>
                <h3 className="mt-4 text-2xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-ink-secondary leading-relaxed">{step.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Owner path */}
          <Reveal className="mt-16 rounded-card border border-line bg-bg p-8 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <SectionLabel className="mb-4">Own Gear?</SectionLabel>
                <h3 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
                  Turn your equipment into income.
                </h3>
              </div>
              <Button href="/list-your-gear" size="lg" className="shrink-0">
                List Your Gear
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {ownerSteps.map((step) => (
                <div key={step.n} className="border-t border-line pt-4">
                  <div className="tnum text-sm text-accent">{step.n}</div>
                  <p className="mt-2 font-medium text-ink">{step.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————————————————— GEAR OWNER FEATURE ————————————————————————— */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-3 sm:aspect-[3/2] lg:aspect-[4/5]">
              <Image
                src={img(photo.creatorUrban, 800)}
                alt="A creative professional surrounded by their production equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <SectionLabel className="mb-5">For Owners</SectionLabel>
              <h2 className="text-display">Your gear could be working.</h2>
              <p className="mt-6 max-w-lg text-lg text-ink-secondary">
                Have cameras, lenses, lighting, audio equipment or production
                gear sitting unused? List them on Gearly and earn whenever
                another creator hires them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/list-your-gear" size="lg">
                  Start Listing
                </Button>
                <Button href="/how-it-works" size="lg" variant="secondary">
                  How Owner Rentals Work
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————————————————————————— TRUST ————————————————————————— */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel className="mb-4">Trust</SectionLabel>
            <SectionHeading className="max-w-2xl">Built for trust.</SectionHeading>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((t, i) => (
              <Reveal
                key={t.title}
                delay={(i % 3) * 0.05}
                className="flex flex-col gap-4 bg-bg p-8"
              >
                <t.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-ink">{t.title}</h3>
                <p className="text-sm leading-relaxed text-ink-secondary">{t.body}</p>
              </Reveal>
            ))}
            <div className="flex flex-col justify-center gap-3 bg-surface-2 p-8">
              <p className="text-sm text-ink-secondary">
                Clear terms on every rental, from deposit to return.
              </p>
              <Button href="/how-it-works" variant="tertiary" withArrow>
                How it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————————————— STATS ————————————————————————— */}
      <section className="border-y border-line bg-surface-2 py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="tnum text-stat text-ink">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-ink-secondary">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-xs text-ink-muted">
            * Figures shown are placeholder values for illustration.
          </p>
        </div>
      </section>

      {/* ————————————————————————— CREATOR STORIES ————————————————————————— */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionLabel className="mb-4">Creator Stories</SectionLabel>
            <SectionHeading className="max-w-2xl">
              Made possible by the right gear.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 0.06}
                className="flex flex-col overflow-hidden rounded-card border border-line bg-surface-2"
              >
                <div className="relative aspect-[4/3] bg-surface-3">
                  <Image
                    src={img(t.portrait, 600, 450)}
                    alt={`${t.name}, ${t.profession}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <RatingStars rating={t.rating} showValue={false} />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 border-t border-line pt-4">
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-sm text-ink-muted">
                      {t.profession} · {t.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————————————— FAQ ————————————————————————— */}
      <section id="faq" className="scroll-mt-20 border-t border-line py-20 lg:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <SectionHeading>Questions, answered.</SectionHeading>
            <p className="mt-6 text-ink-secondary">
              Everything you need to know about renting and listing on Gearly.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion items={faqs.slice(0, 8)} />
          </Reveal>
        </div>
      </section>

      {/* ————————————————————————— FINAL CTA ————————————————————————— */}
      <section className="relative overflow-hidden">
        <Image
          src={img(photo.setBlue, 1280, undefined, 50)}
          alt={photo.setBlue.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/80" />
        <div className="shell relative py-24 text-center lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-4xl text-hero">
              Your next project starts with the right gear.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/browse" size="lg">
                Browse Gear
              </Button>
              <Button href="/list-your-gear" size="lg" variant="secondary">
                List Your Gear
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
