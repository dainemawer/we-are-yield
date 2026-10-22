import { links, postalAddress, site } from "@/config/site";

/**
 * Privacy policy, shared by `/privacy` and its Markdown version
 * (`/privacy.md`). Inline links use Markdown syntax — `[label](href)` — which
 * `RichText` renders as anchors and the Markdown route passes through as-is.
 */
export type Block =
  { type: "p"; text: string } | { type: "ul"; items: string[] };

export type PolicySection = { id: string; title: string; blocks: Block[] };

const email = `[${site.email}](mailto:${site.email})`;

export const privacy = {
  title: "Privacy",
  intro:
    "How we handle your information: what we collect, why, and what you can ask us to do with it. Plain language, no surprises.",
  updated: "2026-10-22",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${site.name} (“we”, “us”) runs ${new URL(site.url).hostname}. Under South Africa’s Protection of Personal Information Act (POPIA), we are the responsible party for the personal information described here.`,
        },
        {
          type: "p",
          text: `You can reach us at ${email}, or by post at ${postalAddress}.`,
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        {
          type: "ul",
          items: [
            "If you use the contact form: your name and email address, and optionally your company, the services you’re interested in and your message.",
            "If you email us directly: whatever you choose to include.",
            "When you browse: anonymous, aggregated visit statistics (pages viewed, referring site, country and device type) through Vercel Web Analytics. It doesn’t use cookies, can’t identify you and doesn’t follow you to other websites.",
            "Our host keeps short-lived server logs, such as IP address and browser type, to keep the site secure and running.",
          ],
        },
        {
          type: "p",
          text: "That’s all. We never buy personal information, and we never sell yours.",
        },
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      blocks: [
        {
          type: "p",
          text: "We use what you send us to reply to your enquiry and, if we go on to work together, to run that relationship. We may follow up about your enquiry, but we won’t add you to a mailing list without asking first.",
        },
        {
          type: "p",
          text: "We use analytics only in aggregate, to understand which parts of the site are useful.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and storage",
      blocks: [
        {
          type: "p",
          text: "We don’t set cookies. The site stores one small flag in your browser to remember that you’ve seen the opening animation, so it doesn’t play in full every time. It contains no personal information, and you can clear it from your browser settings at any time.",
        },
      ],
    },
    {
      id: "who-we-share-it-with",
      title: "Who we share it with",
      blocks: [
        {
          type: "p",
          text: "Only the service providers that help us run the site, and only for that purpose:",
        },
        {
          type: "ul",
          items: [
            "[Vercel](https://vercel.com/legal/privacy-policy) hosts the site and provides its analytics.",
            "[Resend](https://resend.com/legal/privacy-policy) delivers contact form messages to our inbox.",
            "Our email provider stores the messages we send and receive.",
            ...(links.calendly
              ? [
                  "[Calendly](https://calendly.com/legal/privacy-notice) handles call bookings; its own privacy notice applies to the booking.",
                ]
              : []),
          ],
        },
        {
          type: "p",
          text: "Some of these providers process data outside South Africa, including in the United States and the European Union. We only use providers that are bound to protect it to a standard comparable to POPIA. We will also disclose information where the law requires it.",
        },
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      blocks: [
        {
          type: "p",
          text: "We keep enquiries for as long as we need them to respond and follow up, and no longer than two years after we last spoke unless we go on to work together. Analytics data is aggregated and anonymous from the start.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        { type: "p", text: "You can ask us at any time to:" },
        {
          type: "ul",
          items: [
            "tell you what personal information we hold about you;",
            "correct or update it;",
            "delete it;",
            "stop using it, or explain how we use it.",
          ],
        },
        {
          type: "p",
          text: `Email ${email} and we’ll respond within 30 days. If you’re unhappy with how we’ve handled your information, you can complain to South Africa’s [Information Regulator](https://inforegulator.org.za).`,
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "p",
          text: "We use reasonable technical and organizational measures to protect your information, including encryption in transit (HTTPS) on every page and server-side validation of everything the contact form receives.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "If we change this policy, we’ll update it here and change the date at the top.",
        },
      ],
    },
  ] satisfies PolicySection[],
} as const;
