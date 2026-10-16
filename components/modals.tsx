"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { REVIEWS } from "@/lib/content-data";
import { whatsappUrl } from "@/lib/site";

// Apple-style modals: grey-blur backdrop fades, the panel rises.
// Any element with data-open-start opens Get started; data-rv="n" opens
// review n. Nothing is stored: answers open as a WhatsApp message.

type Kind = "one" | "many" | "text";
interface Question { label: string; q: string; type: Kind; opts?: [string, string?, string?][]; key?: "name" | "company"; ph?: string; next: (a: Answers) => string }
type Answers = Record<string, string | string[] | undefined>;

const Q: Record<string, Question> = {
  kind: { label: "Your business", q: "Is this a new or an existing business?", type: "one", opts: [["new", "New business", "Not registered yet"], ["existing", "Existing business", "Already registered with ACRA"]], next: (a) => (a.kind === "new" ? "newbiz" : "revenue") },
  revenue: { label: "Existing business", q: "What is the company's annual revenue?", type: "one", opts: [["Below S$1 million"], ["S$1 million to S$5 million"], ["Above S$5 million"]], next: () => "staff" },
  staff: { label: "Existing business", q: "How many employees?", type: "one", opts: [["1 to 10"], ["11 to 50"], ["More than 50"]], next: () => "books" },
  books: { label: "Existing business", q: "Who keeps the books today?", type: "one", opts: [["In-house"], ["Another accounting firm"], ["No one yet"]], next: () => "needOld" },
  needOld: { label: "Existing business", q: "What do you need?", type: "many", opts: [["Bookkeeping"], ["Financial statements and XBRL"], ["Company secretary"], ["AGM and annual return"], ["GST returns"], ["Tax advisory"], ["Forecasting"]], next: () => "name" },
  name: { label: "Contact", q: "What is your name?", type: "text", key: "name", ph: "Full name", next: () => "company" },
  company: { label: "Contact", q: "Company name", type: "text", key: "company", ph: "Registered company name", next: () => "done" },
};
const STEPS = 7;

function segment(a: Answers): [string, string] {
  if (a.kind !== "existing") return ["start-ups", "/solutions/startups"];
  if (a.revenue === "Above S$5 million" || a.staff === "More than 50") return ["large companies", "/solutions/large-companies"];
  return ["SMEs", "/solutions/smes"];
}
function summary(a: Answers): [string, string][] {
  const rows: [string, string][] = [["Business", a.kind === "new" ? "New business" : "Existing business"]];
  if (a.revenue) rows.push(["Annual revenue", a.revenue as string]);
  if (a.staff) rows.push(["Employees", a.staff as string]);
  if (a.books) rows.push(["Books kept by", a.books as string]);
  const need = a.needOld as string[] | undefined;
  if (need?.length) rows.push(["Needs", need.join(", ")]);
  if (a.company) rows.push(["Company", a.company as string]);
  return rows;
}

function useLock(open: boolean) {
  useEffect(() => {
    document.documentElement.classList.toggle("locked", open);
    return () => document.documentElement.classList.remove("locked");
  }, [open]);
}

const Close = ({ onClick }: { onClick: () => void }) => (
  <button className="gs-x" type="button" aria-label="Close" onClick={onClick}><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
);

export function GetStarted() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<string[]>(["kind"]);
  const [ans, setAns] = useState<Answers>({});
  const [dir, setDir] = useState<"f" | "b">("f");
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const body = useRef<HTMLDivElement>(null);
  useLock(open);

  const start = useCallback(() => { last.current = document.activeElement as HTMLElement; setAns({}); setPath(["kind"]); setDir("f"); setOpen(true); }, []);
  const close = useCallback(() => { setOpen(false); last.current?.focus?.(); }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-open-start]");
      if (t) { e.preventDefault(); start(); }
    };
    document.addEventListener("click", onClick);
    const fromHash = () => { if (location.hash === "#get-started") { history.replaceState(null, "", location.pathname); start(); } };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => { document.removeEventListener("click", onClick); removeEventListener("hashchange", fromHash); };
  }, [start]);

  const id = path[path.length - 1];
  const q = Q[id];

  const go = useCallback((next: string, a: Answers) => {
    if (next === "newbiz") { close(); router.push("/start-a-business-in-singapore"); return; }
    setDir("f"); setPath((p) => [...p, next]); setText(next === "name" || next === "company" ? (a[next] as string) ?? "" : ""); setErr(false);
  }, [close, router]);

  const pick = useCallback((v: string) => {
    if (!q) return;
    if (q.type === "many") {
      setAns((a) => { const s = new Set((a[id] as string[]) ?? []); if (s.has(v)) s.delete(v); else s.add(v); return { ...a, [id]: [...s] }; });
      return;
    }
    const nextA = id === "kind" && ans.kind !== v ? { kind: v, name: ans.name, company: ans.company } : { ...ans, [id]: v };
    setAns(nextA);
    setTimeout(() => go(q.next(nextA), nextA), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
  }, [q, id, ans, go]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); close(); return; }
      if (e.key === "Tab" && body.current) {
        const panel = body.current.closest(".gs-panel")!;
        const f = [...panel.querySelectorAll<HTMLElement>("button,a[href],input")].filter((x) => x.offsetParent && x.style.visibility !== "hidden");
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1]?.focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]?.focus(); }
        return;
      }
      if (!q || q.type === "text" || e.metaKey || e.ctrlKey) return;
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) { const o = q.opts?.[k.charCodeAt(0) - 65]; if (o) { e.preventDefault(); pick(o[0]); } }
      if (e.key === "Enter" && q.type === "many" && ((ans[id] as string[]) ?? []).length) { e.preventDefault(); go(q.next(ans), ans); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, q, id, ans, pick, go, close]);

  useEffect(() => {
    if (!open || !body.current) return;
    const t = setTimeout(() => (body.current?.querySelector<HTMLElement>("input, .gs-opt.on, .gs-opt, .btn") ?? null)?.focus(), 60);
    return () => clearTimeout(t);
  }, [open, id]);

  const n = path.length;
  let content: React.ReactNode;
  let hint: React.ReactNode = "";
  if (id === "done") {
    const rows = summary(ans), seg = segment(ans);
    const msg = `Hello Blaze Global, I am ${ans.name}.\n${rows.map((r) => `${r[0]}: ${r[1]}`).join("\n")}`;
    content = (
      <>
        <p className="gs-label">Get started</p>
        <h2 id="gs-q" className="gs-q">Thank you, {ans.name as string}.</h2>
        <dl className="gs-sum">{rows.map((r) => <div key={r[0]}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>)}</dl>
        <div className="gs-actions">
          <a className="btn btn-wa btn-lg" href={whatsappUrl(msg)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>Send on WhatsApp</a>
          <a className="gs-link" href={seg[1]} onClick={close}>Blaze for {seg[0]} ›</a>
        </div>
      </>
    );
  } else if (q.type === "text") {
    content = (
      <>
        <p className="gs-label">{q.label} · {n} of {STEPS}</p>
        <h2 id="gs-q" className="gs-q">{q.q}</h2>
        <form className="gs-text" onSubmit={(e) => { e.preventDefault(); const v = text.trim(); if (!v) { setErr(true); return; } const a = { ...ans, [q.key!]: v }; setAns(a); go(q.next(a), a); }}>
          <input className={err ? "err" : undefined} autoComplete={q.key === "name" ? "name" : "organization"} maxLength={80} placeholder={q.ph} value={text} onChange={(e) => { setText(e.target.value); setErr(false); }} />
          <button className="btn btn-navy" type="submit">OK ✓</button>
        </form>
      </>
    );
    hint = <>Press <b>Enter ↵</b></>;
  } else {
    const sel = q.type === "many" ? ((ans[id] as string[]) ?? []) : [ans[id] as string];
    content = (
      <>
        <p className="gs-label">{q.label} · {n} of {STEPS}</p>
        <h2 id="gs-q" className="gs-q">{q.q}</h2>
        <div className="gs-opts" role={q.type === "many" ? "group" : "radiogroup"}>
          {q.opts!.map((o, k) => {
            const on = sel.includes(o[0]);
            return (
              <button key={o[0]} type="button" className={`gs-opt${on ? " on" : ""}`} onClick={() => pick(o[0])} {...(q.type === "many" ? { "aria-pressed": on } : { role: "radio", "aria-checked": on })}>
                <kbd>{String.fromCharCode(65 + k)}</kbd><span><b>{o[1] ?? o[0]}</b>{o[2] && <small>{o[2]}</small>}</span><i aria-hidden="true">✓</i>
              </button>
            );
          })}
        </div>
        {q.type === "many" && <button className="btn btn-navy gs-ok" type="button" onClick={() => { if (sel.length) go(q.next(ans), ans); }}>OK ✓</button>}
      </>
    );
    hint = q.type === "many" ? <>Choose any · press <b>Enter ↵</b></> : <>Press <b>A</b>–<b>{String.fromCharCode(64 + q.opts!.length)}</b></>;
  }

  return (
    <div className={`gs${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="gs-q" aria-hidden={!open}>
      <div className="gs-bg" onClick={close} />
      <div className="gs-panel">
        <div className="gs-bar"><i style={{ width: id === "done" ? "100%" : `${Math.round((n / (STEPS + 1)) * 100)}%` }} /></div>
        <Close onClick={close} />
        <div className="gs-body in" data-dir={dir} key={id} ref={body}>{open && content}</div>
        <div className="gs-foot">
          <button className="gs-back" type="button" style={{ visibility: path.length > 1 && id !== "done" ? "visible" : "hidden" }} onClick={() => { setDir("b"); setPath((p) => p.slice(0, -1)); }}>← Back</button>
          <span className="gs-hint">{hint}</span>
        </div>
      </div>
    </div>
  );
}

export function ReviewModal() {
  const [k, setK] = useState<number | null>(null);
  const last = useRef<HTMLElement | null>(null);
  useLock(k !== null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-rv]");
      if (t) { last.current = t; setK(+t.dataset.rv!); }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setK(null); };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onKey); };
  }, []);
  const close = () => { setK(null); last.current?.focus?.(); };
  const r = k !== null ? REVIEWS[k] : null;
  return (
    <div className={`gs rvm${r ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="rvm-h" aria-hidden={!r}>
      <div className="gs-bg" onClick={close} />
      <div className="gs-panel">
        <Close onClick={close} />
        {r && (
          <div>
            <p className="gs-label">{r.n} · {r.role}</p>
            <h2 className="gs-q" id="rvm-h">{r.head}</h2>
            <div className="rvm-text">{r.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
            <div className="rvm-src"><svg className="gl" aria-label="Google"><use href="#g" /></svg><Stars /></div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Stars = () => (
  <div className="gstars">{[0, 1, 2, 3, 4].map((i) => <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><use href="#star" /></svg>)}</div>
);
