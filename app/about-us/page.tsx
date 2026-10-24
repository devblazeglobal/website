import { AboutView } from "@/components/views/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about-us",
  title: "About Blaze Global | Chartered Accountants in Singapore",
  description: "Chartered Accountants with Big Four expertise and over 60 years of combined experience. One partner for accounting, tax and corporate secretarial in Singapore.",
});

export default function AboutPage() {
  return <AboutView />;
}
