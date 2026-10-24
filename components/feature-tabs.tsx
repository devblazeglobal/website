"use client";

import { useEffect, useState } from "react";

import { DocCard } from "@/components/doc-card";
import type { DocPanel } from "@/lib/product-template";

// Product-page feature tabs: one item open at a time, the panel on the right
// follows it. Moves on every 7 seconds until the visitor picks one.
export function FeatureTabs({ label, items }: { label: string; items: [string, string, DocPanel][] }) {
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setOn((i) => (i + 1) % items.length), 7000);
    return () => clearTimeout(t);
  }, [on, auto, items.length]);
  const pick = (i: number) => { setAuto(false); setOn(i); };
  return (
    <div className="pt-ft">
      <div className="pt-tabs" role="tablist" aria-label={label}>
        {items.map(([h, p], i) => (
          <button key={h} className="pt-tab" role="tab" id={`pt-tab-${i}`} aria-controls="pt-ftv" aria-selected={i === on} tabIndex={i === on ? 0 : -1} type="button"
            onClick={() => pick(i)}
            onKeyDown={(e) => { if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return; e.preventDefault(); const n = (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; pick(n); (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus(); }}>
            <h3>{h}</h3><p>{p}</p>
          </button>
        ))}
      </div>
      <div className="pt-ftv" id="pt-ftv" role="tabpanel" aria-labelledby={`pt-tab-${on}`}><DocCard d={items[on][2]} key={on} /></div>
    </div>
  );
}
