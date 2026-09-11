"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Faq } from "@/data/faq";

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-lg font-medium text-ink lg:text-xl">
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ease-smooth",
                    isOpen && "rotate-45 text-accent"
                  )}
                  strokeWidth={1.5}
                />
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-smooth",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-8 text-ink-secondary leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
