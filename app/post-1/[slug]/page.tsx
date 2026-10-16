import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WhatsAppButton } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, Section } from "@/components/page-blocks";
import { getPost, getPosts, renderMarkdown } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Same URLs as the Wix blog: /post-1/<slug>.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ path: p.path, title: `${p.title.replace(/\.$/, "")} | Blaze Global`, description: p.description });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const date = new Date(`${p.publishedAt}T00:00:00Z`).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <JsonLd data={articleSchema(p)} />
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path: p.path }]} title={p.title} />
      <Section>
        <article className="prose-bg" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
        <p className="mt-md text-sm text-muted">
          Published <time dateTime={p.publishedAt}>{date}</time>
        </p>
        <div className="mt-lg">
          <WhatsAppButton text={`Hello Blaze Global, I read "${p.title}" and would like to ask a question.`} label="Ask us a question" />
        </div>
      </Section>
    </>
  );
}
