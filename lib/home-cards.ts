// The two card rails on the home page: by company and by product. Each
// card opens its own page. The screens are illustrations, not client data.
import type { RailCard } from "@/components/home/card-rail";
import { solutions } from "@/lib/solutions";

export const companyCards: RailCard[] = solutions.map((s) => ({
  key: s.slug,
  name: s.name,
  text: s.card,
  cta: `Blaze for ${s.name === "SMEs" ? "SMEs" : s.name.toLowerCase()}`,
  href: s.path,
  screen: s.screen,
}));

export const productCards: RailCard[] = [
  {
    key: "accounting",
    name: "Accounting",
    text: "Bookkeeping, monthly management reports, unaudited financial statements and XBRL.",
    cta: "Accounting services",
    href: "/services/accounting",
    screen: {
      title: "Year-end close",
      rows: [
        { label: "Bank, card and cash reconciled", status: "Done", tone: "done" },
        { label: "Management report", status: "Ready", tone: "done" },
        { label: "Unaudited financial statements", status: "In review", tone: "next" },
        { label: "XBRL", status: "Next", tone: "todo" },
        { label: "Filed with ACRA and IRAS", status: "Next", tone: "todo" },
      ],
    },
  },
  {
    key: "corporate-secretarial",
    name: "Corporate Secretarial",
    text: "A qualified company secretary, AGM documents, annual returns and company registers.",
    cta: "Corporate secretarial services",
    href: "/services/corporate-secretarial",
    screen: {
      title: "Annual compliance",
      rows: [
        { label: "Company secretary appointed", status: "Done", tone: "done" },
        { label: "Company registers updated", status: "Done", tone: "done" },
        { label: "AGM documents", status: "Ready", tone: "next" },
        { label: "Annual return filed with ACRA", status: "Scheduled", tone: "todo" },
        { label: "Directors' resolutions", status: "Scheduled", tone: "todo" },
      ],
    },
  },
  {
    key: "business-advisory",
    name: "Business Advisory",
    text: "Financial analysis, forecasting and tax planning, with insurance advice through partners.",
    cta: "Business advisory services",
    href: "/services/business-advisory",
    screen: {
      title: "Advisory review",
      rows: [
        { label: "Financial analysis", status: "Done", tone: "done" },
        { label: "Cash forecast, 12 months", status: "Done", tone: "done" },
        { label: "Tax saving opportunities", status: "In review", tone: "next" },
        { label: "Scenario planning", status: "Next", tone: "todo" },
        { label: "Key man insurance", status: "Next", tone: "todo" },
      ],
    },
  },
];
