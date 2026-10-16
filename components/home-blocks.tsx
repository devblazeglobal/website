import Image from "next/image";
import Link from "next/link";

import { partners, testimonials } from "@/lib/content";
import { services } from "@/lib/services";

/** Brand guide ServiceCard: surface, hairline, radius-lg, whole card is the link. */
export function ServiceCards() {
  return (
    <div className="grid gap-sm md:grid-cols-3">
      {services.map((s) => (
        <Link key={s.slug} href={s.path} className="group flex flex-col gap-xs rounded-lg border border-line bg-surface p-sm hover:border-ink md:p-md">
          <h3 className="text-2xl font-medium leading-tight">{s.name}</h3>
          <p className="flex-1 text-[15px] leading-relaxed text-muted">{s.summary}</p>
          <span className="mt-sm text-sm font-medium group-hover:underline">View {s.name.toLowerCase()} →</span>
        </Link>
      ))}
    </div>
  );
}

/** Proof strip under the hero (lawhive flow, step 2). */
export function ProofStrip() {
  return (
    <ul className="grid grid-cols-3 items-center gap-md sm:grid-cols-6">
      {partners.map((p) => (
        <li key={p.name} className="flex items-center justify-center">
          <Image src={p.logo} alt={p.name} width={160} height={64} className="h-9 w-auto object-contain opacity-80 grayscale md:h-11" />
        </li>
      ))}
    </ul>
  );
}

export function Accreditations() {
  const notes = partners.filter((p) => p.note);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {notes.map((p) => (
        <li key={p.name} className="flex flex-col gap-xs py-md sm:flex-row sm:items-center sm:gap-md">
          <Image src={p.logo} alt={p.name} width={160} height={64} className="h-10 w-auto object-contain object-left sm:w-40" />
          <p className="text-muted">{p.note}</p>
        </li>
      ))}
    </ul>
  );
}

/** harvey.ai testimonial: one quote in the serif, name below. */
export function Testimonial() {
  const t = testimonials[0];
  return (
    <figure className="max-w-[860px]">
      <blockquote className="quote">“{t.pull}”</blockquote>
      <figcaption className="mt-md text-sm">
        <span className="font-medium">{t.name}</span> <span className="text-muted">· {t.role}</span>
      </figcaption>
      <details className="mt-md text-sm text-muted">
        <summary className="cursor-pointer underline underline-offset-4">Read the full review</summary>
        <div className="mt-sm max-w-[675px] space-y-sm leading-relaxed">
          {t.quote.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </details>
    </figure>
  );
}

/** Split call-to-action band (lawhive), navy, one line and one button. */
export function CtaBand({ children }: { children: React.ReactNode }) {
  return <div className="on-navy flex flex-col gap-md rounded-xl bg-navy p-md text-on-navy md:flex-row md:items-center md:justify-between md:p-lg">{children}</div>;
}
