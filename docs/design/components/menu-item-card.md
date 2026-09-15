# Menu item card

The café's replacement for the storefront product card. A hairline card with a square photo, the item name, badge chips, a one-line description and a GBP price. Two layouts:

```
row (menu page)                          tile (home page popular picks)
╭──────────────────────────────────╮     ╭──────────────╮
│ ┌────┐ Flat white         £4.75 │     │ ┌──────────┐ │
│ │img │ (Popular)                │     │ │   img    │ │
│ └────┘ Double ristretto under … │     │ └──────────┘ │
╰──────────────────────────────────╯     │ Flat white   │
                                         │ £4.75        │
                                         │ (Popular)    │
                                         │ Double ris…  │
                                         ╰──────────────╯
```

## Props

| Prop | Notes |
| --- | --- |
| `item` | `MenuItem` from `lib/menu.ts` |
| `image` | `StaticImageData` from `lib/menu-images.ts` |
| `layout` | `row` (default) or `tile` |

## Rules

- Price is Comfortaa 700 in `brand-700` (AA on white at 18px) and wrapped in `<data value>`. Formatted with `en-GB` / GBP.
- Badges are `rounded-pill bg-brand-100 text-brand-700 text-xs font-semibold`, rendered only when present, inside a `<ul aria-label="Badges">`.
- Name is Comfortaa 700: `text-xl` in `tile` layout, `text-lg` in `row` layout where the photo is only 96px tall.
- Photos are square-cropped at 96px (`sm:` 112px) in a `rounded-card` well with `object-cover` and blur placeholder.
- Hover shows `shadow-card`; no lift.

## Code

`components/ui/menu-item-card.tsx`.
