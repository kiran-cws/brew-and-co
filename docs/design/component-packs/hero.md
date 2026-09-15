# Hero

The page opens with the product's name at a size that fills the container: "Cold brew" in Comfortaa 300, one line, black. The glass sits on an orange glow directly beneath the word, overlapping its baseline. Copy and the primary button are bottom-left; feature pills and price are bottom-right. An outlined "Brew & Co" watermark runs vertically off the right edge on large screens.

```
 ✦          Pure caffeine, nothing extra.                   (seal)
 ┌────────────────────────────────────────────────────────┐ B
 │ C o l d   b r e w                                      │ r
 └────────────────────────────────────────────────────────┘ e
                      ╭────────╮                             w
 Cold brew is coffee  │ glass  │            ◔ 65% less acidity
 in its rawest form…  │  on    │            ☕ 2x more caffeine
                      │  glow  │            ◷ 16-hour steeped
 [   Buy now   ]      ╰────────╯            Price │ $14.99
```

On mobile the three columns stack: word, glass, copy + button, pills, price.

## Motion

The glow scales in over 900ms and the copy column rises over 700ms with a 100ms stagger. This is the page's one entrance animation; `prefers-reduced-motion` disables it in the base layer.

## Accessibility

- The display word is the page `h1`.
- The glass image is `preload` with a descriptive `alt`.
- Sparkle, seal, watermark and glow are `aria-hidden`.
- The pill list is a `<ul>` so the three facts are announced as a list.

## Code

```tsx title="components/sections/hero.tsx"
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FeaturePillStack } from "@/components/ui/feature-pill";
import { Sparkle } from "@/components/ui/sparkle";
import { Seal } from "@/components/ui/seal";
import { ClockIcon, CupIcon, DropIcon } from "@/components/ui/icons";

const facts = [
  { icon: <DropIcon />, label: "65% less acidity" },
  { icon: <CupIcon />, label: "2x more caffeine" },
  { icon: <ClockIcon />, label: "16-hour steeped" },
];

export function Hero({
  price = 14.99,
  image = { src: "/images/hero-cold-brew.png", alt: "A tall glass of cold brew over ice" },
}: {
  price?: number;
  image?: { src: string; alt: string };
}) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-16 hidden select-none font-display text-[9rem] font-light leading-none text-outline-ink [writing-mode:vertical-rl] lg:block"
      >
        Brew &amp; Co
      </span>

      <Container className="relative pb-16 pt-6 md:pt-10">
        <div className="relative flex items-center justify-center">
          <Sparkle tone="ink" size={28} className="absolute left-0 top-2 hidden sm:block" />
          <p className="font-sans text-lg font-semibold text-brand-500 animate-rise-in">
            Pure caffeine, nothing extra.
          </p>
          <Seal className="absolute right-0 -top-4 hidden sm:block" />
        </div>

        <h1
          id="hero-title"
          className="mt-4 text-center font-display text-display font-light text-ink animate-rise-in [animation-delay:100ms]"
        >
          Cold brew
        </h1>

        <div className="relative mt-[-0.5em] grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_minmax(20rem,26rem)_1fr]">
          <div className="order-2 max-w-sm animate-rise-in [animation-delay:200ms] lg:order-1 lg:self-end lg:pb-6">
            <p className="font-sans text-base text-text-body">
              Cold brew is coffee in its rawest form: steeped slow, brewed cold, and packed with
              flavour. No heat, no bitterness, just smooth, high-caffeine energy that lasts.
              Whether you need a morning boost or fuel for late nights, this is coffee without
              compromise.
            </p>
            <Button size="lg" href="/products/cold-brew" className="mt-8">
              Buy now
            </Button>
          </div>

          <div className="relative order-1 mx-auto aspect-[3/4] w-full max-w-[26rem] lg:order-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-[-15%] inset-y-[5%] glow-brand animate-glow-in"
            />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 416px, 80vw"
              className="relative object-contain object-bottom drop-shadow-[0_32px_32px_rgb(0_0_0/0.16)]"
            />
          </div>

          <div className="order-3 flex flex-col items-start gap-10 animate-rise-in [animation-delay:300ms] lg:items-end lg:self-end lg:pb-6">
            <FeaturePillStack items={facts} />
            <p className="flex items-baseline gap-3 font-sans text-sm text-text-muted">
              Price
              <span aria-hidden="true" className="h-6 w-px self-center bg-brand-500" />
              <data
                value={price.toFixed(2)}
                className="font-display text-2xl font-bold text-ink"
              >
                ${price.toFixed(2)}
              </data>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
```
