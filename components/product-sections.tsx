import Link from "next/link";

import { AxPlay } from "@/components/ax-play";
import { Icon } from "@/components/ui";
import type { IconKey } from "@/lib/content-data";
import { whatsappUrl } from "@/lib/site";

// Storyboard sections for product pages. Each renders only when the page
// has the content (lib/content-new.ts EXTRAS).
const Wa = ({ text, label = "Message us on WhatsApp" }: { text: string; label?: string }) => (
  <a className="btn btn-wa btn-lg" href={whatsappUrl(text)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>{label}</a>
);

export function CardGrid({ h, items, tone = "grey" }: { h: string; items: [IconKey, string, string][]; tone?: "grey" | "white" }) {
  return (
    <section className={`ps ps-cards ${tone === "white" ? "ps-alt" : ""}`}><div className="wide">
      <h2 className="ps-h">{h}</h2>
      <ul className={`tl-grid tl-cards ps-n${items.length}`}>{items.map(([k, t, d]) => <li key={t}><span className="tl-ib"><Icon k={k} /></span><h3>{t}</h3><p>{d}</p></li>)}</ul>
    </div></section>
  );
}

export function RulesTable({ h, rows }: { h: string; rows: [string, string][] }) {
  return (
    <section className="ps ps-alt"><div className="wide ps-split">
      <h2 className="ps-h">{h}</h2>
      <dl className="ps-rules">{rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
    </div></section>
  );
}

function Col({ c, ok }: { c: [string, string[]]; ok: boolean }) {
  return <div className={`ps-col ${ok ? "yes" : "no"}`}><h3>{c[0]}</h3><ul>{c[1].map((x) => <li key={x}><span aria-hidden="true">{ok ? "✓" : "•"}</span>{x}</li>)}</ul></div>;
}

export function DoesTable({ h, yes, no }: { h: string; yes: [string, string[]]; no: [string, string[]] }) {
  return (
    <section className="ps"><div className="wide">
      <h2 className="ps-h">{h}</h2>
      <div className="ps-does"><Col c={yes} ok /><Col c={no} ok={false} /></div>
    </div></section>
  );
}

export function PlanCard({ h, included, note, wa }: { h: string; included: string[]; note: string; wa: string }) {
  return (
    <section className="ps ps-alt"><div className="wide">
      <div className="ps-plan">
        <div><h2 className="ps-h">{h}</h2><p className="ps-note">{note}</p><Wa text={wa} label="Ask for fees on WhatsApp" /></div>
        <ul>{included.map((x) => <li key={x}><span aria-hidden="true">✓</span>{x}</li>)}</ul>
      </div>
    </div></section>
  );
}

export function StepRow({ h, items }: { h: string; items: [string, string][] }) {
  return (
    <section className="ps"><div className="wide">
      <h2 className="ps-h">{h}</h2>
      <ol className={`ps-steps n${items.length}`}>{items.map(([t, d], i) => <li key={t}><span className="ps-num">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    </div></section>
  );
}

export function CompareTable({ h, cols, rows }: { h: string; cols: [string, string, string]; rows: [string, string, string][] }) {
  return (
    <section className="ps ps-alt"><div className="wide">
      <h2 className="ps-h">{h}</h2>
      <div className="ps-cmp-wrap"><table className="ps-cmp">
        <thead><tr>{cols.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td data-l={cols[1]}>{r[1]}</td><td data-l={cols[2]}>{r[2]}</td></tr>)}</tbody>
      </table></div>
    </div></section>
  );
}

export function AiAnalysis({ product, q, metrics }: { product: string; q: string; metrics: [string, string][] }) {
  return (
    <section className="ax-sec ps-ai" aria-labelledby="ai-h">
      <AxPlay className="wide">
        <article className="axp a2 axp-wide">
          <div className="axw-copy">
            <p className="ax-k">Insights with BlazeOS</p>
            <h2 className="ax-h" id="ai-h">{q}</h2>
            <p>BlazeOS brings your {product.toLowerCase()} data together in one clear view, refreshed daily. AI-assisted analysis highlights trends and anomalies, reviewed by a Chartered Accountant, so you can make smarter decisions.</p>
            <Link className="btn btn-navy btn-lg" href="/services/blazeos">Explore BlazeOS</Link>
          </div>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>BlazeOS · {product}</span><span className="live"><i />Live</span></div>
            {metrics.map(([k, v], i) => <div key={k} className={`axk r${i + 1}`}><span>{k}</span><b>{v}</b></div>)}
            <div className="axbars sm r4">{[44, 52, 49, 61, 58, 70, 76].map((x, i) => <span key={i} className={i === 6 ? "now" : ""} style={{ "--h": `${x}%` } as React.CSSProperties}><i /></span>)}</div>
            <p className="ex">Example figures</p>
          </div>
        </article>
      </AxPlay>
    </section>
  );
}

export function TrustRow() {
  return (
    <section className="ps-trust"><div className="wide">
      <ul>
        <li><b>OCBC</b><span>Qualified Introducer and Channel Partner</span></li>
        <li><b>ACRA Registered Filing Agent</b><span>FA20210247</span></li>
        <li><b>Chartered Accountants</b><span>Members of ISCA</span></li>
        <li><b>120+</b><span>Businesses served</span></li>
      </ul>
    </div></section>
  );
}
