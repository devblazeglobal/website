import { SegCards, type SegItem } from "@/components/interactive";
import { Credentials, FlankCards, Help, PageHero } from "@/components/ui";
import { SUB_PAGES } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

// Kept at the Wix URL /services: an index of every service.
export const metadata = pageMetadata({
  path: "/services",
  title: "Services | Accounting and Corporate Secretarial | Blaze Global",
  description: "Accounting, GST, XBRL, corporate tax and corporate secretarial services for Singapore companies, from one team of Chartered Accountants.",
});

const LINES: SegItem[] = [
  { name: "Accounting", card: "Bookkeeping, management reports, GST returns, unaudited financial statements, XBRL and corporate tax, filed with ACRA and IRAS.", cta: "Accounting services", href: "/services/accounting",
    screen: ["Year-end close", [["Bank, card and cash reconciled", "Done", "done"], ["Management report", "Ready", "done"], ["Unaudited financial statements", "In review", "next"], ["XBRL", "Next", "todo"]]] },
  { name: "Corporate Secretarial", card: "Incorporation, a qualified company secretary, AGMs, annual returns, registers and changes to directors and shareholders.", cta: "Corporate secretarial services", href: "/services/corporate-secretarial",
    screen: ["Annual compliance", [["Company secretary appointed", "Done", "done"], ["Company registers updated", "Done", "done"], ["AGM documents", "Ready", "next"], ["Annual return filed with ACRA", "Scheduled", "todo"]]] },
];

export default function ServicesPage() {
  const wa = "Hello Blaze Global, I would like to find out more about your services.";
  return (
    <main className="view" id="view-company">
      <PageHero h1="Every service, one team" lede="Accounting and corporate secretarial services for Singapore companies, by Chartered Accountants and an ACRA Registered Filing Agent." wa={wa} />
      <section className="segments"><div className="wide"><SegCards items={LINES} /></div></section>
      <section className="fk fk-top"><div className="wide">
        <h2 className="fk-h">Accounting services</h2>
        <FlankCards cards={Object.values(SUB_PAGES).map((s) => [s.name, s.line, s.art[0], s.art[1], `/services/accounting/${s.slug}`])} />
      </div></section>
      <Credentials />
      <Help wa={wa} chat={["Which services do we need?", "Tell us your revenue and headcount. We will list what applies to your company."]} />
    </main>
  );
}
