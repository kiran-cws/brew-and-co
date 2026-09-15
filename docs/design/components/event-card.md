# Event card

One card per recurring event. The photo carries a date chip in its top-left corner (weekday, big day number, month, all in a white `rounded-tile` with `shadow-pill`), followed by the title, time, a one-line description, the following two dates, and a small orange note (price or "Free entry").

```
╭────────────────────────────────╮
│ ┌──────────────────────────┐   │
│ │ ┌────┐                   │   │
│ │ │Fri │      photo        │   │
│ │ │ 18 │                   │   │
│ │ │Sep │                   │   │
│ │ └────┘                   │   │
│ └──────────────────────────┘   │
│ Open mic night        7pm–10pm │
│ Songs, poems and the occasional│
│ Then 25 Sep, 2 Oct. Every Friday.│
│ Free entry                     │
╰────────────────────────────────╯
```

## Props

| Prop | Notes |
| --- | --- |
| `series` | `EventSeries` from `lib/events.ts`: the rule plus its next occurrences |
| `image` | Static import |

## Rules

- The date chip and the "Then …" dates are `<time dateTime="YYYY-MM-DDTHH:MM">`, London wall clock, no offset.
- Dates come from `upcomingByRule()` on the server; the page revalidates hourly so they never go stale.
- One card per event type. Never repeat a photo to pad the grid.

## Code

`components/ui/event-card.tsx`.
