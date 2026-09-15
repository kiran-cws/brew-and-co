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

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Svg>
  );
}

export function MicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" />
      <path d="M4 20c4-5 8-8 12-11" />
    </Svg>
  );
}

/* Social marks are filled, not stroked. */

export function InstagramIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-8.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 2c-2.7 0-3 0-4.1.1-3 .1-5.7 1.7-5.8 5.8C2 9 2 9.3 2 12s0 3 .1 4.1c.1 4.1 2.8 5.7 5.8 5.8C9 22 9.3 22 12 22s3 0 4.1-.1c3-.1 5.7-1.7 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.1-4.1-2.8-5.7-5.8-5.8C15 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.7 1.4-4 4.1-4.1 1-.1 1.3-.1 4-.1Z" />
    </svg>
  );
}

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
