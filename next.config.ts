import type { NextConfig } from "next";

// URL policy for the Wix migration (docs/page-plan.md):
// - the 6 URLs in the Wix sitemap keep their exact paths;
// - Wix system pages that answered 200 with no content are redirected to
//   the nearest real page;
// - staging and preview builds are never indexable (robots.ts and the
//   X-Robots-Tag header below).
const isProduction = !process.env.NEXT_PUBLIC_SITE_ENV || process.env.NEXT_PUBLIC_SITE_ENV === "production";

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
      { source: "/testimonials", destination: "/#testimonials", permanent: true },
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
