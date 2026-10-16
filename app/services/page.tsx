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
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} title="Our services" />
      <Section>
        <div className="mb-lg max-w-[675px] space-y-sm text-lg leading-relaxed">
          {intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <ServiceCards />
      </Section>
    </>
  );
}
