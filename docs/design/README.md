# Brew & Co design system

A design system for the Brew & Co storefront, built for this repository's stack: Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4 with CSS-first `@theme` tokens. It is derived from the reference in `references/1.webp`.

```
docs/design/
├── README.md              ← you are here: structure, quick start, conventions
├── style-guide.md         ← brand principles, colour, type, layout, shape, motion, voice, a11y
├── preview.html           ← open in a browser: tokens and components rendered
├── tokens/
│   ├── tokens.css         ← Tailwind v4 @theme + base layer (paste into app/globals.css)
│   └── tokens.json        ← same tokens in W3C DTCG JSON for Figma / tooling
├── components/            ← one spec per primitive, each with a complete TSX file
└── component-packs/       ← composed page sections built from the primitives
```

## Quick start

1. **Tokens.** Replace the contents of `app/globals.css` with `tokens/tokens.css`.

2. **Fonts.** Load Comfortaa and Raleway with `next/font/google` in `app/layout.tsx` and expose them as the CSS variables the theme expects:

```tsx title="app/layout.tsx"
import type { Metadata } from "next";
import { Comfortaa, Raleway } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brew & Co — Cold brew, nothing extra",
  description:
    "Slow-steeped cold brew with 65% less acidity and twice the caffeine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${comfortaa.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

Both fonts are variable, so no `weight` array is needed; Comfortaa serves 300–700 and Raleway 100–900 from one file each.

3. **Helper.** Create `lib/cn.ts` (used by every component):

```ts title="lib/cn.ts"
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
```

No extra dependencies are required. If you later add `clsx` and `tailwind-merge`, swap the body of `cn` and nothing else changes.

4. **Components.** Copy the TSX from each spec in `components/` into `components/ui/` and from `component-packs/` into `components/sections/`. The specs use `@/components/ui/...` and `@/lib/cn` imports, which match this repo's `@/*` path alias.

5. **Page.** `component-packs/page.md` composes the storefront reference; the live café site (`app/`, `components/`) uses the photo hero, menu page and event card packs instead.

## Conventions

- **Tailwind first.** Components are styled with utilities that reference theme tokens (`bg-ink`, `text-brand-500`, `rounded-card`, `font-display`). Raw hex values in a component are a bug.
- **Server components by default.** Only components that hold state or handle events carry `"use client"` (the newsletter form, the nav toggle).
- **`className` last.** Every component accepts `className` and merges it after its own classes so callers can adjust spacing.
- **Links are `next/link`.** A `Button` given `href` renders a `Link`; otherwise a `<button>`.
- **Images are `next/image`.** Product art is cut-out on white; see style-guide §9.
- **Decoration is `aria-hidden`.** Rails, arcs, sparkles, seals and watermarks never reach assistive tech.
- **Copy is sentence case.** Buttons, nav, headings, labels. See style-guide §11.

## Primitives

| Component | File | Purpose |
| --- | --- | --- |
| Button | `components/button.md` | Primary (black, square), accent (orange), outline, ghost |
| Icon button | `components/icon-button.md` | Cart circle, social squares |
| Nav link | `components/nav-link.md` | Link list with `/` separators |
| Input | `components/input.md` | Text/email/tel field and the input + button inline form |
| Icon tile & feature pill | `components/feature-pill.md` | Orange tile with icon; tile + label chip |
| Stat ring | `components/stat-ring.md` | Circle with 270° arc, number, label |
| Arc media | `components/arc-media.md` | Circular image cradled by an orange arc, optional tag |
| Corner rail | `components/corner-rail.md` | Two-edge orange frame with a rounded turn |
| Sparkle | `components/sparkle.md` | Four-point star ornament |
| Seal | `components/seal.md` | Circular "100% original" stamp |
| Section heading | `components/section-heading.md` | Centred title + lede, optional kicker |
| Product card | `components/product-card.md` | Image well, name, blurb, price, order button |
| Testimonial card | `components/testimonial-card.md` | Avatar, name, quote |
| Logo | `components/logo.md` | Wordmark with orange full stop |
| Container | `components/container.md` | 1200px column with gutters |
| Icons | `components/icons.md` | Inline SVG icon set |
| Menu item card | `components/menu-item-card.md` | Café menu row / tile with photo, badges, GBP price |
| Event card | `components/event-card.md` | Recurring event with date chip and next dates |
| Dialog | `components/dialog.md` | Native modal used by the reserve button |

## Component packs

| Pack | File |
| --- | --- |
| Navbar | `component-packs/navbar.md` |
| Hero | `component-packs/hero.md` |
| Stats strip | `component-packs/stats-strip.md` |
| Story split | `component-packs/story-split.md` |
| Product grid | `component-packs/product-grid.md` |
| Feature showcase | `component-packs/feature-showcase.md` |
| Testimonials | `component-packs/testimonials.md` |
| Newsletter CTA | `component-packs/newsletter-cta.md` |
| Footer | `component-packs/footer.md` |
| Page composition | `component-packs/page.md` |
| Photo hero | `component-packs/photo-hero.md` |
| Menu page | `component-packs/menu-page.md` |

## Maintaining

- Change a value in `tokens/tokens.css` and mirror it in `tokens/tokens.json`. Components never hard-code values, so the change propagates.
- When adding a component, write the spec first (anatomy, variants, states, a11y) and keep its TSX complete and self-contained so it can be copied verbatim.
- Re-check contrast whenever orange text is added; see style-guide §2.
