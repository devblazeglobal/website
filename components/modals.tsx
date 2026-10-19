"use client";

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
  stage: { label: "Your company", q: "Where is the company today?", type: "one", opts: [["new", "Starting a new company", "Not registered yet"], ["existing", "Already registered in Singapore"]], next: () => "dir" },
  dir: { label: "Directors", q: "Where do the directors live?", type: "one", opts: [["local", "At least one in Singapore"], ["overseas", "None in Singapore", "ACRA requires one resident director"]], next: (a) => (a.stage === "existing" ? "sec" : "staff") },
  sec: { label: "Company secretary", q: "Does the company have a company secretary?", type: "one", opts: [["yes", "Yes"], ["no", "No"]], next: () => "staff" },
  staff: { label: "Team", q: "How many employees?", type: "one", opts: [["0", "None"], ["1-4", "1 to 4"], ["5+", "5 or more"]], next: () => "revenue" },
  revenue: { label: "Revenue", q: "Annual revenue, or expected revenue?", type: "one", opts: [["Under S$1 million"], ["S$1 million to S$5 million"], ["Over S$5 million"]], next: () => "finance" },
  finance: { label: "Also needed", q: "Anything else you need?", type: "many", opts: [["Financial models or cash flow visibility"], ["Budgets and forecasts"], ["Less manual work, or dashboards"], ["None of these"]], next: () => "name" },
  name: { label: "Contact", q: "What is your name?", type: "text", key: "name", ph: "Full name", next: () => "company" },
  company: { label: "Contact", q: "Company name", type: "text", key: "company", ph: "Registered or proposed company name", next: () => "done" },
};
const steps = (a: Answers) => (a.stage === "existing" ? 8 : 7);

/** The products a company needs from its answers: (a) up to all 8. */
export function bundle(a: Answers): [string, string, string][] {
  const more = ((a.finance as string[]) ?? []).filter((x) => x !== "None of these");
  const cfo = more.filter((x) => !x.startsWith("Less manual"));
  const isNew = a.stage !== "existing";
  const r: [string, string, string][] = [];
  if (isNew) r.push(["Incorporation", "Company registered on Bizfile", "/start-a-business-in-singapore"]);
  if (a.dir === "overseas") r.push(["Nominee Directorship", "Resident director required by ACRA", "/services/nominee-directorship"]);
  if (isNew || a.sec === "no") r.push(["Corporate Secretarial", "A named company secretary", "/services/corporate-secretarial"]);
  r.push(["Accounting", "Books, statements and XBRL each year", "/services/accounting"]);
  r.push(["Tax", "ECI and Form C-S or C each year", "/services/tax"]);
  if (a.staff && a.staff !== "0") r.push(["Payroll", `Salaries, CPF, SHG and IR8A for ${a.staff === "5+" ? "5 or more" : "1 to 4"} employees`, "/services/payroll"]);
  if (a.revenue === "Over S$5 million" || cfo.length) r.push(["Outsourced CFO", cfo.length ? cfo.join(", ") : "Revenue above S$5 million", "/services/outsourced-cfo"]);
  if (more.some((x) => x.startsWith("Less manual"))) r.push(["Digitalisation, Automation and Dashboarding", "Less manual work, live dashboards", "/services/digitalisation-automation"]);
  return r;
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
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<string[]>(["stage"]);
  const [ans, setAns] = useState<Answers>({});
  const [dir, setDir] = useState<"f" | "b">("f");
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const body = useRef<HTMLDivElement>(null);
  useLock(open);

  const start = useCallback(() => { last.current = document.activeElement as HTMLElement; setAns({}); setPath(["stage"]); setDir("f"); setOpen(true); }, []);
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
    setDir("f"); setPath((p) => [...p, next]); setText(next === "name" || next === "company" ? (a[next] as string) ?? "" : ""); setErr(false);
  }, []);

  const pick = useCallback((v: string) => {
    if (!q) return;
    if (q.type === "many") {
      setAns((a) => {
        const s = new Set((a[id] as string[]) ?? []);
        if (v === "None of these") return { ...a, [id]: s.has(v) ? [] : [v] };
        s.delete("None of these");
        if (s.has(v)) s.delete(v); else s.add(v);
        return { ...a, [id]: [...s] };
      });
      return;
    }
    const nextA = id === "stage" && ans.stage !== v ? { stage: v, name: ans.name, company: ans.company } : { ...ans, [id]: v };
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
    const need = bundle(ans);
    const msg = `Hello Blaze Global, I am ${ans.name}${ans.company ? ` from ${ans.company}` : ""}.\nBased on the questionnaire, we need:\n${need.map((r, k) => `(${String.fromCharCode(97 + k)}) ${r[0]}: ${r[1]}`).join("\n")}`;
    content = (
      <>
        <p className="gs-label">Your products · {need.length} of 8</p>
        <h2 id="gs-q" className="gs-q">Based on your answers, you need</h2>
        <ol className="gs-bundle">{need.map((r) => <li key={r[0]}><div><a href={r[2]} onClick={close}>{r[0]}</a><span>{r[1]}</span></div></li>)}</ol>
        <div className="gs-actions">
          <a className="btn btn-wa btn-lg" href={whatsappUrl(msg)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>Send on WhatsApp</a>
          <button className="gs-link" type="button" onClick={start}>Start again</button>
        </div>
      </>
    );
  } else if (q.type === "text") {
    content = (
      <>
        <p className="gs-label">{q.label} · {n} of {steps(ans)}</p>
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
        <p className="gs-label">{q.label} · {n} of {steps(ans)}</p>
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
        <div className="gs-bar"><i style={{ width: id === "done" ? "100%" : `${Math.round((n / (steps(ans) + 1)) * 100)}%` }} /></div>
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
