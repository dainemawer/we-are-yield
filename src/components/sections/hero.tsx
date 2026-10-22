import Image from "next/image";
import { TextLink } from "@/components/ui/text-link";
import { site } from "@/config/site";
import heroImage from "@/assets/hero.jpg";

// Each line rises out of its own mask. The padding/negative-margin pair gives
// descenders room inside the overflow clip without changing the line box.
const LINES = [
  <>
    <span className="text-brand">Yield</span> is a bold digital
  </>,
  <>consultancy that helps</>,
  <>businesses move faster,</>,
  <>
    think smarter, and <em>build leaner.</em>
  </>,
];

export function Hero() {
  return (
    <>
      <section
        id="top"
        aria-label="Introduction"
        className="flex min-h-svh flex-col justify-end gap-[clamp(48px,8vh,96px)] px-gutter pt-[180px] pb-[clamp(40px,6vh,72px)]"
      >
        <div className="flex items-center gap-4 eyebrow text-muted">
          <span
            data-hero-fade=""
            aria-hidden="true"
            className="block h-px w-12 bg-ink"
          />
          <span data-hero-fade="">{site.tagline}</span>
        </div>
        <h1 className="m-0 font-serif text-display font-normal">
          {LINES.map((line, i) => (
            <span
              key={i}
              className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
            >
              <span data-hero="" className="block text-balance">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <TextLink href="#contact" data-open-contact="" data-hero-fade="">
            Get in touch
          </TextLink>
          <p
            data-hero-fade=""
            className="m-0 max-w-[34ch] text-[clamp(16px,1.3vw,20px)] leading-normal text-pretty text-muted"
          >
            {site.shortDescription}
          </p>
        </div>
      </section>

      <div
        data-parallax=""
        className="relative mx-gutter h-[clamp(420px,92vh,1040px)] overflow-hidden rounded-[4px] bg-[#d9d9d9]"
      >
        <div
          data-parallax-img=""
          className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
        >
          <Image
            src={heroImage}
            alt="The Yield team"
            fill
            placeholder="blur"
            sizes="(min-width: 1728px) 1440px, 90vw"
            quality={80}
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
