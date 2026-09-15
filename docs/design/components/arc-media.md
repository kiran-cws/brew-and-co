# Arc media

A circular image cradled by a 270° orange arc, optionally with a small wordmark tag hanging off a short rail at one corner. It is the feature-showcase and newsletter hero device: the bowl of beans, the glass, the illustrated courier.

```
   Brew & Co ─┐
  ╭───────────┤
 ╱   ╭─────╮   ╲
│    │ img │    │   ← image bleeds slightly outside the circle (product cut-outs)
 ╲   ╰─────╯   ╱
  ·  · · · ·  ·     ← arc gap at the bottom
```

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `src`, `alt` | image | Cut-out product on white. Rendered with `next/image` `fill`. |
| `gap` | arc gap | Default `bottom` |
| `tag` | string | Optional label, e.g. the wordmark. Placed top-left by default. |
| `tagSide` | `"left" \| "right"` | Which corner the tag sits at |
| `overflow` | boolean | Let the image spill outside the circle (default true) |

## Accessibility

- The image `alt` describes the product ("A glass of oat cold brew over ice"), not the decoration.
- Arc and tag rail are `aria-hidden`; the tag text is visible but decorative, so it is also hidden from AT.

## Code

```tsx title="components/ui/arc-media.tsx"
import Image, { type StaticImageData } from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Arc } from "@/components/ui/stat-ring";

export type ArcMediaProps = Omit<ComponentProps<"div">, "children"> & {
  src: string | StaticImageData;
  alt: string;
  sizes?: string;
  preload?: boolean;
  /** `contain` for cut-out product art (default); `cover` for photographs. */
  fit?: "contain" | "cover";
  gap?: "top" | "bottom" | "left" | "right";
  tag?: string;
  tagSide?: "left" | "right";
  overflow?: boolean;
};

export function ArcMedia({
  src,
  alt,
  sizes = "(min-width: 1024px) 480px, 80vw",
  preload,
  fit = "contain",
  gap = "bottom",
  tag,
  tagSide = "left",
  overflow = true,
  className,
  ...props
}: ArcMediaProps) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[30rem]", className)} {...props}>
      {tag ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0 z-20 -translate-y-1/2 border-brand-500 px-3 pb-3 font-display text-lg font-medium text-ink",
            tagSide === "left"
              ? "left-0 rounded-tl-rail border-l-2 border-t-2"
              : "right-0 rounded-tr-rail border-r-2 border-t-2",
          )}
        >
          {tag}
        </span>
      ) : null}

      <div className="absolute inset-[6%] rounded-full bg-mist" />
      <Arc gap={gap} />

      <div
        className={cn(
          "absolute inset-[12%]",
          overflow ? "overflow-visible" : "overflow-hidden rounded-full",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={typeof src === "string" ? undefined : "blur"}
          className={fit === "cover" ? "object-cover" : "object-contain drop-shadow-[0_24px_24px_rgb(0_0_0/0.18)]"}
        />
      </div>
    </div>
  );
}
```
