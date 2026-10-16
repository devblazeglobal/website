import { WhatsAppButton } from "@/components/cta";
import { AskForm } from "@/components/home/ask-form";
import { CardRail } from "@/components/home/card-rail";
import { Reviews } from "@/components/home/reviews";
import { GoogleIcon, Stars } from "@/components/icons";
import { companyCards, productCards } from "@/lib/home-cards";
import { pageMetadata } from "@/lib/seo";
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

/** Names and photos to be supplied by Blaze (docs/content-gaps.md). */
const TEAM = [
  { name: "Name", role: "Chartered Accountant" },
  { name: "Name", role: "Corporate Secretarial" },
  { name: "Name", role: "Accounting" },
];

// Home flow (lawhive.co.uk): hero and reviews on one ground, three points,
// accounting by company, products, team.
export default function Home() {
  return (
    <>
      <div className="stage pull-under">
        <div className="hero">
          <div className="wide hero-body">
            <h1>
              <span>Accounting and company secretarial</span> <span>in Singapore</span>
            </h1>
            <AskForm />
          </div>
          <div className="wide">
            <div className="trust">
              <ul className="ticks">
                <li>Chartered Accountants with Big Four experience</li>
                <li>ACRA Registered Filing Agent {site.filingAgent}</li>
                <li>Annual returns and XBRL filed with ACRA</li>
                <li>Books kept on Xero, Aspire and Spenmo</li>
              </ul>
              <div className="rating">
                <GoogleIcon />
                <span>Google reviews</span>
                <Stars />
              </div>
            </div>
          </div>
        </div>
        <Reviews />
      </div>

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

      <CardRail id="solutions" title="Accounting by company" cards={companyCards} />
      <CardRail id="products" title="Products we offer" cards={productCards} />

      {/* Team, after evantolleson.com and the Alps Wills estates page:
          a short heading, one large paragraph, three portraits centred. */}
      <section className="team" id="team" aria-labelledby="team-title">
        <div className="wrap">
          <h2 className="team-h" id="team-title">The team</h2>
          <p className="team-p">
            Chartered Accountants with managerial experience in a Big Four firm, and entrepreneurs with 6 to 20 years of experience running multinational organisations.
          </p>
          <ul className="people">
            {TEAM.map((t, k) => (
              <li className="person" key={k}>
                <div className="photo">
                  <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="28" r="16" />
                    <path d="M8 80c2-20 16-30 32-30s30 10 32 30z" />
                  </svg>
                </div>
                <p className="nm">
                  <span className="no">{String(k + 1).padStart(2, "0")}</span>
                  {t.name}
                </p>
                <p className="role">{t.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
