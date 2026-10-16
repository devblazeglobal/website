import Link from "next/link";

import { AskBar, CountUp, SegCards, type SegItem } from "@/components/interactive";
import { Credentials, Reviews, Stars } from "@/components/ui";
import { ComplianceCalendar, StructureChart } from "@/components/widgets";

const HOME_SERVICES: SegItem[] = [
  { name: "Accounting", card: "Bookkeeping, management reports, GST returns, unaudited financial statements, XBRL and corporate tax, filed with ACRA and IRAS.", cta: "Accounting services", href: "/services/accounting",
    screen: ["Year-end close", [["Bank, card and cash reconciled", "Done", "done"], ["Management report", "Ready", "done"], ["Unaudited financial statements", "In review", "next"], ["XBRL", "Next", "todo"], ["Filed with ACRA and IRAS", "Next", "todo"]]] },
  { name: "Corporate Secretarial", card: "Incorporation, a qualified company secretary, AGMs, annual returns, registers and changes to directors and shareholders.", cta: "Corporate secretarial services", href: "/services/corporate-secretarial",
    screen: ["Annual compliance", [["Company secretary appointed", "Done", "done"], ["Company registers updated", "Done", "done"], ["AGM documents", "Ready", "next"], ["Annual return filed with ACRA", "Scheduled", "todo"], ["Directors' resolutions", "Scheduled", "todo"]]] },
];

export function HomeView() {
  return (
<main className="view" id="view-home">
  <div className="stage pull-under">
    <div className="hero">
      <div className="wide hero-body">
        <h1>We are here so you may focus on what truly matters</h1>
        <p className="hero-sub">We do the hard work to make things simple.</p>
        <AskBar />
        <ul className="hero-pts" aria-label="Services"><li><Link href="/start-a-business-in-singapore"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Incorporation</Link></li><li><Link href="/services/accounting"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Accounting</Link></li><li><Link href="/services/corporate-secretarial"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Company secretary</Link></li><li><Link href="/services/accounting/corporate-income-tax"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Tax filing</Link></li></ul>
        <div className="hero-ctas">
          <button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button>
        </div>
      </div>
      <div className="wide">
        <div className="trust">
          <ul className="ticks">
            <li><span><b>Chartered Accountants</b> with managerial experience in a Big Four firm</span></li>
            <li><span><b>ACRA Registered Filing Agent FA20210247</b>: annual returns, XBRL, ACRA and IRAS filings</span></li>
            <li><span><b>Books kept online</b>: bank, card and cash matched on Xero and Aspire</span></li>
          </ul>
          <div className="proof"><div className="stat"><b><CountUp to={120} />+</b><span>Businesses served</span></div><div className="rating"><svg className="gl" aria-label="Google"><use href="#g" /></svg><span>Google reviews</span><Stars /></div></div>
        </div>
      </div>
    </div>

    <Reviews id="reviews" />
  </div>

  <section className="segments" id="services" aria-labelledby="svc-title">
    <div className="wrap intro"><h2 className="h2" id="svc-title">One place for your business needs</h2></div>
    <div className="wide"><SegCards items={HOME_SERVICES} /></div>
  </section>

  <section className="xs" aria-labelledby="sab-title"><div className="wide xs-grid">
    <div className="xs-copy">
      <h2 className="h2" id="sab-title">Start a business in Singapore</h2>
      <p className="xs-p">We register your company with ACRA, appoint the company secretary and set up the books on Xero.</p>
      <div className="xs-btns"><Link className="btn btn-navy btn-lg" href="/start-a-business-in-singapore">Start your company</Link><a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20start%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div>
      <dl className="xs-facts"><div><dt>S$1</dt><dd>Minimum paid-up capital</dd></div><div><dt>1</dt><dd>Resident director</dd></div><div><dt>6 months</dt><dd>To appoint a secretary</dd></div></dl>
    </div>
    <StructureChart />
  </div></section>

  <section className="cal2" aria-labelledby="cal2-title"><div className="wide"><ComplianceCalendar /></div></section>

  <section className="team" id="team" aria-labelledby="team-title">
    <div className="wide">
      <h2 className="team-h" id="team-title">The team</h2>
      <p className="team-p">Chartered Accountants with managerial experience in a Big Four firm, and entrepreneurs with 6 to 20 years of experience running multinational organisations.</p>
      <ul className="rv-cards"><li><a className="rv-card rv-0" href="https://www.linkedin.com/in/emelia-long-839a5a72/" target="_blank" rel="noopener"><div className="rv-ph" aria-hidden="true"><svg viewBox="0 0 80 80"><circle cx="40" cy="28" r="16" /><path d="M8 80c2-20 16-30 32-30s30 10 32 30z" /></svg></div><div className="rv-mid"><span className="rv-role">Chartered Accountant</span><b className="rv-name">Emelia</b><span className="rv-pill"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" /></svg>LinkedIn</span></div><div className="rv-chip"><span className="rv-ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M3.5 8.4l2.8 2.8L12.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span><b>Accounting and tax</b><small>Blaze Global</small></span></div></a></li><li><a className="rv-card rv-1" href="https://www.linkedin.com/in/benjaminltf/" target="_blank" rel="noopener"><div className="rv-ph" aria-hidden="true"><svg viewBox="0 0 80 80"><circle cx="40" cy="28" r="16" /><path d="M8 80c2-20 16-30 32-30s30 10 32 30z" /></svg></div><div className="rv-mid"><span className="rv-role">Company Secretary</span><b className="rv-name">Benjamin</b><span className="rv-pill"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" /></svg>LinkedIn</span></div><div className="rv-chip"><span className="rv-ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M3.5 8.4l2.8 2.8L12.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span><b>Corporate secretarial</b><small>Blaze Global</small></span></div></a></li><li><a className="rv-card rv-2" href="https://www.linkedin.com/in/benedict-long-511929b3/" target="_blank" rel="noopener"><div className="rv-ph" aria-hidden="true"><svg viewBox="0 0 80 80"><circle cx="40" cy="28" r="16" /><path d="M8 80c2-20 16-30 32-30s30 10 32 30z" /></svg></div><div className="rv-mid"><span className="rv-role">Accountant</span><b className="rv-name">Benedict</b><span className="rv-pill"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" /></svg>LinkedIn</span></div><div className="rv-chip"><span className="rv-ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M3.5 8.4l2.8 2.8L12.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span><b>Bookkeeping and reporting</b><small>Blaze Global</small></span></div></a></li></ul>
    </div>
  </section>

  <Credentials id="credentials" />
</main>
  );
}
