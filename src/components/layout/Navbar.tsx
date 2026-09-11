"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Browse Gear", href: "/browse" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "List Your Gear", href: "/list-your-gear" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Only the homepage has a full-bleed hero to sit transparently over.
  const overHero = pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Ignore tiny scroll jitters; hide on the way down (past the nav),
      // reveal on the way up or near the top.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120);
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero || menuOpen || searchOpen;
  // Keep the bar visible whenever a panel is open.
  const isHidden = hidden && !menuOpen && !searchOpen;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/browse?q=${encodeURIComponent(query.trim())}` : "/browse");
    setSearchOpen(false);
  };

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-smooth will-change-transform",
        isHidden ? "-translate-y-full" : "translate-y-0",
        solid
          ? "border-b border-line bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-ink"
          aria-label="Gearly home"
        >
          GEARLY
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === pathname ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200 hover:text-ink",
                  active ? "text-ink" : "text-ink-secondary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions — desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search gear"
            aria-expanded={searchOpen}
            className="grid h-10 w-10 place-items-center rounded text-ink-secondary transition-colors hover:bg-white/5 hover:text-ink"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <Link
            href="/#"
            className="px-3 text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            Sign In
          </Link>
          <Button href="/list-your-gear" size="sm">
            List Gear
          </Button>
        </div>

        {/* Right actions — mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            aria-label="Search gear"
            className="grid h-10 w-10 place-items-center rounded text-ink transition-colors hover:bg-white/5"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded text-ink transition-colors hover:bg-white/5"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Search drop-down */}
      {searchOpen && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-xl">
          <form onSubmit={submitSearch} className="shell flex items-center gap-3 py-4">
            <Search className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cameras, lenses, lighting, audio…"
              className="h-10 w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
              aria-label="Search gear"
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>
      )}
    </header>

      {/* Mobile menu overlay — rendered outside <header> so the header's
          backdrop-filter doesn't become its containing block. */}
      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[45] overflow-y-auto bg-bg lg:hidden">
          <nav className="shell flex flex-col py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-line py-4 text-2xl font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Button href="/list-your-gear" size="lg">
                List Your Gear
              </Button>
              <Button href="/#" size="lg" variant="secondary">
                Sign In
              </Button>
              <Link
                href="/#"
                className="py-2 text-center text-sm text-ink-secondary"
              >
                Create Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
