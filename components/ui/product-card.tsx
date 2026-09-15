import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export type Product = {
  slug: string;
  name: string;
  blurb: string;
  price: number;
  currency?: string;
  image: { src: string; alt: string };
  soldOut?: boolean;
};

export type ProductCardProps = Omit<ComponentProps<"article">, "children"> & {
  product: Product;
  orderHref?: (product: Product) => string;
};

const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

export function ProductCard({
  product,
  orderHref = (p) => `/products/${p.slug}`,
  className,
  ...props
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-card border border-line bg-paper p-2 transition-shadow duration-200 hover:shadow-card",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-paper">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-6"
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-4 pb-4 pt-5 text-center">
        <h3 className="font-display text-xl font-bold text-ink">{product.name}</h3>
        <p className="mt-2 font-sans text-sm text-text-body">{product.blurb}</p>

        <div className="mt-6 flex w-full items-center justify-between">
          <data
            value={product.price.toFixed(2)}
            className="font-display text-lg font-bold text-brand-700"
          >
            {money(product.price, product.currency)}
          </data>
          {product.soldOut ? (
            <Button size="sm" variant="outline">
              Notify me<span className="sr-only">, {product.name}</span>
            </Button>
          ) : (
            <Button size="sm" href={orderHref(product)}>
              Order now<span className="sr-only">, {product.name}</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
