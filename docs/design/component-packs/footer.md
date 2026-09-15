# Footer

A mist-coloured band with four columns: wordmark, blurb and social squares; two link lists ("Company", "Support"); and a "Contact us" column with a phone input above an orange accent button. A centred copyright line closes the page.

```
┌ mist ─────────────────────────────────────────────────────────────┐
│ Brew & Co.          Company        Support        Contact us       │
│ Uncompromised       About          Support centre ┌──────────────┐ │
│ flavour and clean   Careers        24h service    │ Your number  │ │
│ caffeine for those  How it works   Quick chat     └──────────────┘ │
│ who never settle.   Contact us                    [Request a callback]
│ [f] [x] [in]                                                       │
│                                                                    │
│                 © 2025 Brew & Co. All rights reserved.             │
└────────────────────────────────────────────────────────────────────┘
```

The accent button is allowed here because the footer has no black CTA to compete with, and the orange closes the page the way the kicker opened it.

## Code

```tsx title="components/sections/footer.tsx"
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/ui/icons";
import Link from "next/link";

type LinkGroup = { title: string; links: Array<{ href: string; label: string }> };

const groups: LinkGroup[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Support centre" },
      { href: "/support/24h", label: "24h service" },
      { href: "/support/chat", label: "Quick chat" },
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
            Brew &amp; Co delivers uncompromised flavour and clean caffeine for those who never
            settle.
          </p>
          <ul className="flex gap-3">
            <li>
              <IconButton shape="square" label="Brew & Co on Facebook" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
            </li>
            <li>
              <IconButton shape="square" label="Brew & Co on X" href="https://x.com">
                <XIcon />
              </IconButton>
            </li>
            <li>
              <IconButton shape="square" label="Brew & Co on LinkedIn" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </li>
          </ul>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-lg font-bold text-ink">{group.title}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
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

        <form className="flex flex-col items-start gap-4" action="/contact/callback" method="post">
          <h2 className="font-display text-lg font-bold text-ink">Contact us</h2>
          <Input
            id="callback-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            label="Phone number"
            placeholder="Enter your number"
            className="mt-2"
          />
          <Button variant="accent" type="submit">
            Request a callback
          </Button>
        </form>
      </Container>

      <Container>
        <p className="mt-16 text-center font-sans text-sm text-text-muted">
          © {year} Brew &amp; Co. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
```
