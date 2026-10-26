"use client";

import { useEffect, useRef, useState } from "react";

// How it works: three tinted panels with a live card each. Cards play once
// when they scroll into view and replay on hover; at rest every row shows.
export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  // Phones: the three panels sit in a row; swipe or use the arrows and dots.
  useEffect(() => {
    const t = track.current; if (!t) return;
    const on = () => { const w = t.firstElementChild ? (t.firstElementChild as HTMLElement).offsetWidth + 16 : 1; setAt(Math.round(t.scrollLeft / w)); };
    t.addEventListener("scroll", on, { passive: true }); return () => t.removeEventListener("scroll", on);
  }, []);
  const go = (i: number) => { const t = track.current; if (!t) return; const n = Math.max(0, Math.min(2, i)); const c = t.children[n] as HTMLElement | undefined; if (c) t.scrollTo({ left: c.offsetLeft - t.offsetLeft, behavior: "smooth" }); };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !root.current) return;
    const panels = [...root.current.querySelectorAll<HTMLElement>(".axp")];
    const play = (el: HTMLElement) => { el.classList.remove("play"); void el.offsetWidth; el.classList.add("play"); };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { play(e.target as HTMLElement); io.unobserve(e.target); } }), { threshold: 0.35 });
    const hovers = panels.map((el) => { io.observe(el); const h = () => play(el); el.addEventListener("pointerenter", h); return [el, h] as const; });
    return () => { io.disconnect(); hovers.forEach(([el, h]) => el.removeEventListener("pointerenter", h)); };
  }, []);
  return (
    <section className="ax-sec" aria-labelledby="ax-h"><div className="wide" ref={root}>
      <p className="ax-k">How it works</p>
      <h2 className="ax-h" id="ax-h">One team, from your first call to every filing</h2>
      <div className="ax ax-track" ref={track}>
        <article className="axp a1">
          <span className="ax-n" aria-hidden="true">1</span><h3>Book a call</h3><p>Message us on WhatsApp or choose a time that suits you. A Chartered Accountant is assigned to your business from your first message.</p>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>Consultation request</span><span className="live"><i />Live</span></div>
            <div className="axr box r1"><span className="av">TW</span><div><b>Tan W.</b><small>New company · Pte Ltd</small></div><em>New</em></div>
            <div className="axr meta r2"><span>via WhatsApp</span><span>12s ago</span></div>
            <div className="axr ok r3"><i /><span>Accountant assigned</span><span className="tk">✓</span></div>
            <p className="ex">Example</p>
          </div>
        </article>
        <article className="axp a2">
          <span className="ax-n" aria-hidden="true">2</span><h3>Share your requirements</h3><p>We send you a clear list of the documents we need. Upload or message them to us, and we check off each item as it arrives.</p>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>Requirements · Pte Ltd</span><span className="live"><i />Live</span></div>
            <ul className="axl">
              <li className="r1"><span>Proposed company name</span><b>✓</b></li>
              <li className="r2"><span>Director ID and address</span><b>✓</b></li>
              <li className="r3"><span>Shareholders and shares</span><b>✓</b></li>
              <li className="r4"><span>Registered address</span><b>✓</b></li>
              <li className="r5 wait"><span>Business activity (SSIC)</span><b className="dots"><i /><i /><i /></b></li>
            </ul>
            <div className="axbar"><span>Collecting documents</span><span className="pg"><i /></span><span>4 of 5</span></div>
          </div>
        </article>
        <article className="axp a3">
          <span className="ax-n" aria-hidden="true">3</span><h3>We handle the rest</h3><p>We keep your filings, books and deadlines on one calendar. Every filing is confirmed on WhatsApp and recorded in Xero, so you can focus on running your business.</p>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>Filings · FYE 31 Dec 2026</span><span className="syn">Synced</span></div>
            <div className="axf r1"><div><b>Estimated Chargeable Income</b><small>IRAS</small></div><em>Filed</em></div>
            <div className="axf r2 dim"><div><b>IR8A employee income</b><small>IRAS</small></div><em>1 Mar</em></div>
            <div className="axf r3"><div><b>Annual return</b><small>ACRA</small></div><em>Filed</em></div>
            <div className="axf r4"><div><b>Corporate tax</b><small>IRAS</small></div><em className="sch">Scheduled</em></div>
            <div className="axfoot r5">Recorded in Xero <span className="tk">✓</span></div>
          </div>
        </article>
      </div>
      <div className="ax-nav" aria-label="How it works steps">
        <button type="button" className="ax-arrow" aria-label="Previous step" onClick={() => go(at - 1)} disabled={at === 0}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <span className="ax-dots">{[0, 1, 2].map((i) => <button key={i} type="button" aria-label={`Step ${i + 1}`} aria-current={i === at ? "step" : undefined} onClick={() => go(i)} />)}</span>
        <button type="button" className="ax-arrow" aria-label="Next step" onClick={() => go(at + 1)} disabled={at === 2}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      </div>
      <div className="ax-acts">
        <button className="btn btn-navy btn-lg" type="button" data-open-start>Book a free consultation</button>
        <a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20book%20a%20call." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
      </div>
    </div></section>
  );
}
