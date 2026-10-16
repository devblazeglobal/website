import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";

import { MobileCtaBar } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

// Brand guide display face; text is Helvetica (system).
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Blaze Global | Accounting, Business Advisory and Corporate Secretarial in Singapore", template: "%s | Blaze Global" },
  applicationName: site.name,
};

export const viewport: Viewport = { themeColor: "#051038" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-SG" className={newsreader.variable}>
      <body className="flex min-h-dvh flex-col pb-[72px] md:pb-0">
        <JsonLd data={organizationSchema()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
