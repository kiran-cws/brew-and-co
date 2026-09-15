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
