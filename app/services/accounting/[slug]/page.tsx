import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SubServiceView } from "@/components/views/service-pages";
import { accountingPages } from "@/lib/catalog";
import { SUB_PAGES } from "@/lib/content-data";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(SUB_PAGES).map((slug) => ({ slug }));

const TITLES: Record<string, string> = {
  bookkeeping: "Bookkeeping Services in Singapore",
  "management-reports": "Monthly Management Reports",
  "financial-statements-xbrl": "Financial Statements and XBRL Filing",
  gst: "GST Registration and Filing in Singapore",
  "corporate-income-tax": "Corporate Income Tax Filing in Singapore",
  "tax-advisory": "Tax Advisory and Forecasting",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = SUB_PAGES[slug];
  if (!d) return {};
  return pageMetadata({ path: `/services/accounting/${slug}`, title: `${TITLES[slug]} | Blaze Global`, description: d.lede });
}

export default async function SubServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = accountingPages.find((p) => p.path.endsWith(`/${slug}`));
  if (!SUB_PAGES[slug] || !entry) notFound();
  return (
    <>
      <JsonLd data={[serviceSchema(entry), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Accounting", path: "/services/accounting" }, { name: entry.name, path: entry.path }])]} />
      <SubServiceView slug={slug} />
    </>
  );
}
