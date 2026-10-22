import { Kicker } from "@/components/ui/kicker";

/**
 * The mission statement "inks in" as it scrolls through the viewport: a solid
 * ink layer clipped to the text grows across a 14% ghost layer. `--p` is
 * driven by the MotionRuntime and defaults to fully inked without JS.
 */
export function Mission() {
  return (
    <section aria-labelledby="mission-label" className="px-gutter py-section">
      <Kicker className="mb-[clamp(40px,6vh,72px)]">
        <span id="mission-label">Our mission</span>
      </Kicker>
      <p className="m-0 max-w-[24ch] font-serif text-statement">
        <span
          data-fill=""
          className="[background-image:linear-gradient(var(--color-ink),var(--color-ink)),linear-gradient(rgb(14_13_12/.14),rgb(14_13_12/.14))] [background-size:var(--p,100%)_100%,100%_100%] bg-clip-text [background-repeat:no-repeat] text-transparent [-webkit-background-clip:text]"
        >
          “Our mission at Yield is to help businesses turn ideas into impact by
          building fast, embedding intelligence, and guiding digital growth with
          clarity and honesty.”
        </span>
      </p>
    </section>
  );
}
