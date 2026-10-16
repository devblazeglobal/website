// Page templates for services and solutions, filled from lib/content-data.
import { Acts, Benefits, Credentials, EvGrid, ExploreLinks, Faq, FlankCards, Help, Icon, MoreFrom, PageHero, PhotoHero, Reviews } from "@/components/ui";
import { MAIN_PAGES, SEGMENT_PAGES, SUB_PAGES, TILES, type Card } from "@/lib/content-data";
import { whatsappUrl } from "@/lib/site";

const CALC: [string, string] = ["Compliance deadline calculator", "/compliance-deadline-calculator"];
const INC: [string, string] = ["Incorporation", "/start-a-business-in-singapore"];

/** Accounting or Corporate Secretarial: photo hero, benefits, services, FAQ. */
export function MainServiceView({ slug }: { slug: "accounting" | "corporate-secretarial" }) {
  const p = MAIN_PAGES[slug];
  const links: [string, string][] = slug === "accounting"
    ? [["Corporate Secretarial", "/services/corporate-secretarial"], INC, CALC]
    : [["Accounting", "/services/accounting"], INC, CALC];
  return (
    <main className="view" id="view-company">
      <PhotoHero className="rh-main" img={p.img} title={p.heading} sub={p.sub} wa={p.wa} />
      <Benefits rows={p.benefits} />
      <section className="fk fk-top"><div className="wide">
        <h2 className="fk-h">{p.gridHeading}</h2>
        <div className="fk-grid">
          <div className="fk-side"><Acts wa={p.wa} /><ExploreLinks links={links} /></div>
          <FlankCards cards={p.cards} />
        </div>
      </div></section>
      <Faq items={p.faq} />
      <Credentials />
      <Help wa={p.wa} chat={p.chat} />
    </main>
  );
}

const subCard = (slug: string): Card => { const s = SUB_PAGES[slug]; return [s.name, s.line, s.art[0], s.art[1], `/services/accounting/${slug}`]; };

/** An accounting service: what's included, reviews, related services. */
export function SubServiceView({ slug }: { slug: string }) {
  const d = SUB_PAGES[slug];
  const wa = `Hello Blaze Global, I would like help with ${d.name.toLowerCase()}.`;
  const siblings = Object.keys(SUB_PAGES).filter((k) => k !== slug).map(subCard);
  return (
    <main className="view" id="view-company">
      <PageHero h1={d.h1} lede={d.lede} wa={wa} />
      <section className="tl"><div className="wide">
        <h2 className="tl-h">What&apos;s included</h2>
        <ul className="tl-grid">{TILES[slug].map(([k, t, s]) => <li key={t}><Icon k={k} /><h3>{t}</h3><p>{s}</p></li>)}</ul>
      </div></section>
      <Reviews heading="What our clients say" />
      <MoreFrom title="More from Accounting" cards={siblings} links={[["Accounting", "/services/accounting"], ["Corporate Secretarial", "/services/corporate-secretarial"], INC]} wa={wa} />
      <Credentials />
      <Help wa={wa} chat={MAIN_PAGES.accounting.chat} />
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
