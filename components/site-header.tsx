"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Navy bar that follows the scroll. Products and Solutions open a panel
// over the page: hover on desktop, click anywhere. The burger opens the
// mobile menu. Markup ported from the approved mock-up (scripts/port).

type Menu = "products" | "solutions" | null;

export function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const [group, setGroup] = useState<"p" | "s" | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setMenu(null); setMobile(false); setGroup(null); }
  const canHover = () => matchMedia("(hover: hover) and (min-width: 1101px)").matches;
  // With a mouse, hover already opened the menu: a click keeps it open rather than closing it.
  const toggle = (m: Menu) => setMenu((cur) => (cur === m && !canHover() ? null : m));
  const hover = (m: Menu) => { if (canHover()) { clearTimeout(timer.current); setMenu(m); } };
  const leave = () => { if (canHover() && menu) timer.current = setTimeout(() => setMenu(null), 180); };

  useEffect(() => {
    const away = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setMenu(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(null); setMobile(false); } };
    document.addEventListener("click", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", away); document.removeEventListener("keydown", esc); };
  }, []);

  return (
<header className="topbar wide">
  <div className={`navwrap${menu ? " open" : ""}`} ref={wrap} onMouseLeave={leave} onMouseEnter={() => clearTimeout(timer.current)}>
    <div className="nav">
      <Link className="logo" href="/" aria-label="Blaze Global home"><Image src="/logos/blaze-global-gold.png" alt="Blaze Global" width={1200} height={100} priority /></Link>
      <div className="tabs">
        <Link className="tab" href="/about-us">About</Link>
        <button className="tab" type="button" aria-expanded={menu === "products"} aria-controls="drop" onClick={() => toggle("products")} onMouseEnter={() => hover("products")}>Products <svg width="10" height="10" aria-hidden="true"><use href="#chev" /></svg></button>
        <button className="tab" type="button" aria-expanded={menu === "solutions"} aria-controls="drop" onClick={() => toggle("solutions")} onMouseEnter={() => hover("solutions")}>Solutions <svg width="10" height="10" aria-hidden="true"><use href="#chev" /></svg></button>
        <Link className="tab" href="/blog">Blog</Link>
      </div>
      <button className="btn btn-start" type="button" data-open-start>Get started</button>
      <a className="btn btn-wa right-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20services." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
      <button className={`burger${mobile ? " x" : ""}`} type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mnav" onClick={() => setMobile((o) => !o)}><svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true"><path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" strokeWidth="1.6" /></svg></button>
    </div>

    <div className="drop" id="drop"><div className="drop-in">
      <div className={`dpanel${menu === "products" ? " on" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenu(null); }}>
        <div className="dcard dfeat">
          <Image className="dimg" src="/images/consultation.jpg" alt="Three people reviewing documents at a meeting table" width={960} height={600} />
          <h3>Speak to a Chartered Accountant</h3>
          <a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20speak%20to%20an%20accountant." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
        </div>
        <div className="dcard">
          <h4>Accounting</h4>
          <Link className="ov" href="/services/accounting"><b>Accounting</b><span>Books, reports, GST and payroll, filed with ACRA and IRAS.</span><i aria-hidden="true">→</i></Link>
          <ul>
            <li><Link className="it" href="/services/accounting/bookkeeping"><b>Bookkeeping</b><span>Bank, card and cash records reconciled on Xero.</span></Link></li>
            <li><Link className="it" href="/services/accounting/management-reports"><b>Management reports</b><span>Profit and loss, balance sheet and cash flow, monthly.</span></Link></li>
            <li><Link className="it" href="/services/accounting/financial-statements-xbrl"><b>Financial statements and XBRL</b><span>Unaudited statements and XBRL, filed with ACRA.</span></Link></li>
            <li><Link className="it" href="/services/accounting/gst"><b>GST</b><span>Registration and quarterly F5 returns.</span></Link></li>
            <li><Link className="it" href="/services/accounting/payroll"><b>Payroll</b><span>Monthly payroll, CPF and IR8A.</span></Link></li>
          </ul>
        </div>
        <div className="dcard">
          <h4>Tax</h4>
          <Link className="ov" href="/services/tax"><b>Tax</b><span>Corporate tax, tax planning and a fractional CFO.</span><i aria-hidden="true">→</i></Link>
          <ul>
            <li><Link className="it" href="/services/tax/corporate-income-tax"><b>Corporate income tax</b><span>ECI and Form C-S, filed with IRAS.</span></Link></li>
            <li><Link className="it" href="/services/tax/tax-advisory"><b>Tax advisory and forecasting</b><span>Tax planning and 12-month cash forecasts.</span></Link></li>
            <li><Link className="it" href="/services/tax/fractional-cfo"><b>Fractional CFO</b><span>Budgets, forecasts and board reporting.</span></Link></li>
          </ul>
        </div>
        <div className="dcard">
          <h4>Corporate Secretarial</h4>
          <Link className="ov" href="/services/corporate-secretarial"><b>Corporate Secretarial</b><span>Company secretary, AGMs, annual returns and company changes.</span><i aria-hidden="true">→</i></Link>
          <ul>
            <li><Link className="it" href="/start-a-business-in-singapore"><b>Incorporation</b><span>Company name, constitution and registration on Bizfile.</span></Link></li>
            <li><Link className="it" href="/services/corporate-secretarial/nominee-directorship"><b>Nominee Directorship</b><span>A locally resident director for ACRA.</span></Link></li>
          </ul>
        </div>
      </div>

      <div className={`dpanel${menu === "solutions" ? " on" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenu(null); }}>
        <div className="dcard dfeat">
          <Image className="dimg" src="/images/sg-3.jpg" alt="Shophouses in Joo Chiat, Singapore" width={960} height={600} />
          <h3>Start a business in Singapore</h3>
          <Link className="btn btn-navy" href="/start-a-business-in-singapore">Start your company</Link>
        </div>
        <div className="dcard">
          <Link className="ov" href="/start-a-business-in-singapore"><b>Start a business in Singapore</b><span>Business structures, registration on Bizfile and the first year.</span><i aria-hidden="true">→</i></Link>
          <h4>By company</h4>
          <ul>
            <li><Link className="it" href="/solutions/startups"><b>Start-ups</b><span>Incorporation, a company secretary and the first books.</span></Link></li>
            <li><Link className="it" href="/solutions/smes"><b>SMEs</b><span>Monthly books, GST and annual compliance.</span></Link></li>
            <li><Link className="it" href="/solutions/large-companies"><b>Large companies</b><span>Group reporting, forecasting and tax advisory.</span></Link></li>
          </ul>
        </div>
        <div className="dcard">
          <h4>Compliance</h4>
          <Link className="ov" href="/compliance-deadline-calculator"><b>Compliance deadline calculator</b><span>ECI, AGM, annual return, IR8A and corporate tax dates from your financial year end.</span><i aria-hidden="true">→</i></Link>
        </div>
      </div>
    </div></div>

    <div className={`mnav${mobile ? " open" : ""}`} id="mnav" onClick={(e) => { if ((e.target as HTMLElement).closest("a, [data-open-start]")) setMobile(false); }}>
      <div className="mn-in">
        <nav className="mn-list" aria-label="Mobile">
          <Link className="mn-row" href="/about-us">About</Link>
          <div className={`mn-grp${group === "p" ? " on" : ""}`}>
            <button type="button" className="mn-row" aria-expanded={group === "p"} onClick={() => setGroup((g) => (g === "p" ? null : "p"))}>Products<i aria-hidden="true" /></button>
            <div className="mn-sub"><div>
              <Link className="mn-head" href="/services/accounting">Accounting <span aria-hidden="true">→</span></Link>
              <Link href="/services/accounting/bookkeeping">Bookkeeping</Link>
              <Link href="/services/accounting/management-reports">Management reports</Link>
              <Link href="/services/accounting/financial-statements-xbrl">Financial statements and XBRL</Link>
              <Link href="/services/accounting/gst">GST</Link>
              <Link href="/services/accounting/payroll">Payroll</Link>
              <Link className="mn-head" href="/services/tax">Tax <span aria-hidden="true">→</span></Link>
              <Link href="/services/tax/corporate-income-tax">Corporate income tax</Link>
              <Link href="/services/tax/tax-advisory">Tax advisory and forecasting</Link>
              <Link href="/services/tax/fractional-cfo">Fractional CFO</Link>
              <Link className="mn-head" href="/services/corporate-secretarial">Corporate Secretarial <span aria-hidden="true">→</span></Link>
              <Link href="/start-a-business-in-singapore">Incorporation</Link>
              <Link href="/services/corporate-secretarial/nominee-directorship">Nominee Directorship</Link>
            </div></div>
          </div>
          <div className={`mn-grp${group === "s" ? " on" : ""}`}>
            <button type="button" className="mn-row" aria-expanded={group === "s"} onClick={() => setGroup((g) => (g === "s" ? null : "s"))}>Solutions<i aria-hidden="true" /></button>
            <div className="mn-sub"><div>
              <Link className="mn-head" href="/start-a-business-in-singapore">Start a business in Singapore <span aria-hidden="true">→</span></Link>
              <Link href="/solutions/startups">Start-ups</Link>
              <Link href="/solutions/smes">SMEs</Link>
              <Link href="/solutions/large-companies">Large companies</Link>
              <Link className="mn-head" href="/compliance-deadline-calculator">Compliance deadline calculator <span aria-hidden="true">→</span></Link>
            </div></div>
          </div>
          <Link className="mn-row" href="/blog">Blog</Link>
          <Link className="mn-row" href="/contact">Contact</Link>
        </nav>
        <div className="mn-acts">
          <button className="btn mstart" type="button" data-open-start>Get started</button>
          <a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20services." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
        </div>
      </div>
    </div>
  </div>
</header>
  );
}
