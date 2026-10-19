import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SubServiceView } from "@/components/views/service-pages";
import { accountingPages } from "@/lib/catalog";
import { SUB_PAGES, type Parent } from "@/lib/content-data";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// One factory for /services/{parent}/{slug}; each parent folder re-exports it.
const TITLES: Record<string, string> = {
  bookkeeping: "Bookkeeping Services in Singapore",
  "management-reports": "Monthly Management Reports",
  "financial-statements-xbrl": "Financial Statements and XBRL Filing",
  gst: "GST Registration and Filing in Singapore",
  "corporate-income-tax": "Corporate Income Tax Filing in Singapore",
  "tax-advisory": "Tax Advisory and Forecasting",
};
const PARENT_NAME: Record<Parent, string> = { accounting: "Accounting", tax: "Tax", "corporate-secretarial": "Corporate Secretarial" };
type Props = { params: Promise<{ slug: string }> };

export function subRoute(par: Parent) {
  const owns = (slug: string) => SUB_PAGES[slug]?.par === par;
  return {
    generateStaticParams: () => Object.keys(SUB_PAGES).filter(owns).map((slug) => ({ slug })),
    async generateMetadata({ params }: Props): Promise<Metadata> {
      const { slug } = await params;
      if (!owns(slug)) return {};
      return pageMetadata({ path: `/services/${par}/${slug}`, title: `${TITLES[slug] ?? SUB_PAGES[slug].name} | Blaze Global`, description: SUB_PAGES[slug].lede });
    },
    async Page({ params }: Props) {
      const { slug } = await params;
      const entry = accountingPages.find((p) => p.path === `/services/${par}/${slug}`);
      if (!owns(slug) || !entry) notFound();
      return (
        <>
          <JsonLd data={[serviceSchema(entry), breadcrumbSchema([{ name: "Home", path: "/" }, { name: PARENT_NAME[par], path: `/services/${par}` }, { name: entry.name, path: entry.path }])]} />
          <SubServiceView slug={slug} />
        </>
      );
    },
  };
}
