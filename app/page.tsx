import { HomeView } from "@/components/views/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Blaze Global | Accounting and Corporate Secretarial in Singapore",
  description: "Chartered Accountants and an ACRA Registered Filing Agent (FA20210247). Bookkeeping, GST, XBRL, corporate tax and company secretary services for Singapore companies.",
});

export default function Home() {
  return <HomeView />;
}
