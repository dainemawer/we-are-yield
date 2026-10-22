import { RowLink } from "@/components/ui/row-link";
import { services } from "@/config/site";

const pad = (n: number) => String(n).padStart(2, "0");

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="pb-section"
    >
      <div className="flex flex-wrap items-end justify-between gap-6 px-gutter pb-[clamp(40px,6vh,64px)]">
        <h2
          id="services-heading"
          data-reveal=""
          className="m-0 font-serif text-heading font-normal"
        >
          Services
        </h2>
        <span data-reveal="" className="eyebrow text-muted">
          <span className="sr-only">{services.length} services</span>
          <span aria-hidden="true">({pad(services.length)})</span>
        </span>
      </div>
      <ul className="m-0 list-none border-t border-ink/18 p-0">
        {services.map((service, i) => (
          <li key={service.name}>
            <RowLink
              target={{ kind: "contact", service: service.name }}
              fill="ink"
              size="lg"
              index={pad(i + 1)}
              title={service.name}
              description={service.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
