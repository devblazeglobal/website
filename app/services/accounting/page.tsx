import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/accounting",
  title: "Accounting Services in Singapore | Blaze Global",
  description: "Accounting services in Singapore from Chartered Accountants: bookkeeping on Xero, management reports, GST, financial statements, XBRL and corporate tax.",
});

export default function AccountingPage() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/accounting")!)} /><MainServiceView slug="accounting" /></>);
}
