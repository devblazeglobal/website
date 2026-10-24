import type { DocPanel } from "@/lib/product-template";

/** Document-style example panel used on product pages. */
export function DocCard({ d }: { d: DocPanel }) {
  const [title, meta, rows, foot] = d;
  return (
    <div className="pt-doc">
      <div className="pt-dh"><b>{title}</b><span>{meta}</span></div>
      {rows.map(([k, v, tone], i) => (
        <div key={k} className={`pt-r${tone === "tot" ? " pt-tot" : ""}`} style={{ "--i": i } as React.CSSProperties}><span>{k}</span><b className={tone === "ok" ? "pt-ok" : tone === "gd" ? "pt-gd" : undefined}>{v}</b></div>
      ))}
      <div className="pt-df">{foot}</div>
    </div>
  );
}
