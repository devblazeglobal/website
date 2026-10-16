"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { DateField } from "@/components/date-field";
import { daysUntil, deadlines, defaultYearEnd, dueLabel, formatShort, type Deadline } from "@/lib/deadlines";

// The last day of this month, read on the client (null while server rendering).
let cachedEnd: { key: string; date: Date } | null = null;
const monthEndSnapshot = () => {
  const d = defaultYearEnd(), key = d.toDateString();
  if (cachedEnd?.key !== key) cachedEnd = { key, date: d };
  return cachedEnd.date;
};
export const useMonthEnd = () => useSyncExternalStore(() => () => {}, monthEndSnapshot, () => null);

// ---------- Business structures: one editorial chart per structure ----------
const COLS = ["#051038", "#5b74c8", "#c9a24a", "#b9c3e3"];
const STRUCTURES: { tab: string; title: string; kind: "bar" | "line"; parts?: [string, number][] }[] = [
  { tab: "Private limited", title: "Private limited company", kind: "bar", parts: [["Founder A", 60], ["Founder B", 30], ["Option pool", 10]] },
  { tab: "Sole proprietorship", title: "Sole proprietorship", kind: "line" },
  { tab: "LLP", title: "Limited liability partnership", kind: "bar", parts: [["Partner A", 50], ["Partner B", 50]] },
  { tab: "Partnership", title: "Partnership", kind: "bar", parts: [["A", 25], ["B", 25], ["C", 25], ["D", 25]] },
];

function Bar({ parts }: { parts: [string, number][] }) {
  const W = 472, gap = 4, tw = W - gap * (parts.length - 1);
  const starts = parts.map((_, i) => 24 + parts.slice(0, i).reduce((sum, [, p]) => sum + (tw * p) / 100 + gap, 0));
  return (
    <>
      {parts.map(([label, pct], i) => {
        const w = (tw * pct) / 100, at = starts[i], end = i === parts.length - 1 && parts.length > 1;
        const tx = end ? at + w : at;
        return (
          <g key={label}>
            <rect x={at} y={128} width={w} height={10} rx={5} fill={COLS[i % 4]} />
            <text x={tx} y={112} textAnchor={end ? "end" : "start"} className="ed-v">{pct}%</text>
            <text x={tx} y={164} textAnchor={end ? "end" : "start"} className="ed-k">{label}</text>
          </g>
        );
      })}
    </>
  );
}

function Line() {
  const pts = [[24, 170], [142, 150], [260, 134], [378, 112], [496, 92]];
  return (
    <>
      <path d="M24 170 L142 150 L260 134 L378 112 L496 92 L496 180 L24 180Z" fill="#051038" opacity=".06" />
      <path d="M24 170 L142 150 L260 134 L378 112 L496 92" fill="none" stroke="#051038" strokeWidth="2" />
      {pts.slice(0, 4).map(([x, y]) => <circle key={x} cx={x} cy={y} r={3} fill="#051038" />)}
      <circle cx={496} cy={92} r={5} fill="#c9a24a" />
      <text x={490} y={80} textAnchor="end" className="ed-k">Owner&apos;s income</text>
      {["Y1", "Y2", "Y3", "Y4", "Y5"].map((y, i) => <text key={y} x={24 + i * 118} y={200} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} className="ed-k">{y}</text>)}
    </>
  );
}

export function StructureChart() {
  const [k, setK] = useState(0);
  const s = STRUCTURES[k];
  return (
    <div className="xs-vis">
      <div className="xs-frame">
        <div className="xg"><div className="lg-card">
          <svg viewBox="0 0 520 215" role="img" aria-label={`${s.title} chart`}>
            <text x="24" y="50" className="ed-t">{s.title}</text>
            {s.kind === "bar" ? <Bar parts={s.parts!} /> : <Line />}
          </svg>
        </div></div>
      </div>
      <div className="xs-tabs" role="tablist" aria-label="Business structure">
        {STRUCTURES.map((t, i) => <button key={t.tab} role="tab" type="button" aria-selected={i === k} onClick={() => setK(i)}>{t.tab}</button>)}
      </div>
    </div>
  );
}

// ---------- Deadlines: four dates in a row, iPhone-spec style ----------
export function DeadlineStats({ rows }: { rows: Deadline[] }) {
  return (
    <div className="sia">
      {rows.map((r) => {
        const d = daysUntil(r.date);
        return (
          <Link key={r.name} className="ap" href={r.href}>
            <span className={`ap-k${d < 0 ? " past" : ""}`}>{dueLabel(d)}</span>
            <b className="ap-d">{formatShort(r.date)}</b>
            <span className="ap-n">{r.name}</span>
            <span className="ap-a">{r.agency}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function ComplianceCalendar() {
  // Dates depend on today, so the default renders in the browser only.
  const monthEnd = useMonthEnd();
  const [picked, setFye] = useState<Date | null>(null);
  const fye = picked ?? monthEnd;
  const rows = useMemo(() => (fye ? deadlines(fye) : null), [fye]);
  return (
    <>
      <div className="cal2-head">
        <h2 className="h2" id="cal2-title">Annual compliance calendar</h2>
        <DateField label="Financial year end" value={fye} onChange={setFye} />
      </div>
      {rows ? <DeadlineStats rows={rows} /> : <div className="sia" aria-busy="true" style={{ minHeight: 132 }} />}
      <Link className="cal2-more" href="/compliance-deadline-calculator">Learn more <span aria-hidden="true">→</span></Link>
    </>
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
