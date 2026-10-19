import Link from "next/link";

import { CtaBand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog | Tax and Accounting Articles | Blaze Global",
  description: "Articles on tax, bookkeeping and running a company in Singapore, from Blaze Global.",
});

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const topic = (title: string) => (/tax/i.test(title) ? "Tax" : /book/i.test(title) ? "Accounting" : "Company");

export default function BlogIndex() {
  const [feat, ...rest] = getPosts();
  return (
    <main className="view" id="view-blog">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "Blaze Global blog", url: `${site.url}/blog`, publisher: { "@type": "Organization", name: site.legalName }, blogPost: getPosts().map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}${p.path}`, datePublished: p.publishedAt })) }} />
      <section className="bl-intro pull-under"><div className="wide">
        <h1>Blog</h1>
        <p className="bl-lede">Blaze Global writes about the work of running a company in Singapore: <Link href="/start-a-business-in-singapore">registering a company</Link>, <Link href="/services/accounting/bookkeeping">keeping the books</Link>, <Link href="/services/accounting/gst">GST</Link>, <Link href="/services/accounting/financial-statements-xbrl">XBRL and annual returns</Link> and <Link href="/services/tax/corporate-income-tax">corporate tax</Link>.</p>
      </div></section>
      {feat && (
        <section className="bl-sec"><div className="wide"><article className="bl-feat"><Link href={feat.path}>
          <span className="bl-img g0" aria-hidden="true"><b>{topic(feat.title)}</b></span>
          <span className="bl-ft"><span className="bl-meta">{topic(feat.title)} · {fmt(feat.publishedAt)}</span><h2>{feat.title}</h2><p>{feat.description}</p><span className="bl-more">Read the article ›</span></span>
        </Link></article></div></section>
      )}
      {rest.length > 0 && (
        <section className="bl-sec"><div className="wide">
          <div className="bl-bar"><p><b>Articles</b><span>, {rest.length} more</span></p></div>
          <ul className="bl-grid c3">{rest.map((p, i) => (
            <li key={p.slug}><article><Link href={p.path}>
              <span className={`bl-img g${(i + 1) % 4}`} aria-hidden="true"><b>{topic(p.title)}</b></span>
              <span className="bl-meta">{topic(p.title)} · {fmt(p.publishedAt)}</span><h3>{p.title}</h3><p>{p.description}</p>
            </Link></article></li>
          ))}</ul>
        </div></section>
      )}
      <CtaBand text="Questions about your company" wa="Hello Blaze Global, I have a question about my company." />
    </main>
  );
}
