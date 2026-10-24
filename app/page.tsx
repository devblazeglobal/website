import { HomeView } from "@/components/views/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Blaze Global | Accounting and Corporate Secretarial in Singapore",
  description: "Expert accounting, tax and corporate secretarial services in Singapore, from Chartered Accountants and ACRA Registered Filing Agent FA20210247.",
});

export default function Home() {
  return <HomeView />;
}
