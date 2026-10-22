import { RowLink } from "@/components/ui/row-link";
import { community } from "@/config/site";
import { home } from "@/content/home";

export function Community() {
  return (
    <section aria-labelledby="community-heading" className="pb-section">
      <div className="flex flex-col items-end gap-5 px-gutter pb-[clamp(40px,6vh,64px)] text-right">
        <h2
          id="community-heading"
          data-reveal=""
          className="m-0 font-serif text-heading font-normal"
        >
          Community
        </h2>
        <p
          data-reveal=""
          className="m-0 max-w-[40ch] text-[clamp(17px,1.3vw,21px)] leading-normal text-muted"
        >
          {home.community}
        </p>
      </div>
      <ul className="m-0 list-none border-t border-ink/18 p-0">
        {community.map((c) => (
          <li key={c.name}>
            <RowLink
              target={{ kind: "href", href: c.href }}
              fill="brand"
              size="md"
              title={c.name}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
