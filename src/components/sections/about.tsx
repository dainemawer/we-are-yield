import { TextLink } from "@/components/ui/text-link";
import { links } from "@/config/site";
import { home } from "@/content/home";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(32px,6vw,120px)] px-gutter pb-section"
    >
      <div>
        <div data-line="" aria-hidden="true" className="mb-7 h-px bg-ink" />
        <h2
          id="about-heading"
          data-reveal=""
          className="m-0 font-serif text-heading font-normal"
        >
          About Us
        </h2>
      </div>
      <div>
        <div data-line="" aria-hidden="true" className="mb-7 h-px bg-ink" />
        <p
          data-reveal=""
          className="m-0 mb-10 text-[clamp(19px,1.6vw,26px)] leading-normal text-pretty"
        >
          {home.about}
        </p>
        <div data-reveal="">
          <TextLink href={links.pitchDeck}>View pitch deck</TextLink>
        </div>
      </div>
    </section>
  );
}
