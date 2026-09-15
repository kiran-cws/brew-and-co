import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { IconButton } from "@/components/ui/icon-button";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { formatAddress, hoursSummary, site } from "@/lib/site";

type LinkGroup = { title: string; links: Array<{ href: string; label: string }> };

const groups: LinkGroup[] = [
  {
    title: "Visit",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/about", label: "About us" },
      { href: "/reserve", label: "Reserve a table" },
    ],
  },
  {
    title: "Events",
    links: [
      { href: "/#events", label: "Open mic night, Fridays" },
      { href: "/#events", label: "Coffee tasting, Saturdays" },
    ],
  },
];

export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="bg-mist py-16 md:py-20">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col items-start gap-6">
          <Logo size="sm" />
          <p className="max-w-xs font-sans text-base text-text-body">
            Specialty coffee, fresh pastries and light lunches on a quiet street in Clapham.
          </p>
          <ul className="flex gap-3">
            <li>
              <IconButton
                shape="square"
                label={`${site.name} on Instagram`}
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            </li>
            <li>
              <IconButton
                shape="square"
                label={`${site.name} on Facebook`}
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
            </li>
          </ul>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-lg font-bold text-ink">{group.title}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-display text-lg font-bold text-ink">Find us</h2>
          <address className="mt-6 flex flex-col gap-3 font-sans text-sm not-italic text-text-body">
            <p>{formatAddress()}</p>
            <p>
              <a href={site.phoneHref} className="transition-colors hover:text-ink">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                {site.email}
              </a>
            </p>
          </address>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-sans text-sm text-text-body">
            {hoursSummary().map((h) => (
              <div key={h.days} className="contents">
                <dt className="font-medium text-ink">{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container>
        <p className="mt-16 text-center font-sans text-sm text-text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
