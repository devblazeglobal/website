import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/accounting",
  title: "Accounting Services in Singapore | Blaze Global",
  description: "Bookkeeping on Xero, monthly management reports, GST, financial statements, XBRL and corporate tax, by Chartered Accountants in Singapore.",
});

export default function AccountingPage() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/accounting")!)} /><MainServiceView slug="accounting" /></>);
}
