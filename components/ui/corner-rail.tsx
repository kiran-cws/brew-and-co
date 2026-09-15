import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const corners: Record<Corner, string> = {
  "top-left": "border-l-2 border-t-2 rounded-tl-rail",
  "top-right": "border-r-2 border-t-2 rounded-tr-rail",
  "bottom-left": "border-l-2 border-b-2 rounded-bl-rail",
  "bottom-right": "border-r-2 border-b-2 rounded-br-rail",
};

export type CornerRailProps = ComponentProps<"div"> & {
  corner?: Corner;
  as?: ElementType;
};

export function CornerRail({
  corner = "top-left",
  as: Tag = "div",
  className,
  ...props
}: CornerRailProps) {
  return <Tag className={cn("border-brand-500", corners[corner], className)} {...props} />;
}
