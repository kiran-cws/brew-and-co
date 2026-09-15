# Nav link and nav list

Top navigation links are Raleway 500 in ink, separated by literal `/` characters in muted grey. The slash is a brand mark: it echoes the hard edges of the primary button and reads as a menu without any pill or underline chrome.

```
Home   /   Products   /   About us   /   Contact
```

## States

- Default: `text-ink`.
- Hover: `text-brand-700`.
- Current page: `text-brand-700` plus `aria-current="page"`. No underline.
- Focus: global outline.

## Accessibility

- `NavList` renders `<nav aria-label="Primary">` with a `<ul>`. Separators are `aria-hidden` pseudo-elements, so screen readers hear only the links.
- `NavLink` is a plain `next/link`; the caller passes `current` for the active route (from `usePathname` in a client wrapper if needed).

## Code

```tsx title="components/ui/nav-link.tsx"
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type NavLinkProps = ComponentProps<typeof Link> & { current?: boolean };

export function NavLink({ current, className, ...props }: NavLinkProps) {
  return (
    <Link
      aria-current={current ? "page" : undefined}
      className={cn(
        "font-sans text-base font-medium text-ink transition-colors duration-150 hover:text-brand-700",
        current && "text-brand-700",
        className,
      )}
      {...props}
    />
  );
}

export type NavItem = { href: string; label: string };

export function NavList({
  items,
  currentPath,
  className,
}: {
  items: NavItem[];
  currentPath?: string;
  className?: string;
}) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-x-6 lg:gap-x-10">
        {items.map((item, i) => (
          <li
            key={item.href}
            className={cn(
              "flex items-center",
              i > 0 &&
                "before:mr-6 before:text-text-muted before:content-['/'] lg:before:mr-10",
            )}
          >
            <NavLink href={item.href} current={currentPath === item.href}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
