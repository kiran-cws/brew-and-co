import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Sparkle } from "@/components/ui/sparkle";
import { cn } from "@/lib/cn";

export type PhotoHeroProps = {
  image: StaticImageData;
  alt: string;
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** Only the home page hero is the LCP image; everything else stays lazy. */
  preload?: boolean;
  size?: "lg" | "md";
  titleId?: string;
};

/**
 * Full-bleed photo with a white wash on the left so the headline stays black
 * on near-white paper. Copy is left-aligned inside the page container.
 */
export function PhotoHero({
  image,
  alt,
  kicker,
  title,
  lede,
  actions,
  preload,
  size = "lg",
  titleId = "hero-title",
}: PhotoHeroProps) {
  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden bg-paper">
      <Image
        src={image}
        alt={alt}
        fill
        preload={preload}
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-paper via-paper/90 to-paper/15 md:via-paper/80 md:to-paper/5"
      />

      <Container
        className={cn(
          "relative flex flex-col items-start justify-end gap-6",
          size === "lg" ? "min-h-[34rem] py-16 md:min-h-[40rem] md:py-24" : "min-h-[22rem] py-12 md:min-h-[26rem] md:py-16",
        )}
      >
        {kicker ? (
          <p className="flex items-center gap-3 font-sans text-lg font-semibold text-brand-500 animate-rise-in">
            <Sparkle tone="ink" size={20} />
            {kicker}
          </p>
        ) : null}
        <h1
          id={titleId}
          className={cn(
            "max-w-4xl font-display font-light tracking-display text-ink animate-rise-in [animation-delay:100ms]",
            size === "lg" ? "text-5xl sm:text-6xl lg:text-[6.5rem] lg:leading-[0.95]" : "text-4xl sm:text-5xl",
          )}
        >
          {title}
        </h1>
        {lede ? (
          <p className="max-w-prose font-sans text-base text-text-body animate-rise-in [animation-delay:200ms]">
            {lede}
          </p>
        ) : null}
        {actions ? (
          <div className="mt-2 flex flex-wrap items-center gap-4 animate-rise-in [animation-delay:300ms]">
            {actions}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
