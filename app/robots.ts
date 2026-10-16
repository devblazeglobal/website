import type { MetadataRoute } from "next";

import { isIndexable } from "@/lib/indexable";
import { site } from "@/lib/site";

// Production allows everything, as the old site did. Any other deployment
// (preview, staging, Vercel before DNS cutover) is kept out of the index so
// it can never compete with blazeglobal.com.sg for its own content.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
