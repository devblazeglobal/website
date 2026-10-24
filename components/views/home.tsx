import Link from "next/link";

import { AskBar, CountUp } from "@/components/interactive";
import { ProductCards } from "@/components/product-cards";
import { HowItWorks } from "@/components/how-it-works";
import { Credentials, Reviews, Stars } from "@/components/ui";
import { ComplianceCalendar, StructureChecklist } from "@/components/widgets";
import { TeamCards } from "@/components/team";


export function HomeView() {
  return (
<main className="view" id="view-home">
  <div className="stage pull-under">
    <div className="hero">
      <div className="wide hero-body">
        <h1>Beyond accounting. Built for business.</h1>
        <p className="hero-sub">Expert accounting, tax and corporate services, powered by technology and grounded in real business experience.</p>
        <AskBar />
        <ul className="hero-pts" aria-label="Services"><li><Link href="/start-a-business-in-singapore"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Incorporation</Link></li><li><Link href="/services/accounting"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Accounting</Link></li><li><Link href="/services/tax"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Tax</Link></li><li><Link href="/services/payroll"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Payroll</Link></li><li><Link href="/services/outsourced-cfo"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Outsourced CFO</Link></li><li><Link href="/services/nominee-directorship"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Nominee director</Link></li><li><Link href="/services/blazeos"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>BlazeOS</Link></li></ul>
        <div className="hero-ctas">
          <button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button>
        </div>
      </div>
      <div className="wide">
        <div className="trust">
          <ul className="ticks">
            <li><span><b>Chartered Accountants</b> bringing Big Four rigour and personalised attention to your business</span></li>
            <li><span><b>ACRA Registered Filing Agent FA20210247</b>, supporting your annual returns, XBRL and filings with ACRA and IRAS</span></li>
            <li><span><b>Cloud accounting</b> on Xero and Aspire, so your books stay up to date and your numbers stay clear</span></li>
          </ul>
          <div className="proof"><div className="stat"><b><CountUp to={120} />+</b><span>Businesses served</span></div><div className="rating"><svg className="gl" aria-label="Google"><use href="#g" /></svg><span>Google reviews</span><Stars /></div></div>
        </div>
      </div>
    </div>

    <Reviews id="reviews" />
  </div>

  <section className="segments" id="services" aria-labelledby="svc-title">
    <div className="wrap intro"><h2 className="h2" id="svc-title">One partner at every stage of your business</h2></div>
    <div className="wide"><ProductCards /></div>
  </section>

  <HowItWorks />

  <section className="xs" aria-labelledby="sab-title"><div className="wide xs-grid">
    <div className="xs-copy">
      <h2 className="h2" id="sab-title">Start a business in Singapore</h2>
      <p className="xs-p">We register your company with ACRA, appoint your company secretary and set up your books on Xero, so you can start trading with confidence.</p>
      <div className="xs-btns"><Link className="btn btn-navy btn-lg" href="/start-a-business-in-singapore">Start your company</Link><a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20start%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div>
      <dl className="xs-facts"><div><dt>S$1</dt><dd>Minimum paid-up capital</dd></div><div><dt>1</dt><dd>Resident director</dd></div><div><dt>6 months</dt><dd>To appoint a secretary</dd></div></dl>
    </div>
    <StructureChecklist />
  </div></section>

  <section className="cal2" aria-labelledby="cal2-title"><div className="wide"><ComplianceCalendar /></div></section>

  <section className="team" id="team" aria-labelledby="team-title">
    <div className="wide">
      <h2 className="team-h" id="team-title">Our leadership team</h2>
      <p className="team-p">With over 60 years of combined experience spanning Big Four firms, high-growth startups and multinational corporations, we understand what it takes to build, operate and grow a business.</p>
      <TeamCards />
    </div>
  </section>

  <Credentials id="credentials" />
</main>
  );
}
