import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/outsourced-cfo",
  title: "Outsourced CFO Services in Singapore | Blaze Global",
  description: "Financial models, cash flow visibility, budgets and forecasts, and process streamlining from a part-time Chartered Accountant CFO in Singapore.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/outsourced-cfo")!)} /><MainServiceView slug="outsourced-cfo" /></>);
}
