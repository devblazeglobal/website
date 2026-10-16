"use client";

import { useEffect, useId, useRef, useState } from "react";

import { formatDmy, formatLong, MONTHS, parseDate } from "@/lib/deadlines";

// Year-end input: type 31/12/2026, 31 Dec 2026 or 2026-12-31, or pick from
// the calendar. A click on a day applies it and closes the picker.

export function DateField({ value, onChange, label, size = "sm", id, children }: {
  value: Date | null;
  children?: React.ReactNode;
  onChange: (d: Date) => void;
  label?: string;
  size?: "sm" | "lg";
  id?: string;
}) {
  const auto = useId();
  const inputId = id ?? auto;
  const [text, setText] = useState(value ? formatDmy(value) : "");
  const [invalid, setInvalid] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => value ?? new Date());
  const box = useRef<HTMLDivElement>(null);

  const [shown, setShown] = useState(value);
  if (value !== shown) { setShown(value); if (value) setText(formatDmy(value)); }

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const commit = (d: Date) => { setInvalid(false); setText(formatDmy(d)); onChange(d); };
  const typed = (force = false) => {
    if (!force && value && text === formatDmy(value)) return;
    const d = parseDate(text);
    if (d) commit(d); else setInvalid(true);
  };

  const y = view.getFullYear(), m = view.getMonth();
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - first + i));

  return (
    <div className={size === "sm" ? "cal2-ctl cx-mini" : "cx-date-wrap"} ref={box} style={{ position: "relative" }}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div className={size === "sm" ? "cx-field cx-field-sm" : "cx-field"}>
        <button className="cx-cal" type="button" aria-label="Open date picker" aria-haspopup="dialog" aria-expanded={open}
          onClick={() => { setView(value ?? new Date()); setOpen((o) => !o); }}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4" width="15" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M2.5 8.5h15M6.5 2v4M13.5 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <input id={inputId} type="text" value={text} placeholder="DD/MM/YYYY" autoComplete="off" spellCheck={false} aria-invalid={invalid || undefined}
          onChange={(e) => { setText(e.target.value); setInvalid(false); }}
          onBlur={() => typed()}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); typed(true); } }} />
        {children}
      </div>
      {open && (
        <div className="dp in" role="dialog" aria-label="Choose financial year end">
          <div className="dp-head">
            <button type="button" aria-label="Previous year" onClick={() => setView(new Date(y - 1, m, 1))}>«</button>
            <button type="button" aria-label="Previous month" onClick={() => setView(new Date(y, m - 1, 1))}>‹</button>
            <b className="dp-t">{MONTHS[m]} {y}</b>
            <button type="button" aria-label="Next month" onClick={() => setView(new Date(y, m + 1, 1))}>›</button>
            <button type="button" aria-label="Next year" onClick={() => setView(new Date(y + 1, m, 1))}>»</button>
          </div>
          <div className="dp-dow">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <span key={d}>{d}</span>)}</div>
          <div className="dp-grid" role="grid">
            {days.map((d) => {
              const on = value && +d === +new Date(value.getFullYear(), value.getMonth(), value.getDate());
              return (
                <button key={+d} type="button" aria-label={formatLong(d)} aria-pressed={!!on}
                  className={[d.getMonth() !== m && "out", +d === +today && "today", on && "on"].filter(Boolean).join(" ")}
                  onClick={(e) => { e.stopPropagation(); commit(d); setOpen(false); }}>{d.getDate()}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
