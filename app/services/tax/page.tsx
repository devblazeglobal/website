import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/tax",
  title: "Tax Services in Singapore | Blaze Global",
  description: "Tax services in Singapore: corporate income tax filing, practical tax advice and outsourced CFO support for your company, from Chartered Accountants.",
});

export default function TaxPage() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/tax")!)} /><MainServiceView slug="tax" /></>);
}
