# Testimonials

Centred heading, lede, two testimonial cards. Cards carry the warm `shadow-card`; the section itself stays on white.

```
                 What our customers say
   Real notes from people who run on Brew & Co.

  ╭──────────────────╮   ╭──────────────────╮
  │     (avatar)     │   │     (avatar)     │
  │   Irene Strong   │   │  Jonas Kakaroto  │
  │ "Slow-steeped…"  │   │ "The only cold…" │
  ╰──────────────────╯   ╰──────────────────╯
```

## Code

```tsx title="components/sections/testimonials.tsx"
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard, type Testimonial } from "@/components/ui/testimonial-card";

const defaultTestimonials: Testimonial[] = [
  {
    name: "Irene Strong",
    role: "Illustrator",
    quote: "Slow-steeped and it shows. Zero bitterness, and I'm still sharp at 2am when the deadline hits.",
    avatar: { src: "/images/avatar-irene.jpg" },
  },
  {
    name: "Jonas Kakaroto",
    role: "Night-shift nurse",
    quote: "The only cold brew that doesn't wreck my stomach on a twelve-hour shift. I buy it by the case.",
    avatar: { src: "/images/avatar-jonas.jpg" },
  },
];

export function Testimonials({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  return (
    <Section aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading
          title={<span id="testimonials-title">What our customers say</span>}
          lede="Real notes from people who run on Brew & Co."
        />
        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {testimonials.map((t) => (
            <li key={t.name}>
              <TestimonialCard testimonial={t} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
```
