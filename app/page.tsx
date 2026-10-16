import Link from "next/link";

import { WhatsAppButton } from "@/components/cta";
import { AskForm } from "@/components/home/ask-form";
import { Reviews } from "@/components/home/reviews";
import { Segments } from "@/components/home/segments";
import { Stars } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  title: "Blaze Global | Accounting, Business Advisory and Corporate Secretarial in Singapore",
  description:
    "Singapore accounting, business advisory and corporate secretarial services. Chartered Accountants, ACRA Registered Filing Agent FA20210247, Robinson Road.",
});

const POINTS = [
  {
    title: "Chartered Accountants",
    text: "Our team includes a Chartered Accountant with managerial experience in a Big Four accounting firm.",
    icon: (
      <>
        <circle cx="44" cy="34" r="20" />
        <circle cx="44" cy="34" r="12" />
        <path d="M32 50l-6 26 18-9 18 9-6-26" />
      </>
    ),
  },
  {
    title: "ACRA Registered Filing Agent",
    text: `Annual returns, XBRL and filings with ACRA and IRAS, filed by us. Filing agent ${site.filingAgent}.`,
    icon: (
      <>
        <path d="M24 12h28l14 14v50H24z" />
        <path d="M52 12v14h14" />
        <path d="M33 44l7 7 14-14" />
        <path d="M33 62h22" />
      </>
    ),
  },
  {
    title: "Books kept online",
    text: "Bank accounts, credit cards and cash, matched as the information comes through, on Xero, Aspire and Spenmo.",
    icon: (
      <>
        <rect x="12" y="20" width="64" height="42" rx="4" />
        <path d="M6 70h76" />
        <path d="M26 48l10-10 8 8 16-16" />
        <path d="M52 30h8v8" />
      </>
    ),
  },
];

/** Team names and photos to be supplied by Blaze (docs/content-gaps.md). */
const TEAM = [
  { role: "Chartered Accountant", tags: ["Accounting", "Advisory"] },
  { role: "Role", tags: ["Corporate Secretarial"] },
  { role: "Role", tags: ["Accounting"] },
];

const SERVICE_ORDER = ["accounting", "corporate-secretarial", "business-advisory"];

// Home flow (lawhive.co.uk): hero with the question box, reviews, three
// points, solutions by company size, team, services.
export default function Home() {
  const ordered = SERVICE_ORDER.map((slug) => services.find((s) => s.slug === slug)!);
  return (
    <>
      <div className="hero">
        <div className="wide hero-body">
          <h1>
            <span>Accounting and company secretarial</span> <span>in Singapore</span>
          </h1>
          <p className="sub">Chartered Accountants · ACRA Registered Filing Agent {site.filingAgent}</p>
          <AskForm />
        </div>
        <div className="wide">
          <div className="trust">
            <ul className="ticks">
              <li>Chartered Accountant with Big Four experience</li>
              <li>Annual returns and XBRL filed with ACRA</li>
              <li>Books kept on Xero, Aspire and Spenmo</li>
            </ul>
            <div className="rating">
              <p>
                Google reviews <span className="ph">Placeholder</span>
              </p>
              <Stars label="Rating to be connected" style={{ justifyContent: "flex-end" }} />
            </div>
          </div>
        </div>
      </div>

      <Reviews />

      <section className="points" aria-label="Why Blaze Global">
        <div className="wrap">
          <div className="pt-grid">
            {POINTS.map((p) => (
              <div className="pt" key={p.title}>
                <svg viewBox="0 0 88 88" aria-hidden="true">{p.icon}</svg>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="cta">
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <Segments />

      <section className="team" id="team" aria-labelledby="team-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Team</p>
            <div className="row">
              <h2 className="h2" id="team-title">Our team</h2>
              <span className="ph">Names and photos to be supplied</span>
            </div>
          </div>
          <div className="people">
            {TEAM.map((t, k) => (
              <div className="person" key={k}>
                <div className="photo">
                  <span className="ph">Photo</span>
                  <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="28" r="16" />
                    <path d="M8 80c2-20 16-30 32-30s30 10 32 30z" />
                  </svg>
                </div>
                <p className="nm">Name</p>
                <p className="role">{t.role}</p>
                <div className="tags">
                  {t.tags.map((g) => (
                    <span key={g}>{g}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services" id="services" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Products</p>
            <h2 className="h2" id="svc-title">Our services</h2>
          </div>
          <div className="svc-grid">
            {ordered.map((s) => (
              <div className="svc" key={s.slug}>
                <h3>{s.name}</h3>
                <div className="panel">
                  <span className="big" aria-hidden="true">{s.name[0]}</span>
                  <span className="rule" />
                  <ul>
                    {s.covers.slice(0, 4).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <Link className="more" href={s.path}>Explore {s.name.toLowerCase()} services</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
