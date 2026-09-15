# Dialog

A native `<dialog>` opened with `showModal()`, so focus trapping, the inert page behind, Escape to close and returning focus to the opener all come from the browser. Styled as a `rounded-card` paper panel with `shadow-card` on a 45% black backdrop; the page stops scrolling while it is open (`body:has(dialog[open])` in globals).

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░ ╭──────────────────────────────╮ ░░
░░ │ Reserve a table          [x] │ ░░
░░ │                              │ ░░
░░ │ (children)                   │ ░░
░░ ╰──────────────────────────────╯ ░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

## Props

| Prop | Notes |
| --- | --- |
| `open` | Controlled; the component calls `showModal()`/`close()` to match |
| `onClose` | Called on Escape, backdrop click, the close button, or a native close |
| `title` | Rendered as an `h2` and linked via `aria-labelledby` |

## Rules

- Mount the dialog only while it is open (the reserve button does this) so ids inside stay unique.
- Do not stack dialogs.
- Content width is capped at `max-w-lg`; forms inside use the standard `Input` and `Button`.

## Reserve button

`components/reservation/reserve-button.tsx` is the one opener on the site: a primary `Button` with `href="/reserve"` that, when JavaScript is available, prevents navigation and opens this dialog with the `ReservationForm`. Without JavaScript the link goes to the full `/reserve` page, which renders the same form.

## Code

`components/ui/dialog.tsx`.
