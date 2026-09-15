import { eventRules } from "@/lib/events";
import { site, weekdayNames, type Weekday } from "@/lib/site";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CafeJsonLd() {
  const openingHoursSpecification = (Object.keys(site.hours) as unknown as Weekday[])
    .map((d) => ({ day: Number(d) as Weekday, hours: site.hours[Number(d) as Weekday] }))
    .filter((x) => x.hours)
    .map((x) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${days[x.day]}`,
      opens: x.hours!.open,
      closes: x.hours!.close,
    }));

  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/og.jpg`,
    servesCuisine: ["Coffee", "Pastries", "Sandwiches"],
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.area,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification,
    sameAs: Object.values(site.social),
    event: eventRules.map((rule) => ({
      "@type": "Event",
      name: rule.title,
      description: rule.description,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: site.name, address: `${site.address.street}, ${site.address.city} ${site.address.postcode}` },
      eventSchedule: {
        "@type": "Schedule",
        byDay: `https://schema.org/${weekdayNames[rule.weekday]}`,
        startTime: rule.start,
        endTime: rule.end,
        repeatFrequency: "P1W",
        scheduleTimezone: "Europe/London",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
