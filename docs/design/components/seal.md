# Seal

A circular stamp reading "100% original" with "satisfaction guaranteed" on the outer ring. Grey ink on white, slightly rotated, top-right of the hero. It is the one piece of pure ornament on the page, so it stays small (96px) and quiet.

## Code

```tsx title="components/ui/seal.tsx"
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Seal({ className, ...props }: Omit<ComponentProps<"svg">, "children">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={cn("size-24 -rotate-12 text-text-muted", className)}
      {...props}
    >
      <defs>
        <path id="seal-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
      <text
        fontFamily="var(--font-sans)"
        fontSize="8"
        fontWeight="600"
        letterSpacing="1.5"
        fill="currentColor"
      >
        <textPath href="#seal-ring" startOffset="2%">
          SATISFACTION
        </textPath>
        <textPath href="#seal-ring" startOffset="52%">
          GUARANTEED
        </textPath>
      </text>
      <text
        x="60"
        y="55"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="12"
        fontWeight="700"
        fill="currentColor"
      >
        100%
      </text>
      <text
        x="60"
        y="71"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
      >
        Original
      </text>
    </svg>
  );
}
```

The ring text is the single place uppercase is allowed: a stamp is a stamp.
