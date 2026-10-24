"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { DateField } from "@/components/date-field";
import { FilingRegister, useMonthEnd } from "@/components/widgets";
import { daysUntil, deadlines, formatLong, formatShort, parseDate, toIcs } from "@/lib/deadlines";

// One question, then the page opens out: the filings register, then a storyboard
// that fills as you scroll. Server-rendered sections arrive as `after`.

export function Calculator({ after }: { after: React.ReactNode }) {
  const monthEnd = useMonthEnd();
  const [picked, setFye] = useState<Date | null>(null);
  const fye = picked ?? monthEnd;
  const [shown, setShown] = useState<Date | null>(null);
  const [listed, setListed] = useState(false);
  const story = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLElement>(null);
  const results = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);


  const show = (d: Date | null) => {
    if (!d) return;
    const first = !shown;
    setShown(d);
    setTimeout(() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" }), first ? 140 : 0);
  };

  const rows = shown ? deadlines(shown, listed) : [];

  // Rail runs from the first node to the last; its fill follows the scroll.
  useLayoutEffect(() => {
    if (!shown || !story.current) return;
    const steps = [...story.current.querySelectorAll<HTMLElement>(".cx-step")];
    const place = () => {
      const d0 = steps[0]?.querySelector<HTMLElement>(".cx-dot"), d1 = steps.at(-1)?.querySelector<HTMLElement>(".cx-dot");
      if (!d0 || !d1 || !rail.current) return;
      const t0 = steps[0].offsetTop + d0.offsetTop + d0.offsetHeight / 2;
      const t1 = steps.at(-1)!.offsetTop + d1.offsetTop + d1.offsetHeight / 2;
      Object.assign(rail.current.style, { top: `${t0}px`, bottom: "auto", height: `${t1 - t0}px` });
    };
    const onScroll = () => {
      const r = story.current!.getBoundingClientRect(), mid = innerHeight * 0.6;
      if (fill.current) fill.current.style.height = `${Math.max(0, Math.min(1, (mid - r.top) / r.height)) * 100}%`;
      let a = -1;
      steps.forEach((s, i) => { if (s.getBoundingClientRect().top < mid) a = i; });
      setActive(a);
    };
    place(); onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", place);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", place); };
  }, [shown, listed]);

  const download = () => {
    const url = URL.createObjectURL(new Blob([toIcs(rows)], { type: "text/calendar" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "compliance-deadlines.ics" });
    document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 500);
  };

  return (
    <>
      <section className="cx-hero pull-under" aria-labelledby="cx-h1">
        <div className="wide cx-hin">
          <h1 id="cx-h1">Singapore compliance deadline calculator</h1>
          <p className="cx-sub">Enter your financial year end.<br />We show your six deadlines, from ECI to corporate tax.</p>
          <form className="cx-form" noValidate onSubmit={(e) => {
            e.preventDefault();
            // Read the box directly: a typed date may not have been committed yet.
            const typed = parseDate((e.currentTarget.querySelector("#cx-in") as HTMLInputElement).value);
            if (typed) { setFye(typed); show(typed); }
          }}>
            <label className="cx-lab" htmlFor="cx-in">Financial year ending date</label>
            <DateField id="cx-in" size="lg" value={fye} onChange={(d) => { setFye(d); show(d); }}>
              <button className="btn btn-navy cx-go" type="submit">Show deadlines</button>
            </DateField>
            <div className="cx-quick" aria-label="Common year ends">
              {[[2026, 11, 31], [2027, 2, 31], [2027, 5, 30]].map(([y, m, d]) => {
                const v = new Date(y, m, d);
                return <button key={+v} type="button" onClick={() => { setFye(v); show(v); }}>{formatShort(v)}</button>;
              })}
            </div>
          </form>
        </div>
      </section>

      {shown && (
        <div className="cx-after unfurl">
          <section className="cx-res" aria-labelledby="cx-res-h" ref={results}>
            <div className="wide">
              <div className="cx-top">
                <div><h2 className="h2" id="cx-res-h">Deadlines</h2><p className="cx-for">Financial year ending {formatLong(shown)} · Year of Assessment {shown.getFullYear() + 1}</p></div>
                <div className="cx-acts">
                  <div className="cc-seg cx-seg" role="radiogroup" aria-label="Company">
                    <button type="button" role="radio" aria-checked={!listed} onClick={() => setListed(false)}>Private</button>
                    <button type="button" role="radio" aria-checked={listed} onClick={() => setListed(true)}>Listed</button>
                  </div>
                  <button className="btn btn-ghost-navy" type="button" onClick={download}>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>Add to calendar
                  </button>
                </div>
              </div>
              <div id="cx-sia" className="ce ce-solo"><FilingRegister key={`${+shown}-${listed}`} rows={rows} /></div>
              <ol className="cx-story" ref={story}>
                <span className="cx-rail" aria-hidden="true" ref={rail}><i ref={fill} /></span>
                {rows.map((r, i) => {
                  const d = daysUntil(r.date);
                  return (
                    <li key={r.name} className={`cx-step${i <= active ? " on" : ""}`}>
                      <span className="cx-dot" aria-hidden="true" />
                      <div className="cx-when"><b className="cx-date">{formatLong(r.date)}</b><span className={`cx-left${d < 0 ? " past" : d <= 30 ? " soon" : ""}`}>{d < 0 ? `${-d} days ago` : d === 0 ? "Today" : `${d} days left`}</span></div>
                      <div className="cx-body">
                        <span className="cx-ag">{r.agency}</span><h3>{r.name}</h3><p className="cx-rule">{r.rule}</p><p>{r.note}</p>
                        <Link className="cx-link" href={r.href}>{r.link} <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
          {after}
        </div>
      )}
    </>
  );
}
