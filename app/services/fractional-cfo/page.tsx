import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/fractional-cfo",
  title: "Fractional CFO Services in Singapore | Blaze Global",
  description: "Budgets, cash forecasts, board reporting and funding preparation from a part-time Chartered Accountant CFO in Singapore.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/fractional-cfo")!)} /><MainServiceView slug="fractional-cfo" /></>);
}
