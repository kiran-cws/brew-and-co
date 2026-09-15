# Stats strip

A centred heading, a one-line lede, and three stat rings. The middle ring's arc opens at the top while the outer two open at the bottom, and two orange sparkles sit off-grid above the outer rings with a third beneath the middle one.

```
              Brewing success one sip at a time
   Thousands of cups brewed for creators, dreamers and go-getters.

      ✦                                   ✦
   ╭─────╮           ╭─────╮           ╭─────╮
   │10K+ │           │50K+ │           │ 50+ │
   ╰─ ─ ─╯           ╰─────╯           ╰─ ─ ─╯
                        ✦
```

## Code

```tsx title="components/sections/stats-strip.tsx"
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatRing } from "@/components/ui/stat-ring";
import { Sparkle } from "@/components/ui/sparkle";

export type Stat = { value: string; label: string };

const defaultStats: Stat[] = [
  { value: "10K+", label: "Cups served" },
  { value: "50K+", label: "Orders shipped" },
  { value: "50+", label: "Cities delivered" },
];

export function StatsStrip({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <Section aria-labelledby="stats-title">
      <Container>
        <SectionHeading
          title={<span id="stats-title">Brewing success one sip at a time</span>}
          lede="Thousands of cups brewed, fuelling creators, dreamers and go-getters. Pure, bold and unstoppable, one sip at a time."
        />

        <ul className="relative mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const middle = i === 1;
            return (
              <li key={stat.label} className="relative">
                {!middle && (
                  <Sparkle className="absolute -top-8 left-1/2 -translate-x-1/2" />
                )}
                <StatRing value={stat.value} label={stat.label} arc={middle ? "top" : "bottom"} />
                {middle && (
                  <Sparkle className="absolute -bottom-8 left-1/2 -translate-x-1/2" />
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
```
