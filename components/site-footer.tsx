import Link from "next/link";

// exa.ai-style footer: the words rise in when it scrolls into view (Reveal adds .in).
export function SiteFooter() {
  return (
<footer className="site-footer xf">
  <div className="wrap">
    <p className="xf-co">Blaze Global Pte. Ltd.</p>
    <p className="xf-st"><span className="fw" style={{"--i": "0"}}>Accounting</span> <span className="fw" style={{"--i": "1"}}>and</span> <span className="fw" style={{"--i": "2"}}>company</span> <span className="fw" style={{"--i": "3"}}>secretarial</span> <span className="fw" style={{"--i": "4"}}>in</span> <span className="fw" style={{"--i": "5"}}>Singapore</span></p>
  </div>
  <div className="xf-rule"></div>
  <div className="wrap">
    <div className="xf-cols"><div className="xf-col" style={{"--i": "0"}}><h4>Products</h4><ul><li><Link href="/start-a-business-in-singapore">Incorporation</Link></li><li><Link href="/services/corporate-secretarial">Corporate Secretarial</Link></li><li><Link href="/services/nominee-directorship">Nominee Directorship</Link></li><li><Link href="/services/accounting">Accounting</Link></li><li><Link href="/services/tax">Tax</Link></li><li><Link href="/services/payroll">Payroll</Link></li><li><Link href="/services/outsourced-cfo">Outsourced CFO</Link></li><li><Link href="/services/blazeos">BlazeOS</Link></li></ul></div><div className="xf-col" style={{"--i": "1"}}><h4>Solutions</h4><ul><li><Link href="/start-a-business-in-singapore">Start a business</Link></li><li><Link href="/solutions/startups">Start-ups</Link></li><li><Link href="/solutions/smes">SMEs</Link></li><li><Link href="/solutions/large-companies">Large companies</Link></li><li><Link href="/compliance-deadline-calculator">Compliance deadline calculator</Link></li></ul></div><div className="xf-col" style={{"--i": "2"}}><h4>Company</h4><ul><li><Link href="/about-us">About</Link></li><li><Link href="/about-us#team">The Leadership team</Link></li><li><Link href="/#credentials">Credentials &amp; Partnerships</Link></li><li><Link href="/blog">Blog</Link></li></ul></div><div className="xf-col" style={{"--i": "3"}}><h4>Connect</h4><ul><li><a href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20speak%20to%20an%20accountant." target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:contact@blazeglobal.com.sg">Email</a></li><li><a href="tel:+6598199108">+65 9819 9108</a></li><li><a href="https://www.linkedin.com/company/blaze-global-pte-ltd/" target="_blank" rel="noopener">LinkedIn</a></li></ul></div></div>
    <div className="xf-base"><span>© 2026 Blaze Global Pte. Ltd.</span><span>UEN 202011886G</span><span>ACRA Registered Filing Agent FA20210247</span><span>14 Robinson Road, #08-01A, Singapore 048545</span></div>
  </div>
</footer>
  );
}
