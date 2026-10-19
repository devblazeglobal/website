import type { NextConfig } from "next";

// URL policy for the Wix migration (docs/page-plan.md):
// - the 6 URLs in the Wix sitemap keep their exact paths;
// - Wix system pages that answered 200 with no content are redirected to
//   the nearest real page;
// - staging and preview builds are never indexable (robots.ts and the
//   X-Robots-Tag header below). On Vercel only NEXT_PUBLIC_SITE_ENV=production
//   is indexable; same rule as lib/indexable.ts.
const env = process.env.NEXT_PUBLIC_SITE_ENV;
const isProduction = process.env.VERCEL ? env === "production" : !env || env === "production";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/blog1", destination: "/blog", permanent: true },
      { source: "/post", destination: "/blog", permanent: true },
      { source: "/post-1", destination: "/blog", permanent: true },
      { source: "/search", destination: "/blog", permanent: true },
      { source: "/testimonials", destination: "/#reviews", permanent: true },
      { source: "/solutions", destination: "/services", permanent: false },
      { source: "/services/business-advisory", destination: "/services/tax/tax-advisory", permanent: true },
      { source: "/services/accounting/corporate-income-tax", destination: "/services/tax/corporate-income-tax", permanent: true },
      { source: "/services/accounting/tax-advisory", destination: "/services/tax/tax-advisory", permanent: true },
      { source: "/services/accounting/payroll", destination: "/services/payroll", permanent: true },
      { source: "/services/tax/fractional-cfo", destination: "/services/outsourced-cfo", permanent: true },
      { source: "/services/fractional-cfo", destination: "/services/outsourced-cfo", permanent: true },
      { source: "/services/corporate-secretarial/nominee-directorship", destination: "/services/nominee-directorship", permanent: true },
      { source: "/financial-compliance-calendar", destination: "/compliance-deadline-calculator", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
};

export default nextConfig;
