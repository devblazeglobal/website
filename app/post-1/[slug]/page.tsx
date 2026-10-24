import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Credentials, Help } from "@/components/ui";
import { getPost, getPosts, renderMarkdown } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Same URLs as the Wix blog: /post-1/<slug>.
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

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
    <main className="view" id="view-company">
      <JsonLd data={articleSchema(p)} />
      <section className="sp-hero pull-under"><div className="wide">
        <h1>{p.title}</h1>
        <p><time dateTime={p.publishedAt}>{date}</time></p>
      </div></section>
      <section className="post"><div className="wide">
        <article className="post-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
      </div></section>
      <Credentials />
      <Help wa={`Hello Blaze Global, I read "${p.title}" and would like to ask a question.`} chat={["Does this apply to my company?", "Send us your revenue and year end, and we will tell you what applies to your company."]} />
    </main>
  );
}
