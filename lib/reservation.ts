import {
  addDays,
  formatLongDate,
  isValidDate,
  isValidTime,
  londonNow,
  toMinutes,
  weekdayOf,
} from "@/lib/london-time";
import { formatClock, site, type Weekday } from "@/lib/site";

export type ReservationField = "name" | "partySize" | "date" | "time";

export type ReservationValues = Record<ReservationField, string>;

export type Reservation = {
  name: string;
  partySize: number;
  /** "YYYY-MM-DD" */
  date: string;
  /** "HH:MM" */
  time: string;
};

export type ValidationResult =
  | { ok: true; value: Reservation }
  | { ok: false; errors: Partial<Record<ReservationField, string>> };

const MIN_LEAD_MINUTES = 30;
const SLOT_MINUTES = 15;
/** Last slot must start this long before closing. */
const LAST_SEATING_MINUTES = 60;

export function reservationLimits(now = londonNow()) {
  return {
    minDate: now.date,
    maxDate: addDays(now.date, site.reservationWindowDays),
    maxPartySize: site.maxPartySize,
    slotMinutes: SLOT_MINUTES,
  };
}

export function validateReservation(raw: ReservationValues, now = londonNow()): ValidationResult {
  const errors: Partial<Record<ReservationField, string>> = {};

  const name = raw.name.trim();
  if (name.length < 2) errors.name = "Enter the name the table is for.";
  else if (name.length > 80) errors.name = "Keep the name under 80 characters.";

  const partySize = Number(raw.partySize);
  if (!raw.partySize.trim() || !Number.isInteger(partySize) || partySize < 1) {
    errors.partySize = "Enter how many people are coming, from 1 to 12.";
  } else if (partySize > site.maxPartySize) {
    errors.partySize = `For parties over ${site.maxPartySize}, call us on ${site.phone} and we'll sort it.`;
  }

  const date = raw.date.trim();
  const { minDate, maxDate } = reservationLimits(now);
  if (!isValidDate(date)) {
    errors.date = "Choose a date.";
  } else if (date < minDate) {
    errors.date = "That date has passed. Choose today or later.";
  } else if (date > maxDate) {
    errors.date = `We take bookings up to ${site.reservationWindowDays} days ahead, until ${formatLongDate(maxDate)}.`;
  }

  const time = raw.time.trim();
  if (!isValidTime(time)) {
    errors.time = "Choose a time.";
  } else if (toMinutes(time) % SLOT_MINUTES !== 0) {
    errors.time = "Pick a time on the quarter hour, like 10:15 or 10:30.";
  } else if (!errors.date) {
    const weekday = weekdayOf(date) as Weekday;
    const hours = site.hours[weekday];
    const minutes = toMinutes(time);
    if (!hours) {
      errors.time = "We're closed that day.";
    } else if (minutes < toMinutes(hours.open) || minutes > toMinutes(hours.close) - LAST_SEATING_MINUTES) {
      const last = toMinutes(hours.close) - LAST_SEATING_MINUTES;
      errors.time = `On that day we seat from ${formatClock(hours.open)} until ${formatClock(minutesToClock(last))}.`;
    } else if (date === now.date && minutes < now.minutes + MIN_LEAD_MINUTES) {
      errors.time = `Give us at least ${MIN_LEAD_MINUTES} minutes' notice for today.`;
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, partySize, date, time } };
}

export function reservationSummary(r: Reservation): string {
  const guests = r.partySize === 1 ? "one" : String(r.partySize);
  return `Table for ${guests} on ${formatLongDate(r.date)} at ${formatClock(r.time)}.`;
}

function minutesToClock(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
