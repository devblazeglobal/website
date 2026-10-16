// Whether this deployment may be indexed by search engines.
// On Vercel, only a deployment with NEXT_PUBLIC_SITE_ENV=production is
// indexable, so the *.vercel.app staging site can never compete with the
// live blazeglobal.com.sg. Set that variable at DNS cutover. Local builds
// stay indexable so `pnpm check:seo` tests the production output.
// next.config.ts repeats this rule because it cannot import from lib/.
export function isIndexable() {
  const env = process.env.NEXT_PUBLIC_SITE_ENV;
  if (process.env.VERCEL) return env === "production";
  return !env || env === "production";
}
