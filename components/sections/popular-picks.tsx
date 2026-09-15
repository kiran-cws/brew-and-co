import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { popularItems } from "@/lib/menu";
import { menuImages } from "@/lib/menu-images";

export function PopularPicks() {
  const items = popularItems(4);
  return (
    <Section aria-labelledby="popular-title">
      <Container>
        <SectionHeading
          title={<span id="popular-title">What people keep ordering</span>}
          lede="Four things that leave the counter more than anything else. The full menu has twenty."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:mt-16">
          {items.map((item) => (
            <li key={item.slug}>
              <MenuItemCard item={item} image={menuImages[item.slug]} layout="tile" className="h-full" />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" href="/menu">
            See the menu
          </Button>
        </div>
      </Container>
    </Section>
  );
}
