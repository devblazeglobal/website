import { JsonLd } from "@/components/json-ld";
import { BlazeOSView } from "@/components/views/blazeos";
import { mainPages } from "@/lib/catalog";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/blazeos",
  title: "BlazeOS | Business Dashboards on Xero, Google Sheets and CRM Data | Blaze Global",
  description: "BlazeOS brings your Xero, Google Sheets and CRM data together in interactive dashboards, with AI-assisted insights reviewed by Chartered Accountants.",
});

export default function Page() {
  return (<><JsonLd data={serviceSchema(mainPages.find((p) => p.path === "/services/blazeos")!)} /><BlazeOSView /></>);
}
