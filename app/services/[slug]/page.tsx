import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactBlock } from "@/components/contact-block";
import { WhatsAppButton } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, Section, SectionHeading } from "@/components/page-blocks";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService, services } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ path: s.path, title: s.title, description: s.description });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);
  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHeader
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: s.path }]}
        title={`${s.name} services in Singapore`}
        lead={s.summary}
        actions={<WhatsAppButton text={s.whatsappText} label={`Ask about ${s.name.toLowerCase()}`} />}
      />
      <Section>
        <div className="grid gap-lg lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-[675px] space-y-sm text-lg leading-relaxed">
            {s.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="rounded-lg border border-line bg-surface p-md">
            <h2 className="label text-gold-text">Covers</h2>
            <ul className="mt-sm space-y-xs">
              {s.covers.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="text-gold-text">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="alt">
        <SectionHeading eyebrow="Contact">Contact us about {s.name.toLowerCase()}</SectionHeading>
        <ContactBlock defaultService={s.name} />
      </Section>
      <Section>
        <SectionHeading eyebrow="Services">Other services</SectionHeading>
        <ul className="flex flex-wrap gap-sm">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={o.path} className="inline-block rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium hover:border-ink">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
