import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Production allows everything, as the old site did. Any other deployment
// (preview, staging) sets NEXT_PUBLIC_SITE_ENV and is kept out of the
// index so it can never compete with blazeglobal.com.sg for its own content.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV && process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
