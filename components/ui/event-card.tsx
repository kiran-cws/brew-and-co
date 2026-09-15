import Image, { type StaticImageData } from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import type { EventSeries } from "@/lib/events";
import { weekdayNames } from "@/lib/site";

export type EventCardProps = Omit<ComponentProps<"article">, "children"> & {
  series: EventSeries;
  image: StaticImageData;
};

export function EventCard({ series, image, className, ...props }: EventCardProps) {
  const [event, ...later] = series.next;
  if (!event) return null;
  return (
    <article
      className={cn("flex flex-col rounded-card border border-line bg-paper p-2", className)}
      {...props}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-fog">
        <Image
          src={image}
          alt={event.image.alt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
        <time
          dateTime={event.dateTime}
          className="absolute left-3 top-3 flex flex-col items-center rounded-tile bg-paper px-3 py-2 text-center shadow-pill"
        >
          <span className="font-sans text-xs font-semibold text-brand-700">{event.parts.weekday}</span>
          <span className="font-display text-2xl font-bold leading-none text-ink">{event.parts.day}</span>
          <span className="font-sans text-xs font-medium text-text-body">{event.parts.month}</span>
        </time>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl font-bold text-ink">{event.title}</h3>
          <p className="font-sans text-sm font-medium text-text-body">{event.timeLabel}</p>
        </div>
        <p className="font-sans text-sm text-text-body">{event.description}</p>
        {later.length > 0 ? (
          <p className="font-sans text-sm text-text-muted">
            Then{" "}
            {later.map((e, i) => (
              <span key={e.date}>
                <time dateTime={e.dateTime}>
                  {e.parts.day} {e.parts.month}
                </time>
                {i < later.length - 1 ? ", " : ""}
              </span>
            ))}
            . Every {weekdayNames[series.weekday]}.
          </p>
        ) : null}
        <p className="mt-auto pt-2 font-sans text-xs font-semibold text-brand-700">{event.note}</p>
      </div>
    </article>
  );
}
