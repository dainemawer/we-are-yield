"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, TOP_LAYER_EVENT } from "@/lib/motion";

const SIZE = 52;
const REST = 12 / SIZE; // 12px dot at rest, 52px ring over anything interactive
const INTERACTIVE = "a,button,label,[data-row]";

/**
 * A difference-blended follower dot. Decorative only: the native cursor stays
 * visible. The rAF loop runs only while the dot is catching up, so an idle
 * pointer costs nothing.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const follow = prefersReducedMotion() ? 1 : 0.2;
    const grow = prefersReducedMotion() ? 1 : 0.15;
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let s = REST;
    let ts = REST;
    let raf = 0;

    const loop = () => {
      cx += (x - cx) * follow;
      cy += (y - cy) * follow;
      s += (ts - s) * grow;
      el.style.transform = `translate3d(${cx - SIZE / 2}px, ${cy - SIZE / 2}px, 0) scale(${s.toFixed(4)})`;
      const settled =
        Math.abs(x - cx) < 0.1 &&
        Math.abs(y - cy) < 0.1 &&
        Math.abs(ts - s) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      ts = (e.target as Element).closest?.(INTERACTIVE) ? 1 : REST;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // The cursor lives in the top layer (as a manual popover) so it can sit
    // above modal dialogs. Re-showing moves it back to the top of that stack.
    const raise = () => {
      if (el.matches(":popover-open")) el.hidePopover();
      el.showPopover();
    };
    raise();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener(TOP_LAYER_EVENT, raise);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener(TOP_LAYER_EVENT, raise);
      if (el.matches(":popover-open")) el.hidePopover();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor=""
      popover="manual"
      aria-hidden="true"
      className="pointer-events-none fixed inset-auto top-0 left-0 m-0 size-[52px] overflow-visible rounded-full border-0 bg-white p-0 mix-blend-difference"
      style={{ transform: "translate3d(-100px,-100px,0) scale(0.23)" }}
    />
  );
}
