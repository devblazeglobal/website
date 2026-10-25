"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import { GROUPS, inGroup } from "@/lib/products";

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
      <Link className="logo" href="/" aria-label="Blaze Global home"><Image src="/logos/blaze-global-gold.png" alt="Blaze Global" width={1200} height={100} priority /><sup className="logo-r" aria-label="registered trade mark">®</sup></Link>
      <div className="tabs">
        <Link className="tab" href="/about-us">About</Link>
        <button className="tab" type="button" aria-expanded={menu === "products"} aria-controls="drop" onClick={() => toggle("products")} onMouseEnter={() => hover("products")}>Products <svg width="10" height="10" aria-hidden="true"><use href="#chev" /></svg></button>
        <button className="tab" type="button" aria-expanded={menu === "solutions"} aria-controls="drop" onClick={() => toggle("solutions")} onMouseEnter={() => hover("solutions")}>Solutions <svg width="10" height="10" aria-hidden="true"><use href="#chev" /></svg></button>
        <Link className="tab" href="/services/blazeos">BlazeOS</Link>
        <Link className="tab" href="/blog">Blog</Link>
      </div>
      <button className="btn btn-start" type="button" data-open-start>Get started</button>
      <a className="btn btn-wa right-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20services." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
      <button className={`burger${mobile ? " x" : ""}`} type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mnav" onClick={() => setMobile((o) => !o)}><svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true"><path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" strokeWidth="1.6" /></svg></button>
    </div>

    <div className="drop" id="drop"><div className="drop-in">
      <div className={`dpanel dp-products${menu === "products" ? " on" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenu(null); }}>
        {GROUPS.map((g) => (
          <div className="dcard" key={g.key}>
            <h4>{g.name}</h4>
            {inGroup(g.key).map((p) => <Link key={p.key} className="ov" href={p.href}><b>{p.name}</b><span>{p.line}</span><i aria-hidden="true">→</i></Link>)}
          </div>
        ))}
      </div>

      <div className={`dpanel${menu === "solutions" ? " on" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenu(null); }}>
        <div className="dcard dfeat">
          <Image className="dimg" src="/images/sg-3.jpg" alt="Shophouses in Joo Chiat, Singapore" width={960} height={600} />
          <h3>Start a business in Singapore</h3>
          <Link className="btn btn-navy" href="/start-a-business-in-singapore">Start your company</Link>
        </div>
        <div className="dcard">
          <Link className="ov" href="/start-a-business-in-singapore"><b>Start a business in Singapore</b><span>Choose your business structure, register on Bizfile and plan your first year.</span><i aria-hidden="true">→</i></Link>
          <h4>By company</h4>
          <ul>
            <li><Link className="it" href="/solutions/startups"><b>Start-ups</b><span>Incorporate, appoint a company secretary and set up your first books.</span></Link></li>
            <li><Link className="it" href="/solutions/smes"><b>SMEs</b><span>Monthly books, GST and annual compliance, handled by one partner.</span></Link></li>
            <li><Link className="it" href="/solutions/large-companies"><b>Large companies</b><span>Group reporting, forecasting and tax advice for growing businesses.</span></Link></li>
          </ul>
        </div>
        <div className="dcard">
          <h4>Compliance</h4>
          <Link className="ov" href="/compliance-deadline-calculator"><b>Compliance deadline calculator</b><span>See your ECI, AGM, annual return, IR8A and corporate tax dates from your financial year end.</span><i aria-hidden="true">→</i></Link>
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
              {GROUPS.map((g) => (
                <Fragment key={g.key}>
                  <span className="mn-grp-l">{g.name}</span>
                  {inGroup(g.key).map((p) => <Link key={p.key} className="mn-head" href={p.href}>{p.name} <span aria-hidden="true">→</span></Link>)}
                </Fragment>
              ))}
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
          <Link className="mn-row" href="/services/blazeos">BlazeOS</Link>
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
