import { ServiceCards } from "@/components/home-blocks";
import { PageHeader, Section } from "@/components/page-blocks";
import { intro } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services",
  title: "Services | Accounting, Business Advisory, Corporate Secretarial | Blaze Global",
  description:
    "Accounting, business advisory and corporate secretarial services for Singapore start-ups and established businesses, delivered online.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} title="Our services" lead={intro[0]} />
      <Section>
        <ServiceCards />
        <p className="mt-lg max-w-[675px] leading-relaxed text-muted">{intro[1]}</p>
      </Section>
    </>
  );
}
