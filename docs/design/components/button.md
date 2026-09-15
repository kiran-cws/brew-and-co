# Button

The primary button is the brand's one hard-cornered element: a black rectangle with white Raleway 600 text. Everything else on the page is rounded, which is exactly why this reads as the thing to press.

## Anatomy

```
┌──────────────────────┐
│       Buy now        │   primary: bg-ink, rounded-none, h-14, px-10
└──────────────────────┘
╭──────────────────────╮
│  Request a callback  │   accent: bg-brand-500, rounded-control, weight 700
╰──────────────────────╯
╭──────────────────────╮
│       Sign in        │   outline: border-line-ink, rounded-control
╰──────────────────────╯
```

## Variants

| `variant` | Use | Fill | Hover | Radius |
| --- | --- | --- | --- | --- |
| `primary` (default) | The main action in a section: Buy now, Explore the brew, Subscribe, Order now | `bg-ink text-white` | `bg-neutral-800` | none |
| `accent` | Secondary CTA where black would compete: footer callback, promo | `bg-brand-500 text-white` | `bg-brand-600` | control |
| `outline` | Navigation actions: Sign in | transparent, `border-line-ink` | `bg-mist` | control |
| `ghost` | Inline text actions | transparent | `text-brand-700` | control |

## Sizes

| `size` | Height | Padding | Text |
| --- | --- | --- | --- |
| `sm` | 40px | 20px | 14px |
| `md` (default) | 48px | 32px | 16px |
| `lg` | 56px | 40px | 16px |

The hero and feature CTAs use `lg`; card footers use `sm`.

## States

- Hover: fill shifts one step (see table). No scale, no shadow.
- Active: `translate-y-px` for a press feel.
- Focus: the global 2px orange outline with 3px offset.
- Disabled: 50% opacity, `cursor-not-allowed`, pointer events off.
- Loading: pass `disabled` and swap the label for a verb in progress ("Subscribing…").

## Accessibility

- Renders a `<button type="button">` by default. Pass `type="submit"` inside forms.
- With `href` it renders `next/link`; the same visual, correct semantics.
- Text is sentence case and describes the outcome: "Order now", not "Submit".

## Code

```tsx title="components/ui/button.tsx"
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap " +
  "transition-colors duration-150 ease-brand select-none " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "rounded-none bg-ink text-white hover:bg-neutral-800",
  accent: "rounded-control bg-brand-500 font-bold text-white hover:bg-brand-600",
  outline:
    "rounded-control border border-line-ink bg-paper text-ink hover:bg-mist",
  ghost: "rounded-control bg-transparent text-ink hover:text-brand-700",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type, ...buttonProps } = rest;
  return (
    <button className={classes} type={type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
```

## Usage

```tsx
<Button size="lg">Buy now</Button>
<Button href="/products" size="lg">Explore the brew</Button>
<Button variant="outline" href="/sign-in">Sign in</Button>
<Button variant="accent" type="submit">Request a callback</Button>
<Button size="sm">Order now</Button>
```
