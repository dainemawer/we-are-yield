import { AnimatedMark } from "@/components/brand/logo";
import { services, site, social } from "@/config/site";

const linkClass = "hover:text-brand transition-colors duration-300";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-[clamp(48px,8vh,96px)] bg-ink px-gutter pt-[clamp(72px,12vh,140px)] pb-10 text-paper">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-10 text-[15px] leading-[1.9]">
        <nav aria-labelledby="footer-site" className="flex flex-col">
          <h2 id="footer-site" className="m-0 mb-4 eyebrow text-stone">
            Site
          </h2>
          <a href="#about" className={linkClass}>
            About Us
          </a>
          <a href="#services" className={linkClass}>
            Services
          </a>
          <a href="#contact" className={linkClass}>
            Contact
          </a>
        </nav>
        <div className="flex flex-col">
          <h2 className="m-0 mb-4 eyebrow text-stone">Services</h2>
          <ul className="m-0 list-none p-0">
            {services.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        </div>
        <nav aria-labelledby="footer-follow" className="flex flex-col">
          <h2 id="footer-follow" className="m-0 mb-4 eyebrow text-stone">
            Follow
          </h2>
          {social.map((s) =>
            s.href ? (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {s.name}
              </a>
            ) : (
              <span key={s.name} className="text-paper/60">
                {s.name}
              </span>
            ),
          )}
        </nav>
      </div>

      <AnimatedMark data-footer-mark="" className="text-paper" />

      <div className="flex flex-wrap justify-between gap-4 border-t border-paper/18 pt-7 eyebrow text-stone">
        <span>
          Copyright {site.copyrightYear}. {site.legalName}. All rights reserved.
        </span>
        <a
          href="#top"
          className="transition-colors duration-300 hover:text-paper"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
