# Page composition

The storefront home page is the packs in reference order. Everything is a server component except the navbar (mobile toggle) and the newsletter form (pending state), so the page ships almost no client JavaScript.

```tsx title="app/page.tsx"
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { StorySplit } from "@/components/sections/story-split";
import { ProductGrid } from "@/components/sections/product-grid";
import { FeatureShowcase } from "@/components/sections/feature-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { NewsletterCta } from "@/components/sections/newsletter-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar currentPath="/" />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <StorySplit />
        <ProductGrid />
        <FeatureShowcase />
        <Testimonials />
        <NewsletterCta />
      </main>
      <Footer />
    </>
  );
}
```

## Assets to add to `public/images/`

| File | Section | Notes |
| --- | --- | --- |
| `hero-cold-brew.png` | Hero | Tall glass, cut-out, ~1200×1600 |
| `story-glass-top.png` | Story split | Top-down glass with beans, ~1200×900 |
| `story-three-drinks.png` | Story split | Three topped iced coffees, ~1400×900 |
| `product-pure-black.png` | Products | 1000×1250 |
| `product-mocha-fix.png` | Products | 1000×1250 |
| `product-oat.png` | Products | 1000×1250 |
| `feature-beans-bowl.png` | Feature showcase | Square, ~1200×1200 |
| `feature-glass.png` | Feature showcase | Square |
| `newsletter-courier.png` | Newsletter | Square illustration |
| `avatar-irene.jpg`, `avatar-jonas.jpg` | Testimonials | 176×176 |

All product art is cut-out on transparent or pure white. Remote hosts need `images.remotePatterns` in `next.config.ts`.

## Metadata

`app/layout.tsx` (see `../README.md`) sets the title and description. Add an Open Graph image with `app/opengraph-image.tsx` using the hero word on white with the orange full stop; keep it to the two brand colours.
