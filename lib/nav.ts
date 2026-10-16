// The two navigation tabs (rillet.com): Products by service line,
// Solutions by company size. The header, the mobile menu and the footer
// all read from here.
import { solutions } from "@/lib/solutions";

export interface NavItem {
  href: string;
  name: string;
  text: string;
  /** SVG path data, 24×24, stroked. */
  icon: string;
}

export const products: { name: string; href: string; items: NavItem[] }[] = [
  {
    name: "Accounting",
    href: "/services/accounting",
    items: [
      { href: "/services/accounting", name: "Bookkeeping", text: "Bank, card and cash records matched as they come in", icon: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
      { href: "/services/accounting", name: "Management reports", text: "Monthly reports for decisions", icon: "M5 3h10l4 4v14H5zM9 12h6M9 16h6M9 8h3" },
      { href: "/services/accounting", name: "Financial statements and XBRL", text: "Unaudited statements, XBRL, ACRA and IRAS filing", icon: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 9h18M9 9v11" },
    ],
  },
  {
    name: "Corporate Secretarial",
    href: "/services/corporate-secretarial",
    items: [
      { href: "/services/corporate-secretarial", name: "Company secretary", text: "A qualified person appointed for your company", icon: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21c1-4 4-6 8-6s7 2 8 6" },
      { href: "/services/corporate-secretarial", name: "AGM and annual returns", text: "AGM documents and ACRA annual returns", icon: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4" },
      { href: "/services/corporate-secretarial", name: "Incorporation", text: "The 5 business structures, explained and registered", icon: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" },
    ],
  },
  {
    name: "Business Advisory",
    href: "/services/business-advisory",
    items: [
      { href: "/services/business-advisory", name: "Tax advisory", text: "Tax saving opportunities from your financials", icon: "M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" },
      { href: "/services/business-advisory", name: "Analysis and forecasting", text: "The sustainability of your business, modelled", icon: "M3 17l6-6 4 4 8-8M15 7h6v6" },
      { href: "/services/business-advisory", name: "Business and key man insurance", text: "Through partners", icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" },
    ],
  },
];

const SOLUTION_ICONS: Record<string, string> = {
  startups: "M5 19c0-4 2-9 7-14 5 5 7 10 7 14M9 19h6M12 13v6",
  smes: "M8 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM16 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM2 20c.6-3 3-5 6-5s5.4 2 6 5M12 20c.6-3 3-5 6-5",
  "large-companies": "M3 21h18M5 21V5h8v16M13 9h6v12M8 9h2M8 13h2M8 17h2M16 13h1M16 17h1",
};

export const solutionItems: NavItem[] = solutions.map((s) => ({ href: s.path, name: s.name, text: s.short, icon: SOLUTION_ICONS[s.slug] }));
