import Image from "next/image";
import { Credentials, Help } from "@/components/ui";
import { TeamCards } from "@/components/team";

const WHY = [
  "Big Four expertise, personalised service",
  "Business experience that matters",
  "One partner, every stage",
  "Technology-driven, efficiency-focused",
  "Real people, practical advice",
];

export function AboutView() {
  return (
<main className="view" id="view-about">
  <section className="ab-hero pull-under"><div className="wrap">
    <h1>Beyond accounting. Built for business.</h1>
    <p>Expert accounting, tax and corporate services, powered by technology and grounded in real business experience.</p>
  </div></section>
  <section className="ab-who"><div className="wide ab-who-grid">
    <div className="ab-who-copy">
      <h2 className="h2">Why businesses choose Blaze Global</h2>
      <p className="ab-lead">With over 60 years of combined experience spanning Big Four firms, high-growth startups and multinational corporations, we bring more than technical expertise to the table. We understand what it takes to build, operate and grow a business.</p>
      <ul className="ab-ticks ab-why">{WHY.map((t) => <li key={t}><div><b>{t}</b></div></li>)}</ul>
    </div>
    <ul className="ab-cr"><li><div className="ab-cr-top"><Image src="/logos/caw.png" alt="Chartered Accountants Worldwide" width={1200} height={600} /><a href="https://charteredaccountantsworldwide.com" target="_blank" rel="noopener">Details <span aria-hidden="true">›</span></a></div><h3>Chartered Accountants Worldwide</h3><p>Our accountants belong to the Chartered Accountants Worldwide network.</p></li><li><div className="ab-cr-top"><Image src="/logos/isca.svg" alt="Institute of Singapore Chartered Accountants" width={1200} height={600} /><a href="https://isca.org.sg" target="_blank" rel="noopener">Details <span aria-hidden="true">›</span></a></div><h3>Institute of Singapore Chartered Accountants</h3><p>Our accountants are members of ISCA, Singapore&apos;s national accountancy body.</p></li><li><div className="ab-cr-top"><Image src="/logos/acra.svg" alt="ACRA Registered Filing Agent" width={1200} height={600} /><a href="https://www.acra.gov.sg" target="_blank" rel="noopener">Details <span aria-hidden="true">›</span></a></div><h3>ACRA Registered Filing Agent</h3><p>FA20210247. We file incorporations, annual returns and other transactions on Bizfile on your behalf.</p></li></ul>
  </div></section>
  <section className="ab-team"><div className="wide">
    <h2 className="h2 lp-h">The leadership team</h2>
    <TeamCards />
  </div></section>
  <section className="seg-cta"><div className="wrap"><div className="band"><p>Work with Blaze Global</p><div className="actions"><button className="btn btn-start-light" type="button" data-open-start>Get started</button><a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20services." target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a></div></div></div></section>
  <Credentials about={false} /><Help wa="Hello Blaze Global, I would like to speak to your team." chat={["Who will look after our account?", "A Chartered Accountant from our team, who you can reach here on WhatsApp."]} />
</main>
  );
}
