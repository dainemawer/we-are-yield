"use client";

import { useEffect } from "react";
import {
  EASE,
  EASE_POP,
  isIntroRunning,
  isScrollLocked,
  motionEnabled,
  prefersReducedMotion,
  registerHero,
  playHero,
  scrollToElement,
  setLenis,
} from "@/lib/motion";
import { readIntroMode } from "@/lib/intro";

/**
 * The page's motion layer. Sections are plain server-rendered markup tagged
 * with data attributes; this island wires them up after hydration. One
 * IntersectionObserver, one rAF-coalesced scroll handler, zero re-renders.
 *
 *   data-hero / data-hero-fade   headline lines + supporting copy (intro)
 *   data-reveal [data-delay]     rise + fade in when scrolled into view
 *   data-line                    hairline that draws left → right
 *   data-count="20"              number counts up
 *   data-footer-mark             glyph-by-glyph wordmark reveal
 *   data-parallax(-img)          image clip-open + parallax
 *   data-fill                    text "inks in" as you scroll past it
 *   data-header                  hides on scroll down, returns on scroll up
 */
export function MotionRuntime() {
  useEffect(() => {
    window.__yieldMotion = true;
    const root = document.body;
    const reduced = prefersReducedMotion();
    const animate = motionEnabled();
    const cleanups: Array<() => void> = [];

    if (animate) {
      setupHero(root, reduced);
      cleanups.push(setupReveals(root, reduced));
    } else {
      // Failsafe already revealed everything; don't fight it.
      playHero();
    }
    cleanups.push(setupScrollEffects(root, reduced));
    cleanups.push(setupAnchors());
    cleanups.push(setupSmoothScroll(reduced));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

// --- Hero -----------------------------------------------------------------

function setupHero(root: HTMLElement, reduced: boolean) {
  const animations: Animation[] = [];

  root.querySelectorAll<HTMLElement>("[data-hero]").forEach((el, i) => {
    if (reduced) return;
    const a = el.animate(
      [{ transform: "translateY(108%) rotate(2deg)" }, { transform: "none" }],
      { duration: 1500, delay: i * 95, easing: EASE, fill: "both" },
    );
    a.pause();
    animations.push(a);
  });

  root.querySelectorAll<HTMLElement>("[data-hero-fade]").forEach((el, i) => {
    const a = el.animate(
      reduced
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "none" },
          ],
      {
        duration: reduced ? 600 : 1200,
        delay: (reduced ? 0 : 500) + i * 80,
        easing: EASE,
        fill: "both",
      },
    );
    a.pause();
    animations.push(a);
  });

  registerHero(animations);
  if (readIntroMode() === "none") playHero();
}

// --- Scroll-triggered reveals ----------------------------------------------

function setupReveals(root: HTMLElement, reduced: boolean) {
  const triggers = new Map<Element, () => void>();

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0);
    const a = el.animate(
      reduced
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, transform: "translateY(48px)" },
            { opacity: 1, transform: "none" },
          ],
      { duration: reduced ? 700 : 1400, delay, easing: EASE, fill: "both" },
    );
    a.pause();
    triggers.set(el, () => a.play());
  });

  if (!reduced) {
    root.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
      const a = el.animate(
        [
          { transform: "scaleX(0)", transformOrigin: "0 50%" },
          { transform: "scaleX(1)", transformOrigin: "0 50%" },
        ],
        { duration: 1600, delay: 150, easing: EASE, fill: "both" },
      );
      a.pause();
      triggers.set(el, () => a.play());
    });

    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count);
      el.textContent = "0";
      triggers.set(el, () => countUp(el, to));
    });

    const mark = root.querySelector<HTMLElement>("[data-footer-mark]");
    if (mark) {
      const parts = [
        ...mark.querySelectorAll<SVGElement>("[data-mark-part]"),
      ].map((el, i) => {
        const a = el.animate(
          [{ transform: "translateY(105%)" }, { transform: "none" }],
          { duration: 1400, delay: i * 70, easing: EASE, fill: "both" },
        );
        a.pause();
        return a;
      });
      const dot = mark.querySelector<HTMLElement>("[data-mark-dot]");
      if (dot) {
        const a = dot.animate(
          [{ transform: "scale(0)" }, { transform: "scale(1)" }],
          { duration: 900, delay: 520, easing: EASE_POP, fill: "both" },
        );
        a.pause();
        parts.push(a);
      }
      triggers.set(mark, () => parts.forEach((a) => a.play()));
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        triggers.get(entry.target)?.();
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  triggers.forEach((_, el) => io.observe(el));

  return () => io.disconnect();
}

function countUp(el: HTMLElement, to: number) {
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / 1800);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// --- Scroll-linked effects --------------------------------------------------

function setupScrollEffects(root: HTMLElement, reduced: boolean) {
  const header = root.querySelector<HTMLElement>("[data-header]");
  const parallax = reduced
    ? null
    : root.querySelector<HTMLElement>("[data-parallax]");
  const parallaxImg = parallax?.querySelector<HTMLElement>(
    "[data-parallax-img]",
  );
  const fills = [...root.querySelectorAll<HTMLElement>("[data-fill]")];

  // Only do per-frame work for elements that are on (or near) screen.
  const visible = new Set<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      schedule();
    },
    { rootMargin: "25% 0px" },
  );
  if (parallax) io.observe(parallax);
  fills.forEach((el) => io.observe(el));

  let lastY = window.scrollY;
  let frame = 0;

  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    const y = window.scrollY;

    if (header) {
      const hide =
        y > lastY && y > 200 && !isIntroRunning() && !isScrollLocked();
      header.style.transform = hide ? "translateY(-110%)" : "";
    }
    lastY = y;

    if (parallax && parallaxImg && visible.has(parallax)) {
      const r = parallax.getBoundingClientRect();
      const c = clamp01((vh - r.top) / (vh * 0.9));
      const ease = 1 - Math.pow(1 - c, 3);
      const p = clamp01((vh - r.top) / (vh + r.height));
      parallax.style.clipPath = `inset(${(1 - ease) * 14}% ${(1 - ease) * 10}% 0% ${(1 - ease) * 10}% round 4px)`;
      parallaxImg.style.transform = `translateY(${(p - 0.5) * 16}%) scale(${1.18 - ease * 0.14})`;
    }

    for (const el of fills) {
      if (!visible.has(el)) continue;
      const r = el.getBoundingClientRect();
      const p = clamp01((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      el.style.setProperty("--p", `${(p * 100).toFixed(2)}%`);
    }
  };

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

// --- In-page anchors ---------------------------------------------------------

function setupAnchors() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element).closest?.<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (!link) return;
    const hash = link.getAttribute("href")!;
    const target = hash.length > 1 && document.getElementById(hash.slice(1));
    if (!target) return;

    e.preventDefault();
    scrollToElement(target);
    history.pushState(null, "", hash);
    // Move focus with the scroll so keyboard and screen-reader users land there too.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

// --- Smooth wheel scrolling ---------------------------------------------------

function setupSmoothScroll(reduced: boolean) {
  // Mouse-wheel smoothing only. Touch and trackpad-momentum stay native.
  if (reduced || !window.matchMedia("(pointer: fine)").matches) return noop;

  let disposed = false;
  let destroy = noop;
  // Loaded after hydration: it's an enhancement, not part of the critical path.
  void import("lenis").then(({ default: Lenis }) => {
    if (disposed) return;
    const lenis = new Lenis({
      lerp: 0.085,
      autoRaf: true,
      anchors: false,
      prevent: (node) => node.nodeName === "DIALOG" || !!node.closest("dialog"),
    });
    if (isScrollLocked()) lenis.stop();
    setLenis(lenis);
    destroy = () => {
      setLenis(null);
      lenis.destroy();
    };
  });

  return () => {
    disposed = true;
    destroy();
  };
}

const noop = () => {};
