# Component packs

Composed sections that make up the storefront, in page order. Each pack is a server component (unless noted) built only from the primitives in `../components/`, with real copy and real product data shapes so it can be dropped into `components/sections/` and rendered.

| Pack | File | Client? | Primitives used |
| --- | --- | --- | --- |
| Navbar | [navbar.md](navbar.md) | yes (mobile toggle) | Logo, NavList, Button, IconButton, icons |
| Hero | [hero.md](hero.md) | no | Container, Button, FeaturePillStack, Sparkle, Seal, icons |
| Stats strip | [stats-strip.md](stats-strip.md) | no | Section, SectionHeading, StatRing, Sparkle |
| Story split | [story-split.md](story-split.md) | no | Section, SectionHeading, CornerRail |
| Product grid | [product-grid.md](product-grid.md) | no | Section, SectionHeading, ProductCard |
| Feature showcase | [feature-showcase.md](feature-showcase.md) | no | Section, SectionHeading, ArcMedia, CornerRail, Button |
| Testimonials | [testimonials.md](testimonials.md) | no | Section, SectionHeading, TestimonialCard |
| Newsletter CTA | [newsletter-cta.md](newsletter-cta.md) | form only | ArcMedia, Input, InlineForm, Button |
| Footer | [footer.md](footer.md) | no | Container, Logo, IconButton, Input, Button |
| Page | [page.md](page.md) | no | all of the above |
| Photo hero | [photo-hero.md](photo-hero.md) | no | Container, Sparkle, Button, ReserveButton |
| Menu page | [menu-page.md](menu-page.md) | nav only | SectionHeading, MenuItemCard, ReserveButton |

Assets referenced (`/images/...`) do not exist yet in `public/`. They are cut-out product shots on white; see style-guide §9.
