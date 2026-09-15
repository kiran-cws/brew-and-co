# Story split

A two-line centred heading, then two alternating rows of image and copy. Each copy block is framed by a corner rail that turns toward its image: the first row's rail sits top-right/bottom of the text, the second row's rail sits top-left of the image and bottom of the text. Images are cut-outs with spilled beans and berries, so they overflow their column freely.

```
       Brewing boldness, fuelling hustlers.
       Crafted for those who never settle.

   [ glass from above ]      At Brew & Co we believe coffee should ──╮
                             be pure, strong and uncompromising…      │
                                                                       │
   ╭──────────────────────────────────                                 │
   │  [ three iced drinks ]              Whether you're a creator, ───╯
   │                                     hustler or go-getter…
```

## Variants

The live site implementation (`components/sections/story-split.tsx`) takes `variant="photo"` (default, photographs framed in a `rounded-card` with `object-cover`, no drop shadow) or `variant="cutout"` (the storefront behaviour below, product art spilling out of its column). Rows also accept an optional `title` rendered as an `h3` inside the rail.

## Content shape

```ts
type StoryRow = { image: { src: string; alt: string }; copy: string };
```

## Code

```tsx title="components/sections/story-split.tsx"
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CornerRail } from "@/components/ui/corner-rail";
import { cn } from "@/lib/cn";

export type StoryRow = { image: { src: string; alt: string }; copy: string };

const defaultRows: StoryRow[] = [
  {
    image: { src: "/images/story-glass-top.png", alt: "Cold brew over ice seen from above, beans scattered beside it" },
    copy:
      "At Brew & Co we believe coffee should be pure, strong and uncompromising. That's why we slow-steep every batch for 16 hours, unlocking a smooth, bold flavour with zero bitterness and maximum caffeine.",
  },
  {
    image: { src: "/images/story-three-drinks.png", alt: "Three iced coffees topped with raspberries, peach and cream" },
    copy:
      "Whether you're a creator, a hustler or a go-getter, our cold brew is crafted to fuel your passion and power your grind, without the crash.",
  },
];

export function StorySplit({ rows = defaultRows }: { rows?: StoryRow[] }) {
  return (
    <Section aria-labelledby="story-title">
      <Container>
        <SectionHeading
          title={
            <span id="story-title">
              Brewing boldness, fuelling hustlers.
              <br className="hidden md:block" /> Crafted for those who never settle.
            </span>
          }
        />

        <div className="mt-16 flex flex-col gap-16 md:gap-8">
          {rows.map((row, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={row.image.src}
                className={cn(
                  "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full",
                    flipped && "md:order-2",
                  )}
                >
                  {flipped ? (
                    <CornerRail corner="top-left" className="absolute -left-4 -top-6 h-3/4 w-3/4" />
                  ) : null}
                  <Image
                    src={row.image.src}
                    alt={row.image.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 90vw"
                    className="object-contain drop-shadow-[0_24px_24px_rgb(0_0_0/0.14)]"
                  />
                </div>

                <CornerRail
                  corner={flipped ? "bottom-left" : "bottom-right"}
                  className={cn(
                    "px-6 py-8 md:px-10 md:py-12",
                    flipped ? "md:order-1 md:mr-8" : "md:ml-8",
                  )}
                >
                  <p className="max-w-prose font-sans text-base text-text-body">{row.copy}</p>
                </CornerRail>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
```
