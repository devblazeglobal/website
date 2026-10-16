"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { solutions } from "@/lib/solutions";

// harvey.ai "One Platform" cards. Hovering one widens it while the other
// two narrow and fade (CSS, desktop only). The screen inside each card
// drifts with scroll.
export function Segments() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const screens = Array.from(grid.current?.querySelectorAll<HTMLElement>(".screen") ?? []);
    const update = () => {
      const vh = innerHeight;
      screens.forEach((s, k) => {
        const r = s.parentElement!.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        s.style.setProperty("--py", `${(p * 70 + k * 10).toFixed(1)}px`);
      });
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="segments" id="solutions" aria-labelledby="seg-title">
      <div className="wrap intro">
        <h2 className="h2" id="seg-title">Accounting by company size</h2>
        <p>What a company needs changes as it grows. Choose yours.</p>
      </div>
      <div className="wide">
        <div className="seg-grid" ref={grid}>
          {solutions.map((s, k) => (
            <Link key={s.slug} className={`seg seg-${k + 1}`} href={s.path}>
              <div className="copy">
                <h3>{s.name}</h3>
                <p>{s.card}</p>
                <span className="btn btn-ghost">Blaze for {s.name === "SMEs" ? "SMEs" : s.name.toLowerCase()}</span>
              </div>
              <div className="screen" aria-hidden="true">
                <div className="bar"><b>{s.screen.title}</b><span className="ph ill">Illustrative</span></div>
                <ul>
                  {s.screen.rows.map((r) => (
                    <li key={r.label}>{r.label}<span className={`st ${r.tone}`}>{r.status}</span></li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
