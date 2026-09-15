import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ArcGap = "top" | "bottom" | "left" | "right";

const rotation: Record<ArcGap, string> = {
  bottom: "rotate-[135deg]",
  top: "-rotate-45",
  left: "rotate-[225deg]",
  right: "rotate-45",
};

/** 270° orange arc. Sized by the parent; place it absolutely over a circle. */
export function Arc({ gap = "bottom", className }: { gap?: ArcGap; className?: string }) {
  // Circumference of r=48 in a 100-unit box ≈ 301.6; 3/4 of it is visible.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={cn("pointer-events-none absolute inset-0 size-full", rotation[gap], className)}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="226.2 301.6"
        className="text-brand-500"
      />
    </svg>
  );
}

export type StatRingProps = ComponentProps<"div"> & {
  value: string;
  label: string;
  arc?: ArcGap;
};

export function StatRing({ value, label, arc = "bottom", className, ...props }: StatRingProps) {
  return (
    <div
      className={cn(
        "relative flex size-[clamp(11rem,18vw,15rem)] flex-col items-center justify-center rounded-full bg-mist text-center",
        className,
      )}
      {...props}
    >
      <Arc gap={arc} />
      <span className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-display text-ink">
        {value}
      </span>
      <span className="mt-3 font-sans text-base font-medium text-text-body">{label}</span>
    </div>
  );
}
