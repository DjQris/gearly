"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";
import { img, type Photo } from "@/data/images";
import { cn } from "@/lib/cn";

export function GearGallery({ images }: { images: Photo[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        {/* Main image */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative aspect-[4/3] overflow-hidden rounded-card bg-surface-3 focus-visible:outline-accent"
          aria-label="Open full-size image"
        >
          <Image
            src={img(images[active], 1200, 900)}
            alt={images[active].alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.02]"
          />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-bg/60 text-ink backdrop-blur-md">
            <Expand className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </button>

        {/* Thumbnails */}
        <div className="flex gap-3 sm:flex-col">
          {images.map((im, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded bg-surface-3 transition-all duration-200",
                i === active ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img(im, 240, 240)}
                alt={im.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={img(images[active], 1600)}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
