import { ContactBlock } from "@/components/contact-block";
import { PageHeader, Section } from "@/components/page-blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Blaze Global | +65 9819 9108 | Robinson Road, Singapore",
  description: "Reach Blaze Global by phone, WhatsApp, Telegram or email. 14 Robinson Road, #08-01A Far East Finance Building, Singapore 048545.",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} title="Contact us" />
      <Section>
        <ContactBlock />
      </Section>
    </>
  );
}
