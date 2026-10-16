import { Credentials, Help, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Blaze Global | +65 9819 9108 | Robinson Road, Singapore",
  description: "Reach Blaze Global by phone, WhatsApp, Telegram or email. 14 Robinson Road, #08-01A Far East Finance Building, Singapore 048545.",
});

export default function ContactPage() {
  const wa = "Hello Blaze Global, I would like to find out more about your services.";
  return (
    <main className="view" id="view-company">
      <PageHero h1="Contact Blaze Global" lede="WhatsApp is fastest. Phone, Telegram and email reach the same team." wa={wa} trust={false} />
      <section className="contact-facts"><div className="wide">
        <dl className="cf-grid">
          <div><dt>WhatsApp and phone</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
          <div><dt>Office</dt><dd>{site.address.display}</dd></div>
          <div><dt>Company</dt><dd>{site.legalName} · UEN {site.uen}</dd></div>
        </dl>
      </div></section>
      <Help wa={wa} chat={["Can we meet at your office?", "Yes. Tell us a time that suits you and we will confirm."]} />
      <Credentials />
    </main>
  );
}
