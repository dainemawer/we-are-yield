import { Wordmark } from "@/components/brand/logo";
import { nav } from "@/config/site";

/**
 * Fixed header in `mix-blend-mode: difference`, so it reads on paper, ink and
 * imagery alike. Hide-on-scroll is driven by the MotionRuntime.
 */
export function SiteHeader() {
  return (
    <header
      data-header=""
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-gutter py-9 text-white mix-blend-difference transition-transform duration-700 ease-expo"
    >
      <a href="#top" aria-label="Yield — home" className="block leading-none">
        <Wordmark className="block h-[30px] w-auto" />
      </a>
      <nav
        aria-label="Primary"
        className="flex items-center gap-[clamp(18px,2.4vw,40px)] eyebrow"
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="hidden opacity-85 transition-opacity duration-300 hover:opacity-100 sm:inline"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          data-open-contact=""
          className="inline-flex items-center gap-2 rounded-full border border-white px-[18px] py-[11px] transition-[background-color,color] duration-300 hover:bg-white hover:text-black"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
