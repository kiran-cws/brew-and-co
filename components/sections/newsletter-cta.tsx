import { Container, Section } from "@/components/ui/container";
import { ArcMedia } from "@/components/ui/arc-media";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { subscribe } from "@/app/actions/newsletter";
import beans from "@/public/images/about-beans.webp";

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
            src={beans}
            alt="Amara's hands cupping freshly roasted coffee beans over the roaster"
            fit="cover"
            overflow={false}
            className="mx-auto max-w-sm"
          />

          <div className="flex flex-col items-start gap-4">
            <p className="font-sans text-lg font-semibold text-brand-500">
              Subscribe and take 10% off your first order.
            </p>
            <h3 className="font-display text-3xl font-bold text-ink md:text-4xl">
              What&apos;s roasting this week
            </h3>
            <p className="max-w-prose font-sans text-base text-text-body">
              One short email each Thursday: the beans on the grinder, the pastry Tom is testing, and
              who&apos;s on the open mic list. No offers you didn&apos;t ask for.
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
