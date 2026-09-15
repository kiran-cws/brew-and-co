import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { MenuCategoryNav } from "@/components/sections/menu-category-nav";
import { Sparkle } from "@/components/ui/sparkle";
import { ReserveButton } from "@/components/reservation/reserve-button";
import { categories, itemsByCategory } from "@/lib/menu";
import { menuImages } from "@/lib/menu-images";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Espresso, milk drinks, pastries laminated on site, sandwiches on sourdough and our 16-hour cold brew. Everything on the Brew & Co menu with prices.",
};

export default function MenuPage() {
  const groups = itemsByCategory();

  return (
    <>
      <Section aria-labelledby="menu-title" className="pb-8 md:pb-10">
        <Container className="relative">
          <Sparkle className="absolute left-4 top-0 hidden sm:block" />
          <SectionHeading
            as="h1"
            kicker="Everything we make, priced as it is at the counter."
            title={<span id="menu-title">The menu</span>}
            lede="Milk drinks come with oat, soya or skimmed at no extra cost. Sandwiches are made until 3pm. Ask about the beans on the grinder; they change every fortnight."
          />
        </Container>
      </Section>

      <MenuCategoryNav categories={categories} />

      {groups.map((group, i) => (
        <Section
          key={group.slug}
          id={group.slug}
          aria-labelledby={`${group.slug}-title`}
          tone={i % 2 === 1 ? "mist" : "paper"}
        >
          <Container>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h2 id={`${group.slug}-title`} className="font-display text-3xl font-bold text-ink md:text-4xl">
                {group.name}
              </h2>
              <p className="max-w-prose font-sans text-base text-text-body">{group.blurb}</p>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 lg:gap-8">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <MenuItemCard item={item} image={menuImages[item.slug]} className="h-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <Section aria-labelledby="menu-cta-title">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 id="menu-cta-title" className="font-display text-3xl font-bold text-ink md:text-4xl">
            Decided?
          </h2>
          <p className="max-w-prose font-sans text-base text-text-body">
            Walk-ins are always welcome. If you&apos;re four or more, or coming on a Friday night, a
            reservation saves the wait.
          </p>
          <ReserveButton size="lg" className="mt-2" />
        </Container>
      </Section>
    </>
  );
}
