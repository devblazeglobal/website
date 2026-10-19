import { JsonLd } from "@/components/json-ld";
import { MainServiceView } from "@/components/views/service-pages";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/digitalisation-automation",
  title: "Digitalisation, Automation and Dashboarding | Blaze Global",
  description: "Process improvement, AI automation, dashboards and systems integration for Singapore companies, built on Xero, Google Sheets and the tools you already use.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/digitalisation-automation")!)} /><MainServiceView slug="digitalisation-automation" /></>);
}
