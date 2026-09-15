# Logo

The wordmark is "Brew & Co" set in Comfortaa 500 with an orange full stop after it. The full stop is the brand's smallest use of orange and the most frequent, so it must always be present and always `brand-500`.

```
Brew & Co.
         ↑ brand-500
```

## Props

| Prop | Notes |
| --- | --- |
| `href` | Default `/`. Renders a link with the accessible name "Brew & Co, home". |
| `size` | `sm` (footer, 20px) or `md` (navbar, 24px) |

## Code

```tsx title="components/ui/logo.tsx"
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  href = "/",
  size = "md",
  className,
}: {
  href?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Brew & Co, home"
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display font-medium tracking-heading text-ink",
        size === "md" ? "text-2xl" : "text-xl",
        className,
      )}
    >
      Brew &amp; Co
      <span aria-hidden="true" className="ml-0.5 text-brand-500">
        .
      </span>
    </Link>
  );
}
```
