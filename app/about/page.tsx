import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/photo-hero";
import { StorySplit, type StoryRow } from "@/components/sections/story-split";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturePill } from "@/components/ui/feature-pill";
import { Button } from "@/components/ui/button";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { ClockIcon, LeafIcon, CupIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { formatAddress, hoursSummary, site } from "@/lib/site";
import aboutHero from "@/public/images/about-hero.webp";
import founders1 from "@/public/images/about-founders-1.webp";
import founders2 from "@/public/images/about-founders-2.webp";
import interior from "@/public/images/about-interior.webp";
import beans from "@/public/images/about-beans.webp";

export const metadata: Metadata = {
  title: "About us",
  description:
    "How Amara Okafor and Tom Hale opened Brew & Co on Abbeville Road in 2018, and what happens there every Friday and Saturday.",
};

const rows: StoryRow[] = [
  {
    image: founders1,
    alt: "Amara behind the counter, smiling, apron on, mid-morning rush",
    title: "Amara, who roasts",
    paragraphs: [
      "Amara Okafor spent six years on the roaster at a small outfit in Peckham, tasting the same Ethiopian lots week after week until she could tell you the farm from the cup. She is the reason the beans change every fortnight and the reason the tasting notes on the chalkboard are actually true.",
      "Ask her what you're drinking and be prepared to stay a while.",
    ],
  },
  {
    image: founders2,
    alt: "Tom's hands folding laminated dough on a floured bench before opening",
    title: "Tom, who bakes",
    paragraphs: [
      "Tom Hale ran the pastry section of a bakery under the railway arches at Borough Market, which means he has strong opinions about butter and starts work at four. The croissants are laminated over three days. The cardamom buns are his grandmother's recipe with one change he refuses to disclose.",
    ],
  },
  {
    image: interior,
    alt: "The corner table by the window at Brew & Co, lit by low afternoon sun",
    title: "A quiet street, spring 2018",
    paragraphs: [
      "They met at a cupping session in 2016, complained about the same things, and two years later signed a lease on a former hardware shop on Abbeville Road. The espresso machine was a second-hand La Marzocco that took three of them to lift. The first winter was slow. Then the neighbours started coming in twice a day, and it wasn't.",
      "The machine is still the same. The window seat still gets the sun at four.",
    ],
  },
  {
    image: beans,
    alt: "A handful of freshly roasted beans over the drum of the roaster",
    title: "Fridays loud, Saturdays slow",
    paragraphs: [
      "Open mic started because a regular asked if he could play for ten minutes on a Friday. He did, people clapped, and it has run every week since. Coffee tasting on Saturday mornings exists because Amara was explaining the beans to customers anyway, so Tom gave her a table and a sign-up sheet.",
      "Both are still exactly that: a mic by the window and eight seats at the big table.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        image={aboutHero}
        alt="Amara chatting with two regulars across the counter at Brew & Co"
        kicker="Two friends, one street, since 2018"
        title="Our story"
        lede="Brew & Co is what happened when a roaster and a pastry chef couldn't find a place in Clapham that did both properly."
        size="md"
        titleId="about-title"
      />

      <StorySplit
        titleId="founders-title"
        title="The people behind the counter"
        rows={rows}
      />

      <Section aria-labelledby="how-title" tone="mist">
        <Container>
          <SectionHeading
            title={<span id="how-title">How we brew</span>}
            lede="Three things we don't compromise on, whatever the queue looks like."
          />
          <ul className="mx-auto mt-12 flex max-w-3xl flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:mt-16">
            <li><FeaturePill icon={<LeafIcon />} label="Single-origin beans, changed every fortnight" /></li>
            <li><FeaturePill icon={<CupIcon />} label="Shots dialled in every morning before we open" /></li>
            <li><FeaturePill icon={<ClockIcon />} label="Cold brew steeped for 16 hours, never rushed" /></li>
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="visit-title">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <SectionHeading
            align="left"
            title={<span id="visit-title">Come and find us</span>}
            lede="Five minutes from Clapham Common station, on the quiet end of Abbeville Road. There's a bench outside for dogs and a shelf inside for prams."
          />
          <div className="flex flex-col gap-8">
            <address className="flex flex-col gap-4 font-sans text-base not-italic text-text-body">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-1 size-5 shrink-0 text-brand-500" />
                <span>{formatAddress()}</span>
              </p>
              <p className="flex items-start gap-3">
                <PhoneIcon className="mt-1 size-5 shrink-0 text-brand-500" />
                <a href={site.phoneHref} className="text-ink underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </p>
            </address>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-sans text-base text-text-body">
              {hoursSummary().map((h) => (
                <div key={h.days} className="contents">
                  <dt className="font-medium text-ink">{h.days}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-4">
              <ReserveButton size="lg" />
              <Button variant="outline" size="lg" href="/menu">
                See the menu
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
