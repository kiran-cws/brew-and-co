# Newsletter CTA

The second display-size moment on the page: "Our newsletter" in Comfortaa 300, centred, followed by arc media on the left (the illustrated courier on a skateboard in the reference) and, on the right, an orange kicker, a Comfortaa 700 title, a short lede and the flush email form.

```
                  O u r   n e w s l e t t e r

   ╭───────────╮      Subscribe and take 10% off your first order.
  ╱ [courier]   ╲     Stay fuelled. Stay bold.
  ╰ · · · · · · ╯     Join the Brew & Co community for exclusive deals,
                      early drops and caffeine-fuelled inspiration.
                      ┌──────────────────────┬───────────┐
                      │ Enter your email     │ Subscribe │
                      └──────────────────────┴───────────┘
```

## Form behaviour

`NewsletterForm` is a client component built on React 19's `useActionState`. It receives a server action (`subscribe`) as a prop, shows "Subscribing…" while pending, replaces the form with a confirmation on success, and shows a field error on failure. The copy matches the button: "Subscribe" → "Subscribed."

The server action lives in `app/actions/newsletter.ts`; wire it to your provider.

## Code

```ts title="app/actions/newsletter.ts"
"use server";

export type SubscribeState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter an email address like name@example.com." };
  }
  // TODO: call your email provider here.
  return { status: "success" };
}
```

```tsx title="components/sections/newsletter-form.tsx"
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
```

```tsx title="components/sections/newsletter-cta.tsx"
import { Container, Section } from "@/components/ui/container";
import { ArcMedia } from "@/components/ui/arc-media";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { subscribe } from "@/app/actions/newsletter";

export function NewsletterCta() {
  return (
    <Section aria-labelledby="newsletter-title">
      <Container>
        <h2
          id="newsletter-title"
          className="text-center font-display text-5xl font-light tracking-display text-ink md:text-6xl"
        >
          Our newsletter
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <ArcMedia
            src="/images/newsletter-courier.png"
            alt="An illustrated courier on a skateboard carrying a coffee"
            className="mx-auto"
          />

          <div className="flex flex-col items-start gap-4">
            <p className="font-sans text-lg font-semibold text-brand-500">
              Subscribe and take 10% off your first order.
            </p>
            <h3 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Stay fuelled. Stay bold.
            </h3>
            <p className="max-w-prose font-sans text-base text-text-body">
              Join the Brew &amp; Co community for exclusive deals, early product drops and
              caffeine-fuelled inspiration, straight to your inbox.
            </p>
            <div className="mt-4 w-full max-w-md">
              <NewsletterForm action={subscribe} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```
