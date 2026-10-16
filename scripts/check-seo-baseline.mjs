#!/usr/bin/env node
// Migration guard. Run against a built site (`pnpm build && pnpm start`):
//
//   node scripts/check-seo-baseline.mjs [baseUrl]
//
// For every URL the old Wix site (blazeglobal.com.sg) had indexed (docs/seo-baseline/
// inventory.json) it checks that the new site either serves it with 200 or
// permanently redirects it to a page that does; that the page has a title,
// a meta description and a canonical pointing at itself on www.blazeglobal.com.sg;
// and that it is listed in /sitemap.xml. It also checks every URL in the
// new sitemap the same way. Exits 1 on any failure, so CI blocks a deploy
// that would drop a ranked page.
import { readFileSync } from "node:fs";

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PROD = "https://www.blazeglobal.com.sg";
const inventory = JSON.parse(readFileSync(new URL("../docs/seo-baseline/inventory.json", import.meta.url), "utf8"));

const failures = [];
const fail = (url, why) => failures.push(`${url}  —  ${why}`);
const pathOf = (u) => new URL(u).pathname.replace(/\/$/, "") || "/";

async function fetchPage(path, hops = 0) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  if ([301, 308].includes(res.status) && hops < 3) {
    const loc = res.headers.get("location");
    const next = loc.startsWith("http") ? loc : `${BASE}${loc}`;
    if (!next.startsWith(BASE) && !next.startsWith(PROD)) return { status: res.status, external: next, path };
    return fetchPage(pathOf(next.replace(PROD, BASE)), hops + 1);
  }
  return { status: res.status, html: await res.text(), path };
}

function checkHtml(original, page) {
  const title = /<title>([^<]*)<\/title>/.exec(page.html)?.[1]?.trim();
  const desc = /<meta name="description" content="([^"]*)"/.exec(page.html)?.[1]?.trim();
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(page.html)?.[1];
  const h1 = /<h1[^>]*>/.test(page.html);
  if (!title) fail(original, "no <title>");
  if (!desc) fail(original, "no meta description");
  if (!h1) fail(original, "no <h1>");
  const want = `${PROD}${page.path === "/" ? "" : page.path}`;
  if (canonical !== want) fail(original, `canonical is ${canonical ?? "missing"}, expected ${want}`);
}

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemap = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

let legacyOk = 0;
for (const row of inventory) {
  const path = pathOf(row.url);
  const page = await fetchPage(path);
  if (page.external) {
    fail(row.url, `redirects off-site to ${page.external}`);
    continue;
  }
  if (page.status !== 200) {
    fail(row.url, `HTTP ${page.status}`);
    continue;
  }
  checkHtml(row.url, page);
  const finalUrl = `${PROD}${page.path === "/" ? "" : page.path}`;
  if (!sitemap.has(finalUrl)) fail(row.url, `${finalUrl} is not in sitemap.xml`);
  legacyOk++;
}

for (const url of sitemap) {
  const page = await fetchPage(pathOf(url));
  if (page.status !== 200) fail(url, `sitemap URL returns HTTP ${page.status}`);
  else checkHtml(url, page);
}

for (const path of ["/robots.txt", "/llms.txt"]) {
  const res = await fetch(`${BASE}${path}`);
  if (res.status !== 200) fail(path, `HTTP ${res.status}`);
}

console.log(`Legacy URLs answering: ${legacyOk}/${inventory.length}. Sitemap URLs: ${sitemap.size}.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log("SEO baseline intact.");
