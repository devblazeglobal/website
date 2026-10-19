"use client";

import { useEffect, useRef } from "react";

// Plays the row animation in every .axp panel inside once it scrolls into
// view, and again on hover. At rest, and with reduced motion, all rows show.
export function AxPlay({ className, children }: { className?: string; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !root.current) return;
    const panels = [...root.current.querySelectorAll<HTMLElement>(".axp")];
    const play = (el: HTMLElement) => { el.classList.remove("play"); void el.offsetWidth; el.classList.add("play"); };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { play(e.target as HTMLElement); io.unobserve(e.target); } }), { threshold: 0.35 });
    const hs = panels.map((el) => { io.observe(el); const h = () => play(el); el.addEventListener("pointerenter", h); return [el, h] as const; });
    return () => { io.disconnect(); hs.forEach(([el, h]) => el.removeEventListener("pointerenter", h)); };
  }, []);
  return <div className={className} ref={root}>{children}</div>;
}
