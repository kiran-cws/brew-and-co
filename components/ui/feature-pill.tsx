import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IconTile({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-tile bg-brand-200 text-brand-500 [&>svg]:size-5",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export type FeaturePillProps = ComponentProps<"div"> & {
  icon: ReactNode;
  label: string;
};

export function FeaturePill({ icon, label, className, ...props }: FeaturePillProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <IconTile className="relative z-10 bg-brand-100 shadow-pill">{icon}</IconTile>
      <span className="-ml-3 flex h-10 items-center rounded-tile bg-fog pl-6 pr-4 font-sans text-sm font-medium text-text-body">
        {label}
      </span>
    </div>
  );
}

/** Vertical stack with the reference's slight stagger. */
export function FeaturePillStack({
  items,
  className,
}: {
  items: Array<{ icon: ReactNode; label: string }>;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {items.map((item, i) => (
        <li
          key={item.label}
          className={cn(i === 1 && "lg:translate-x-3", i === 2 && "lg:-translate-x-1")}
        >
          <FeaturePill icon={item.icon} label={item.label} />
        </li>
      ))}
    </ul>
  );
}
