// Page templates for services and solutions, filled from lib/content-data.
import Link from "next/link";

import { Acts, Benefits, Credentials, EvGrid, ExploreLinks, Faq, FlankCards, Help, Icon, PageHero, PhotoHero, WaButton } from "@/components/ui";
import { MAIN_PAGES, SEGMENT_PAGES, SUB_PAGES, TILES, type Parent, type Product } from "@/lib/content-data";
import { PRODUCTS } from "@/lib/products";
import { DeliverPanels, IncorporationBand } from "@/components/deliver-panels";
import { HowItWorks } from "@/components/how-it-works";
import { JsonLd } from "@/components/json-ld";
import { AiAnalysis, CardGrid, CompareTable, DoesTable, PlanCard, RulesTable, StepRow, TrustRow } from "@/components/product-sections";
import { ComplianceCalendar } from "@/components/widgets";
import { site, talkLabel, whatsappUrl } from "@/lib/site";
import { SUB_TEMPLATE } from "@/lib/sub-template";

const CALC: [string, string] = ["Compliance deadline calculator", "/compliance-deadline-calculator"];
const INC: [string, string] = ["Incorporation", "/start-a-business-in-singapore"];

/** A product page: photo hero, benefits, services, FAQ. */
const LINES: Record<Parent, [string, string]> = { accounting: ["Accounting", "/services/accounting"], tax: ["Tax", "/services/tax"], "corporate-secretarial": ["Corporate Secretarial", "/services/corporate-secretarial"] };
export const subPath = (slug: string) => `/services/${SUB_PAGES[slug].par}/${slug}`;

export function MainServiceView({ slug }: { slug: Product }) {
  const p = MAIN_PAGES[slug];
  const entry = PRODUCTS.find((x) => x.key === slug);
  const group = entry?.group;
  const skip = new Set(p.skip ?? []);
  const links: [string, string][] = [...PRODUCTS.filter((x) => x.key !== slug && x.group === group && x.key !== "incorporation").map((x): [string, string] => [x.name, x.href]), group === "set-up" ? INC : CALC];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const talk = talkLabel(slug);
  return (
    <main className="view" id="view-company">
      <JsonLd data={faqLd} />
      <PhotoHero className="rh-main" img={p.img} title={p.h1 ?? p.heading} sub={p.h1 ? `${/[.!?]$/.test(p.heading) ? p.heading : `${p.heading}.`} ${p.sub}` : p.sub} wa={p.wa} label={talk}>
        {p.chips && <ul className="rh-chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>}
      </PhotoHero>
      {p.h1 && <TrustRow />}
      {slug === "corporate-secretarial" && <IncorporationBand />}
      {p.who && <CardGrid h={p.who.h} items={p.who.items} />}
      {p.rules && <RulesTable h={p.rules.h} rows={p.rules.rows} />}
      {p.delivers && <DeliverPanels h={p.delivers.h} items={p.delivers.items} />}
      {p.does && <DoesTable {...p.does} />}
      {p.safeguards && <CardGrid h={p.safeguards.h} items={p.safeguards.items} tone="white" />}
      {p.plans && <PlanCard {...p.plans} wa={p.wa} />}
      {p.steps && <StepRow h={p.steps.h} items={p.steps.items} />}
      {!skip.has("benefits") && <Benefits rows={p.benefits} />}
      {p.calendar && <section className="cal2" aria-labelledby="cal2-title"><div className="wide"><ComplianceCalendar /></div></section>}
      {p.ai && entry && <AiAnalysis product={entry.name} q={p.ai.q} metrics={p.ai.metrics} />}
      {!skip.has("how") && <HowItWorks />}
      {!skip.has("grid") && (
        <section className="fk fk-top"><div className="wide">
          <h2 className="fk-h">{p.gridHeading}</h2>
          <div className="fk-grid">
            <div className="fk-side"><Acts wa={p.wa} label={talk} /><ExploreLinks links={links} /></div>
            <FlankCards cards={p.cards} />
          </div>
        </div></section>
      )}
      {p.compare && <CompareTable {...p.compare} />}
      <Faq items={p.faq} />
      <Credentials />
      <Help wa={p.wa} chat={p.chat} label={talk} />
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
        <h2 className="jb-h2" id="jb-faq">Questions</h2>
        <div className="jb-faq">{t.faq.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
      </div></section>

      <section className="jb-blk" aria-labelledby="jb-more"><div className="wide">
        <h2 className="jb-h2" id="jb-more">More from {LINES[par][0]}</h2>
        <div className="jb-cards">{siblings.map((k) => <Link className="jb-c" key={k} href={subPath(k)}><h3>{SUB_PAGES[k].name}</h3><p>{SUB_PAGES[k].line}</p><span className="jb-go">Discover more</span></Link>)}</div>
      </div></section>

      <section className="jb-blk" aria-label="Work with Blaze Global"><div className="wide">
        <div className="jb-close"><p>Work with Blaze Global</p><div className="jb-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={wa} label={talk} className="btn btn-wa btn-lg" /></div></div>
        <ul className="jb-creds"><li><b>ACRA</b> Registered Filing Agent {site.filingAgent}</li><li><b>ISCA</b> Chartered Accountants</li><li><b>OCBC</b> Qualified Introducer and Channel Partner</li><li><b>120+</b> businesses served</li></ul>
      </div></section>
    </main>
  );
}

const APART: [string, string, string][] = [
  ["Chartered Accountants", "Every file handled by ISCA members trained in Big Four practice.", '<circle cx="28" cy="20" r="9" stroke="currentColor"/><path d="M12 46c2-9 8-14 16-14s14 5 16 14" stroke="currentColor"/><circle cx="40" cy="14" r="6" class="g"/><path d="M37.5 14l2 2 3.5-4" class="gs"/>'],
  ["Filed directly", "ACRA Registered Filing Agent. We lodge with ACRA and IRAS ourselves.", '<rect x="12" y="10" width="28" height="36" rx="2" stroke="currentColor"/><path d="M18 20h16M18 27h16M18 34h10" stroke="currentColor"/><circle cx="40" cy="40" r="8" class="g"/><path d="M36.5 40l2.5 2.5 4.5-5" class="gs"/>'],
  ["One team on WhatsApp", "Accountant, company secretary and tax adviser in one thread.", '<path d="M10 14h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-8 6v-6h-4a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" stroke="currentColor"/><rect x="30" y="26" width="20" height="14" rx="3" class="g"/><path d="M35 33h10" class="gs"/>'],
];

/** Start-ups, SMEs, large companies: reasons, then everything they need. */
export function SegmentView({ slug }: { slug: string }) {
  const p = SEGMENT_PAGES[slug];
  return (
    <main className="view" id="view-company">
      <PageHero h1={p.h1} lede={p.lede} wa={p.wa} />
      <section className="pc"><div className="wide">
        <h2 className="pc-h">{p.bandHeading}</h2>
        <ul className="pc-cards">{p.why.map(([t, s], i) => <li key={t}><Icon k={p.bandIcons[i]} /><h3>{t}</h3><p>{s}</p></li>)}</ul>
      </div></section>
      <section className="ev" aria-label={p.needHeading}><div className="wide">
        <h2 className="ev-h">{p.needHeading}</h2>
        <EvGrid items={p.needs.map(([k, t, s, h]) => [k, t, s, h || (t === "WhatsApp support" ? whatsappUrl(p.wa) : undefined)])} />
        <div className="ev-acts"><Acts wa={p.wa} /></div>
      </div></section>
      <Credentials />
      <Help wa={p.wa} chat={p.chat} />
    </main>
  );
}
