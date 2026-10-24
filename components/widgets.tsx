"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { MONTHS, daysUntil, deadlines, defaultYearEnd, formatShort, type Deadline } from "@/lib/deadlines";

// The last day of this month, read on the client (null while server rendering).
let cachedEnd: { key: string; date: Date } | null = null;
const monthEndSnapshot = () => {
  const d = defaultYearEnd(), key = d.toDateString();
  if (cachedEnd?.key !== key) cachedEnd = { key, date: d };
  return cachedEnd.date;
};
export const useMonthEnd = () => useSyncExternalStore(() => () => {}, monthEndSnapshot, () => null);

// ---------- Business structures: ACRA's requirements, ticked ----------
// All four lists share one grid cell, so the card keeps the tallest height.
const REQS: [string, string, [string, string][]][] = [
  ["Private limited", "Private limited company", [["At least 1 director", "Ordinarily resident in Singapore, 18 or older"], ["1 to 50 shareholders", "Individuals or companies"], ["Company secretary", "Within 6 months; not the sole director"], ["Registered office address", "In Singapore"], ["Paid-up capital", "From S$1"], ["Separate legal entity", "Shareholders have limited liability"], ["Annual return", "Filed with ACRA every year"]]],
  ["Sole proprietorship", "Sole proprietorship", [["1 owner", "18 or older"], ["Local authorised representative", "If the owner is not resident"], ["Company secretary", "Not required"], ["Not a separate entity", "Unlimited personal liability"], ["Registered on Bizfile", "With ACRA"], ["Tax", "Owner\u2019s personal income tax"], ["Renew registration", "Every 1 to 3 years"]]],
  ["Partnership", "Partnership", [["2 to 20 partners", "Individuals, companies or LLPs, 18 or older"], ["Local authorised representative", "If partners are not resident"], ["Company secretary", "Not required"], ["Not a separate entity", "Unlimited liability for every partner"], ["Registered on Bizfile", "With ACRA"], ["Tax", "Each partner\u2019s personal income tax"], ["Renew registration", "Every 1 to 3 years"]]],
  ["LLP", "Limited liability partnership", [["2 or more partners", "18 or older"], ["At least 1 manager", "Meets local residency requirements"], ["Separate legal entity", "Can sue, be sued and own property"], ["Limited liability", "Not liable for other partners\u2019 debts"], ["Registered on Bizfile", "With ACRA"], ["Tax", "Each partner\u2019s personal income tax"], ["Annual declaration", "Filed with ACRA every year"]]],
];
const SHORT_TAB = ["Pte Ltd", "Sole prop.", "Partnership", "LLP"];
const Tick = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function StructureChecklist() {
  const [k, setK] = useState(0);
  return (
    <div className="xs-vis req">
      <div className="req-tabs" role="tablist" aria-label="Business structure">
        {REQS.map(([tab, title], i) => <button key={tab} id={`req-tab-${i}`} role="tab" type="button" aria-label={title} aria-selected={i === k} aria-controls={`req-p-${i}`} onClick={() => setK(i)}><span className="req-lt">{tab}</span><span className="req-st" aria-hidden="true">{SHORT_TAB[i]}</span></button>)}
      </div>
      <div className="req-card">
        {REQS.map(([tab, title, rows], i) => (
          <div key={tab} id={`req-p-${i}`} role="tabpanel" aria-labelledby={`req-tab-${i}`} className="req-p" hidden={i !== k} data-on={i === k}>
            <h3>{title}</h3>
            <ul className="req-list">{rows.map(([b, t]) => <li key={b}><i className="req-box"><Tick /></i><b>{b}</b><span>{t}</span></li>)}</ul>
          </div>
        ))}
        <p className="req-src">Source: <a href="https://www.acra.gov.sg/register/" target="_blank" rel="noopener">ACRA, registering a business</a></p>
      </div>
    </div>
  );
}

// ---------- Deadlines: filings register (Harvey-style rows) ----------
const LOGO: Record<string, [string, number, number]> = { ACRA: ["/logos/acra-square.png", 191, 82], IRAS: ["/logos/iras.png", 295, 341] };
const hue = (d: number) => (d < 0 ? "past" : d < 30 ? "red" : d <= 90 ? "amb" : "grn");
const left = (d: number) => (d < 0 ? `Passed ${-d} days ago` : d === 0 ? "Due today" : `${d} days left`);

export function FilingRegister({ rows }: { rows: Deadline[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="ce-list">
      {rows.map((r, i) => {
        const d = daysUntil(r.date), on = i === open, [src, w, h] = LOGO[r.agency];
        return (
          <li key={r.name} className={`ce-row h-${hue(d)}${on ? " open" : ""}`}>
            <button type="button" aria-expanded={on} aria-controls={`ce-x-${i}`} onClick={() => setOpen(on ? -1 : i)}>
              <span className="ce-lg"><Image src={src} alt={r.agency} width={w} height={h} /></span>
              <span className="ce-t"><strong>{r.name}</strong><small>{r.when}</small></span>
              <span className="ce-d"><small>Due</small><b>{formatShort(r.date)}</b><span className="hue">{left(d)}</span></span>
              <i className="chev" aria-hidden="true" />
            </button>
            <div className="ce-x" id={`ce-x-${i}`}><div>
              <dl>
                <dt>Rule</dt><dd>{r.rule}</dd>
                <dt>Note</dt><dd>{r.note}</dd>
                <dt>Official page</dt><dd><a className="ce-src" href={r.url} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>{r.agency === "ACRA" ? "acra.gov.sg" : "iras.gov.sg"} <span aria-hidden="true">↗</span></a></dd>
              </dl>
            </div></div>
          </li>
        );
      })}
    </ul>
  );
}

const WD = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
function MonthCalendar({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const [view, setView] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1));
  const y = view.getFullYear(), m = view.getMonth(), first = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - first + i));
  return (
    <div className="mc" role="group" aria-label="Financial year end">
      <div className="mc-h">
        <button type="button" aria-label="Previous month" onClick={() => setView(new Date(y, m - 1, 1))}>‹</button>
        <b aria-live="polite">{MONTHS[m]} {y}</b>
        <button type="button" aria-label="Next month" onClick={() => setView(new Date(y, m + 1, 1))}>›</button>
      </div>
      <div className="mc-w" aria-hidden="true">{WD.map((w) => <span key={w}>{w}</span>)}</div>
      <div className="mc-g">
        {days.map((d) => {
          const on = +d === +value;
          return <button key={+d} type="button" className={`${d.getMonth() !== m ? "o" : ""}${on ? " on" : ""}`} aria-pressed={on} aria-label={formatShort(d)} onClick={() => { onChange(d); if (d.getMonth() !== m) setView(new Date(d.getFullYear(), d.getMonth(), 1)); }}>{d.getDate()}</button>;
        })}
      </div>
      <p className="mc-sel">Financial year end <b>{formatShort(value)}</b></p>
    </div>
  );
}

const WA_FILING = "https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20need%20help%20with%20an%20upcoming%20filing.";

export function ComplianceCalendar() {
  // Dates depend on today, so the default renders in the browser only.
  const monthEnd = useMonthEnd();
  const [picked, setFye] = useState<Date | null>(null);
  const fye = picked ?? monthEnd;
  const rows = useMemo(() => (fye ? deadlines(fye) : null), [fye]);
  return (
    <div className="ce">
      <div className="ce-l">
        <h2 className="h2" id="cal2-title">Annual compliance calendar</h2>
        <p>Select your financial year end to see your filing deadlines.</p>
        {fye ? <MonthCalendar value={fye} onChange={setFye} /> : <div className="mc" aria-busy="true" style={{ minHeight: 330 }} />}
        <a className="btn btn-wa ce-wa" href={WA_FILING} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
        <ul className="ce-key" aria-label="Status"><li className="k-red">Under 30 days</li><li className="k-amb">30 to 90 days</li><li className="k-grn">Over 90 days</li></ul>
      </div>
      <div className="ce-r">
        {rows ? <FilingRegister key={+fye!} rows={rows} /> : <ul className="ce-list" aria-busy="true" style={{ minHeight: 720 }} />}
        <Link className="cal2-more" href="/compliance-deadline-calculator">Compliance deadline calculator <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}

// ---------- Start a business, step 1: structures in a glass card ----------
const STEP_ROWS: [string, string][][] = [
  [["Legal entity", "Separate from the owners"], ["Owners", "1 to 50 shareholders"], ["Liability", "Limited to unpaid share capital"], ["Resident director", "At least 1"], ["Tax", "Corporate Income Tax, 17%"]],
  [["Legal entity", "Not separate from the owner"], ["Owners", "1"], ["Liability", "Unlimited, personal"], ["Registration", "Bizfile"], ["Tax", "Owner's personal income tax"]],
  [["Legal entity", "Not separate from the partners"], ["Partners", "2 to 20"], ["Liability", "Unlimited, personal"], ["Registration", "Bizfile"], ["Tax", "Each partner's personal income tax"]],
  [["Legal entity", "Separate from the partners"], ["Partners", "2 or more"], ["Liability", "Limited, except own wrongful acts"], ["Local manager", "At least 1"], ["Tax", "Each partner's personal income tax"]],
];
export function StructureTabs() {
  const [k, setK] = useState(0);
  return (
    <div className="lg-card">
      <div className="lg-tabs" role="tablist" aria-label="Business structures">
        {["Private limited", "Sole proprietorship", "Partnership", "LLP"].map((t, i) => <button key={t} type="button" role="tab" aria-selected={i === k} onClick={() => setK(i)}>{t}</button>)}
      </div>
      <dl className="lg-rows">{STEP_ROWS[k].map((r) => <div key={r[0]}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>)}</dl>
    </div>
  );
}
