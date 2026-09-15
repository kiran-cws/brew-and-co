"use server";

import {
  reservationSummary,
  validateReservation,
  type ReservationField,
  type ReservationValues,
} from "@/lib/reservation";

export type ReserveState =
  | { status: "idle"; values?: ReservationValues }
  | { status: "error"; errors: Partial<Record<ReservationField, string>>; message?: string; values: ReservationValues }
  | { status: "success"; summary: string; values?: ReservationValues };

export async function reserve(_prev: ReserveState, formData: FormData): Promise<ReserveState> {
  const values: ReservationValues = {
    name: String(formData.get("name") ?? ""),
    partySize: String(formData.get("partySize") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
  };

  const result = validateReservation(values);
  if (!result.ok) {
    return { status: "error", errors: result.errors, values };
  }

  // TODO: send to booking system (email, Google Calendar, or a reservations table).
  // Nothing is stored yet; the confirmation below is the whole flow.

  return { status: "success", summary: reservationSummary(result.value) };
}
