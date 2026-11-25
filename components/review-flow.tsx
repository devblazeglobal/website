"use client";

import { useEffect, useRef } from "react";

// ---------- Reviews: drifts right to left, and scrolls or drags both ways ----------
// The cards are rendered three times. The position stays in the middle of
// the track and jumps by exactly one set, so neither direction has an end.
export function ReviewFlow({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = track.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = [...t.querySelectorAll<HTMLElement>(".rvc")];
    const per = cards.length / 3;
    const span = () => cards[per].offsetLeft - cards[0].offsetLeft;

    // Each card shows as many lines as its free space holds.
    const fit = () => {
      for (const box of t.querySelectorAll<HTMLElement>(".rvc-tw")) {
        const line = parseFloat(getComputedStyle(box).lineHeight);
        if (line) box.style.setProperty("--lines", String(Math.max(5, Math.floor((box.clientHeight + 1) / line))));
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(t);

    let pos = span(), held = false, focused = false, touched = 0, last = 0, raf = 0;
    t.scrollLeft = pos;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); last = now;
      if (Math.abs(t.scrollLeft - pos) > 2) pos = t.scrollLeft; // moved by the visitor
      const s = span();
      let next = pos;
      if (!still && !held && !focused && !drag && now - touched > 1500) next += dt * 0.034;
      if (next < s * 0.5) next += s;
      else if (next >= s * 1.5) next -= s;
      if (next !== pos) { pos = next; t.scrollLeft = pos; }
      raf = requestAnimationFrame(tick);
    };

    let drag: { x: number; from: number; moved: boolean } | null = null;
    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") held = true; };
    const leave = () => { held = false; };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button === 0) drag = { x: e.clientX, from: t.scrollLeft, moved: false };
      else if (e.pointerType !== "mouse") touched = performance.now();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; t.setPointerCapture(e.pointerId); t.classList.add("drag"); }
      if (!drag.moved) return;
      // Stay inside the middle set while dragging
      const s = span();
      let left = drag.from - dx;
      if (left < s * 0.5) { left += s; drag.from += s; }
      else if (left >= s * 1.5) { left -= s; drag.from -= s; }
      pos = left; t.scrollLeft = left;
    };
    let suppress = false;
    const up = () => {
      suppress = !!drag?.moved;
      drag = null; t.classList.remove("drag");
      if (suppress) setTimeout(() => { suppress = false; }, 0);
    };
    const click = (e: MouseEvent) => { if (suppress) { e.preventDefault(); e.stopPropagation(); } };
    const scrolled = () => { if (Math.abs(t.scrollLeft - pos) > 2) touched = performance.now(); };
    const focusIn = (e: FocusEvent) => { focused = (e.target as HTMLElement).matches(":focus-visible"); };
    const focusOut = () => { focused = false; };
    const key = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      t.scrollBy({ left: (e.key === "ArrowLeft" ? -1 : 1) * (span() / per), behavior: still ? "auto" : "smooth" });
    };
    t.addEventListener("pointerenter", enter); t.addEventListener("pointerleave", leave);
    t.addEventListener("pointerdown", down); t.addEventListener("pointermove", move);
    t.addEventListener("pointerup", up); t.addEventListener("pointercancel", up);
    t.addEventListener("click", click, true);
    t.addEventListener("scroll", scrolled, { passive: true });
    t.addEventListener("focusin", focusIn); t.addEventListener("focusout", focusOut);
    t.addEventListener("keydown", key);
    raf = requestAnimationFrame((n) => { last = n; tick(n); });
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      t.removeEventListener("pointerenter", enter); t.removeEventListener("pointerleave", leave);
      t.removeEventListener("pointerdown", down); t.removeEventListener("pointermove", move);
      t.removeEventListener("pointerup", up); t.removeEventListener("pointercancel", up);
      t.removeEventListener("click", click, true);
      t.removeEventListener("scroll", scrolled);
      t.removeEventListener("focusin", focusIn); t.removeEventListener("focusout", focusOut);
      t.removeEventListener("keydown", key);
    };
  }, []);
  return <div className="rv-marq" ref={track} tabIndex={0} role="group" aria-label="Client reviews, scroll left or right"><div className="rv-flow">{children}</div></div>;
}
