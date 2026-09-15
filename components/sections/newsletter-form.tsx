"use client";

import { useActionState } from "react";
import { Input, InlineForm } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SubscribeState } from "@/app/actions/newsletter";

type Action = (prev: SubscribeState, formData: FormData) => Promise<SubscribeState>;

export function NewsletterForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(action, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <p role="status" className="font-sans text-base font-semibold text-ink">
        Subscribed. Your 10% code is on its way.
      </p>
    );
  }

  return (
    <InlineForm action={formAction} noValidate>
      <Input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        label="Email address"
        placeholder="Enter your email"
        required
        error={state.status === "error" ? state.message : undefined}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Subscribing…" : "Subscribe"}
      </Button>
    </InlineForm>
  );
}
