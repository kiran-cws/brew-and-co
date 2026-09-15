/**
 * Calendar helpers pinned to Europe/London so server rendering gives the
 * same answer whether the machine runs in UTC, BST or anywhere else.
 * Dates are plain "YYYY-MM-DD" strings; times are "HH:MM".
 */

const TIME_ZONE = "Europe/London";

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export type LondonNow = {
  /** "YYYY-MM-DD" */
  date: string;
  /** Minutes since midnight, London wall clock */
  minutes: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
};

export function londonNow(instant: Date = new Date()): LondonNow {
  const p = Object.fromEntries(
    partsFormatter.formatToParts(instant).map((x) => [x.type, x.value]),
  ) as Record<string, string>;
  const date = `${p.year}-${p.month}-${p.day}`;
  return {
    date,
    minutes: Number(p.hour) * 60 + Number(p.minute),
    weekday: weekdayOf(date),
  };
}

/** Weekday of a calendar date, independent of time zone. */
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return toDateString(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate());
}

export function toDateString(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d));
  return (
    probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d
  );
}

export function isValidTime(time: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const [h, m] = time.split(":").map(Number);
  return h >= 0 && h <= 23 && m >= 0 && m <= 59;
}

/** "2026-09-18" → "Friday 18 September" (or with year when asked). */
export function formatLongDate(date: string, withYear = false): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function dateParts(date: string): { weekday: string; day: string; month: string } {
  const [y, m, d] = date.split("-").map(Number);
  const instant = new Date(Date.UTC(y, m - 1, d));
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(instant);
  return {
    weekday: fmt({ weekday: "short" }),
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "short" }),
  };
}
