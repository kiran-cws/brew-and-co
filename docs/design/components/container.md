# Container and Section

`Container` is the 1200px column with the page gutters. `Section` adds the vertical rhythm (`py-16 md:py-24`) and an optional `tone` for the mist footer background.

## Code

```tsx title="components/ui/container.tsx"
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
```

## Usage

```tsx
<Section aria-labelledby="products-title">
  <Container>
    <SectionHeading as="h2" title={<span id="products-title">Find your perfect brew</span>} />
  </Container>
</Section>
```
