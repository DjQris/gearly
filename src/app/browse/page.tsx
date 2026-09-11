import { Suspense } from "react";
import type { Metadata } from "next";
import { BrowseClient } from "@/components/marketplace/BrowseClient";

export const metadata: Metadata = {
  title: "Browse Gear — Gearly",
  description:
    "Browse and filter professional creative equipment for hire — cameras, lenses, lighting, audio, drones and more.",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="shell pt-36 text-ink-muted">Loading…</div>}>
      <BrowseClient />
    </Suspense>
  );
}
