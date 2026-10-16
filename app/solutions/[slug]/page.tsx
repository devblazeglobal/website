import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SegmentView } from "@/components/views/service-pages";
import { SEGMENT_PAGES } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(SEGMENT_PAGES).map((slug) => ({ slug }));

const TITLES: Record<string, string> = {
  startups: "Accounting and Incorporation for Start-ups in Singapore",
  smes: "Accounting for SMEs in Singapore",
  "large-companies": "Accounting and Advisory for Groups in Singapore",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = SEGMENT_PAGES[slug];
  if (!p) return {};
  return pageMetadata({ path: `/solutions/${slug}`, title: `${TITLES[slug]} | Blaze Global`, description: p.lede });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SEGMENT_PAGES[slug]) notFound();
  return <SegmentView slug={slug} />;
}
