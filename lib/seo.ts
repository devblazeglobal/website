import type { Metadata } from "next";

import { site } from "@/lib/site";

// Every page builds its metadata here: its own title and description, a
// canonical on www.blazeglobal.com.sg with no trailing slash (the form the
// Wix site used), and matching Open Graph tags.

export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: site.name, title, description, locale: "en_SG" },
    twitter: { card: "summary", title, description },
  };
}
