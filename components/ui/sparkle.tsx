import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type SparkleProps = Omit<ComponentProps<"svg">, "children"> & {
  tone?: "ink" | "brand";
  size?: number;
};

export function Sparkle({ tone = "brand", size = 24, className, ...props }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(tone === "ink" ? "text-ink" : "text-brand-500", className)}
      {...props}
    >
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}
