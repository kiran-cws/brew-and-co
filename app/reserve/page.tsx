import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReservationForm } from "@/components/reservation/reservation-form";
import { reservationLimits } from "@/lib/reservation";
import { hoursSummary } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserve a table",
  description: "Book a table at Brew & Co in Clapham. Tell us your name, party size and when you'd like to come.",
};

export const revalidate = 3600;

export default function ReservePage() {
  const limits = reservationLimits();
  return (
    <Section aria-labelledby="reserve-title">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            as="h1"
            align="left"
            kicker="We keep half the room for walk-ins."
            title={<span id="reserve-title">Reserve a table</span>}
            lede="Tell us who's coming and when. We'll hold the table for fifteen minutes past your time."
          />
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-sans text-sm text-text-body">
            {hoursSummary().map((h) => (
              <div key={h.days} className="contents">
                <dt className="font-medium text-ink">{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
          <ReservationForm limits={limits} />
        </div>
      </Container>
    </Section>
  );
}
