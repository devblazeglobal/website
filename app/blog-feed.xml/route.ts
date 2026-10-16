import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

// Kept at the Wix feed address so existing subscribers and aggregators
// keep working.
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><description>${esc(p.description)}</description><link>${site.url}${p.path}</link><guid>${site.url}${p.path}</guid><pubDate>${new Date(`${p.publishedAt}T00:00:00Z`).toUTCString()}</pubDate></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name}</title><link>${site.url}/blog</link><description>${site.name} blog</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
