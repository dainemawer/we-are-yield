import type Lenis from "lenis";

/**
 * Tiny client-side coordination layer shared by the motion islands
 * (loader, motion runtime, contact drawer). Module state, not React state:
 * none of it should ever trigger a re-render.
 */

export const EASE = "cubic-bezier(.19,1,.22,1)";
export const EASE_IN = "cubic-bezier(.7,0,.84,0)";
export const EASE_CURTAIN = "cubic-bezier(.76,0,.24,1)";
export const EASE_POP = "cubic-bezier(.34,1.56,.64,1)";

/** Dispatched after anything enters the top layer (e.g. the contact <dialog>). */
export const TOP_LAYER_EVENT = "yield:toplayer";

declare global {
  interface Window {
    /** Set once the motion runtime boots; read by the IntroScript failsafe. */
    __yieldMotion?: boolean;
  }
}

export function prefersReducedMotion() {
  return document.documentElement.hasAttribute("data-reduced");
}

/** True when pre-states were applied (JS ran before paint and failsafe didn't fire). */
export function motionEnabled() {
  return document.documentElement.hasAttribute("data-js");
}

// --- Scroll ---------------------------------------------------------------

let lenis: Lenis | null = null;
let scrollLocks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function lockScroll() {
  scrollLocks += 1;
  document.documentElement.style.overflow = "hidden";
  lenis?.stop();
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks > 0) return;
  document.documentElement.style.overflow = "";
  lenis?.start();
}

export function isScrollLocked() {
  return scrollLocks > 0;
}

export function scrollToElement(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY;
  if (lenis) lenis.scrollTo(top);
  else
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
}

// --- Hero intro -----------------------------------------------------------

let heroAnimations: Animation[] | null = null;
let heroRequested = false;

/** Registers paused hero animations; plays immediately if already requested. */
export function registerHero(animations: Animation[]) {
  heroAnimations = animations;
  if (heroRequested) playHero();
}

export function playHero() {
  heroRequested = true;
  if (!heroAnimations) return;
  for (const a of heroAnimations) {
    if (a.playState === "paused") a.play();
  }
}

// --- Intro state ----------------------------------------------------------

let introRunning = false;

export function setIntroRunning(running: boolean) {
  introRunning = running;
}

export function isIntroRunning() {
  return introRunning;
}
