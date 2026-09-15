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
