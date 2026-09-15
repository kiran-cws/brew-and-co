"use client";

import { useActionState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { reserve, type ReserveState } from "@/app/actions/reserve";
import { reservationLimits } from "@/lib/reservation";
import { site } from "@/lib/site";

type Props = {
  /** Called from the confirmation's "Done" button (dialog use). */
  onDone?: () => void;
  /** Server pages pass this so the min/max dates match the render; the dialog computes it on open. */
  limits?: ReturnType<typeof reservationLimits>;
};

const initial: ReserveState = { status: "idle" };

export function ReservationForm({ onDone, limits = reservationLimits() }: Props) {
  const [state, formAction, pending] = useActionState<ReserveState, FormData>(reserve, initial);
  const id = useId();
  const values = state.values;
  const errors = state.status === "error" ? state.errors : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <p className="font-display text-xl font-bold text-ink">Reserved.</p>
        <p className="font-sans text-base text-text-body">{state.summary}</p>
        <p className="font-sans text-sm text-text-muted">
          We hold tables for 15 minutes. If plans change, call us on{" "}
          <a href={site.phoneHref} className="text-ink underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
        {onDone ? (
          <Button onClick={onDone} className="mt-2">
            Close
          </Button>
        ) : (
          <Button href="/" className="mt-2">
            Back to home
          </Button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <Input
        id={`${id}-name`}
        name="name"
        label="Name"
        showLabel
        autoComplete="name"
        placeholder="Who is the table for?"
        minLength={2}
        maxLength={80}
        required
        defaultValue={values?.name}
        error={errors?.name}
      />
      <Input
        id={`${id}-party`}
        name="partySize"
        type="number"
        label="Party size"
        showLabel
        inputMode="numeric"
        min={1}
        max={limits.maxPartySize}
        placeholder="How many people?"
        required
        defaultValue={values?.partySize}
        error={errors?.partySize}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id={`${id}-date`}
          name="date"
          type="date"
          label="Date"
          showLabel
          min={limits.minDate}
          max={limits.maxDate}
          required
          defaultValue={values?.date}
          error={errors?.date}
        />
        <Input
          id={`${id}-time`}
          name="time"
          type="time"
          label="Time"
          showLabel
          step={limits.slotMinutes * 60}
          required
          defaultValue={values?.time}
          error={errors?.time}
        />
      </div>
      {state.status === "error" && state.message ? (
        <p role="alert" className="font-sans text-sm text-danger">
          {state.message}
        </p>
      ) : null}
      <div className="mt-1 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Reserving…" : "Reserve"}
        </Button>
        <p className="font-sans text-sm text-text-muted">
          Parties over {limits.maxPartySize}? Call {site.phone}.
        </p>
      </div>
    </form>
  );
}
