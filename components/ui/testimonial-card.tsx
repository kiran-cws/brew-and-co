import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  avatar: { src: string };
};

export type TestimonialCardProps = Omit<ComponentProps<"figure">, "children"> & {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial, className, ...props }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex flex-col items-center rounded-card bg-paper px-8 py-8 text-center shadow-card",
        className,
      )}
      {...props}
    >
      <span className="relative size-22 overflow-hidden rounded-full ring-1 ring-line">
        <Image src={testimonial.avatar.src} alt="" fill sizes="88px" className="object-cover" />
      </span>
      <figcaption className="mt-5 font-display text-lg font-bold text-brand-700">
        {testimonial.name}
        {testimonial.role ? (
          <span className="mt-1 block font-sans text-xs font-medium text-text-muted">
            {testimonial.role}
          </span>
        ) : null}
      </figcaption>
      <blockquote className="mt-3 max-w-sm font-sans text-sm text-text-body">
        “{testimonial.quote}”
      </blockquote>
    </figure>
  );
}
