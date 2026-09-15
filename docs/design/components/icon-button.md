# Icon button

A square or circular black button holding a single white icon. Two shapes appear in the reference: the round cart button in the navbar and the small square social buttons in the footer.

## Variants

| `shape` | Size | Radius | Use |
| --- | --- | --- | --- |
| `circle` (default) | 40px | full | Cart, account |
| `square` | 32px | control | Social links |

## Accessibility

- `label` is required and rendered as the accessible name (`aria-label`). The icon itself is `aria-hidden`.
- With `href` it renders a `next/link`; external links get `target` and `rel` from the caller.

## Code

```tsx title="components/ui/icon-button.tsx"
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Shape = "circle" | "square";

const shapes: Record<Shape, string> = {
  circle: "size-10 rounded-full [&>svg]:size-5",
  square: "size-8 rounded-control [&>svg]:size-4",
};

const base =
  "inline-flex shrink-0 items-center justify-center bg-ink text-white " +
  "transition-colors duration-150 hover:bg-neutral-800 active:translate-y-px";

type Common = {
  label: string;
  shape?: Shape;
  className?: string;
  children: ReactNode;
};

type AsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type AsLink = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export type IconButtonProps = AsButton | AsLink;

export function IconButton(props: IconButtonProps) {
  const { label, shape = "circle", className, children, ...rest } = props;
  const classes = cn(base, shapes[shape], className);

  if (rest.href !== undefined) {
    return (
      <Link className={classes} aria-label={label} {...rest}>
        <span aria-hidden="true" className="contents">
          {children}
        </span>
      </Link>
    );
  }

  const { type, ...buttonProps } = rest;
  return (
    <button className={classes} type={type ?? "button"} aria-label={label} {...buttonProps}>
      <span aria-hidden="true" className="contents">
        {children}
      </span>
    </button>
  );
}
```

## Usage

```tsx
<IconButton label="Open cart" href="/cart"><CartIcon /></IconButton>
<IconButton label="Brew & Co on Facebook" shape="square" href="https://facebook.com"><FacebookIcon /></IconButton>
```
