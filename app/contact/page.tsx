import { Credentials, Help } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Blaze Global | +65 9819 9108 | Robinson Road, Singapore",
  description: "Reach Blaze Global on WhatsApp, phone, Telegram or email. 14 Robinson Road, #08-01A Far East Finance Building, Singapore 048545.",
});

export default function ContactPage() {
  return (
    <main className="view" id="view-company">
      <Help first wa="Hello Blaze Global, I would like to find out more about your services." chat={["Can we meet at your office?", "Yes. Tell us a time that suits you and we will confirm."]} />
      <Credentials />
    </main>
  );
}
