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
