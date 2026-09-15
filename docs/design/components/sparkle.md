# Sparkle

A four-point star used as a placement mark: one beside the hero kicker in black, one or two near the stat rings in orange. Never more than two per section. The only inline use is as the ink prefix of a hero kicker (see photo-hero.md); it never sits inside body copy.

## Props

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `ink` `brand` | `brand` |
| `size` | number (px) | 24 |

## Code

```tsx title="components/ui/sparkle.tsx"
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type SparkleProps = Omit<ComponentProps<"svg">, "children"> & {
  tone?: "ink" | "brand";
  size?: number;
};

export function Sparkle({ tone = "brand", size = 24, className, ...props }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(tone === "ink" ? "text-ink" : "text-brand-500", className)}
      {...props}
    >
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}
```

## Usage

```tsx
<Sparkle tone="ink" size={28} className="absolute -left-2 top-0" />
<Sparkle className="absolute -top-8 left-1/2 -translate-x-1/2" />
```
