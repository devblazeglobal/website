"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

// IRAS's Business Expense Deductibility Checker (expense-checker.app.tc1.airbase.sg),
// rebuilt from its own data.json with the wording unchanged. Every entry is in
// the HTML so the page reads without JavaScript; the search only filters.

export interface Expense { name: string; treatment: string; url?: string }

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

const LIST = /^(\(?([ivx]+|\d+|[a-z])\)|[-•])\s*/i;

// Blank lines split paragraphs; "(i)" / "(1)" lines become a numbered list,
// "-" / "•" lines a bulleted one, as on IRAS's page.
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

export function ExpenseChecker({ items }: { items: Expense[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  // #<slug> opens that entry.
  useEffect(() => {
    const pick = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id || !items.some((e) => slugOf(e.name) === id)) return;
      setOpen(id);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    pick();
    addEventListener("hashchange", pick);
    return () => removeEventListener("hashchange", pick);
  }, [items]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!q) return items;
    // Names first, then entries that mention it in the guidance.
    const byName = items.filter((e) => e.name.toLowerCase().includes(q));
    const byText = items.filter((e) => !byName.includes(e) && e.treatment.toLowerCase().includes(q));
    return [...byName, ...byText];
  }, [items, q]);

  const groups = useMemo(() => {
    if (q) return [{ letter: "", list: shown }];
    const map = new Map<string, Expense[]>();
    for (const e of shown) {
      const letter = e.name[0].toUpperCase();
      map.set(letter, [...(map.get(letter) ?? []), e]);
    }
    return [...map].map(([letter, list]) => ({ letter, list }));
  }, [shown, q]);

  return (
    <div className="xc">
      <div className="xc-search">
        <label htmlFor="xc-q" className="xc-label">Search an expense</label>
        <div className="xc-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input id="xc-q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. motor vehicle, club fee, renovation" autoComplete="off" />
          {query && <button type="button" className="xc-clear" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </div>
        <p className="xc-count" aria-live="polite">{q ? `${shown.length} of ${items.length} expense types` : `${items.length} expense types, A–Z`}</p>
        {!q && (
          <nav className="xc-letters" aria-label="Jump to letter">
            {groups.map((g) => <a key={g.letter} href={`#xc-${g.letter}`}>{g.letter}</a>)}
          </nav>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="xc-none">
          <p>No expense type matches &ldquo;{query}&rdquo;.</p>
          <a href="#not-listed" className="btn btn-line">Check an expense not in the list</a>
        </div>
      ) : (
        <div className="xc-list">
          {groups.map((g) => (
            <section key={g.letter || "results"} className="xc-group" id={g.letter ? `xc-${g.letter}` : undefined} aria-label={g.letter || "Results"}>
              {g.letter && <h3 className="xc-letter">{g.letter}</h3>}
              {g.list.map((e) => {
                const id = slugOf(e.name);
                return (
                  <details key={id} id={id} open={open === id} onToggle={(ev) => { const d = ev.currentTarget; if (d.open) setOpen(id); else if (open === id) setOpen(null); }}>
                    <summary>{e.name}<i aria-hidden="true">+</i></summary>
                    <div className="xc-body">
                      <Treatment text={e.treatment} />
                      {e.url && <a className="xc-iras" href={e.url} target="_blank" rel="noopener noreferrer">More details on the IRAS website ↗</a>}
                    </div>
                  </details>
                );
              })}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

type Answer = "yes" | "no" | undefined;

// IRAS's "Expenses not in the list": four conditions, all must be Yes.
// Result wording is IRAS's.
export function NotListedCheck({ conditions }: { conditions: string[] }) {
  const [answers, setAnswers] = useState<Answer[]>(() => conditions.map(() => undefined));
  const done = answers.every(Boolean);
  const ok = done && answers.every((a) => a === "yes");
  const set = (i: number, a: Answer) => setAnswers((prev) => prev.map((x, j) => (j === i ? a : x)));
  return (
    <div className="xc-check">
      <p className="xc-check-lead">Deductible business expenses are those &lsquo;wholly and exclusively incurred in the production of income&rsquo;. All four must be Yes.</p>
      <ol className="xc-conds">
        {conditions.map((c, i) => (
          <li key={i}>
            <p id={`xc-cond-${i}`}>{c}</p>
            <div className="xc-yn" role="radiogroup" aria-labelledby={`xc-cond-${i}`}>
              {(["yes", "no"] as const).map((a) => (
                <button key={a} type="button" role="radio" aria-checked={answers[i] === a} className="xc-yn-btn" onClick={() => set(i, a)}>{a === "yes" ? "Yes" : "No"}</button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className={`xc-result${done ? (ok ? " is-yes" : " is-no") : ""}`} aria-live="polite">
        {done ? (
          ok ? (
            <><h3>Deductible</h3><p>This expense is likely deductible. It satisfies all the conditions required for business expenses that are &lsquo;wholly and exclusively incurred in the production of income&rsquo;.</p></>
          ) : (
            <><h3>Not deductible</h3><p>This expense is not deductible. Business expenses are deductible only when they are &lsquo;wholly and exclusively incurred in the production of income&rsquo;, meaning every condition must be met. As not all conditions are satisfied, this expense cannot be deducted.</p></>
          )
        ) : (
          <p className="xc-wait">{answers.filter(Boolean).length} of {conditions.length} answered</p>
        )}
        {answers.some(Boolean) && <button type="button" className="xc-reset" onClick={() => setAnswers(conditions.map(() => undefined))}>Start over</button>}
      </div>
    </div>
  );
}
