"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

// IRAS's Business Expense Deductibility Checker (expense-checker.app.tc1.airbase.sg),
// same flow in Blaze's design: what makes an expense deductible → search or
// browse by expense type → one result card → Start over. Wording is IRAS's.

export interface Expense { name: string; treatment: string; url?: string }

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

const OTHERS = "others";
const OTHERS_LABEL = "Others / Expenses not in the list";
// IRAS's quick examples. IRAS lists "Fines/Penalties"; the data spells it "Fines/penalties".
const EXAMPLES = ["Motor vehicle expenses", "Rental of business premises", "Fines/penalties"];
const LIST = /^(\(?([ivx]+|\d+|[a-z])\)|[-•])\s*/i;

// Blank lines split paragraphs; "(i)" / "(1)" lines become a numbered list,
// "-" / "•" lines a bulleted one.
function Treatment({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((t, i) => <li key={i}>{t}</li>);
    out.push(list.ordered ? <ol key={out.length}>{items}</ol> : <ul key={out.length}>{items}</ul>);
    list = null;
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const m = line.match(LIST);
    if (m) {
      const ordered = !/^[-•]/.test(line);
      if (!list || list.ordered !== ordered) { flush(); list = { ordered, items: [] }; }
      list.items.push(line.slice(m[0].length));
      continue;
    }
    flush();
    out.push(<p key={out.length}>{line}</p>);
  }
  flush();
  return <>{out}</>;
}

export function ExpenseChecker({ items, conditions, after }: { items: Expense[]; conditions: string[]; after?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const [picked, setPicked] = useState(""); // expense slug or OTHERS
  const [browse, setBrowse] = useState(false);

  const bySlug = useMemo(() => new Map(items.map((e) => [slugOf(e.name), e])), [items]);

  // The conditions fill a phone screen; start them closed there.
  useEffect(() => {
    const what = document.getElementById("xc-what") as HTMLDetailsElement | null;
    if (what && matchMedia("(max-width: 640px)").matches) what.open = false;
  }, []);

  // #<slug> or #others opens that result.
  useEffect(() => {
    const read = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id === OTHERS || bySlug.has(id)) setPicked(id);
    };
    read();
    addEventListener("hashchange", read);
    return () => removeEventListener("hashchange", read);
  }, [bySlug]);

  const q = query.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (!q) return [];
    // Names first (earliest match first), then entries that mention it in the guidance.
    const byName = items.filter((e) => e.name.toLowerCase().includes(q)).sort((a, b) => a.name.toLowerCase().indexOf(q) - b.name.toLowerCase().indexOf(q));
    const byText = items.filter((e) => !byName.includes(e) && e.treatment.toLowerCase().includes(q));
    return [...byName, ...byText].slice(0, 12);
  }, [items, q]);

  function pick(id: string, label?: string) {
    setPicked(id);
    setQuery(label ?? "");
    setFocused(false);
    setActive(-1);
    // Keep history.state: the Next router stores its own entry there, and a
    // null state makes it restore the previous hash on the next navigation.
    history.replaceState(history.state, "", id ? `#${id}` : location.pathname);
    requestAnimationFrame(() => document.getElementById("xc-result")?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(true); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Escape") setFocused(false);
    else if (e.key === "Enter") {
      e.preventDefault();
      const s = suggestions[active >= 0 ? active : 0];
      if (s) pick(slugOf(s.name), s.name);
      else if (q) pick(OTHERS, query);
    }
  }

  function startOver() {
    setBrowse(false);
    pick("");
  }

  const expense = picked && picked !== OTHERS ? bySlug.get(picked) : undefined;
  const showList = focused && q.length > 0;

  return (
    <div className="xc">
      <details className="xc-card xc-what" id="xc-what" open>
        <summary>What makes a business expense deductible?<i aria-hidden="true">+</i></summary>
        <div className="xc-what-body">
          <p>Generally, deductible business expenses are those &lsquo;wholly and exclusively incurred in the production of income&rsquo;. In other words, they must satisfy all these conditions:</p>
          <ul>{conditions.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </details>

      <p className="xc-hint">Search or browse to see whether a business expense is tax-deductible.</p>

      <div className="xc-combo">
        <div className="xc-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            id="xc-q"
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls="xc-suggest"
            aria-autocomplete="list"
            aria-activedescendant={showList && active >= 0 ? `xc-opt-${active}` : undefined}
            aria-label="Search an expense"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setFocused(true); setActive(-1); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={onKey}
            placeholder="Search an expense"
            autoComplete="off"
          />
          {query && <button type="button" className="xc-clear" onClick={() => { setQuery(""); setActive(-1); }} aria-label="Clear search">×</button>}
        </div>
        {showList && (
          <ul id="xc-suggest" className="xc-suggest" role="listbox" aria-label="Expense types">
            {suggestions.length ? suggestions.map((s, i) => (
              <li key={s.name} id={`xc-opt-${i}`} role="option" aria-selected={i === active} className={i === active ? "on" : undefined} onMouseDown={(e) => { e.preventDefault(); pick(slugOf(s.name), s.name); }}>{s.name}</li>
            )) : (
              <li id="xc-opt-0" role="option" aria-selected={false} className="xc-suggest-none" onMouseDown={(e) => { e.preventDefault(); pick(OTHERS, query); }}>{OTHERS_LABEL} →</li>
            )}
          </ul>
        )}
      </div>

      <details className="xc-card xc-browse" open={browse} onToggle={(e) => setBrowse(e.currentTarget.open)}>
        <summary>Or browse by expense type<i aria-hidden="true">+</i></summary>
        <div className="xc-browse-body">
          <label htmlFor="xc-type">Type of expense</label>
          <div className="xc-select">
            <select id="xc-type" value={picked} onChange={(e) => { const id = e.target.value; pick(id, id === OTHERS ? "" : bySlug.get(id)?.name); }}>
              <option value="">Select an expense type</option>
              {items.map((e) => <option key={e.name} value={slugOf(e.name)}>{e.name}</option>)}
              <option value={OTHERS}>{OTHERS_LABEL}</option>
            </select>
          </div>
        </div>
      </details>

      <div className="xc-card xc-result" id="xc-result" aria-live="polite">
        {expense ? (
          <>
            <h2 className="xc-title">{expense.name}</h2>
            <div className="xc-text"><Treatment text={expense.treatment} /></div>
            {expense.url && <a className="xc-iras" href={expense.url} target="_blank" rel="noopener noreferrer">More details on the IRAS website ↗</a>}
          </>
        ) : picked === OTHERS ? (
          <Others key="others" conditions={conditions} />
        ) : (
          <div className="xc-empty">
            <p>Try one of these to get started:</p>
            <div className="xc-chips">
              {EXAMPLES.filter((n) => bySlug.has(slugOf(n))).map((n) => <button key={n} type="button" className="xc-chip" onClick={() => pick(slugOf(n), n)}>{n}</button>)}
            </div>
          </div>
        )}
      </div>

      {picked && <div className="xc-again"><button type="button" className="btn btn-line" onClick={startOver}>Start over</button></div>}
      {after}
    </div>
  );
}

type Answer = "yes" | "no" | undefined;

// IRAS's "Others / Expenses not in the list": all four must be Yes. Result wording is IRAS's.
function Others({ conditions }: { conditions: string[] }) {
  const [answers, setAnswers] = useState<Answer[]>(() => conditions.map(() => undefined));
  const done = answers.every(Boolean);
  const ok = done && answers.every((a) => a === "yes");
  return (
    <>
      <h2 className="xc-title">{OTHERS_LABEL}</h2>
      <ol className="xc-conds">
        {conditions.map((c, i) => (
          <li key={i}>
            <p id={`xc-cond-${i}`}>{c}</p>
            <div className="xc-yn" role="radiogroup" aria-labelledby={`xc-cond-${i}`}>
              {(["yes", "no"] as const).map((a) => (
                <button key={a} type="button" role="radio" aria-checked={answers[i] === a} className="xc-yn-btn" onClick={() => setAnswers((prev) => prev.map((x, j) => (j === i ? a : x)))}>{a === "yes" ? "Yes" : "No"}</button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {done && (
        <div className={`xc-verdict ${ok ? "is-yes" : "is-no"}`}>
          <h3>{ok ? "Deductible" : "Not deductible"}</h3>
          <p>{ok
            ? "This expense is likely deductible. It satisfies all the conditions required for business expenses that are ‘wholly and exclusively incurred in the production of income’."
            : "This expense is not deductible. Business expenses are deductible only when they are ‘wholly and exclusively incurred in the production of income’, meaning every condition must be met. As not all conditions are satisfied, this expense cannot be deducted."}</p>
        </div>
      )}
    </>
  );
}
