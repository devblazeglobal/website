import { AxPlay } from "@/components/ax-play";
import { CARDS } from "@/components/deliver-panels";
import { CompareTable, StepRow, TrustRow } from "@/components/product-sections";
import { Credentials, Faq, Help } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { MAIN_PAGES } from "@/lib/content-data";
import { whatsappUrl } from "@/lib/site";

// BlazeOS: dashboards on the client's own data. Sales storyboard: the screen,
// the problem, how it works, what they see, what the AI does, before/after,
// set-up, fees, data and security.
const p = MAIN_PAGES.blazeos;

const PIPE: [string, string, string, string[]][] = [
  ["Connect", "Your systems", "We connect the tools you already use. Nothing new to learn.", ["Xero", "Google Sheets", "CRM", "Bank feeds"]],
  ["Store", "Your own secure database", "Data copied every day into a database set up for your company alone.", []],
  ["Analyse", "AI reads the numbers", "Trends and exceptions flagged for a Chartered Accountant to check.", []],
  ["See", "Live dashboards", "Revenue, margin, cash and customers on one screen, updated daily.", []],
];
const SEE = ["Sales and customers", "Margin by product", "Cash and forecast", "Compliance dates"];
const SEE_TXT: Record<string, string> = {
  "Sales and customers": "Sales by customer and how long each takes to pay, from Xero and your CRM.",
  "Margin by product": "Gross margin by product or service, with lines that slip below target flagged.",
  "Cash and forecast": "Today's cash and the next six months, built from receivables, bills and payroll.",
  "Compliance dates": "GST, CPF, ACRA and IRAS dates from your compliance calendar, on the same screen.",
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
        <ol className="bos-pipe">{PIPE.map(([k, t, d, chips], i) => <li key={k}><small>{i + 1} · {k}</small><b>{t}</b><p>{d}</p>{chips.length > 0 && <div className="bos-chips">{chips.map((c) => <span key={c}>{c}</span>)}</div>}{i < 3 && <i className="bos-flow" aria-hidden="true" />}</li>)}</ol>
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
              <p className="ax-k">What the AI does</p>
              <h2 className="ax-h" id="ai-h">Reads every transaction, flags what matters</h2>
              <p>AI tools such as Claude read bills, invoices and transactions, extract the data and flag exceptions: late payers, overspends, cash dips. A Chartered Accountant checks every flag before it reaches you.</p>
            </div>
            <div className="axc" aria-hidden="true">{CARDS["AI-powered automation"]}</div>
          </article>
        </AxPlay>
      </section>

      <CompareTable h="Before and after BlazeOS" cols={["", "Today", "With BlazeOS"]} rows={[
        ["Reports", "Weeks after month end", "Updated daily"],
        ["Effort", "Hours exporting and pasting", "None on your side"],
        ["Sources", "Separate systems", "One screen"],
        ["Exceptions", "Found at year end", "Flagged as they happen"],
        ["Checked by", "Whoever built the spreadsheet", "Chartered Accountants"],
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
