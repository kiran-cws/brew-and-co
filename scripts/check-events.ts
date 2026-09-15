/**
 * Sanity check for lib/events.ts and lib/reservation.ts under any TZ.
 *   TZ=UTC node --experimental-strip-types --import ./scripts/loader.mjs scripts/check-events.ts
 *   TZ=Asia/Kolkata node --experimental-strip-types --import ./scripts/loader.mjs scripts/check-events.ts
 * Both runs must print identical output.
 */
import { upcomingEvents } from "../lib/events";
import { londonNow } from "../lib/london-time";
import { validateReservation } from "../lib/reservation";

// Fixed instant: Friday 18 Sep 2026, 21:30 UTC (22:30 BST) — open mic still running.
const fixed = new Date("2026-09-18T21:30:00Z");
const now = londonNow(fixed);
console.log("London now:", now);

const events = upcomingEvents(fixed, 4);
console.log(events.map((e) => `${e.parts.weekday} ${e.date} ${e.timeLabel} ${e.title}`).join("\n"));

const fails: string[] = [];
if (events.length !== 4) fails.push("expected 4 events");
if (events[0]?.slug !== "coffee-tasting" || events[0]?.date !== "2026-09-19") fails.push("first should be tasting Sat 19 Sep (Fri open mic already ended at 22:00 BST)");
if (events[1]?.date !== "2026-09-25") fails.push("second should be Fri 25 Sep");
if (!events.every((e, i, arr) => i === 0 || arr[i - 1].date < e.date)) fails.push("not sorted");

const bad = validateReservation({ name: "A", partySize: "13", date: "2026-09-10", time: "10:07" }, now);
console.log("invalid:", bad);
if (bad.ok || Object.keys(bad.errors).length !== 4) fails.push("expected 4 field errors");

const good = validateReservation({ name: "Amara", partySize: "4", date: "2026-09-25", time: "19:00" }, now);
console.log("valid:", good);
if (!good.ok) fails.push("expected valid Friday 19:00");

const late = validateReservation({ name: "Amara", partySize: "2", date: "2026-09-20", time: "15:30" }, now);
if (late.ok) fails.push("Sunday 15:30 is after last seating (16:00 close)");

if (fails.length) {
  console.error("FAIL:\n- " + fails.join("\n- "));
  process.exit(1);
}
console.log("OK");
