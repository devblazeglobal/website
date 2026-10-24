// Shared page blocks, rendered on the server. Markup and class names match
// the approved mock-up (docs/brand/home-mockup.html) so app/site.css applies.
import Link from "next/link";
import Image from "next/image";

import { Rail } from "@/components/interactive";
import { ICONS, REVIEWS, type ArtKind, type Benefit, type Card, type IconKey, type Pair } from "@/lib/content-data";
import { site, whatsappUrl } from "@/lib/site";

export const Stars = () => (
  <div className="gstars">{[0, 1, 2, 3, 4].map((i) => <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><use href="#star" /></svg>)}</div>
);

export const Icon = ({ k, className = "ev-i" }: { k: IconKey; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[k] }} />
);

const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function WaButton({ text, label = "WhatsApp us", className = "btn btn-wa" }: { text: string; label?: string; className?: string }) {
  return <a className={className} href={whatsappUrl(text)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>{label}</a>;
}

export function Acts({ wa, label }: { wa: string; label?: string }) {
  return (
    <div className="fk-acts">
      <button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button>
      <WaButton text={wa} label={label} className="btn btn-wa btn-lg" />
    </div>
  );
}

export function TrustStrip() {
  return (
    <ul className="tr-strip">
      <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /></svg><span>ACRA Registered Filing Agent {site.filingAgent}</span></li>
      <li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M3 19c.9-3 3.1-4.5 6-4.5s5.1 1.5 6 4.5 M16 5.5a3 3 0 0 1 0 5.6 M18 14.8c1.5.6 2.5 2 3 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg><span>120+ businesses served</span></li>
      <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0z M8 6H5a3 3 0 0 0 3 4 M16 6h3a3 3 0 0 1-3 4 M12 13v4 M8.5 20h7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Chartered Accountants, members of ISCA</span></li>
    </ul>
  );
}

export function Faq({ items, heading = "Frequently asked questions" }: { items: Pair[]; heading?: string }) {
  return (
    <section className="fk-faq lp-sec"><div className="wide lp-split">
      <h2 className="h2">{heading}</h2>
      <div className="faq">{items.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
    </div></section>
  );
}

export function CtaBand({ text, wa }: { text: string; wa: string }) {
  return (
    <section className="seg-cta"><div className="wide"><div className="band"><p>{text}</p><div className="actions">
      <button className="btn btn-start-light" type="button" data-open-start>Get started</button><WaButton text={wa} />
    </div></div></div></section>
  );
}

export function Help({ wa, chat, first = false, label }: { wa: string; chat: Pair; first?: boolean; label?: string }) {
  return (
    <section className={`hp${first ? " hp-first pull-under" : ""}`}><div className="wide hp-grid">
      <div className="hp-copy">
        {first ? <h1>We respond fast on WhatsApp</h1> : <h2>We respond fast on WhatsApp</h2>}
        <p>Ask about your books, filings or company. A Blaze Global accountant replies.</p>
        <WaButton text={wa} label={label} className="btn hp-btn" />
      </div>
      <figure className="hp-fig">
        <Image src="/images/help-1.jpg" alt="A person typing a message on a phone" fill sizes="(max-width: 860px) 460px, 520px" />
        <div className="hp-chat" aria-hidden="true">
          <div className="bb in"><span className="av">B</span><p><b>Blaze Global</b>How can we help?</p></div>
          <div className="bb out"><p>{chat[0]}</p></div>
          <div className="bb in"><span className="av">B</span><p><b>Blaze Global</b>{chat[1]}</p></div>
        </div>
      </figure>
    </div></section>
  );
}

const CREDENTIALS: { logo: string; alt: string; name: string; meta: string; text: string }[] = [
  { logo: "/logos/acra.svg", alt: "ACRA Registered Filing Agent", name: "ACRA Registered Filing Agent", meta: `Filing agent no. ${site.filingAgent}`, text: "Registered to file incorporations, annual returns and other transactions on Bizfile for clients." },
  { logo: "/logos/isca.svg", alt: "ISCA", name: "ISCA", meta: "Member", text: "Our accountants are members of the Institute of Singapore Chartered Accountants, the national accountancy body." },
  { logo: "/logos/caw.png", alt: "Chartered Accountants Worldwide", name: "Chartered Accountants Worldwide", meta: "Network member", text: "Part of a global network of chartered accountancy institutes and their members." },
  { logo: "/logos/xero.svg", alt: "Xero", name: "Xero", meta: "Cloud accounting", text: "Books kept on Xero. Bank feeds, invoices and reports online, open to you at any time." },
  { logo: "/logos/aspire.svg", alt: "Aspire", name: "Aspire", meta: "Business accounts", text: "Business accounts and cards for Singapore companies, connected to your books." },
  { logo: "/logos/ocbc.png", alt: "OCBC", name: "OCBC", meta: "Qualified Introducer and Channel Partner", text: "Introductions to OCBC business banking for Singapore companies." },
];

export function Credentials({ id }: { id?: string }) {
  return (
    <section className="creds" id={id} aria-labelledby={id ? "cred-title" : undefined} aria-label={id ? undefined : "Credentials and partnerships"}>
      <div className="wide creds-top"><h2 className="h2" id={id ? "cred-title" : undefined}>Credentials &amp; Partnerships</h2><Link className="btn btn-ghost" href="/about-us">About Blaze Global</Link></div>
      <Rail variant="creds">
        {CREDENTIALS.map((c) => (
          <article className="crc" key={c.name}>
            <div className="crc-logo"><Image src={c.logo} alt={c.alt} width={240} height={96} /></div>
            <p className="crc-meta"><b>{c.name}</b>{c.meta}</p>
            <p className="crc-txt">{c.text}</p>
          </article>
        ))}
      </Rail>
    </section>
  );
}

export function Reviews({ heading, id }: { heading?: string; id?: string }) {
  const placeholder = { n: "Reviewer", role: "Google review", head: "Review headline appears here.", body: ["Google review text appears here once the Business Profile is connected."] };
  const items = [REVIEWS[0], ...Array.from({ length: 5 }, () => placeholder)];
  return (
    <section className="reviews" id={id} aria-label="Google reviews">
      {heading && <div className="wide rv-head"><h2 className="h2">{heading}</h2></div>}
      <Rail variant="reviews">
        {items.map((r, k) => (
          <article className="rvc" key={k}>
            <p className="rvc-who">{r.n} <span>· {r.role}</span></p>
            <h3>{r.head}</h3>
            <p className="rvc-t">{r.body[0]}</p>
            <div className="rvc-foot"><svg className="gl" aria-label="Google"><use href="#g" /></svg><Stars />
              {k < REVIEWS.length && (
                <button className="rvc-plus" type="button" aria-label={`Read the full review from ${r.n}`} data-rv={k}><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></button>
              )}
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
}

// ---------- Flank-style service cards with small illustrations ----------
const Chip = ({ t }: { t: string }) => <span className="ar-chip"><i />{t}</span>;

export function Art({ k, chip }: { k: ArtKind; chip: string }) {
  switch (k) {
    case "bars":
      return (
        <div className="ar ar-bars">
          <svg className="ar-trend" viewBox="0 0 200 90" preserveAspectRatio="none"><path d="M0 80 C40 74 60 70 80 58 S130 34 150 24 S185 8 200 2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 4" /></svg>
          <div className="ar-bw">{[38, 46, 58, 74, 92].map((h) => <i key={h} style={{ height: `${h}%` }} />)}</div><Chip t={chip} />
        </div>
      );
    case "toggles":
      return (
        <div className="ar ar-tog">
          <div className="tg on"><span className="tg-ic" /><b>{chip}</b><em /></div>
          <div className="tg"><span className="tg-bar" style={{ "--w": "52%" }} /><em /></div>
          <div className="tg"><span className="tg-bar" style={{ "--w": "70%" }} /><em /></div>
        </div>
      );
    case "cal":
      return (
        <div className="ar ar-cal">
          <div className="cal-m"><b>November</b><div className="cal-g">{Array.from({ length: 30 }, (_, i) => <i key={i} className={i === 29 ? "on" : undefined}>{i + 1}</i>)}</div></div><Chip t={chip} />
        </div>
      );
    case "ring":
      return (
        <div className="ar ar-ring">
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="#e3e6f0" strokeWidth="6" /><circle cx="60" cy="60" r="50" fill="none" stroke="url(#arg)" strokeWidth="6" strokeLinecap="round" strokeDasharray="230 400" transform="rotate(-90 60 60)" /><defs><linearGradient id="arg" x1="0" x2="1"><stop offset="0" stopColor="#8ea2e2" /><stop offset="1" stopColor="#24398a" /></linearGradient></defs></svg>
          <span className="ring-c"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span><Chip t={chip} />
        </div>
      );
    case "stamp":
      return <div className="ar ar-stamp"><div className="sh s1"><b /><b className="w6" /><b /><b className="w4" /></div><span className="seal">ACRA</span><Chip t={chip} /></div>;
    case "route":
      return (
        <div className="ar ar-route">
          <div className="rt-u"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5 20c1.2-3.6 3.8-5 7-5s5.8 1.4 7 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg><span>You</span></div>
          <svg className="rt-l" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 50 C30 50 30 18 60 18 M0 50 L60 50 M0 50 C30 50 30 82 60 82" fill="none" stroke="#c6cde3" strokeWidth="1.2" /></svg>
          <div className="rt-p"><span>Option A</span><span>Option B</span><span className="on">{chip}</span></div><span className="rt-a">✳</span>
        </div>
      );
    default:
      return (
        <div className="ar ar-doc"><span className="ar-spark">✳</span><i className="sh s3" /><i className="sh s2" /><div className="sh s1"><b /><b /><b className="w6" /><b /><b className="w4" /><b /><b className="w6" /></div><span className="ar-line" /><Chip t={chip} /></div>
      );
  }
}

export function FlankCards({ cards }: { cards: Card[] }) {
  return (
    <ul className="fk-cards">
      {cards.map(([title, text, art, chip, href]) => {
        const inner = <><div className="fk-art"><Art k={art} chip={chip} /></div><h3>{title}</h3><p>{text}</p></>;
        return <li key={title}>{href ? <Link href={href}>{inner}<span className="fk-go"><Arrow /></span></Link> : <div>{inner}</div>}</li>;
      })}
    </ul>
  );
}

export function ExploreLinks({ links }: { links: [string, string][] }) {
  return <ul className="fk-x">{links.map(([t, h]) => <li key={h}><Link href={h}>Explore {t} <i aria-hidden="true">→</i></Link></li>)}</ul>;
}

export function MoreFrom({ title, cards, links, wa, label }: { title: string; cards: Card[]; links: [string, string][]; wa: string; label?: string }) {
  return (
    <section className="fk fk-more"><div className="wide"><div className="fk-grid">
      <div className="fk-side"><h2 className="fk-mh">{title}</h2><ExploreLinks links={links} /><Acts wa={wa} label={label} /></div>
      <FlankCards cards={cards} />
    </div></div></section>
  );
}

export function EvGrid({ items }: { items: [IconKey, string, string, string?][] }) {
  return (
    <ul className="ev-grid">
      {items.map(([k, t, s, h]) => {
        const inner = <><Icon k={k} /><div><b>{t}</b><span>{s}</span></div></>;
        return <li key={t}>{!h ? <div>{inner}</div> : h.startsWith("http") ? <a href={h} target="_blank" rel="noopener">{inner}</a> : <Link href={h}>{inner}</Link>}</li>;
      })}
    </ul>
  );
}

export function Benefits({ rows }: { rows: Benefit[] }) {
  return (
    <section className="bn"><div className="wide">
      {rows.map((r, i) => (
        <article className={`bn-row${i % 2 ? " flip" : ""}`} key={r.h}>
          <div className="bn-vis">
            <Image src={r.img} alt="" fill sizes="(max-width: 860px) 90vw, 440px" />
            <div className="lg-card"><div className="lg-t">{r.card[0]}</div><ul className="lg-list">{r.card[1].map((x) => <li key={x[0]}><span>{x[0]}</span><em className={x[2]}>{x[1]}</em></li>)}</ul></div>
          </div>
          <div className="bn-txt"><h3>{r.h}</h3><p>{r.p}</p></div>
        </article>
      ))}
    </div></section>
  );
}

export function PhotoHero({ img, title, sub, wa, label, children, className = "" }: { img: string; title: string; sub: string; wa: string; label?: string; children?: React.ReactNode; className?: string }) {
  return (
    <section className={`rh pull-under ${className}`}>
      {img === "radial" ? <div className="rh-imgs rh-core" aria-hidden="true" /> : <div className="rh-imgs" aria-hidden="true"><Image className="on" src={img} alt="" fill priority sizes="100vw" /></div>}
      <div className="rh-in">
        <h1>{title}</h1>
        <p className="rh-sub">{sub}</p>
        <div className="rh-acts"><button className="btn rh-btn" type="button" data-open-start>Get started</button><WaButton text={wa} label={label} className="btn btn-wa rh-btn-ghost" /></div>
        {children}
      </div>
      <ul className="rh-creds" aria-label="Credentials">
        <li><Image src="/logos/acra.svg" alt="ACRA" width={150} height={64} /><span>Registered filing agent<br />{site.filingAgent}</span></li>
        <li><Image src="/logos/isca.svg" alt="ISCA" width={198} height={46} /><span>Our accountants are<br />members of ISCA</span></li>
      </ul>
    </section>
  );
}

export function PageHero({ h1, lede, wa, label, trust = true }: { h1: string; lede: string; wa: string; label?: string; trust?: boolean }) {
  return (
    <section className="sp-hero pull-under"><div className="wide">
      <h1>{h1}</h1><p>{lede}</p><Acts wa={wa} label={label} />{trust && <TrustStrip />}
    </div></section>
  );
}
