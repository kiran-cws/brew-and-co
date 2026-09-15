import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { CornerRail } from "@/components/ui/corner-rail";
import { Button } from "@/components/ui/button";
import interior from "@/public/images/about-interior.webp";

export function StoryTeaser() {
  return (
    <Section aria-labelledby="story-title">
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-fog">
          <Image
            src={interior}
            alt="A sunlit corner table by the window at Brew & Co"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <CornerRail corner="top-right" className="flex flex-col items-start px-6 py-8 md:px-10 md:py-12">
          <h2 id="story-title" className="font-display text-3xl font-bold text-ink md:text-4xl">
            Two friends and a second-hand espresso machine
          </h2>
          <p className="mt-4 max-w-prose font-sans text-base text-text-body">
            Amara roasted, Tom baked, and neither of them could find a place in Clapham that did both
            properly. So in the spring of 2018 they opened one. The machine is still the same. The
            queue on Saturday mornings is not.
          </p>
          <Button href="/about" size="lg" className="mt-8">
            Read our story
          </Button>
        </CornerRail>
      </Container>
    </Section>
  );
}
