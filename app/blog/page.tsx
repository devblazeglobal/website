import Link from "next/link";

import { PageHeader, Section } from "@/components/page-blocks";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog | Tax and Accounting Articles | Blaze Global",
  description: "Articles on tax, bookkeeping and running a company in Singapore, from Blaze Global.",
});

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} title="Blog" />
      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={p.path} className="group block py-md">
                <p className="text-sm text-muted">{fmt(p.publishedAt)}</p>
                <h2 className="display-md mt-xs !text-[1.75rem] group-hover:underline">{p.title}</h2>
                <p className="mt-xs max-w-[675px] text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
