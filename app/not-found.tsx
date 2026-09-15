import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Sparkle } from "@/components/ui/sparkle";

export default function NotFound() {
  return (
    <Section aria-labelledby="nf-title">
      <Container className="flex flex-col items-start gap-6">
        <Sparkle tone="ink" size={28} />
        <p className="font-sans text-lg font-semibold text-brand-500">That page isn&apos;t on the menu.</p>
        <h1 id="nf-title" className="font-display text-5xl font-light tracking-display text-ink md:text-6xl">
          Nothing here
        </h1>
        <p className="max-w-prose font-sans text-base text-text-body">
          The link may be old, or the page has moved. Everything we actually serve is one click away.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button variant="outline" href="/menu">
            See the menu
          </Button>
        </div>
      </Container>
    </Section>
  );
}
