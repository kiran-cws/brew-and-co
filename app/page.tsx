import { PhotoHero } from "@/components/sections/photo-hero";
import { PopularPicks } from "@/components/sections/popular-picks";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { StoryTeaser } from "@/components/sections/story-teaser";
import { NewsletterCta } from "@/components/sections/newsletter-cta";
import { CafeJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { ReserveButton } from "@/components/reservation/reserve-button";
import hero from "@/public/images/hero-cafe.webp";

/** Upcoming event dates are computed at render; refresh the static page hourly. */
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <CafeJsonLd />
      <PhotoHero
        image={hero}
        alt="Morning light across the wooden counter and shelves of glassware at Brew & Co"
        kicker="A neighbourhood coffee shop in Clapham"
        title="Good morning, Clapham."
        lede="Specialty coffee, pastries laminated before dawn and lunches made to order. Open mic on Fridays, tasting on Saturdays, and a table by the window if you're quick."
        actions={
          <>
            <ReserveButton size="lg" />
            <Button variant="outline" size="lg" href="/menu">
              See the menu
            </Button>
          </>
        }
        preload
      />
      <PopularPicks />
      <UpcomingEvents />
      <StoryTeaser />
      <NewsletterCta />
    </>
  );
}
