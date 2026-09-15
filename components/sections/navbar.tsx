"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NavList, NavLink, type NavItem } from "@/components/ui/nav-link";
import { IconButton } from "@/components/ui/icon-button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { ReserveButton } from "@/components/reservation/reserve-button";

const items: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About us" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-30 bg-paper">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <NavList items={items} currentPath={pathname} className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <ReserveButton variant="outline" className="max-sm:hidden" />
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
        className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-card lg:hidden"
      >
        <Container className="flex flex-col gap-2 py-4">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              current={pathname === item.href}
              className="py-3 text-lg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <ReserveButton className="mt-2 sm:hidden" />
        </Container>
      </div>
    </header>
  );
}
