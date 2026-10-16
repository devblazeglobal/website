import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";

import { Reveal } from "@/components/interactive";
import { JsonLd } from "@/components/json-ld";
import { GetStarted, ReviewModal } from "@/components/modals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sprite } from "@/components/sprite";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

// Headings in Newsreader; body and captions in Helvetica (system).
const newsreader = Newsreader({ subsets: ["latin"], axes: ["opsz"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Blaze Global | Accounting and Corporate Secretarial in Singapore", template: "%s | Blaze Global" },
  applicationName: site.name,
};

export const viewport: Viewport = { themeColor: "#051038" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-SG" className={newsreader.variable}>
      <body>
        <Sprite />
        <JsonLd data={organizationSchema()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <GetStarted />
        <ReviewModal />
        <Reveal />
      </body>
    </html>
  );
}
