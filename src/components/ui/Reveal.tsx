"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "li" | "article";

// Restrained fade + slide-in on scroll using a CSS transition driven by a
// one-shot IntersectionObserver. Far cheaper on scroll than a JS animation
// library (transitions are GPU-composited), and honours prefers-reduced-motion.
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal immediately when motion is reduced or IO is unavailable.
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      style={delay ? { transitionDelay: shown ? `${delay}s` : "0s" } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-smooth motion-reduce:transition-none",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </Component>
  );
}
