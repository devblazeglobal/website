import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/outsourced-cfo",
  title: "Outsourced CFO Services in Singapore | Blaze Global",
  description: "Outsourced CFO services in Singapore: financial models, cash flow visibility, budgets, forecasts and leaner processes from a Chartered Accountant CFO.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/outsourced-cfo")!)} /><MainServiceView slug="outsourced-cfo" /></>);
}
