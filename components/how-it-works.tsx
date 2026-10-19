"use client";

import { useEffect, useRef } from "react";

// How it works: three tinted panels with a live card each. Cards play once
// when they scroll into view and replay on hover; at rest every row shows.
export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
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
      <h2 className="ax-h" id="ax-h">From first call to every filing, one team</h2>
      <div className="ax">
        <article className="axp a1">
          <span className="ax-n" aria-hidden="true">1</span><h3>Book a call</h3><p>Message us on WhatsApp or pick a time. A Chartered Accountant is assigned to the company from the first message.</p>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>Consultation request</span><span className="live"><i />Live</span></div>
            <div className="axr box r1"><span className="av">TW</span><div><b>Tan W.</b><small>New company · Pte Ltd</small></div><em>New</em></div>
            <div className="axr meta r2"><span>via WhatsApp</span><span>12s ago</span></div>
            <div className="axr ok r3"><i /><span>Accountant assigned</span><span className="tk">✓</span></div>
            <p className="ex">Example</p>
          </div>
        </article>
        <article className="axp a2">
          <span className="ax-n" aria-hidden="true">2</span><h3>Share your requirements</h3><p>We send the exact list of documents. You upload or message them, and each item is checked off as it arrives.</p>
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
          <span className="ax-n" aria-hidden="true">3</span><h3>We handle the rest</h3><p>Filings, books and deadlines run on one calendar. Every filing confirmed on WhatsApp and recorded in Xero.</p>
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
      <div className="ax-acts">
        <button className="btn btn-navy btn-lg" type="button" data-open-start>Book a free consultation</button>
        <a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20book%20a%20call." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
      </div>
    </div></section>
  );
}
