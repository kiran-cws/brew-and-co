import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionHeadingProps = {
  title: ReactNode;
  lede?: ReactNode;
  kicker?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  lede,
  kicker,
  align = "center",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <p className="font-sans text-lg font-semibold text-brand-500">{kicker}</p>
      ) : null}
      <Tag className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-heading text-ink md:text-4xl">
        {title}
      </Tag>
      {lede ? (
        <p className="max-w-prose font-sans text-base text-text-body">{lede}</p>
      ) : null}
    </div>
  );
}
