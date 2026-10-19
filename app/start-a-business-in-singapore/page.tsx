import { JsonLd } from "@/components/json-ld";
import { StartBusinessView } from "@/components/views/start-a-business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/start-a-business-in-singapore",
  title: "Register a Company in Singapore | Blaze Global",
  description: "Company incorporation in Singapore by an ACRA Registered Filing Agent. Local and overseas founders.",
});

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["How much does it cost to register a company in Singapore?", "ACRA charges S$15 for the name application and S$300 for incorporation, paid on Bizfile. Blaze Global's fees are quoted on request."],
    ["How long does registration take?", "Approval times depend on ACRA. Names or activities referred to another government agency take longer."],
    ["Can a foreigner own a Singapore company?", "Yes. A company can be fully foreign-owned, but it needs at least one director ordinarily resident in Singapore."],
    ["What is the minimum paid-up capital?", "S$1."],
  ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function StartBusinessPage() {
  return (
    <>
      <JsonLd data={faq} />
      <StartBusinessView />
    </>
  );
}
