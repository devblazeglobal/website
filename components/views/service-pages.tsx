// Page templates for services and solutions, filled from lib/content-data.
import { Acts, Benefits, Credentials, EvGrid, ExploreLinks, Faq, FlankCards, Help, Icon, MoreFrom, PageHero, PhotoHero, Reviews } from "@/components/ui";
import { MAIN_PAGES, SEGMENT_PAGES, SUB_PAGES, TILES, type Card, type Parent, type Product } from "@/lib/content-data";
import { PRODUCTS } from "@/lib/products";
import { DeliverPanels, IncorporationBand } from "@/components/deliver-panels";
import { HowItWorks } from "@/components/how-it-works";
import { JsonLd } from "@/components/json-ld";
import { AiAnalysis, CardGrid, CompareTable, DoesTable, PlanCard, RulesTable, StepRow, TrustRow } from "@/components/product-sections";
import { ComplianceCalendar } from "@/components/widgets";
import { talkLabel, whatsappUrl } from "@/lib/site";

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

const subCard = (slug: string): Card => { const s = SUB_PAGES[slug]; return [s.name, s.line, s.art[0], s.art[1], subPath(slug)]; };

/** An accounting service: what's included, reviews, related services. */
export function SubServiceView({ slug }: { slug: string }) {
  const d = SUB_PAGES[slug];
  const wa = `Hello Blaze Global, I would like help with ${d.name.toLowerCase()}.`;
  const par = d.par;
  const talk = talkLabel(par);
  const pool = Object.keys(SUB_PAGES).filter((k) => k !== slug);
  const siblings = [...pool.filter((k) => SUB_PAGES[k].par === par), ...pool.filter((k) => SUB_PAGES[k].par !== par)].slice(0, 6).map(subCard);
  const others = (Object.keys(LINES) as Parent[]).filter((k) => k !== par).map((k) => LINES[k]);
  return (
    <main className="view" id="view-company">
      <PageHero h1={d.h1} lede={d.lede} wa={wa} label={talk} />
      <section className="tl"><div className="wide">
        <h2 className="tl-h">What&apos;s included</h2>
        <ul className="tl-grid tl-cards">{TILES[slug].map(([k, t, s]) => <li key={t}><span className="tl-ib"><Icon k={k} /></span><h3>{t}</h3><p>{s}</p></li>)}</ul>
      </div></section>
      <Reviews heading="What our clients say" />
      <MoreFrom title={`More from ${LINES[par][0]}`} cards={siblings} links={[LINES[par], ...others]} wa={wa} label={talk} />
      <Credentials />
      <Help wa={wa} chat={MAIN_PAGES[par].chat} label={talk} />
    </main>
  );
}

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
