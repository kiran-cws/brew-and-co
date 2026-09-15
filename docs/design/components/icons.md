# Icons

The repo has no icon dependency, so the handful of icons the storefront needs are inline SVGs: 24-unit viewBox, 1.5 stroke, round caps and joins, `currentColor`. Size them with the parent (`[&>svg]:size-5`) rather than per icon.

The café site adds `CalendarIcon`, `MapPinIcon`, `PhoneIcon`, `MicIcon`, `LeafIcon` (stroked) and `InstagramIcon` (filled) in `components/ui/icons.tsx`, following the same conventions.

If you later add `lucide-react`, these map to `ShoppingBag`, `Coffee`, `Droplets`, `Clock`, `Zap`, `Facebook`, `Twitter`, `Linkedin`, `Menu`, `X`.

## Code

```tsx title="components/ui/icons.tsx"
import type { ComponentProps } from "react";

type IconProps = Omit<ComponentProps<"svg">, "children">;

function Svg(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </Svg>
  );
}

export function CupIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 5c0-1 .8-1 .8-2M11 5c0-1 .8-1 .8-2" />
    </Svg>
  );
}

export function DropIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

/* Social marks are filled, not stroked. */

export function FacebookIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.4L5 21H2l7.3-8.3L1.6 3h6.4l4.4 5.8L17.5 3Zm-1 16.2h1.7L6.9 4.7H5.1l11.4 14.5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.3 8.7H3V21h3.3V8.7ZM4.7 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 13.4c0-3.4-1.8-4.9-4.3-4.9-1.9 0-2.8 1-3.3 1.8V8.7H10V21h3.3v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21H21v-7.6Z" />
    </svg>
  );
}
```
