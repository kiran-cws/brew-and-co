# Product grid

Two-line centred heading, lede, three product cards. On tablet the grid drops to two columns and on phones to one.

```
            Find your perfect brew.
            Shop the collection.
  Explore bold, smooth, high-caffeine cold brews crafted for every taste.

  ╭────────╮  ╭────────╮  ╭────────╮
  │  img   │  │  img   │  │  img   │
  │ Pure   │  │ Mocha  │  │ Oat    │
  │ black  │  │ fix    │  │ cold   │
  │$8 [Ord]│  │$8 [Ord]│  │$8 [Ord]│
  ╰────────╯  ╰────────╯  ╰────────╯
```

## Code

```tsx title="components/sections/product-grid.tsx"
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard, type Product } from "@/components/ui/product-card";

const defaultProducts: Product[] = [
  {
    slug: "pure-black",
    name: "Pure black",
    blurb: "Classic, unfiltered and packed with bold energy.",
    price: 8,
    image: { src: "/images/product-pure-black.png", alt: "A pint glass of black cold brew with foam" },
  },
  {
    slug: "mocha-fix",
    name: "Mocha fix",
    blurb: "Rich dark chocolate meets smooth caffeine.",
    price: 8,
    image: { src: "/images/product-mocha-fix.png", alt: "A glass of mocha cold brew" },
  },
  {
    slug: "oat-cold-brew",
    name: "Oat cold brew",
    blurb: "Dairy-free, naturally sweet and perfectly balanced.",
    price: 8,
    image: { src: "/images/product-oat.png", alt: "A glass of oat-milk cold brew over ice" },
  },
];

export function ProductGrid({ products = defaultProducts }: { products?: Product[] }) {
  return (
    <Section aria-labelledby="products-title">
      <Container>
        <SectionHeading
          title={
            <span id="products-title">
              Find your perfect brew.
              <br /> Shop the collection.
            </span>
          }
          lede="Explore bold, smooth, high-caffeine cold brews crafted for every taste."
        />

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:mt-16">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
```
