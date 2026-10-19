import Link from "next/link";
import Image from "next/image";

import { ScrollTabs, SegCards, type SegItem } from "@/components/interactive";
import { Credentials, Help, Reviews } from "@/components/ui";
import { StructureTabs } from "@/components/widgets";
import { whatsappUrl } from "@/lib/site";

const CHECKLIST: [string, boolean][] = [["Business structure chosen", true], ["Company name approved", true], ["Resident director", true], ["Shareholders and paid-up capital", true], ["Registered address", true], ["Company secretary, within 6 months", false], ["Bank account documents", false]];

const FOUNDERS: SegItem[] = [
  { name: "For local founders", card: "Citizens, permanent residents and pass holders. Incorporation, company secretary and books from day one.", cta: "Incorporate as a local founder", href: "#get-started", openStart: true,
    screen: ["Bizfile application", [["Company name", "Approved", "done"], ["Directors and shareholders", "Singpass verified", "done"], ["Constitution", "Ready", "done"], ["Registration", "Submitted", "next"]]] },
  { name: "For overseas founders", card: "Founders outside Singapore. Identity checks, signing and filing online. Remote onboarding is available.", cta: "Incorporate from overseas", external: true,
    href: whatsappUrl("Hello Blaze Global, I am an overseas founder and would like to register a company in Singapore."),
    screen: ["Overseas founder", [["Identity verified", "Online", "done"], ["Resident director", "Options sent", "next"], ["Registered address", "Confirmed", "done"], ["Documents", "To sign", "todo"]]] },
];

export function StartBusinessView() {
  return (
<main className="view" id="view-start-a-business">
  <section className="rh pull-under" aria-labelledby="sb-h1">
    <div className="rh-imgs rh-core" aria-hidden="true" />
    <div className="rh-in">
      <h1 id="sb-h1">Register your company in Singapore</h1>
      <p className="rh-sub">Company incorporation, filed by an ACRA Registered Filing Agent.</p>
      <p className="rh-fine">ACRA charges S$15 for the name application and S$300 for registration, paid on Bizfile. Blaze Global&apos;s fees are quoted separately. Approval times depend on ACRA and any referral to another agency.</p>
      <div className="rh-acts"><button className="btn rh-btn" type="button" data-open-start>Get started</button><a className="btn rh-btn-ghost" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20register%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div>
      <div className="rh-todo rh-glass" aria-live="polite">
        <div className="td-h"><b>Incorporation checklist</b><span>5 of 7 done</span></div>
        <ul className="td-list">{CHECKLIST.map(([t, done], j) => <li key={t} className={done ? "done" : undefined} style={{ "--d": `${j * 70}ms` }}><span className="td-c">{done ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}</span>{t}</li>)}</ul>
      </div>
      
    </div>
    <ul className="rh-creds" aria-label="Credentials">
      <li><Image src="/logos/acra.svg" alt="ACRA" width={1200} height={600} /><span>Registered filing agent<br />FA20210247</span></li>
      <li><Image src="/logos/isca.svg" alt="ISCA" width={1200} height={600} /><span>Our accountants are<br />members of ISCA</span></li>
    </ul>
  </section>

  <section className="lo" aria-labelledby="lo-h">
    <div className="wide">
      <h2 className="lo-h" id="lo-h">Help for every founder, here or abroad</h2>
      <SegCards items={FOUNDERS} />
    </div>
  </section>

  <section className="stp" aria-labelledby="stp-h">
    <div className="wide">
      <h2 className="stp-h" id="stp-h">Name to UEN in 3 steps</h2>
      <article className="stp-row">
        <div className="stp-txt"><h3>Step 1: Choose a structure and share your details</h3><p>Most founders choose a private limited company. Send the company name, business activity, directors and shareholders online or on WhatsApp.</p><div className="stp-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button></div></div>
        <div className="stp-vis stp-photo"><Image sizes="(max-width: 900px) 90vw, 33vw" src="/images/sg-3.jpg" alt="" width={1200} height={600} /><StructureTabs /></div>
      </article>
      <article className="stp-row flip">
        <div className="stp-txt"><h3>Step 2: We prepare and file with ACRA</h3><p>Constitution, consent forms and identity checks prepared. You sign online. We file on Bizfile as your Registered Filing Agent.</p><div className="stp-acts"><a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20register%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a><Link className="stp-link" href="/services/corporate-secretarial">Corporate Secretarial →</Link></div></div>
        <div className="stp-vis stp-blue"><div className="lg-card"><div className="lg-t">Bizfile application</div><ul className="lg-list"><li><span>Company name</span><em className="ok">Approved</em></li><li><span>Identity checks</span><em className="ok">Done</em></li><li><span>Constitution</span><em className="ok">Ready</em></li><li><span>Consent forms</span><em className="wait">Signing online</em></li><li><span>Incorporation</span><em className="todo">Filing</em></li></ul></div></div>
      </article>
      <article className="stp-row">
        <div className="stp-txt"><h3>Step 3: Your company is ready to trade</h3><p>The UEN and business profile are issued by ACRA. We prepare your bank account documents and open your books on Xero.</p><div className="stp-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button><Link className="stp-link" href="/services/accounting/bookkeeping">Bookkeeping →</Link></div></div>
        <div className="stp-vis stp-gold"><div className="lg-card"><div className="lg-t">Ready to trade</div><ul className="lg-list"><li><span>UEN</span><em className="ok">Issued</em></li><li><span>Business profile</span><em className="ok">Issued</em></li><li><span>Bank account documents</span><em className="ok">Sent</em></li><li><span>Xero and bank feeds</span><em className="wait">Connecting</em></li><li><span>Company secretary</span><em className="ok">Appointed</em></li></ul></div></div>
      </article>
    </div>
  </section>

  <section className="wh" aria-labelledby="wh-h">
    <div className="wide">
      <h2 className="wh-h" id="wh-h">Who we help</h2>
      <ul className="wh-tiles">
        <li><Link href="/solutions/startups"><Image sizes="(max-width: 900px) 90vw, 33vw" src="/images/startup.jpg" alt="Founders sketching on a whiteboard" width={1200} height={1600} /><h3>Start-ups</h3><p>Incorporation, a company secretary and the first books, from one team.</p><span className="wh-more">Start-ups <i aria-hidden="true">→</i></span></Link></li>
        <li><Link href="/solutions/smes"><Image sizes="(max-width: 900px) 90vw, 33vw" src="/images/sme.jpg" alt="A team meeting around a table" width={1200} height={1600} /><h3>SMEs</h3><p>Monthly books, GST and annual filings, prepared before each deadline.</p><span className="wh-more">SMEs <i aria-hidden="true">→</i></span></Link></li>
        <li><Link href="/solutions/large-companies"><Image sizes="(max-width: 900px) 90vw, 33vw" src="/images/large.jpg" alt="A company town hall" width={1200} height={1600} /><h3>Large companies</h3><p>Group reporting, tax advisory and secretarial work for every Singapore entity.</p><span className="wh-more">Large companies <i aria-hidden="true">→</i></span></Link></li>
      </ul>
      <div className="wh-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button><a className="btn btn-wa btn-lg" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20register%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div>
    </div>
  </section>

  <section className="hv hv-scroll" aria-labelledby="hv-h">
    <div className="wide">
      <h2 className="hv-h" id="hv-h">What we handle for your incorporation</h2>
      <ScrollTabs><div className="hv-grid">
        <ul className="hv-list">
          <li className="on"><button type="button" aria-expanded="true">Legal requirements</button><div className="hv-body"><p>Every Singapore company needs a resident director, a company secretary and a registered address. Each is confirmed before filing.</p><Link href="/services/corporate-secretarial">Corporate Secretarial <i aria-hidden="true">→</i></Link></div></li>
          <li><button type="button" aria-expanded="false">Documents and filing</button><div className="hv-body"><p>Identities verified, constitution and consent forms prepared, application filed on Bizfile.</p><Link href="/services/corporate-secretarial">Corporate Secretarial <i aria-hidden="true">→</i></Link></div></li>
          <li><button type="button" aria-expanded="false">Bank account and set-up</button><div className="hv-body"><p>Documents banks ask for prepared. Books opened on Xero, bank feeds connected. Account approval is the bank&apos;s decision.</p><Link href="/services/accounting/bookkeeping">Bookkeeping <i aria-hidden="true">→</i></Link></div></li>
          <li><button type="button" aria-expanded="false">Ongoing compliance</button><div className="hv-body"><p>ECI, AGM, annual return, XBRL, IR8A and corporate tax, each filed before its deadline.</p><Link href="/compliance-deadline-calculator">Compliance deadline calculator <i aria-hidden="true">→</i></Link></div></li>
        </ul>
        <div className="hv-panel">
          <div className="hv-win on"><div className="hv-wt">Requirements</div><ul className="hv-rows"><li><b>Resident director</b><span>At least 1</span><em className="ok">Confirmed</em></li><li><b>Shareholders</b><span>1 to 50</span><em className="ok">Confirmed</em></li><li><b>Company secretary</b><span>Within 6 months</span><em className="ok">Appointed</em></li><li><b>Registered address</b><span>Singapore</span><em className="ok">Confirmed</em></li><li><b>Paid-up capital</b><span>From S$1</span><em className="ok">Confirmed</em></li></ul></div>
          <div className="hv-win"><div className="hv-wt">Filing</div><ul className="hv-rows"><li><b>Name application</b><span>Bizfile</span><em className="ok">Approved</em></li><li><b>Identity checks</b><span>Each officer</span><em className="ok">Done</em></li><li><b>Constitution</b><span>Standard</span><em className="ok">Ready</em></li><li><b>Consent forms</b><span>Directors, secretary</span><em className="wait">Signing</em></li><li><b>Incorporation</b><span>Bizfile</span><em className="todo">Next</em></li></ul></div>
          <div className="hv-win"><div className="hv-wt">Set-up</div><ul className="hv-rows"><li><b>Business profile</b><span>ACRA</span><em className="ok">Issued</em></li><li><b>Bank documents</b><span>For your bank</span><em className="ok">Sent</em></li><li><b>Xero</b><span>Chart of accounts</span><em className="ok">Ready</em></li><li><b>Bank feeds</b><span>Connected</span><em className="wait">Pending</em></li></ul></div>
          <div className="hv-win"><div className="hv-wt">First year</div><ul className="hv-rows"><li><b>ECI</b><span>IRAS</span><em className="todo">3 months after FYE</em></li><li><b>AGM</b><span>ACRA</span><em className="todo">6 months after FYE</em></li><li><b>Annual return, XBRL</b><span>ACRA</span><em className="todo">7 months after FYE</em></li><li><b>Form C-S</b><span>IRAS</span><em className="todo">30 November</em></li></ul></div>
        </div>
      </div></ScrollTabs>
    </div>
  </section>

  <Reviews heading="What our clients say" />

    <section className="lp-sec"><div className="wide lp-split">
    <h2 className="h2">Frequently asked questions</h2>
    <div className="faq">
      <details><summary>How much does it cost to register a company in Singapore?<i aria-hidden="true">+</i></summary><p>ACRA charges S$15 for the name application and S$300 for incorporation, paid on Bizfile. Blaze Global&apos;s fees are quoted on request.</p></details>
      <details><summary>How long does registration take?<i aria-hidden="true">+</i></summary><p>Most applications are approved on Bizfile within the day. Names or activities referred to another government agency take longer.</p></details>
      <details><summary>Can a foreigner own a Singapore company?<i aria-hidden="true">+</i></summary><p>Yes. A company can be fully foreign-owned, but it needs at least one director ordinarily resident in Singapore, such as a citizen, permanent resident, or Employment Pass or EntrePass holder.</p></details>
      <details><summary>What is the minimum paid-up capital?<i aria-hidden="true">+</i></summary><p>S$1.</p></details>
      <details><summary>When must a company secretary be appointed?<i aria-hidden="true">+</i></summary><p>Within 6 months of incorporation.</p></details>
      <details><summary>What are the requirements to register a company in Singapore?<i aria-hidden="true">+</i></summary><p>At least one shareholder, one director ordinarily resident in Singapore, a company secretary appointed within 6 months, a Singapore registered address and paid-up capital of at least S$1.</p></details>
      <details><summary>What documents are needed for incorporation?<i aria-hidden="true">+</i></summary><p>Identity documents and residential addresses of each director and shareholder, the company constitution, and consent forms from the directors and company secretary.</p></details>
      <details><summary>Can I incorporate without being in Singapore?<i aria-hidden="true">+</i></summary><p>Yes. Incorporation is filed online on Bizfile. The company still needs a director ordinarily resident in Singapore.</p></details>
      <details><summary>How do I check whether a company is registered?<i aria-hidden="true">+</i></summary><p>Search the company name or UEN on Bizfile.</p></details>
      <details><summary>Does a new company need to register for GST?<i aria-hidden="true">+</i></summary><p>Only when taxable turnover exceeds S$1 million in 12 months, or is expected to. Companies below that may register voluntarily.</p></details>
    </div>
  </div></section>

  <Credentials /><Help wa="Hello Blaze Global, I would like to register a company in Singapore." chat={["Can you register my company this week?", "Yes. Send the company name and director details. We file on Bizfile as soon as the documents are signed."]} />
  <section className="seg-cta"><div className="wide"><div className="band"><p>Start your company</p><div className="actions"><button className="btn btn-start-light" type="button" data-open-start>Get started</button><a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20register%20a%20company%20in%20Singapore." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div></div></div></section>
</main>
  );
}
