import { Kicker } from "@/components/ui/kicker";
import { ArrowUpRight } from "@/components/ui/icons";
import { links, mailto } from "@/config/site";
import { home } from "@/content/home";

const pill =
  "label-lg inline-flex items-center gap-3 rounded-full px-[30px] py-5 transition-[background-color,color] duration-400";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex flex-col gap-[clamp(40px,6vh,64px)] bg-brand px-gutter py-[clamp(120px,20vh,240px)] text-paper"
    >
      <Kicker tone="paper">Contact</Kicker>
      <h2
        id="contact-heading"
        data-reveal=""
        className="m-0 max-w-[12ch] font-serif text-[clamp(56px,9vw,176px)] leading-[0.95] font-normal tracking-[-0.035em]"
      >
        Let’s have a <em>conversation</em>
      </h2>
      <div className="flex flex-wrap items-end justify-between gap-10">
        <p
          data-reveal=""
          className="m-0 max-w-[30ch] text-[clamp(19px,1.7vw,28px)] leading-[1.45]"
        >
          {home.contact}
        </p>
        <div data-reveal="" className="flex flex-wrap gap-4">
          <a
            href={mailto}
            className={`${pill} border border-paper hover:bg-paper hover:text-brand`}
          >
            Email us <ArrowUpRight />
          </a>
          {links.calendly ? (
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} bg-ink text-paper hover:bg-paper hover:text-ink`}
            >
              Book a call <ArrowUpRight />
            </a>
          ) : (
            <a
              href="#contact"
              data-open-contact=""
              className={`${pill} bg-ink text-paper hover:bg-paper hover:text-ink`}
            >
              Book a call <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
