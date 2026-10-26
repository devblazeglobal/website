import Link from "next/link";

import { WaButton } from "@/components/ui";
import { PRODUCTS } from "@/lib/products";
import { site } from "@/lib/site";
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
  const subs = Object.values(SUB_PAGES);
  return (
    <main className="view jb pull-under" id="view-company">
      <div className="wrap">
        <nav className="jb-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i aria-hidden="true">·</i><span aria-current="page">Services</span></nav>
        <div className="jb-title">
          <h1>One partner at every stage</h1>
          <p>From incorporation, corporate secretarial and nominee director services to accounting, tax, payroll and financial advisory, we support Singapore companies as Chartered Accountants and an ACRA Registered Filing Agent.</p>
          <div className="jb-acts"><button className="btn btn-navy btn-lg" type="button" data-open-start>Get started</button><WaButton text={wa} className="btn btn-wa btn-lg" /></div>
        </div>
      </div>
      <section className="jb-blk" aria-labelledby="jb-prod"><div className="wide">
        <h2 className="jb-h2" id="jb-prod">Our services</h2>
        <div className="jb-cards">{PRODUCTS.map((x) => <Link className="jb-c" key={x.key} href={x.href}><h3>{x.name}</h3><p>{x.line}</p><span className="jb-go">Discover more</span></Link>)}</div>
      </div></section>
      <section className="jb-blk" aria-labelledby="jb-subs"><div className="wide">
        <h2 className="jb-h2" id="jb-subs">Accounting and tax services</h2>
        <div className="jb-cards">{subs.map((x) => <Link className="jb-c" key={x.slug} href={`/services/${x.par}/${x.slug}`}><h3>{x.name}</h3><p>{x.line}</p><span className="jb-go">Discover more</span></Link>)}</div>
      </div></section>
      <section className="jb-blk" aria-label="Work with Blaze Global"><div className="wide">
        <div className="jb-close"><p>Work with Blaze Global</p><div className="jb-acts"><button className="btn btn-white btn-lg" type="button" data-open-start>Get started</button><WaButton text={wa} className="btn btn-wa btn-lg" /></div></div>
        <ul className="jb-creds"><li><b>OCBC</b> Qualified Introducer and Channel Partner</li><li><b>ACRA</b> Registered Filing Agent {site.filingAgent}</li><li><b>ISCA</b> Chartered Accountants</li><li><b>120+</b> businesses served</li></ul>
      </div></section>
    </main>
  );
}
