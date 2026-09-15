import { addDays, formatLongDate, londonNow, toMinutes, weekdayOf, dateParts } from "@/lib/london-time";
import { formatClock } from "@/lib/site";

export type EventRule = {
  slug: string;
  title: string;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  /** "HH:MM" London local */
  start: string;
  end: string;
  description: string;
  detail: string;
  image: { src: string; alt: string };
  /** Shown as a small note, e.g. free / ticketed */
  note: string;
};

export const eventRules: EventRule[] = [
  {
    slug: "open-mic",
    title: "Open mic night",
    weekday: 5,
    start: "19:00",
    end: "22:00",
    description: "Songs, poems and the occasional stand-up set. Sign up at the counter from 6pm.",
    detail:
      "Every Friday the tables get pushed back and the mic goes up by the window. Ten-minute slots, first come first served, and the kitchen keeps toasties going until nine.",
    image: { src: "/images/event-open-mic.webp", alt: "A singer with a guitar performing in a small café" },
    note: "Free entry",
  },
  {
    slug: "coffee-tasting",
    title: "Coffee tasting",
    weekday: 6,
    start: "10:00",
    end: "11:00",
    description: "Three single origins, brewed three ways, with Amara explaining what you're tasting.",
    detail:
      "A relaxed hour at the big table. You'll cup, pour and taste the week's beans side by side and leave knowing which one you actually like. Eight seats, book a spot at the counter or by phone.",
    image: { src: "/images/event-tasting.webp", alt: "Several cups of coffee laid out on a wooden table for a tasting" },
    note: "£8, includes a bag of beans",
  },
];

export type UpcomingEvent = EventRule & {
  /** "YYYY-MM-DD" */
  date: string;
  /** For <time dateTime>, local wall-clock without offset */
  dateTime: string;
  /** "Friday 18 September" */
  longDate: string;
  /** "7pm–10pm" */
  timeLabel: string;
  parts: { weekday: string; day: string; month: string };
};

/**
 * Next `count` occurrences across all rules, soonest first. An occurrence
 * that has already ended today is skipped. Pure calendar arithmetic on
 * London dates, so the result is identical on a UTC server.
 */
export function upcomingEvents(from: Date = new Date(), count = 4): UpcomingEvent[] {
  const now = londonNow(from);
  const out: UpcomingEvent[] = [];
  const horizonDays = Math.ceil(count / eventRules.length) * 7 + 7;

  for (let offset = 0; offset <= horizonDays && out.length < count; offset++) {
    const date = addDays(now.date, offset);
    const weekday = weekdayOf(date);
    for (const rule of eventRules) {
      if (rule.weekday !== weekday) continue;
      if (offset === 0 && now.minutes >= toMinutes(rule.end)) continue;
      out.push({
        ...rule,
        date,
        dateTime: `${date}T${rule.start}`,
        longDate: formatLongDate(date),
        timeLabel: `${formatClock(rule.start)}–${formatClock(rule.end)}`,
        parts: dateParts(date),
      });
    }
  }

  return out.slice(0, count);
}

export type EventSeries = EventRule & { next: UpcomingEvent[] };

/** Each rule with its next `perRule` occurrences; series ordered by soonest date. */
export function upcomingByRule(from: Date = new Date(), perRule = 3): EventSeries[] {
  const all = upcomingEvents(from, perRule * eventRules.length);
  return eventRules
    .map((rule) => ({ ...rule, next: all.filter((e) => e.slug === rule.slug).slice(0, perRule) }))
    .sort((a, b) => (a.next[0]?.date ?? "").localeCompare(b.next[0]?.date ?? ""));
}

export function eventBySlug(slug: string) {
  return eventRules.find((r) => r.slug === slug);
}
