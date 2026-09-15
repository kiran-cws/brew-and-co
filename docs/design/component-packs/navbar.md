# Navbar

Wordmark left, slash-separated links centred, "Sign in" outline button and the black cart circle right. Transparent over the page (the hero's glow starts below it), 80px tall on desktop.

```
Brew & Co.        Home / Products / About us / Contact        [Sign in] (🛒)
```

Below `lg` the link list collapses behind a menu button; the sheet drops from the navbar with the same links stacked and the sign-in button at the bottom.

## Behaviour

- Client component: only for the mobile `open` state. The links themselves are server-rendered inside it.
- `currentPath` marks the active link; pass `usePathname()` from a thin wrapper if you want it live.
- Escape closes the sheet; the toggle carries `aria-expanded` and `aria-controls`.

## Code

```tsx title="components/sections/navbar.tsx"
"use client";

import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NavList, NavLink, type NavItem } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const defaultItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({
  items = defaultItems,
  currentPath,
  cartCount = 0,
}: {
  items?: NavItem[];
  currentPath?: string;
  cartCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-30">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <NavList items={items} currentPath={currentPath} className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <Button variant="outline" href="/sign-in" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <IconButton label={`Open cart, ${cartCount} items`} href="/cart">
            <CartIcon />
          </IconButton>
          <IconButton
            label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
            aria-expanded={open}
            aria-controls={sheetId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </Container>

      <div
        id={sheetId}
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-paper shadow-card lg:hidden",
        )}
      >
        <Container className="flex flex-col gap-2 py-4">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              current={currentPath === item.href}
              className="py-3 text-lg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Button variant="outline" href="/sign-in" className="mt-2 sm:hidden">
            Sign in
          </Button>
        </Container>
      </div>
    </header>
  );
}
```
