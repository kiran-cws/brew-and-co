# Menu page

`/menu` is built to feel like reading the board at the counter: a short intro, a sticky row of category chips, then one band per category with a heading, a blurb and the items in two columns. Bands alternate paper and mist so each category has its own place on the page.

```
              Everything we make, priced as it is at the counter.
                              The menu
   Milk drinks come with oat, soya or skimmed at no extra cost…

  ┌ sticky ─────────────────────────────────────────────────────┐
  │ (Espresso) (Espresso drinks) (Pastries) (Sandwiches) (Cold…)│
  └─────────────────────────────────────────────────────────────┘
  Espresso                       Our house blend, pulled the same…
  ╭ row card ╮  ╭ row card ╮
  ╭ row card ╮  ╭ row card ╮
  ░░ Espresso drinks (mist band) ░░
  …
                          Decided?
                     [ Reserve a table ]
```

## Category nav (`components/sections/menu-category-nav.tsx`)

- Server-rendered `<nav aria-label="Menu categories">` of anchor links; works without JavaScript.
- `"use client"` only to set `aria-current="location"` from an `IntersectionObserver` (`rootMargin: -96px 0px -55% 0px`) and to scroll the active chip into view on narrow screens.
- Chips: `rounded-pill`, 40px tall; active chip is `bg-ink text-white`. The scroller has inner padding so focus rings are not clipped.
- Category sections carry `scroll-mt-24` and the root has `scroll-behavior: smooth` under `motion-safe`.

## Rules

- Items render with `MenuItemCard` in `row` layout, two columns from `md`.
- Heading order: `h1` "The menu", `h2` per category, `h3` per item.
- The closing "Decided?" block repeats the reserve call to action; keep it short.

## Code

`app/menu/page.tsx`.
