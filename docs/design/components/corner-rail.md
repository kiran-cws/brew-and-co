# Corner rail

A 2px orange line that follows two edges of a block and turns a 24px-radius corner between them. It never closes into a box. In the reference it frames text so the eye travels from the copy round the corner toward the paired image.

```
 ╭──────────────────────      corner="top-left"
 │
 │   Copy sits inside
 │
 │

                          │
                          │   corner="bottom-right"
                          │
 ─────────────────────────╯
```

## Props

| Prop | Values | Notes |
| --- | --- | --- |
| `corner` | `top-left` `top-right` `bottom-left` `bottom-right` | Which corner the turn is in |
| `as` | element | Default `div` |

Padding inside the rail is the caller's responsibility (`p-6 md:p-8` is typical), so the rail can also wrap images with zero padding.

## Accessibility

Purely visual: the rail is a border on the wrapper, so nothing extra is exposed.

## Code

```tsx title="components/ui/corner-rail.tsx"
import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const corners: Record<Corner, string> = {
  "top-left": "border-l-2 border-t-2 rounded-tl-rail",
  "top-right": "border-r-2 border-t-2 rounded-tr-rail",
  "bottom-left": "border-l-2 border-b-2 rounded-bl-rail",
  "bottom-right": "border-r-2 border-b-2 rounded-br-rail",
};

export type CornerRailProps = ComponentProps<"div"> & {
  corner?: Corner;
  as?: ElementType;
};

export function CornerRail({
  corner = "top-left",
  as: Tag = "div",
  className,
  ...props
}: CornerRailProps) {
  return <Tag className={cn("border-brand-500", corners[corner], className)} {...props} />;
}
```

## Usage

```tsx
<CornerRail corner="bottom-right" className="p-8 md:p-10">
  <p className="text-text-body">At Brew & Co we slow-steep every batch for 16 hours…</p>
</CornerRail>
```
