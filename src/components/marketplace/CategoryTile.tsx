import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/data/images";
import type { Category } from "@/data/categories";
import { cn } from "@/lib/cn";

export function CategoryTile({
  category,
  className,
  large = false,
}: {
  category: Category;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/browse?category=${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-card bg-surface-3",
        large ? "aspect-[4/5] lg:aspect-auto" : "aspect-[4/5]",
        className
      )}
    >
      <Image
        src={img(category.image, large ? 900 : 600)}
        alt={category.image.alt}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 60vw, 25vw"}
        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="relative flex items-end justify-between gap-2 p-5">
        <div>
          <h3 className={cn("font-medium text-ink", large ? "text-2xl" : "text-lg")}>
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-ink-secondary">
            <span className="tnum">{category.count}</span> available
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
