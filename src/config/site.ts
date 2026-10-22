/**
 * Single source of truth for site-wide facts: identity, URLs, contact details
 * and outbound links. Anything a non-developer might need to change lives here.
 *
 * Links set to `null` are not live yet. The UI renders them as inert text
 * (never a dead `href="#"`) and they light up automatically once filled in.
 */

export type ServiceName = (typeof services)[number]["name"];

export const site = {
  name: "Yield",
  legalName: "Yield",
  url: "https://weareyield.com",
  title: "Yield — Outcomes, by design.",
  tagline: "Outcomes, by design.",
  description:
    "Yield is a bold digital consultancy that helps businesses move faster, think smarter, and build leaner. Rapid MVPs, AI automation and digital strategy.",
  shortDescription:
    "Rapid MVPs, AI automation and digital strategy for startups and growing businesses.",
  email: "hello@weareyield.com",
  themeColor: "#0e0d0c",
  copyrightYear: 2026,
} as const;

export const links = {
  /** Calendly scheduling page. Until set, "Book a call" opens the contact drawer. */
  calendly: null as string | null,
  pitchDeck: null as string | null,
  caseStudy: null as string | null,
} as const;

export const community = [
  { name: "Discord", href: null },
  { name: "Substack", href: null },
  { name: "Bluesky", href: null },
] as const satisfies ReadonlyArray<{ name: string; href: string | null }>;

export const social = [
  { name: "Instagram", href: null },
  { name: "X", href: null },
  { name: "Bluesky", href: null },
  { name: "Substack", href: null },
] as const satisfies ReadonlyArray<{ name: string; href: string | null }>;

export const services = [
  {
    name: "AI Automation",
    description:
      "We’ll help you integrate the power of AI and AI Agents into your business workflows and process.",
  },
  {
    name: "Rapid MVP Development",
    description:
      "From idea to a working product in weeks, built lean and ready for real users.",
  },
  {
    name: "Consulting",
    description:
      "Digital strategy with clear priorities, honest timelines and a structured process.",
  },
  {
    name: "Training",
    description:
      "Hands-on sessions that get your team confident with AI in their daily work.",
  },
] as const;

export const values = [
  {
    title: "Clarity over Complexity",
    body: "We cut through noise and hype to deliver structured, simple solutions.",
  },
  { title: "Speed with Purpose", body: "We move fast, but never recklessly." },
  {
    title: "Honesty in Partnership",
    body: "We’re transparent with time, money, and expectations.",
  },
  {
    title: "Intelligence Everywhere",
    body: "We embed AI and automation in ways that create real, measurable value.",
  },
  {
    title: "Innovation with Structure",
    body: "We balance bold ideas with a proven process.",
  },
] as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
] as const;

export const mailto = `mailto:${site.email}`;
