# Photo hero

The café site's page opener: a full-bleed atmosphere photograph with a white wash rising from the left, so the headline sits black on near-white paper while the room shows through on the right. Used on the home page (`size="lg"`, `preload`) and the about page (`size="md"`).

```
┌──────────────────────────────────────────────────────────────┐
│ ✦ A neighbourhood coffee shop in Clapham        ░░▒▒▓▓ photo │
│                                                  ░░▒▒▓▓      │
│ Good morning,                                    ░░▒▒▓▓      │
│ Clapham.                                         ░░▒▒▓▓      │
│ Specialty coffee, pastries laminated before…     ░░▒▒▓▓      │
│ [ Reserve a table ]  [ See the menu ]            ░░▒▒▓▓      │
└──────────────────────────────────────────────────────────────┘
```

## Props

| Prop | Notes |
| --- | --- |
| `image`, `alt` | Static import so `next/image` gets size and blur; `alt` describes the room, not the brand |
| `kicker` | Sentence-case clause with an ink sparkle in front |
| `title` | Comfortaa 300. `lg` reaches 6.5rem; `md` 4rem |
| `lede` | One or two sentences in `text-body` |
| `actions` | Usually a primary `ReserveButton` and an outline `Button` |
| `preload` | Only on the home page; it is the LCP image |
| `size` | `lg` (home) or `md` (inner pages) |

## Rules

- The wash is `from-paper via-paper/90 to-paper/15` (denser on phones). Headline contrast must stay 21:1; if a photo is too bright on the left, pick another photo rather than darkening text.
- No text over the unwashed photo. Copy is confined to the container's left column.
- This is the only section with entrance animation (`animate-rise-in`, staggered 100ms).

## Code

The implementation lives at `components/sections/photo-hero.tsx`.
