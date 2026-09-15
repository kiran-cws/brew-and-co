# Feature showcase

"Fuel your day with Brew & Co": two rows of arc media paired with copy and an "Explore the brew" button. Row one has the bowl of beans on the left with a tag hanging at its top-left corner and copy in a top-right rail; row two flips, with the glass on the right (tag top-right) and a titled copy block in a top-left rail.

```
                Fuel your day with Brew & Co

   Brew & Co ─┐                          ╭──────────────────────
  ╭───────────┤                          │ Cold brew isn't just
 ╱  [ beans ]  ╲                         │ coffee, it's a statement…
  ╰ · · · · · ╯                          │ [ Explore the brew ]

   ╭──────────────────                          ┌─ Brew & Co
   │ The brew                                  ├───────────╮
   │ Every bottle is crafted…                ╱  [ glass ]  ╲
   │ [ Explore the brew ]                    ╰ · · · · · ╯
```

## Content shape

```ts
type Feature = {
  title?: string;         // row two has "The brew"; row one has none
  paragraphs: string[];
  image: { src: string; alt: string };
  href: string;
};
```

## Code

```tsx title="components/sections/feature-showcase.tsx"
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArcMedia } from "@/components/ui/arc-media";
import { CornerRail } from "@/components/ui/corner-rail";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type Feature = {
  title?: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  href: string;
};

const defaultFeatures: Feature[] = [
  {
    paragraphs: [
      "Cold brew isn't just coffee, it's a statement. A ritual for those who demand more than the ordinary. At Brew & Co every sip delivers a smooth yet powerful energy boost, crafted to keep up with your grind.",
      "Whether you're starting your morning, pushing through the afternoon or fuelling late-night creativity, Brew & Co is your companion.",
    ],
    image: { src: "/images/feature-beans-bowl.png", alt: "A wooden bowl heaped with roasted coffee beans" },
    href: "/about",
  },
  {
    title: "The brew",
    paragraphs: [
      "Every bottle of Brew & Co is crafted through a meticulous slow-steeping process, ensuring a deep, full-bodied taste with none of the bitterness of traditional coffee. Designed for those who crave a clean, high-caffeine boost, our cold brew is the balance of strength and smoothness.",
      "Enjoy it straight from the bottle, over ice or as part of your favourite mix. Each sip delivers pure energy, uncompromised flavour and a refreshingly bold experience.",
    ],
    image: { src: "/images/feature-glass.png", alt: "A glass of cold brew swirled with milk over ice" },
    href: "/products",
  },
];

export function FeatureShowcase({ features = defaultFeatures }: { features?: Feature[] }) {
  return (
    <Section aria-labelledby="feature-title">
      <Container>
        <SectionHeading title={<span id="feature-title">Fuel your day with Brew &amp; Co</span>} />

        <div className="mt-16 flex flex-col gap-20 md:gap-12">
          {features.map((feature, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={feature.image.src}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <ArcMedia
                  src={feature.image.src}
                  alt={feature.image.alt}
                  tag="Brew & Co"
                  tagSide={flipped ? "right" : "left"}
                  className={cn("mx-auto", flipped && "md:order-2")}
                />

                <CornerRail
                  corner={flipped ? "top-left" : "top-right"}
                  className={cn(
                    "flex flex-col items-start px-6 py-8 md:px-10 md:py-12",
                    flipped ? "md:order-1" : "md:mr-6",
                  )}
                >
                  {feature.title ? (
                    <h3 className="mb-4 font-display text-3xl font-bold text-ink">{feature.title}</h3>
                  ) : null}
                  <div className="flex max-w-prose flex-col gap-4 font-sans text-base text-text-body">
                    {feature.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <Button size="lg" href={feature.href} className="mt-8">
                    Explore the brew
                  </Button>
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
