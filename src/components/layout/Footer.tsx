import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Cameras", href: "/browse?category=cameras" },
      { label: "Lenses", href: "/browse?category=lenses" },
      { label: "Lighting", href: "/browse?category=lighting" },
      { label: "Audio", href: "/browse?category=audio" },
      { label: "Rigs", href: "/browse?category=rigs" },
      { label: "Drones", href: "/browse?category=drones" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "List Your Gear", href: "/list-your-gear" },
      { label: "Safety", href: "/#" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/#" },
      { label: "Privacy", href: "/#" },
      { label: "Rental Policy", href: "/#" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "/#", icon: Instagram },
  { label: "YouTube", href: "/#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div>
            <div className="text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none tracking-tight text-ink">
              GEARLY
            </div>
            <p className="mt-6 max-w-sm text-ink-secondary">
              The marketplace for renting and listing professional creative
              equipment.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label mb-4">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-secondary transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="label mb-4">Social</h3>
              <ul className="space-y-3">
                {["Instagram", "TikTok", "X", "YouTube"].map((s) => (
                  <li key={s}>
                    <Link
                      href="/#"
                      className="text-sm text-ink-secondary transition-colors hover:text-ink"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">© 2026 Gearly</p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded border border-line text-ink-secondary transition-colors hover:border-ink/40 hover:text-ink"
              >
                <s.icon className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            ))}
            <p className="ml-2 text-sm text-ink-muted">
              Rent the gear. Make the work.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
