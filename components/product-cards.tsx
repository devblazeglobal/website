import Link from "next/link";

import { PRODUCTS } from "@/lib/products";

// Six product cards, two rows of three. Hovering a card widens it and steps
// back the other two in its row only. One gradient runs light to deep across
// all six.
const Tick = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ProductCards() {
  const rows = [PRODUCTS.slice(0, 3), PRODUCTS.slice(3)];
  return (
    <div className="pcx">
      {rows.map((row, r) => (
        <div className="pcx-row" key={r}>
          {row.map((p, i) => (
            <Link key={p.key} className={`pcx-card pcx-${r * 3 + i + 1}`} href={p.href}>
              <h3>{p.name}</h3>
              <ul>{p.services.map(([t]) => <li key={t}><Tick /><span>{t}</span></li>)}</ul>
              <span className="pcx-go" aria-hidden="true"><Arrow /></span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
