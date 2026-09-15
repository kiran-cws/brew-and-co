import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  href = "/",
  size = "md",
  className,
}: {
  href?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Brew & Co, home"
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display font-medium tracking-heading text-ink",
        size === "md" ? "text-2xl" : "text-xl",
        className,
      )}
    >
      Brew &amp; Co
      <span aria-hidden="true" className="ml-0.5 text-brand-500">
        .
      </span>
    </Link>
  );
}
