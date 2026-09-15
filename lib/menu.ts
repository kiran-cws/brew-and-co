export type MenuCategorySlug =
  | "espresso"
  | "espresso-drinks"
  | "pastries"
  | "sandwiches"
  | "cold-drinks";

export type MenuBadge = "popular" | "house favorite";

export type MenuItem = {
  slug: string;
  name: string;
  category: MenuCategorySlug;
  description: string;
  /** GBP */
  price: number;
  badges: MenuBadge[];
  /** Lower ranks appear first in "Popular picks" on the home page. */
  featured?: number;
  imageAlt: string;
};

export type MenuCategory = {
  slug: MenuCategorySlug;
  name: string;
  blurb: string;
};

export const categories: MenuCategory[] = [
  { slug: "espresso", name: "Espresso", blurb: "Our house blend, pulled the same way every time." },
  { slug: "espresso-drinks", name: "Espresso drinks", blurb: "Milk drinks made on the same shots. Oat, soya and skimmed at no extra cost." },
  { slug: "pastries", name: "Pastries", blurb: "Laminated on site and baked before we open." },
  { slug: "sandwiches", name: "Sandwiches", blurb: "Made to order until 3pm, on sourdough from the bakery two doors down." },
  { slug: "cold-drinks", name: "Cold drinks", blurb: "Cold brew is steeped overnight; everything else is made when you order." },
];

export const menuItems: MenuItem[] = [
  // Espresso
  { slug: "single-espresso", name: "Single espresso", category: "espresso", description: "A 30 ml shot of our house blend, pulled at 93°C for a thick crema and a chocolate finish.", price: 3.0, badges: [], imageAlt: "A single espresso in a small white cup" },
  { slug: "double-espresso", name: "Double espresso", category: "espresso", description: "Two shots of the house blend, the same 25-second pull, twice the depth.", price: 3.75, badges: ["popular"], imageAlt: "A double espresso with dark crema" },
  { slug: "ristretto", name: "Ristretto", category: "espresso", description: "A short 20 ml pull that keeps the sweetness and leaves the bitterness behind.", price: 3.25, badges: [], imageAlt: "A ristretto shot being pulled from an espresso machine" },
  { slug: "macchiato", name: "Macchiato", category: "espresso", description: "A double shot marked with a spoonful of steamed milk foam.", price: 3.75, badges: ["house favorite"], imageAlt: "An espresso macchiato with a dot of milk foam" },

  // Espresso drinks
  { slug: "flat-white", name: "Flat white", category: "espresso-drinks", description: "Double ristretto under a thin layer of velvety microfoam. Served in a 180 ml cup.", price: 4.75, badges: ["popular"], featured: 1, imageAlt: "A flat white with rosetta latte art" },
  { slug: "cappuccino", name: "Cappuccino", category: "espresso-drinks", description: "Equal parts espresso, steamed milk and foam, dusted with cocoa on request.", price: 4.5, badges: [], imageAlt: "A cappuccino with thick foam and cocoa dusting" },
  { slug: "oat-latte", name: "Oat latte", category: "espresso-drinks", description: "Double shot with steamed oat milk, naturally sweet and dairy-free.", price: 5.25, badges: ["house favorite"], imageAlt: "A latte in a glass with layered oat milk" },
  { slug: "mocha-fix", name: "Mocha fix", category: "espresso-drinks", description: "Espresso and 70% dark chocolate ganache, topped with steamed milk.", price: 5.5, badges: ["popular"], imageAlt: "A mocha topped with milk foam and chocolate" },
  { slug: "cortado", name: "Cortado", category: "espresso-drinks", description: "A double shot cut with an equal measure of warm milk. Small and strong.", price: 4.25, badges: [], imageAlt: "A cortado in a small glass" },

  // Pastries
  { slug: "butter-croissant", name: "Butter croissant", category: "pastries", description: "Laminated over three days with cultured butter, baked fresh every morning.", price: 3.75, badges: ["popular"], featured: 3, imageAlt: "A golden butter croissant" },
  { slug: "almond-croissant", name: "Almond croissant", category: "pastries", description: "Yesterday's croissant reborn with frangipane, flaked almonds and icing sugar.", price: 4.5, badges: ["house favorite"], imageAlt: "An almond croissant dusted with icing sugar" },
  { slug: "cardamom-bun", name: "Cardamom bun", category: "pastries", description: "Soft, knotted dough spiced with cardamom and finished with pearl sugar.", price: 4.25, badges: [], imageAlt: "A knotted cardamom bun with pearl sugar" },
  { slug: "banana-bread", name: "Banana bread", category: "pastries", description: "A thick slice with walnuts and a brown-butter glaze. Made with very ripe bananas.", price: 3.95, badges: [], imageAlt: "A slice of banana bread with walnuts" },

  // Sandwiches
  { slug: "bacon-and-egg-roll", name: "Bacon and egg roll", category: "sandwiches", description: "Smoked streaky bacon and a fried egg on a milk bun with house tomato relish.", price: 8.5, badges: ["popular"], featured: 4, imageAlt: "A bacon and fried egg roll on a plate" },
  { slug: "turkey-and-brie", name: "Turkey and brie", category: "sandwiches", description: "Roast turkey, brie, cranberry and rocket on toasted sourdough.", price: 9.75, badges: [], imageAlt: "A toasted sourdough sandwich cut in half" },
  { slug: "roast-vegetable-focaccia", name: "Roast vegetable focaccia", category: "sandwiches", description: "Grilled courgette, red pepper and aubergine with basil pesto and mozzarella.", price: 9.25, badges: ["house favorite"], imageAlt: "A focaccia sandwich filled with roasted vegetables" },

  // Cold drinks
  { slug: "cold-brew", name: "Cold brew", category: "cold-drinks", description: "Our signature. Slow-steeped for 16 hours, 65% less acidity, twice the caffeine. Served over ice.", price: 5.5, badges: ["popular", "house favorite"], featured: 2, imageAlt: "A tall glass of cold brew over ice" },
  { slug: "oat-cold-brew", name: "Oat cold brew", category: "cold-drinks", description: "The 16-hour cold brew softened with oat milk. Naturally sweet and dairy-free.", price: 6.0, badges: ["popular"], imageAlt: "Iced coffee with oat milk swirling through it" },
  { slug: "cold-brew-tonic", name: "Cold brew tonic", category: "cold-drinks", description: "Cold brew poured over tonic water with a twist of orange peel. Bright and bitter.", price: 6.25, badges: [], imageAlt: "A glass of cold brew tonic with an orange twist" },
  { slug: "iced-matcha-latte", name: "Iced matcha latte", category: "cold-drinks", description: "Ceremonial-grade matcha whisked with your choice of milk over ice.", price: 5.75, badges: [], imageAlt: "An iced matcha latte in a tall glass" },
];

export type MenuSlug = (typeof menuItems)[number]["slug"];

export function popularItems(count = 4): MenuItem[] {
  return menuItems
    .filter((i) => i.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
    .slice(0, count);
}

export function itemsByCategory(): Array<MenuCategory & { items: MenuItem[] }> {
  return categories.map((c) => ({
    ...c,
    items: menuItems.filter((i) => i.category === c.slug),
  }));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);
}

export const badgeLabels: Record<MenuBadge, string> = {
  popular: "Popular",
  "house favorite": "House favourite",
};
