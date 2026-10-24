import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/corporate-secretarial",
  title: "Corporate Secretarial Services in Singapore | Blaze Global",
  description: "Corporate secretarial services in Singapore: a qualified company secretary, AGMs, annual returns and registers, filed with ACRA by a Registered Filing Agent.",
});

export default function CorporateSecretarialPage() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/corporate-secretarial")!)} /><MainServiceView slug="corporate-secretarial" /></>);
}
