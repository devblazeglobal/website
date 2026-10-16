import { getPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

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
  return [
    { path: "/", changeFrequency: "monthly", priority: 1, legacy: true },
    { path: "/about-us", changeFrequency: "yearly", priority: 0.7, legacy: true },
    { path: "/services", changeFrequency: "monthly", priority: 0.9, legacy: true },
    ...services.map((s) => ({ path: s.path, changeFrequency: "monthly" as const, priority: 0.9, legacy: false })),
    ...solutions.map((s) => ({ path: s.path, changeFrequency: "monthly" as const, priority: 0.8, legacy: false })),
    { path: "/blog", changeFrequency: "weekly", priority: 0.6, legacy: true },
    ...getPosts().map((p) => ({ path: p.path, changeFrequency: "yearly" as const, priority: 0.5, legacy: true })),
    { path: "/contact", changeFrequency: "yearly", priority: 0.7, legacy: false },
  ];
}
