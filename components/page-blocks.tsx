import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

/** Content column: 1092px (brand guide content-max), side gutter space-sm → space-md. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1092px] px-sm md:px-md ${className}`}>{children}</div>;
}

/** A page section: space-xl top and bottom. */
export function Section({ children, className = "", id, tone = "paper" }: { children: React.ReactNode; className?: string; id?: string; tone?: "paper" | "alt" | "navy" }) {
  const bg = tone === "navy" ? "on-navy bg-navy text-on-navy" : tone === "alt" ? "bg-surface-alt" : "";
  return (
    <section id={id} className={`py-xl ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Eyebrow + H2, space-md above the content that follows. */
export function SectionHeading({ eyebrow, children, onNavy = false }: { eyebrow?: string; children: React.ReactNode; onNavy?: boolean }) {
  return (
    <div className="mb-md">
      {eyebrow && <p className={`label mb-sm ${onNavy ? "text-gold" : "text-gold-text"}`}>{eyebrow}</p>}
      <h2 className="display-md">{children}</h2>
    </div>
  );
}

export function Breadcrumbs({ items, onNavy = false }: { items: { name: string; path: string }[]; onNavy?: boolean }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className={`text-sm ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>
        <ol className="flex flex-wrap gap-1.5">
          {items.map((it, i) => (
            <li key={it.path} className="flex gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i < items.length - 1 ? (
                <Link href={it.path} className={onNavy ? "hover:text-on-navy" : "hover:text-ink"}>
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className={onNavy ? "text-on-navy" : "text-ink"}>
                  {it.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Inner-page hero (harvey.ai split): H1 left; lead and actions right from 1025px. */
export function PageHeader({ crumbs, title, lead, actions }: { crumbs: { name: string; path: string }[]; title: string; lead?: string; actions?: React.ReactNode }) {
  return (
    <div className="on-navy bg-navy text-on-navy">
      <Container className="pb-lg pt-lg">
        <Breadcrumbs items={crumbs} onNavy />
        <div className="mt-md grid gap-md lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h1 className="display-lg">{title}</h1>
          {(lead || actions) && (
            <div className="space-y-md">
              {lead && <p className="text-lg leading-relaxed text-on-navy-muted">{lead}</p>}
              {actions && <div className="flex flex-wrap gap-sm">{actions}</div>}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
