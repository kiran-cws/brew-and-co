import Image, { type StaticImageData } from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CornerRail } from "@/components/ui/corner-rail";
import { cn } from "@/lib/cn";

export type StoryRow = {
  image: StaticImageData;
  alt: string;
  title?: string;
  paragraphs: string[];
};

export type StorySplitProps = {
  titleId: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  rows: StoryRow[];
  /** `photo` frames each image in a rounded card; `cutout` lets product art spill. */
  variant?: "photo" | "cutout";
};

/**
 * Alternating image / copy rows. The corner rail sits on the copy side and
 * turns toward the image, so the eye travels from text to picture.
 */
export function StorySplit({ titleId, title, lede, rows, variant = "photo" }: StorySplitProps) {
  return (
    <Section aria-labelledby={titleId}>
      <Container>
        <SectionHeading title={<span id={titleId}>{title}</span>} lede={lede} />

        <div className="mt-16 flex flex-col gap-16">
          {rows.map((row, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={row.alt}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full",
                    variant === "photo" && "overflow-hidden rounded-card bg-fog",
                    flipped && "md:order-2",
                  )}
                >
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    placeholder="blur"
                    className={
                      variant === "photo"
                        ? "object-cover"
                        : "object-contain drop-shadow-[0_24px_24px_rgb(0_0_0/0.14)]"
                    }
                  />
                </div>

                <CornerRail
                  corner={flipped ? "top-left" : "top-right"}
                  className={cn(
                    "flex flex-col items-start px-6 py-8 md:px-10 md:py-12",
                    flipped ? "md:order-1 md:mr-6" : "md:ml-6",
                  )}
                >
                  {row.title ? (
                    <h3 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">{row.title}</h3>
                  ) : null}
                  <div className="flex max-w-prose flex-col gap-4 font-sans text-base text-text-body">
                    {row.paragraphs.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                </CornerRail>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
