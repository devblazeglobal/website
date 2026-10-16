import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WhatsAppButton } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getSolution, solutions } from "@/lib/solutions";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return pageMetadata({ path: s.path, title: s.title, description: s.description });
}

// One page per company size: hero, five numbered needs, matching services,
// call-to-action band.
export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: s.name, path: s.path }])} />
      <section className="seg-hero pull-under">
        <div className="wrap inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Solutions / <span aria-current="page">{s.name}</span>
          </nav>
          <div className="grid">
            <h1>{s.h1}</h1>
            <div className="actions">
              <WhatsAppButton text={s.whatsappText} />
            </div>
          </div>
        </div>
      </section>
      <section className="needs">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{s.needsHeading}</h2>
          </div>
          <ol className="steps">
            {s.needs.map((n, i) => (
              <li key={n.title}>
                <span className="n">{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="seg-svcs">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">Services for {s.name === "SMEs" ? "SMEs" : s.name.toLowerCase()}</h2>
          </div>
          <div className="chips">
            {s.services.map((c) => (
              <Link key={c.name} href={c.href}>
                <b>{c.name}</b>
                <span>{c.group}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="seg-cta">
        <div className="wrap">
          <div className="band">
            <p>{s.ctaLine}</p>
            <WhatsAppButton text={s.whatsappText} />
          </div>
        </div>
      </section>
    </>
  );
}
