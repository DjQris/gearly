"use client";

import { useEffect, useState } from "react";

// A slim accent progress bar that sweeps across the top on first load, then
// fades away. Shown once per browser session, skipped under reduced-motion.
// Deliberately lightweight so it never competes with the site's real speed.
export function PageIntro() {
  const [phase, setPhase] = useState<"hidden" | "run" | "finish">("hidden");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("gearly-intro") === "1";
    } catch {}
    if (reduce || seen) return;
    try {
      sessionStorage.setItem("gearly-intro", "1");
    } catch {}

    setPhase("run");
    const r = requestAnimationFrame(() => setWidth(72));
    const t1 = setTimeout(() => {
      setWidth(100);
      setPhase("finish");
    }, 520);
    const t2 = setTimeout(() => setPhase("hidden"), 920);

    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
      style={{
        opacity: phase === "finish" ? 0 : 1,
        transition: "opacity 380ms ease",
      }}
    >
      <div
        className="h-full bg-accent"
        style={{
          width: `${width}%`,
          boxShadow: "0 0 12px rgba(215,255,63,0.6)",
          transition: "width 480ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}
