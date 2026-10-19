"use client";

import Link from "next/link";
import { useState } from "react";

import { GROUPS, inGroup } from "@/lib/products";

// Pills switch between Set Up, Finance and Scale; each shows two or three
// product cards. Hovering a card widens it within the row. The gradient runs
// light to deep across the cards in each group.
const Tick = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ProductCards() {
  const [k, setK] = useState(0);
  const g = GROUPS[k], items = inGroup(g.key);
  return (
    <div className="pcx">
      <div className="pcx-pills" role="tablist" aria-label="Products by stage">
        {GROUPS.map((x, i) => <button key={x.key} id={`pcx-t-${x.key}`} type="button" role="tab" aria-selected={i === k} aria-controls="pcx-panel" onClick={() => setK(i)}>{x.name}</button>)}
      </div>
      <div className={`pcx-row n${items.length}`} id="pcx-panel" role="tabpanel" aria-labelledby={`pcx-t-${g.key}`} key={g.key}>
        {items.map((p, i) => (
          <Link key={p.key} className={`pcx-card pcx-${items.length === 2 ? i + 4 : i + 1}`} href={p.href}>
            <h3>{p.name}</h3>
            <ul>{p.services.map(([t]) => <li key={t}><Tick /><span>{t}</span></li>)}</ul>
            <span className="pcx-go" aria-hidden="true"><Arrow /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
