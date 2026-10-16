import { getPosts } from "@/lib/blog";
import { accountingPages, guides, mainPages, solutionPages } from "@/lib/catalog";

// Every public URL, in one list. The sitemap is generated from it, and
// scripts/check-seo-baseline.mjs fails if any URL the Wix site had
// indexed (docs/seo-baseline/inventory.json) is neither served nor
// redirected.

export interface PublicRoute {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /** True for the 6 URLs in the Wix sitemap on 15 Oct 2026. */
  legacy: boolean;
}

export function publicRoutes(): PublicRoute[] {
  const m = (path: string, priority: number, legacy = false): PublicRoute => ({ path, changeFrequency: "monthly", priority, legacy });
  return [
    m("/", 1, true),
    { path: "/about-us", changeFrequency: "yearly", priority: 0.7, legacy: true },
    m("/services", 0.9, true),
    ...mainPages.map((p) => m(p.path, 0.9)),
    ...accountingPages.map((p) => m(p.path, 0.8)),
    ...solutionPages.map((p) => m(p.path, 0.8)),
    ...guides.map((p) => m(p.path, 0.9)),
    { path: "/blog", changeFrequency: "weekly", priority: 0.6, legacy: true },
    ...getPosts().map((p) => ({ path: p.path, changeFrequency: "yearly" as const, priority: 0.5, legacy: true })),
    { path: "/contact", changeFrequency: "yearly", priority: 0.7, legacy: false },
  ];
}
