import type { StaticImageData } from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCard } from "@/components/ui/event-card";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { upcomingByRule } from "@/lib/events";
import openMic from "@/public/images/event-open-mic.webp";
import tasting from "@/public/images/event-tasting.webp";

const images: Record<string, StaticImageData> = {
  "open-mic": openMic,
  "coffee-tasting": tasting,
};

export function UpcomingEvents({ perEvent = 3 }: { perEvent?: number }) {
  const series = upcomingByRule(new Date(), perEvent);
  return (
    <Section id="events" aria-labelledby="events-title" tone="mist">
      <Container>
        <SectionHeading
          title={<span id="events-title">This week at Brew &amp; Co</span>}
          lede="Open mic every Friday evening. Coffee tasting every Saturday morning. Both happen whether it's raining or not."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 md:mt-16">
          {series.map((s) => (
            <li key={s.slug}>
              <EventCard series={s} image={images[s.slug]} className="h-full" />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-sans text-sm text-text-body">Coming with a group? Reserve a table and we&apos;ll keep it near the mic.</p>
          <ReserveButton variant="outline" />
        </div>
      </Container>
    </Section>
  );
}
