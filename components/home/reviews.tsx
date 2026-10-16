"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GoogleIcon, Stars } from "@/components/icons";
import { testimonials } from "@/lib/content";

// Google-style review cards, 3 per view on desktop; arrows move one card.
// Only Joel's review is real. The rest are placeholders until the Google
// Business Profile is connected (docs/content-gaps.md).
const PLACEHOLDERS = 5;

export function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const joel = testimonials[0];

  const sync = useCallback(() => {
    const t = track.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 4);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    addEventListener("resize", sync);
    return () => removeEventListener("resize", sync);
  }, [sync]);

  const move = (dir: 1 | -1) => {
    const t = track.current;
    const card = t?.querySelector<HTMLElement>(".rv");
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <section className="reviews" id="reviews" aria-labelledby="rv-title">
      <div className="wrap">
        <div className="rv-head">
          <div>
            <p className="label">Reviews</p>
            <h2 className="h2" id="rv-title" style={{ marginTop: "var(--sm)" }}>Client reviews</h2>
          </div>
          <div className="arrows">
            <button className="arrow" type="button" aria-label="Previous reviews" disabled={atStart} onClick={() => move(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
            <button className="arrow" type="button" aria-label="Next reviews" disabled={atEnd} onClick={() => move(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
          </div>
        </div>
        <div className="track" ref={track} onScroll={sync}>
          <article className="rv">
            <div className="who">
              <span className="av" aria-hidden="true">{joel.name[0]}</span>
              <div><b>{joel.name}</b><small>{joel.role}</small></div>
              <GoogleIcon />
            </div>
            <Stars />
            <p className="t">{joel.quote[0]}</p>
            <p className="more">From blazeglobal.com.sg</p>
          </article>
          {Array.from({ length: PLACEHOLDERS }, (_, k) => (
            <article className="rv" key={k}>
              <div className="who">
                <span className="av" aria-hidden="true" style={{ background: "#c4cbd9" }}>?</span>
                <div><b>Reviewer</b><small>Date</small></div>
                <GoogleIcon />
              </div>
              <Stars />
              <p className="t">Google review text appears here once the Business Profile is connected.</p>
              <p className="more"><span className="ph">Placeholder</span></p>
            </article>
          ))}
        </div>
        <div className="rv-foot">
          <GoogleIcon />
          <span className="score">5.0</span>
          <Stars large label="Rating to be connected" />
          <span>Google rating and review count</span>
          <span className="ph">Placeholder</span>
        </div>
      </div>
    </section>
  );
}
