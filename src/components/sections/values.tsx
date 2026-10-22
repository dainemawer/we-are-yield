import { Kicker } from "@/components/ui/kicker";
import { values } from "@/config/site";

export function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(40px,6vw,120px)] px-gutter py-section"
    >
      <div className="sticky top-[140px]">
        <Kicker className="mb-8">Brand values</Kicker>
        <h2
          id="values-heading"
          data-reveal=""
          className="m-0 font-serif text-heading font-normal text-balance"
        >
          Five things we <em className="text-brand">won’t</em> compromise on.
        </h2>
      </div>
      <ol className="m-0 flex list-none flex-col p-0">
        {values.map((v, i) => (
          <li
            key={v.title}
            data-reveal=""
            className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-t border-ink/18 py-9 last:border-b"
          >
            <span aria-hidden="true" className="pt-3 label-lg text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2.5">
              <h3 className="m-0 font-serif text-[clamp(30px,2.6vw,44px)] leading-[1.1] font-normal">
                {v.title}
              </h3>
              <p className="m-0 text-lg leading-normal text-muted">{v.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
