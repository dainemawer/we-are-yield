"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedMark } from "@/components/brand/logo";
import { site } from "@/config/site";
import { markIntroSeen, readIntroMode } from "@/lib/intro";
import {
  EASE,
  EASE_CURTAIN,
  EASE_IN,
  EASE_POP,
  lockScroll,
  playHero,
  setIntroRunning,
  unlockScroll,
} from "@/lib/motion";

/**
 * The intro curtain: wordmark rises in glyph by glyph while a counter runs
 * to 100, the red full stop swells to fill the screen, then the curtain
 * lifts and hands off to the hero.
 *
 * Server-rendered (hidden by CSS unless the IntroScript selected an intro),
 * so it covers the page from the very first paint with no flash of content.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mode = readIntroMode();
    const overlay = overlayRef.current;
    const dot = overlay?.querySelector<HTMLElement>("[data-mark-dot]");
    if (mode === "none" || !overlay || !dot) {
      setDone(true);
      return;
    }

    const k = mode === "quick" ? 0.55 : 1;
    const parts = [...overlay.querySelectorAll<SVGElement>("[data-mark-part]")];
    const meta = metaRef.current;
    const counter = counterRef.current;
    const animations: Animation[] = [];
    const timers: number[] = [];
    let raf = 0;
    let finished = false;
    const run = (
      el: Element,
      kf: Keyframe[],
      opts: KeyframeAnimationOptions,
    ) => {
      const a = el.animate(kf, opts);
      animations.push(a);
      return a;
    };

    lockScroll();
    setIntroRunning(true);

    // 1. Wordmark rises in, full stop pops, meta fades up.
    parts.forEach((el, i) =>
      run(el, [{ transform: "translateY(105%)" }, { transform: "none" }], {
        duration: 1100 * k,
        delay: (200 + i * 85) * k,
        easing: EASE,
        fill: "both",
      }),
    );
    run(dot, [{ transform: "scale(0)" }, { transform: "scale(1)" }], {
      duration: 700 * k,
      delay: 780 * k,
      easing: EASE_POP,
      fill: "both",
    });
    if (meta)
      run(meta, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
        delay: 100,
        fill: "both",
      });

    // 2. Counter 000 → 100 on a cubic ease-out.
    const duration = 2100 * k;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const v = Math.round(100 * (1 - Math.pow(1 - p, 3)));
      if (counter) counter.textContent = String(v).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      markIntroSeen();
      setIntroRunning(false);
      unlockScroll();
      playHero();
      setDone(true);
    };

    // 3. Glyphs exit upward, the dot swells to cover the viewport.
    timers.push(
      window.setTimeout(() => {
        parts.forEach((el, i) =>
          run(el, [{ transform: "none" }, { transform: "translateY(-105%)" }], {
            duration: 700 * k,
            delay: i * 40,
            easing: EASE_IN,
            fill: "forwards",
          }),
        );
        if (meta)
          run(meta, [{ opacity: 1 }, { opacity: 0 }], {
            duration: 400,
            fill: "forwards",
          });

        const r = dot.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const far = Math.max(
          Math.hypot(cx, cy),
          Math.hypot(w - cx, cy),
          Math.hypot(cx, h - cy),
          Math.hypot(w - cx, h - cy),
        );
        const scale = ((far * 2) / r.width) * 1.04;
        run(
          dot,
          [{ transform: "scale(1)" }, { transform: `scale(${scale})` }],
          {
            duration: 1100 * k,
            delay: 280 * k,
            easing: EASE_CURTAIN,
            fill: "forwards",
          },
        );

        // 4. Curtain lifts; the hero starts rising just behind it.
        timers.push(
          window.setTimeout(() => {
            const out = run(
              overlay,
              [{ transform: "none" }, { transform: "translateY(-100%)" }],
              { duration: 1150 * k, easing: EASE_CURTAIN, fill: "forwards" },
            );
            timers.push(window.setTimeout(playHero, 380 * k));
            out.onfinish = finish;
          }, 1400 * k),
        );
      }, duration + 150),
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      animations.forEach((a) => a.cancel());
      if (!finished) {
        setIntroRunning(false);
        unlockScroll();
      }
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      data-loader=""
      aria-hidden="true"
      className="fixed inset-0 z-100 items-center justify-center overflow-hidden bg-ink text-paper"
    >
      <div className="w-[clamp(200px,28vw,440px)]">
        <AnimatedMark />
      </div>
      <div
        ref={metaRef}
        className="absolute inset-x-0 bottom-10 flex items-end justify-between px-gutter eyebrow text-stone opacity-0"
      >
        <span>{site.tagline}</span>
        <span
          ref={counterRef}
          className="font-serif text-[clamp(40px,5vw,88px)] leading-[0.8] font-normal tracking-[-0.02em] text-paper tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
