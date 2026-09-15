# Brew & Co style guide

Brew & Co sells cold brew to people who run on it: creators, night-shift workers, anyone who wants clean caffeine without bitterness. The site should feel like the product: pure, high-contrast, one bold flavour and nothing extra.

This guide is derived from `references/1.webp` and turned into rules the codebase can enforce. Tokens live in `tokens/`, components in `components/`, composed sections in `component-packs/`.

## 1. Principles

1. **One colour does the talking.** Black and white carry the page. Orange appears as a line, a ring, a price, a single word. The moment orange becomes a background, it stops being an accent. The only orange fills allowed are the accent button and the icon tile.
2. **Scale is the hierarchy.** Headings are not louder through colour or caps; they are simply enormous. The hero word runs edge to edge. Section titles are 48px. Body is 16px. There is nothing in between competing for attention.
3. **Round surfaces, hard actions.** Every container is rounded: cards, tiles, rings, rails. Primary buttons are the one hard rectangle on the page. That contrast is what makes them read as the thing to press.
4. **Product on white, photos in frames.** Product imagery is cut-out on pure white. Atmosphere photography (the café, the founders, an event) is allowed only in two places: a page hero, under a white wash so the headline stays black on near-white, and inside a `rounded-card` frame in a story row. Never as a wash behind text elsewhere.
5. **Decoration encodes structure.** Corner rails frame a story block and point toward its image. Arcs cradle circular media. Sparkles mark the start of a section, not every paragraph. If a device is not doing one of those jobs, remove it.

## 2. Colour

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#000000` | Headings, primary buttons, icons, wordmark |
| `brand-500` | `#FE6802` | Rails, arcs, prices, kicker lines, sparkles, accent buttons |
| `brand-600` | `#E05A00` | Accent button hover |
| `brand-700` | `#B84A00` | Orange text smaller than 18px (AA on white) |
| `brand-200` | `#FFD5AD` | Icon tile fill |
| `brand-50` | `#FFF4EB` | Rare: a tinted well behind an icon |
| `paper` | `#FFFFFF` | Page background |
| `mist` | `#FAFAFA` | Footer, stat ring fill |
| `fog` | `#F2F2F2` | Feature pill bar, image well |
| `line` | `#E6E6E6` | Card hairlines |
| `line-strong` | `#C2C2C2` | Input borders |
| `line-ink` | `#363636` | Outline button border |
| `text-body` | `#5C5C5C` | Paragraphs |
| `text-muted` | `#8A8A8A` | Footer links, captions |

Rules:

- Orange on white at 16px fails AA (3.0:1). Use `brand-500` only for text at 18px+ and weight 600+, or for non-text marks. Use `brand-700` for smaller orange text such as prices in a card footer.
- White on `brand-500` is 3.0:1. Accent buttons therefore use 16px+ at weight 700 and are reserved for secondary CTAs (footer callback, promo). Primary CTAs are always black.
- There is no dark mode. The reference is a single, white-paper look. `globals.css` should not swap the palette on `prefers-color-scheme`.
- Never use a neutral grey shadow. Shadows are orange-tinted (`shadow-card`) so elevation feels warm.

## 3. Typography

Two families, clearly distinct:

| Role | Family | Weight | Notes |
| --- | --- | --- | --- |
| Hero word | Comfortaa | 300 | `text-display`, one line, tracking -0.02em, line-height 0.92 |
| Section titles | Comfortaa | 700 | `text-3xl` mobile / `text-4xl` desktop, centred, max 2 lines |
| Card titles | Comfortaa | 700 | `text-xl` |
| Stat numbers, prices | Comfortaa | 700 | `text-stat` / `text-2xl` |
| Wordmark | Comfortaa | 500 | "Brew & Co" with an orange full stop |
| Body | Raleway | 400 | `text-base`, line-height 1.7, colour `text-body`, max width `container-prose` |
| Kicker (line above a heading) | Raleway | 600 | `text-lg`, `brand-500`, sentence case, no tracking |
| Nav, labels | Raleway | 500 | `text-sm` or `text-base` |
| Buttons | Raleway | 600 | `text-base`; accent button 700 |
| Footer links, captions | Raleway | 400 | `text-sm`, `text-muted` |

Rules:

- Lining numerals everywhere. `tokens.css` sets `font-feature-settings: "lnum"` on `html` because Raleway defaults to old-style figures.
- No all-caps. Not for labels, not for buttons, not for kickers. The reference uses none and the rounded Comfortaa looks wrong in caps.
- No single-word colour accents inside a heading. The orange sits on its own line above the heading (the kicker) or in a self-contained element (a price).
- Section titles are centred. Hero copy, story blocks and footer are left-aligned. The one exception is the menu page, where each category heading sits left with its blurb to the right so the page reads like a board. Never justify.
- Line length: body text lives inside `max-w-prose` (40rem). Card blurbs are one or two lines at `text-sm`.
- Headings use `text-wrap: balance` (set in base layer).

Type scale (rem): 0.75 / 0.875 / 1 / 1.125 / 1.375 / 1.75 / 2.25 / 3 / 4 / 5.5 / display clamp(4.5rem, 15vw, 13.5rem).

## 4. Layout and spacing

- **Container**: 1200px (`max-w-page`) centred, `px-4 sm:px-6`.
- **Section rhythm**: `py-16 md:py-24`. A section heading block (title + lede) gets `mb-12 md:mb-16` before its content.
- **Grid**: 12 columns are implied; in practice use `grid-cols-1 md:grid-cols-2` for story splits and `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for cards, with `gap-6 lg:gap-8`.
- **Spacing steps** (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96. Use 24/32 inside cards, 48/64 between blocks, 96 between sections.
- **Alternation**: story sections alternate image-left / image-right. The corner rail always sits on the text side and turns toward the image.

Page skeleton from the reference:

```
┌─────────────────────────────────────────────────────────┐
│ Navbar: wordmark · links with / separators · Sign in · 🛒 │
├─────────────────────────────────────────────────────────┤
│ Hero: kicker · DISPLAY WORD · glass on glow             │
│   copy + Buy now (left) · feature pills + price (right) │
├─────────────────────────────────────────────────────────┤
│ Stats strip: title · lede · three rings with arcs       │
├─────────────────────────────────────────────────────────┤
│ Story split: title · image | copy, rails, alternating   │
├─────────────────────────────────────────────────────────┤
│ Product grid: title · lede · three cards                │
├─────────────────────────────────────────────────────────┤
│ Feature showcase: arc media | copy + Explore, ×2 flipped│
├─────────────────────────────────────────────────────────┤
│ Testimonials: title · lede · two cards                  │
├─────────────────────────────────────────────────────────┤
│ Newsletter: DISPLAY WORD · arc media | kicker+title+form│
├─────────────────────────────────────────────────────────┤
│ Footer (mist): wordmark+blurb+social · 2 link cols · form│
└─────────────────────────────────────────────────────────┘
```

## 5. Shape

| Token | Value | Applies to |
| --- | --- | --- |
| `rounded-none` | 0 | Primary (black) button, newsletter submit |
| `rounded-control` | 6px | Inputs, outline button, accent button, small dark icon buttons |
| `rounded-tile` | 12px | Icon tiles, feature pills |
| `rounded-card` | 20px | Product cards, testimonial cards, image wells |
| `rounded-rail` | 24px | The turn in a corner rail |
| `rounded-full` | circle | Stat rings, arc media, avatars, seal, cart button |

The 0-radius primary button is the brand's signature. Do not round it "for consistency".

## 6. Brand devices

**Corner rail.** A 2px orange line that runs along one edge of a text block and turns a 24px radius corner to run along a second edge, pointing toward the paired image. One rail per story block. It never forms a closed box.

**Arc.** A 6px orange stroke covering 270° of a circle, open at the bottom (or rotated so the opening faces the copy). It cradles circular product media and the stat rings. The gap is what makes it feel hand-placed rather than a border.

**Sparkle.** A four-point star, 20–28px, black in the hero, orange elsewhere. At most two per section, placed off-grid near a heading or ring.

**Seal.** A circular "100% original" stamp in the hero's top-right, grey ink on white, text on a circular path. Decorative; `aria-hidden`.

**Watermark.** The wordmark repeated vertically at display size, outlined at 8% black, bleeding off the hero's right edge. Hidden below `lg`.

**Glow.** A radial orange gradient behind the hero glass only. Animates in once on load (`animate-glow-in`); no other entrance animations on the page.

## 7. Elevation

Three levels, no more:

1. Flat with a hairline (`border-line`): product cards, inputs.
2. `shadow-card`: testimonial cards, product cards on hover.
3. `shadow-glow`: the hero glass only.

Feature pills use `shadow-pill`, a short cool shadow that makes them read as stacked chips.

## 8. Motion

- **One orchestrated moment**: on load the hero glow scales in (900ms) and the hero copy rises (700ms, staggered 100ms). Nothing else animates on scroll.
- **Responsive motion**: buttons darken/lighten on hover (180ms) and compress 1px on press (120ms). Inputs change border colour on focus.
- **Reduced motion**: the base layer collapses all animations and transitions when `prefers-reduced-motion: reduce` is set.
- Do not add hover lifts to cards or fade-ins per section. They flatten the brand into a template.

## 9. Imagery

- Product photography is cut-out on pure white. Transparent PNG or WebP with a white matte.
- Atmosphere photography (interior, people, events) is a real photo, never a stock-looking render. Warm light, shallow depth, no text or logos in frame. It appears only in page heroes (behind a left-side white wash, `bg-gradient-to-r from-paper via-paper/90 to-transparent`), inside `rounded-card` frames with `object-cover`, or cropped into an arc-media circle (`fit="cover"`, `overflow={false}`). Menu item photos are square-cropped in a `rounded-card` at 96px.
- Circular media crops the image inside a circle with a soft drop shadow beneath the cup or bowl so it sits on the page rather than floating.
- Ingredients (beans, berries, ice) may spill outside the crop; the crop is the arc, not a clip.
- Avatars are circles, 88px, with a 1px `line` ring.
- Use `next/image` with `sizes` set; hero image is `preload` (the only image that is; `priority` is deprecated in Next 16).

## 10. Iconography

- 1.5px stroke, round caps, 20px on a 44px tile. Icons in tiles are `brand-500` on `brand-200`.
- Social icons are white on 32px black `rounded-control` squares.
- Cart is white on a 40px black circle.
- Nav separators are literal `/` characters in `text-muted`, not icons.

## 11. Voice and copy

The brand talks like a barista who has already made your drink: short, confident, direct.

- Sentence case for everything, including buttons and nav.
- Buttons say what happens: "Buy now", "Order now", "Explore the brew", "Subscribe", "Request a callback".
- Kickers are one short clause in orange: "Pure caffeine, nothing extra." "Subscribe and take 10% off your first order."
- Headings are promises or facts, not puns: "Brewing success one sip at a time." "Find your perfect brew."
- Body copy is two to four sentences. It describes the product plainly (16-hour steep, 65% less acidity, twice the caffeine) rather than selling a lifestyle.
- Empty and error states give direction: "Enter an email address like name@example.com." "We couldn't send that. Check your connection and try again."

## 12. Accessibility

- Contrast: black on white 21:1; `text-body` 6.1:1; `text-muted` 3.5:1 (large text or non-essential only); `brand-700` on white 5.0:1.
- Focus: 2px `brand-500` outline, 3px offset, on every interactive element (set globally in `tokens.css`).
- Every icon-only button has a visible-to-screen-reader label.
- Decorative devices (rails, arcs, sparkles, seal, watermark) are `aria-hidden`.
- Stat rings are not progress bars; they carry no `role`.
- Targets are at least 44px tall on touch.
- Headings follow a single `h1` (hero word) then `h2` per section, `h3` per card.

## 13. Don'ts

- No cream, beige or terracotta. The paper is white and the accent is this orange.
- No gradient text, no gradient buttons.
- No tracked-out uppercase labels.
- No arrows appended to button text.
- No uniform card kits: cards appear only where content is a set (products, testimonials).
- No numbered markers unless the content is a sequence.
- No second accent colour.
