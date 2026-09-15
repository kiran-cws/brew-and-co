import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ComponentProps<"div"> & { as?: ElementType }) {
  return <Tag className={cn("mx-auto w-full max-w-page px-4 sm:px-6", className)} {...props} />;
}

export function Section({
  as: Tag = "section",
  tone = "paper",
  className,
  ...props
}: ComponentProps<"section"> & { as?: ElementType; tone?: "paper" | "mist" }) {
  return (
    <Tag
      className={cn("py-16 md:py-24", tone === "mist" ? "bg-mist" : "bg-paper", className)}
      {...props}
    />
  );
}
