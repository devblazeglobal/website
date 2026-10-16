import { CallButton, WhatsAppButton } from "@/components/cta";
import { Accreditations } from "@/components/home-blocks";
import { PageHeader, Section, SectionHeading } from "@/components/page-blocks";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about-us",
  title: "About Blaze Global | Chartered Accountants in Singapore",
  description:
    "Blaze Global's team includes a Chartered Accountant with Big Four managerial experience and entrepreneurs with 6 to 20 years of experience. Robinson Road, Singapore.",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about-us" }]}
        title="About Blaze Global"
        actions={<><WhatsAppButton /><CallButton onNavy /></>}
      />
      <Section>
        <div className="max-w-[675px] space-y-sm text-lg leading-relaxed">
          {about.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </Section>
      <Section tone="alt">
        <SectionHeading>Partners and accreditations</SectionHeading>
        <Accreditations />
      </Section>
    </>
  );
}
