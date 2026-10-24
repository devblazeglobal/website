import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/payroll",
  title: "Payroll Services in Singapore | Blaze Global",
  description: "Payroll services in Singapore: monthly payroll, payslips, CPF and SDL by the 14th and IR8A by 1 March, handled for you by Chartered Accountants.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/payroll")!)} /><MainServiceView slug="payroll" /></>);
}
