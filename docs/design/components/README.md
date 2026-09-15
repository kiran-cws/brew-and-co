# Components

Each spec in this folder documents one primitive: what it is for, its anatomy, variants, states and accessibility, followed by the complete TSX to copy into `components/ui/`.

Conventions shared by every component:

- Props extend the underlying element's props (`React.ComponentProps<"button">`), so `id`, `aria-*`, `onClick` and friends pass through.
- `className` is merged last with `cn()` from `@/lib/cn`.
- No hex values, no magic numbers: only theme utilities from `tokens/tokens.css`.
- Server component unless the file starts with `"use client"`.
- Decorative parts are `aria-hidden`.

Every ```tsx block carries a `title="..."` with the destination path. `scripts` are not provided; copy by hand or use the one-liner in the root README.

| Component | Spec |
| --- | --- |
| Button | [button.md](button.md) |
| Icon button | [icon-button.md](icon-button.md) |
| Nav link | [nav-link.md](nav-link.md) |
| Input, inline form | [input.md](input.md) |
| Icon tile, feature pill | [feature-pill.md](feature-pill.md) |
| Stat ring | [stat-ring.md](stat-ring.md) |
| Arc media | [arc-media.md](arc-media.md) |
| Corner rail | [corner-rail.md](corner-rail.md) |
| Sparkle | [sparkle.md](sparkle.md) |
| Seal | [seal.md](seal.md) |
| Section heading | [section-heading.md](section-heading.md) |
| Product card | [product-card.md](product-card.md) |
| Testimonial card | [testimonial-card.md](testimonial-card.md) |
| Logo | [logo.md](logo.md) |
| Container | [container.md](container.md) |
| Icons | [icons.md](icons.md) |
| Menu item card | [menu-item-card.md](menu-item-card.md) |
| Event card | [event-card.md](event-card.md) |
| Dialog | [dialog.md](dialog.md) |
