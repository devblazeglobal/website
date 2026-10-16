import { AboutView } from "@/components/views/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about-us",
  title: "About Blaze Global | Chartered Accountants in Singapore",
  description: "One team for accounting, company secretary and tax. Chartered Accountants with Big Four experience and an ACRA Registered Filing Agent.",
});

export default function AboutPage() {
  return <AboutView />;
}
