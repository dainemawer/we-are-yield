import type { Metadata } from "next";
import { ContactDrawer } from "@/components/contact/contact-drawer";
import { Cursor } from "@/components/motion/cursor";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Kicker } from "@/components/ui/kicker";
import { RichText } from "@/components/ui/rich-text";
import { site } from "@/config/site";
import { privacy } from "@/content/privacy";

const description = `How ${site.name} collects, uses and protects your personal information.`;

export const metadata: Metadata = {
  title: `${privacy.title} — ${site.name}`,
  description,
  alternates: {
    canonical: "/privacy",
    types: { "text/markdown": "/privacy.md" },
  },
  openGraph: {
    type: "website",
    url: "/privacy",
    siteName: site.name,
    title: `${privacy.title} — ${site.name}`,
    description,
    locale: "en_US",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

const updated = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "UTC",
}).format(new Date(privacy.updated));

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader home={false} />
      <main id="content" tabIndex={-1} className="outline-none">
        <article>
          <header
            id="top"
            className="px-gutter pt-[clamp(160px,26vh,280px)] pb-[clamp(72px,12vh,140px)]"
          >
            <Kicker className="mb-[clamp(32px,5vh,56px)]">Legal</Kicker>
            <h1
              data-reveal=""
              className="m-0 font-serif text-display font-normal"
            >
              {privacy.title}
            </h1>
            <div
              data-reveal=""
              data-delay={120}
              className="mt-[clamp(32px,5vh,56px)] flex flex-wrap items-end justify-between gap-8"
            >
              <p className="m-0 max-w-[44ch] text-[clamp(19px,1.6vw,26px)] leading-normal text-pretty">
                {privacy.intro}
              </p>
              <p className="m-0 eyebrow text-muted">
                Last updated <time dateTime={privacy.updated}>{updated}</time>
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 items-start gap-[clamp(48px,6vw,120px)] px-gutter pb-section lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <nav
              aria-labelledby="toc-heading"
              className="lg:sticky lg:top-[140px]"
            >
              <h2 id="toc-heading" className="m-0 mb-6 eyebrow text-muted">
                On this page
              </h2>
              <ol className="m-0 flex list-none flex-col gap-3 p-0 text-[17px]">
                {privacy.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex items-baseline gap-4 transition-colors duration-300 hover:text-brand"
                    >
                      <span
                        aria-hidden="true"
                        className="w-6 shrink-0 text-[13px] font-semibold tracking-[0.1em] text-brand tabular-nums"
                      >
                        {pad(i + 1)}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div>
              {privacy.sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-heading`}
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-t border-ink/18 py-[clamp(36px,5vh,56px)] last:border-b"
                >
                  <span aria-hidden="true" className="pt-3 label-lg text-brand">
                    {pad(i + 1)}
                  </span>
                  <div className="flex max-w-[64ch] flex-col gap-5 text-lg leading-[1.65] text-pretty text-muted">
                    <h2
                      id={`${s.id}-heading`}
                      className="m-0 mb-1 font-serif text-[clamp(30px,2.6vw,44px)] leading-[1.1] font-normal text-ink"
                    >
                      {s.title}
                    </h2>
                    {s.blocks.map((b, j) =>
                      b.type === "p" ? (
                        <p key={j} className="m-0">
                          <RichText text={b.text} />
                        </p>
                      ) : (
                        <ul
                          key={j}
                          className="m-0 flex list-none flex-col gap-3 p-0"
                        >
                          {b.items.map((item) => (
                            <li
                              key={item}
                              className="relative pl-7 before:absolute before:top-[0.82em] before:left-0 before:h-px before:w-3.5 before:bg-brand"
                            >
                              <RichText text={item} />
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter home={false} />

      <ContactDrawer />
      <Cursor />
      <MotionRuntime />
    </>
  );
}
