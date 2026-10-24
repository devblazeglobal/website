import { ProductCards } from "@/components/product-cards";
import { Credentials, FlankCards, Help, PageHero } from "@/components/ui";
import { SUB_PAGES } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

// Kept at the Wix URL /services: an index of every service.
export const metadata = pageMetadata({
  path: "/services",
  title: "Services | Accounting, Tax, Corporate Secretarial, Payroll, CFO | Blaze Global",
  description: "Accounting, tax, corporate secretarial, payroll and outsourced CFO services for Singapore companies. One team of Chartered Accountants for every stage.",
});


export default function ServicesPage() {
  const wa = "Hello Blaze Global, I would like to find out more about your services.";
  return (
    <main className="view" id="view-company">
      <PageHero h1="One partner at every stage" lede="From incorporation, corporate secretarial and nominee director services to accounting, tax, payroll and financial advisory, we support Singapore companies as Chartered Accountants and an ACRA Registered Filing Agent." wa={wa} />
      <section className="segments"><div className="wide"><ProductCards /></div></section>
      <section className="fk fk-top"><div className="wide">
        <h2 className="fk-h">Accounting and tax services</h2>
        <FlankCards cards={Object.values(SUB_PAGES).map((s) => [s.name, s.line, s.art[0], s.art[1], `/services/${s.par}/${s.slug}`])} />
      </div></section>
      <Credentials />
      <Help wa={wa} chat={["Which services do we need?", "Tell us your revenue and headcount, and we will list what applies to your company."]} />
    </main>
  );
}
