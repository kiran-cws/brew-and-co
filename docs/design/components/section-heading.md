# Section heading

Centred title in Comfortaa 700 with an optional one-line lede in body grey beneath it, and an optional orange kicker above. Every section after the hero opens with one.

```
            Subscribe and take 10% off your first order.     ← kicker (optional, brand-500)
              Find your perfect brew                          ← h2, text-3xl / text-4xl
   Explore bold, smooth, high-caffeine cold brews for every taste.   ← lede, text-body
```

## Props

| Prop | Notes |
| --- | --- |
| `title` | Required. Two lines max; use `<br className="hidden md:block" />` for a controlled break. |
| `lede` | One or two sentences. |
| `kicker` | Sentence-case clause. Do not use caps or tracking. |
| `align` | `center` (default) or `left` (newsletter, story blocks) |
| `as` | Heading level, default `h2` |

## Code

```tsx title="components/ui/section-heading.tsx"
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionHeadingProps = {
  title: ReactNode;
  lede?: ReactNode;
  kicker?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  lede,
  kicker,
  align = "center",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <p className="font-sans text-lg font-semibold text-brand-500">{kicker}</p>
      ) : null}
      <Tag className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-heading text-ink md:text-4xl">
        {title}
      </Tag>
      {lede ? (
        <p className="max-w-prose font-sans text-base text-text-body">{lede}</p>
      ) : null}
    </div>
  );
}
```

`max-w-prose` here is Tailwind's 65ch default, which suits a centred lede; use `max-w-prose` (the theme's 40rem `container-prose`) for long left-aligned copy via `max-w-(--container-prose)`.
