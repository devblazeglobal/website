import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/nominee-directorship",
  title: "Nominee Director Services in Singapore | Blaze Global",
  description: "A locally resident nominee director for overseas founders, with due diligence, a written agreement and ACRA filing.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/nominee-directorship")!)} /><MainServiceView slug="nominee-directorship" /></>);
}
