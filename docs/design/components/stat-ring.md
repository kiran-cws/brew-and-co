# Stat ring

A mist-filled circle with a big Comfortaa number and a small label, cradled by a 270° orange arc. The arc is rotated per ring so the three rings in a row do not look stamped: open at the bottom, open at the top, open at the bottom.

```
      ╭───────╮
    ╱           ╲
   │    10K+     │
   │ Cups served │
    ╲           ╱
      ·       ·      ← gap
```

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | string | "10K+", "50+" |
| `label` | string | Sentence case |
| `arc` | `"top" \| "bottom" \| "left" \| "right"` | Where the gap sits. Default `bottom`. |

Size is `size-stat-ring` (clamp 11–15rem) so three fit on a 1200px row and stack on mobile.

## Accessibility

- Not a progress meter; no `role`, no `aria-valuenow`. It is a `<div>` with visible text.
- The arc SVG is `aria-hidden`.

## Code

```tsx title="components/ui/stat-ring.tsx"
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ArcGap = "top" | "bottom" | "left" | "right";

const rotation: Record<ArcGap, string> = {
  bottom: "rotate-[135deg]",
  top: "-rotate-45",
  left: "rotate-[225deg]",
  right: "rotate-45",
};

/** 270° orange arc. Sized by the parent; place it absolutely over a circle. */
export function Arc({ gap = "bottom", className }: { gap?: ArcGap; className?: string }) {
  // Circumference of r=48 in a 100-unit box ≈ 301.6; 3/4 of it is visible.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={cn("pointer-events-none absolute inset-0 size-full", rotation[gap], className)}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="226.2 301.6"
        className="text-brand-500"
      />
    </svg>
  );
}

export type StatRingProps = ComponentProps<"div"> & {
  value: string;
  label: string;
  arc?: ArcGap;
};

export function StatRing({ value, label, arc = "bottom", className, ...props }: StatRingProps) {
  return (
    <div
      className={cn(
        "relative flex size-[clamp(11rem,18vw,15rem)] flex-col items-center justify-center rounded-full bg-mist text-center",
        className,
      )}
      {...props}
    >
      <Arc gap={arc} />
      <span className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-display text-ink">
        {value}
      </span>
      <span className="mt-3 font-sans text-base font-medium text-text-body">{label}</span>
    </div>
  );
}
```

## Usage

```tsx
<StatRing value="10K+" label="Cups served" arc="bottom" />
<StatRing value="50K+" label="Orders shipped" arc="top" />
<StatRing value="50+" label="Cities delivered" arc="bottom" />
```
