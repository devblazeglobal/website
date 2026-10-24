import { AxPlay } from "@/components/ax-play";
import { CARDS } from "@/components/deliver-panels";
import { CompareTable, StepRow, TrustRow } from "@/components/product-sections";
import { Credentials, Faq, Help } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { MAIN_PAGES } from "@/lib/content-data";
import { whatsappUrl } from "@/lib/site";

// BlazeOS: data integration, dashboards and business intelligence on the
// client's own data. Not reconciliation or bookkeeping automation. Sales storyboard: the screen,
// the problem, how it works, what they see, what the AI does, before/after,
// set-up, fees, data and security.
const p = MAIN_PAGES.blazeos;

// Three pillars, as agreed with Blaze (24 Oct 2026). Icons: database, chart, bulb.
const PIPE: [string, string, string][] = [
  ["Connect", "Bring your business data together", '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'],
  ["Visualise", "Turn raw data into clear dashboards", '<path d="M4 4v16h16"/><path d="M9 16v-4M13 16V9M17 16v-6"/>'],
  ["Understand", "Discover insights that guide decisions", '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>'],
];
const SEE = ["Sales and customers", "Margin by product", "Cash and forecast", "Connected sources"];
const SEE_TXT: Record<string, string> = {
  "Sales and customers": "Sales by customer and how long each takes to pay, from Xero and your CRM.",
  "Margin by product": "Gross margin by product or service, with lines that slip below target flagged.",
  "Cash and forecast": "Today's cash and the next six months, built from receivables, bills and payroll.",
  "Connected sources": "Xero, spreadsheets and your CRM in one central view, instead of switching between them.",
};

function Dash() {
  return (
    <div className="bos-dash" aria-label="Example BlazeOS dashboard">
      <div className="bos-dh"><span>BlazeOS · Example Pte Ltd</span><span>Updated 08:00 · Example figures</span></div>
      <div className="bos-kpis">
        <div><small>Revenue · month</small><b>S$128k</b><em>+6.7% vs Sep</em></div>
        <div><small>Gross margin</small><b>41%</b><em>+2.1 pts</em></div>
        <div><small>Cash</small><b>S$212k</b><em className="dn">−S$18k</em></div>
        <div><small>Over 60 days</small><b>S$24k</b><em className="dn">5 customers</em></div>
      </div>
      <div className="bos-row">
        <div className="bos-chart"><small>Revenue, 6 months and 3 forecast</small><div className="bos-bars">{[52, 58, 55, 63, 60, 70, 72, 66, 75].map((h, i) => <i key={i} className={i > 5 ? "fc" : ""} style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />)}</div></div>
        <div className="bos-ai"><small>Flagged by AI for review</small><div><b>Marketing over budget</b><span>+S$3k</span></div><div><b>Customer B paying slower</b><span>48 days</span></div><div><b>Cash below S$150k</b><span>Feb</span></div></div>
      </div>
    </div>
  );
}

export function BlazeOSView() {
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <main className="view" id="view-company">
      <JsonLd data={faqLd} />
      <section className="rh pull-under bos-hero" aria-labelledby="bos-h1">
        <div className="rh-imgs rh-core" aria-hidden="true" />
        <div className="rh-in">
          <h1 id="bos-h1">{p.heading}</h1>
          <p className="rh-sub">{p.sub}</p>
          <div className="rh-acts"><a className="btn rh-btn" href={whatsappUrl(p.wa)} target="_blank" rel="noopener">Book a demo</a><a className="btn btn-wa rh-btn-ghost" href={whatsappUrl(p.wa)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div>
          <Dash />
        </div>
      </section>
      <TrustRow />

      <section className="ps"><div className="wide">
        <h2 className="ps-h">Why the numbers are hard to see today</h2>
        <ul className="bos-prob">
          <li><b>Spread across systems</b><span>Sales in the CRM, costs in Xero, plans in spreadsheets. No single view.</span></li>
          <li><b>Reports arrive late</b><span>Month-end figures come weeks after the month ends, too late to act on.</span></li>
          <li><b>Hours pulling figures</b><span>Someone exports, pastes and checks numbers before every meeting.</span></li>
        </ul>
      </div></section>

      <section className="ps ps-alt"><div className="wide">
        <h2 className="ps-h">How BlazeOS works</h2>
        <ol className="bos-pipe bos-pillars">{PIPE.map(([k, d, icon], i) => <li key={k}><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} /><b>{k}</b><p>{d}</p>{i < PIPE.length - 1 && <i className="bos-flow" aria-hidden="true" />}</li>)}</ol>
      </div></section>

      <section className="ax-sec ax-dlv" aria-labelledby="see-h">
        <AxPlay className="wide">
          <h2 className="ax-h" id="see-h">What you see</h2>
          <div className="ax c2">{SEE.map((t, i) => <article key={t} className={`axp a${i + 1}`}><h3>{t}</h3><p>{SEE_TXT[t]}</p><div className="axc" aria-hidden="true">{CARDS[t]}</div></article>)}</div>
        </AxPlay>
      </section>

      <section className="ax-sec ax-inc" aria-labelledby="ai-h">
        <AxPlay className="wide">
          <article className="axp a3 axp-wide">
            <div className="axw-copy">
              <p className="ax-k">Insights</p>
              <h2 className="ax-h" id="ai-h">Trends and anomalies, surfaced</h2>
              <p>AI-assisted analysis reads across your connected data and surfaces changes: slower payers, spending above plan, margins moving. A Chartered Accountant reviews each one before it reaches you.</p>
            </div>
            <div className="axc" aria-hidden="true">{CARDS["Trends and anomalies"]}</div>
          </article>
        </AxPlay>
      </section>

      <CompareTable h="Before and after BlazeOS" cols={["", "Today", "With BlazeOS"]} rows={[
        ["Reporting", "Manual reports compiled periodically", "Dashboards with regularly refreshed data"],
        ["Data sources", "Scattered across different systems", "Brought together in one central view"],
        ["Visibility", "Switching between spreadsheets and platforms", "Key business metrics at a glance"],
        ["Insights", "Time spent interpreting disconnected numbers", "AI-assisted analysis that surfaces trends and anomalies"],
      ]} />

      <StepRow h="Set-up in 3 steps" items={[
        ["Connect your systems", "We connect Xero, Google Sheets and your CRM with read-only access."],
        ["Build your dashboards", "We agree the figures that matter and build them on your data."],
        ["Monthly review", "A call each month to go through the numbers and what was flagged."],
      ]} />

      <section className="ps ps-alt"><div className="wide">
        <div className="ps-plan">
          <div><h2 className="ps-h">Fees</h2><p className="ps-note">Fees depend on the systems connected and the dashboards you need. Message us on WhatsApp for a quote or a demo on your own numbers.</p><a className="btn btn-wa btn-lg" href={whatsappUrl(p.wa)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>Ask for fees on WhatsApp</a></div>
          <ul>{["Connection to Xero, Google Sheets and CRM", "Your own secure database", "Live dashboards for your team", "AI analysis, checked by an accountant", "Monthly review call"].map((x) => <li key={x}><span aria-hidden="true">✓</span>{x}</li>)}</ul>
        </div>
      </div></section>

      <Faq items={p.faq} heading="Data and security" />
      <Credentials />
      <Help wa={p.wa} chat={p.chat} />
    </main>
  );
}
