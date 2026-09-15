export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, matches Date#getDay

export type OpeningHours = { open: string; close: string } | null;

export const site = {
  name: "Brew & Co",
  tagline: "A neighbourhood coffee shop in Clapham",
  description:
    "Specialty coffee, fresh pastries and light lunches on Abbeville Road, Clapham. Open mic every Friday evening, coffee tasting every Saturday morning.",
  url: "https://brewandco.london",
  phone: "020 7946 0123",
  phoneHref: "tel:+442079460123",
  email: "hello@brewandco.london",
  address: {
    street: "14 Abbeville Road",
    area: "Clapham",
    city: "London",
    postcode: "SW4 9LA",
    country: "GB",
  },
  geo: { lat: 51.4553, lng: -0.1399 },
  /** Opening hours per weekday, 24-hour "HH:MM", London local time. */
  hours: {
    0: { open: "08:00", close: "16:00" },
    1: { open: "07:00", close: "18:00" },
    2: { open: "07:00", close: "18:00" },
    3: { open: "07:00", close: "18:00" },
    4: { open: "07:00", close: "18:00" },
    5: { open: "07:00", close: "22:00" },
    6: { open: "08:00", close: "18:00" },
  } satisfies Record<Weekday, OpeningHours>,
  social: {
    instagram: "https://instagram.com/brewandco.london",
    facebook: "https://facebook.com/brewandco.london",
  },
  maxPartySize: 12,
  reservationWindowDays: 60,
} as const;

export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function formatAddress() {
  const a = site.address;
  return `${a.street}, ${a.area}, ${a.city} ${a.postcode}`;
}

/** Groups consecutive weekdays with identical hours: "Mon–Thu 7am–6pm". */
export function hoursSummary(): Array<{ days: string; hours: string }> {
  const order: Weekday[] = [1, 2, 3, 4, 5, 6, 0];
  const short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const label = (h: OpeningHours) =>
    h ? `${formatClock(h.open)}–${formatClock(h.close)}` : "Closed";

  const groups: Array<{ from: Weekday; to: Weekday; hours: string }> = [];
  for (const day of order) {
    const hours = label(site.hours[day]);
    const last = groups[groups.length - 1];
    if (last && last.hours === hours) last.to = day;
    else groups.push({ from: day, to: day, hours });
  }
  return groups.map((g) => ({
    days: g.from === g.to ? short[g.from] : `${short[g.from]}–${short[g.to]}`,
    hours: g.hours,
  }));
}

/** "19:00" → "7pm", "07:30" → "7.30am" */
export function formatClock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}.${String(m).padStart(2, "0")}${suffix}`;
}
