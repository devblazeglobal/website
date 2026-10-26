// Page templates for services and solutions, filled from lib/content-data.
import Link from "next/link";

import { WaButton } from "@/components/ui";
import { MAIN_PAGES, REVIEWS, SEGMENT_PAGES, SUB_PAGES, TILES, type Parent, type Product } from "@/lib/content-data";
import { JsonLd } from "@/components/json-ld";
import { ComplianceCalendar } from "@/components/widgets";
import { site, talkLabel, whatsappUrl } from "@/lib/site";
import { SUB_TEMPLATE } from "@/lib/sub-template";
import { PRODUCT_TEMPLATE } from "@/lib/product-template";
import { DocCard } from "@/components/doc-card";
import { FeatureTabs } from "@/components/feature-tabs";


/** A product page: photo hero, benefits, services, FAQ. */
const LINES: Record<Parent, [string, string]> = { accounting: ["Accounting", "/services/accounting"], tax: ["Tax", "/services/tax"], "corporate-secretarial": ["Corporate Secretarial", "/services/corporate-secretarial"] };
export const subPath = (slug: string) => `/services/${SUB_PAGES[slug].par}/${slug}`;

/** A product page (24 Oct 2026): legora.com/product/word-add-in order in
 * the sub pages' juliusbaer.com look. Painted hero in this product's blue,
 * statement, feature tabs, how it works, cards, requirements, review,
 * questions, closing bar. Incorporation and BlazeOS have their own pages. */
export function MainServiceView({ slug }: { slug: Product }) {
  const p = MAIN_PAGES[slug];
  const t = PRODUCT_TEMPLATE[slug];
  const talk = talkLabel(slug);
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const req = p.rules ?? t.req;
  const steps = p.steps?.items ?? t.steps ?? [];
  const links = p.cards.filter((c) => c[4]).length >= 4;
  const cards = (links ? p.cards.filter((c) => c[4]) : p.cards).slice(0, 4);
  const [c1, c2, c3, glow] = t.hue;
  const review = REVIEWS[0];
  return (
    <main className="view ptp" id="view-company">
      <JsonLd data={faqLd} />
      <section className="pt-hero" style={{ "--c1": c1, "--c2": c2, "--c3": c3, "--glow": glow } as React.CSSProperties}><div className="wrap">
        <nav className="pt-crumb" aria-label="Breadcrumb"><Link href="/services">Services</Link><i aria-hidden="true">·</i><span aria-current="page">{p.h1?.replace(/ Services in Singapore$/, "").replace(/ in Singapore$/, "") ?? p.heading}</span></nav>
        <h1 className="pt-eyebrow">{p.h1 ?? p.heading}</h1>
        <p className="pt-title">{p.heading}</p>
        <p className="pt-lede">{p.sub}</p>
        <div className="pt-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={p.wa} label={talk} className="btn btn-wa btn-lg" /></div>
        <div className="pt-stage"><DocCard d={t.hero} /></div>
      </div></section>

      <section className="pt-sec pt-stmt"><div className="wrap"><p>{t.statement}</p></div></section>

      <section className="pt-sec" aria-labelledby="pt-fh"><div className="wide">
        <div className="pt-head"><h2 className="pt-h2" id="pt-fh">{t.features.h}</h2><p className="pt-sub">{t.features.sub}</p></div>
        <FeatureTabs label={t.features.h} items={t.features.items} />
      </div></section>

      {steps.length > 0 && (
        <section className="pt-sec" aria-labelledby="pt-hw"><div className="wide">
          <div className="pt-head"><h2 className="pt-h2" id="pt-hw">How it works</h2></div>
          <ol className="pt-steps" style={{ "--n": steps.length } as React.CSSProperties}>{steps.map(([h, d], i) => <li key={h}><small>Step {i + 1}</small><h3>{h}</h3><p>{d}</p></li>)}</ol>
        </div></section>
      )}

      <section className="pt-sec" aria-labelledby="pt-cc"><div className="wide">
        <div className="pt-head"><h2 className="pt-h2" id="pt-cc">{t.cardsHeading}</h2></div>
        <div className="pt-cards">{cards.map(([h, d, , , href]) => links && href
          ? <Link className="pt-cd" key={h} href={href}><h3>{h}</h3><p>{d}</p><span className="pt-go">Discover more</span></Link>
          : <div className="pt-cd" key={h}><h3>{h}</h3><p>{d}</p></div>)}</div>
      </div></section>

      {req && (
        <section className="pt-sec" aria-labelledby="pt-rq"><div className="wrap pt-narrow">
          <div className="pt-head pt-c"><h2 className="pt-h2" id="pt-rq">{req.h}</h2></div>
          <dl className="pt-req">{req.rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
        </div></section>
      )}

      {p.calendar && <section className="pt-sec" aria-labelledby="cal2-title"><div className="wide pt-cal"><ComplianceCalendar /></div></section>}

      <section className="pt-sec pt-quote" aria-label="Client review"><div className="wrap">
        <blockquote>&ldquo;{review.head}&rdquo;</blockquote>
        <p className="pt-cite"><b>{review.n}</b>{review.role}</p>
      </div></section>

      <section className="pt-sec" aria-labelledby="pt-fq"><div className="wrap pt-narrow">
        <div className="pt-head pt-c"><h2 className="pt-h2" id="pt-fq">Frequently asked questions</h2></div>
        <div className="pt-faq">{p.faq.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
      </div></section>

      <section className="pt-sec pt-end" aria-labelledby="pt-ct"><div className="wide">
        <div className="pt-band"><h2 id="pt-ct">{t.cta[0]}</h2><p>{t.cta[1]}</p>
          <div className="pt-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={p.wa} label={talk} className="btn btn-wa btn-lg" /></div></div>
        <ul className="jb-creds"><li><b>OCBC</b> Qualified Introducer and Channel Partner</li><li><b>ACRA</b> Registered Filing Agent {site.filingAgent}</li><li><b>ISCA</b> Chartered Accountants</li><li><b>Chartered Accountants Worldwide</b> member</li></ul>
      </div></section>
    </main>
  );
}

/** A sub page (juliusbaer.com structure, 24 Oct 2026): breadcrumb and title,
 * what's included, introduction, what sets us apart, requirements, how we
 * work, questions, related services, closing bar. Same order on all six. */
export function SubServiceView({ slug }: { slug: string }) {
  const d = SUB_PAGES[slug];
  const t = SUB_TEMPLATE[slug];
  const wa = `Hello Blaze Global, I would like help with ${d.name.toLowerCase()}.`;
  const par = d.par;
  const talk = talkLabel(par);
  const pool = Object.keys(SUB_PAGES).filter((k) => k !== slug);
  const siblings = [...pool.filter((k) => SUB_PAGES[k].par === par), ...pool.filter((k) => SUB_PAGES[k].par !== par)].slice(0, 3);
  return (
    <main className="view jb pull-under" id="view-company">
      <div className="wrap">
        <nav className="jb-crumb" aria-label="Breadcrumb"><Link href="/services">Services</Link><i aria-hidden="true">·</i><Link href={LINES[par][1]}>{LINES[par][0]}</Link><i aria-hidden="true">·</i><span aria-current="page">{d.name}</span></nav>
        <div className="jb-title">
          <h1>{d.name}</h1>
          <p>{d.lede}</p>
          <div className="jb-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button><WaButton text={wa} label={talk} className="btn btn-wa btn-lg" /></div>
        </div>
      </div>

      <section className="jb-blk" aria-label="What's included"><div className="wide jb-cards">
        {TILES[slug].map(([, h, p]) => <div className="jb-c" key={h}><h3>{h}</h3><p>{p}</p></div>)}
      </div></section>

      <section className="jb-blk" aria-label="Introduction"><div className="wrap jb-narrow jb-prose">
        {t.intro.map((p) => <p key={p}>{p}</p>)}
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-apart"><div className="wide">
        <h2 className="jb-lbl" id="jb-apart">What sets us apart</h2>
        <div className="jb-apart">{APART.map(([h, p, icon]) => <div key={h}><svg viewBox="0 0 56 56" fill="none" strokeWidth="1.3" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} /><h3>{h}</h3><p>{p}</p></div>)}</div>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-req"><div className="wrap jb-narrow">
        <h2 className="jb-h2" id="jb-req">{t.req.h}</h2>
        <dl className="jb-req">{t.req.rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-how"><div className="wide">
        <h2 className="jb-h2" id="jb-how">How we work</h2>
        <ol className="jb-steps">{t.steps.map(([h, p], i) => <li key={h}><small>Step {i + 1}</small><h3>{h}</h3><p>{p}</p></li>)}</ol>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-faq"><div className="wrap jb-narrow">
        <h2 className="jb-h2" id="jb-faq">Frequently asked questions</h2>
        <div className="jb-faq">{t.faq.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-more"><div className="wide">
        <h2 className="jb-h2" id="jb-more">More from {LINES[par][0]}</h2>
        <div className="jb-cards">{siblings.map((k) => <Link className="jb-c" key={k} href={subPath(k)}><h3>{SUB_PAGES[k].name}</h3><p>{SUB_PAGES[k].line}</p><span className="jb-go">Discover more</span></Link>)}</div>
      </div></section>

      <section className="jb-blk" aria-label="Work with Blaze Global"><div className="wide">
        <div className="jb-close"><p>Work with Blaze Global</p><div className="jb-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={wa} label={talk} className="btn btn-wa btn-lg" /></div></div>
        <ul className="jb-creds"><li><b>OCBC</b> Qualified Introducer and Channel Partner</li><li><b>ACRA</b> Registered Filing Agent {site.filingAgent}</li><li><b>ISCA</b> Chartered Accountants</li><li><b>120+</b> businesses served</li></ul>
      </div></section>
    </main>
  );
}

const APART: [string, string, string][] = [
  ["Chartered Accountants", "Your work is handled by ISCA members with Big Four experience and a personal approach.", '<circle cx="28" cy="20" r="9" stroke="currentColor"/><path d="M12 46c2-9 8-14 16-14s14 5 16 14" stroke="currentColor"/><circle cx="40" cy="14" r="6" class="g"/><path d="M37.5 14l2 2 3.5-4" class="gs"/>'],
  ["Registered and reliable", "As an ACRA Registered Filing Agent, we lodge your filings with ACRA and IRAS ourselves.", '<rect x="12" y="10" width="28" height="36" rx="2" stroke="currentColor"/><path d="M18 20h16M18 27h16M18 34h10" stroke="currentColor"/><circle cx="40" cy="40" r="8" class="g"/><path d="M36.5 40l2.5 2.5 4.5-5" class="gs"/>'],
  ["One partner, every stage", "Your accountant, company secretary and tax adviser, together in one WhatsApp thread.", '<path d="M10 14h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-8 6v-6h-4a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" stroke="currentColor"/><rect x="30" y="26" width="20" height="14" rx="3" class="g"/><path d="M35 33h10" class="gs"/>'],
];

/** Start-ups, SMEs, large companies, in the sub pages' juliusbaer.com
 * structure: breadcrumb and title, reasons, everything they need, what sets
 * us apart, closing bar with credentials. */
export function SegmentView({ slug }: { slug: string }) {
  const p = SEGMENT_PAGES[slug];
  const talk = "WhatsApp us";
  return (
    <main className="view jb pull-under" id="view-company">
      <div className="wrap">
        <nav className="jb-crumb" aria-label="Breadcrumb"><Link href="/services">Solutions</Link><i aria-hidden="true">·</i><span aria-current="page">{p.name}</span></nav>
        <div className="jb-title">
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
          <div className="jb-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button><WaButton text={p.wa} label={talk} className="btn btn-wa btn-lg" /></div>
        </div>
      </div>

      <section className="jb-blk" aria-labelledby="jb-why"><div className="wide">
        <h2 className="jb-h2" id="jb-why">{p.bandHeading}</h2>
        <div className="jb-cards">{p.why.map(([h, d]) => <div className="jb-c" key={h}><h3>{h}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-need"><div className="wide">
        <h2 className="jb-h2" id="jb-need">{p.needHeading}</h2>
        <div className="jb-cards">{p.needs.map(([, h, d, href]) => {
          const to = href || (h === "WhatsApp support" ? whatsappUrl(p.wa) : "");
          if (!to) return <div className="jb-c" key={h}><h3>{h}</h3><p>{d}</p></div>;
          return to.startsWith("/")
            ? <Link className="jb-c" key={h} href={to}><h3>{h}</h3><p>{d}</p><span className="jb-go">Discover more</span></Link>
            : <a className="jb-c" key={h} href={to} target="_blank" rel="noopener"><h3>{h}</h3><p>{d}</p><span className="jb-go">Message us</span></a>;
        })}</div>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-apart"><div className="wide">
        <h2 className="jb-lbl" id="jb-apart">What sets us apart</h2>
        <div className="jb-apart">{APART.map(([h, d, icon]) => <div key={h}><svg viewBox="0 0 56 56" fill="none" strokeWidth="1.3" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} /><h3>{h}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section className="jb-blk" aria-label="Work with Blaze Global"><div className="wide">
        <div className="jb-close"><p>Work with Blaze Global</p><div className="jb-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={p.wa} label={talk} className="btn btn-wa btn-lg" /></div></div>
        <ul className="jb-creds"><li><b>OCBC</b> Qualified Introducer and Channel Partner</li><li><b>ACRA</b> Registered Filing Agent {site.filingAgent}</li><li><b>ISCA</b> Chartered Accountants</li><li><b>120+</b> businesses served</li></ul>
      </div></section>
    </main>
  );
}
