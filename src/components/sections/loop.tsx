import { Kicker } from "@/components/ui/kicker";
import { TextLink } from "@/components/ui/text-link";
import { links } from "@/config/site";

const PILLARS = [
  { n: "01", label: <>Save time</> },
  { n: "02", label: <>Save money</> },
  {
    n: "03",
    label: (
      <>
        See <em>smarter</em>
      </>
    ),
  },
];

export function Loop() {
  return (
    <section
      aria-labelledby="loop-heading"
      className="flex flex-col gap-[clamp(72px,12vh,140px)] bg-ink px-gutter py-section text-paper"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-[clamp(32px,6vw,120px)]">
        <div>
          <Kicker tone="paper" className="mb-8 text-stone">
            The Yield Loop
          </Kicker>
          <h2
            id="loop-heading"
            data-reveal=""
            className="m-0 max-w-[14ch] font-serif text-[clamp(40px,5.2vw,90px)] leading-[1.02] font-normal tracking-[-0.02em]"
          >
            Always a human in the loop.
          </h2>
        </div>
        <p
          data-reveal=""
          className="m-0 max-w-[40ch] text-[clamp(18px,1.5vw,24px)] leading-[1.55] text-pretty text-mist"
        >
          AI doesn’t replace your people — it empowers them. Yield ensures
          automation is ethical, valuable, and aligned with your business goals.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,6vw,120px)] border-t border-paper/18 pt-[clamp(48px,8vh,96px)]">
        <div
          data-reveal=""
          className="flex items-start font-serif text-[clamp(140px,19vw,340px)] leading-[0.82] tracking-[-0.05em]"
        >
          <span className="sr-only">20+</span>
          <span aria-hidden="true" data-count="20" className="tabular-nums">
            20
          </span>
          <span aria-hidden="true" className="text-brand">
            +
          </span>
        </div>
        <div className="flex flex-col gap-8">
          <span data-reveal="" className="eyebrow text-stone">
            Hours saved per week
          </span>
          <p
            data-reveal=""
            className="m-0 font-serif text-[clamp(24px,2.2vw,38px)] leading-[1.3] text-pretty"
          >
            A retail client saved 20+ hours per week by automating inventory
            reports and customer responses. That time now goes into growth
            initiatives instead of spreadsheets.
          </p>
          <div data-reveal="">
            <TextLink href={links.caseStudy}>Read case study</TextLink>
          </div>
        </div>
      </div>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(24px,3vw,48px)] p-0">
        {PILLARS.map((p, i) => (
          <li
            key={p.n}
            data-reveal=""
            data-delay={i * 100}
            className="flex flex-col gap-6 border-t border-paper/18 pt-6"
          >
            <span className="eyebrow text-stone">{p.n}</span>
            <span className="font-serif text-[clamp(32px,3vw,52px)] leading-none">
              {p.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
