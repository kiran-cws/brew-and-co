import Image, { type StaticImageData } from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { badgeLabels, formatPrice, type MenuItem } from "@/lib/menu";

export type MenuItemCardProps = Omit<ComponentProps<"article">, "children"> & {
  item: MenuItem;
  image: StaticImageData;
  /** `row` is the menu page layout; `tile` is the taller home-page card. */
  layout?: "row" | "tile";
};

export function MenuItemCard({ item, image, layout = "row", className, ...props }: MenuItemCardProps) {
  const isTile = layout === "tile";
  return (
    <article
      className={cn(
        "flex gap-4 rounded-card border border-line bg-paper p-3 transition-shadow duration-200 hover:shadow-card",
        isTile ? "flex-col" : "items-start",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-card bg-fog",
          isTile ? "aspect-square w-full" : "size-24 sm:size-28",
        )}
      >
        <Image
          src={image}
          alt={item.imageAlt}
          fill
          sizes={isTile ? "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" : "112px"}
          placeholder="blur"
          className="object-cover"
        />
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col gap-1", isTile ? "px-1 pb-1" : "py-1")}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className={cn("font-display font-bold text-ink", isTile ? "text-xl" : "text-lg")}>{item.name}</h3>
          <data value={item.price.toFixed(2)} className="font-display text-lg font-bold text-brand-700">
            {formatPrice(item.price)}
          </data>
        </div>
        {item.badges.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Badges">
            {item.badges.map((b) => (
              <li
                key={b}
                className="rounded-pill bg-brand-100 px-2.5 py-0.5 font-sans text-xs font-semibold text-brand-700"
              >
                {badgeLabels[b]}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-1 font-sans text-sm text-text-body">{item.description}</p>
      </div>
    </article>
  );
}
