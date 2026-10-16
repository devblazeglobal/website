"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export interface RailCard {
  key: string;
  name: string;
  text: string;
  cta: string;
  href: string;
  screen: { title: string; rows: { label: string; status: string; tone: "done" | "next" | "todo" }[] };
}

// harvey.ai "One Platform" cards. Hovering one widens it while the other
// two narrow and fade (CSS, desktop only). The screen inside each card
// drifts with scroll.
export function CardRail({ id, title, cards }: { id: string; title: string; cards: RailCard[] }) {
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
    <section className="segments" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap intro">
        <h2 className="h2" id={`${id}-title`}>{title}</h2>
      </div>
      <div className="wide">
        <div className="seg-grid" ref={grid}>
          {cards.map((c, k) => (
            <Link key={c.key} className={`seg seg-${k + 1}`} href={c.href}>
              <div className="copy">
                <h3>{c.name}</h3>
                <p>{c.text}</p>
                <span className="btn btn-ghost">{c.cta}</span>
              </div>
              <div className="screen" aria-hidden="true">
                <div className="bar"><b>{c.screen.title}</b></div>
                <ul>
                  {c.screen.rows.map((r) => (
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
