import { MAIN_PAGES, SEGMENT_PAGES, SUB_PAGES } from "@/lib/content-data";

// Every service and solution page, with its URL and one-line description.
// The sitemap, structured data, llms.txt and redirects read from here.

export interface Entry { name: string; path: string; description: string }

export const mainPages: Entry[] = [
  { name: "Accounting", path: "/services/accounting", description: MAIN_PAGES.accounting.sub },
  { name: "Tax", path: "/services/tax", description: MAIN_PAGES.tax.sub },
  { name: "Corporate Secretarial", path: "/services/corporate-secretarial", description: MAIN_PAGES["corporate-secretarial"].sub },
  { name: "Payroll", path: "/services/payroll", description: MAIN_PAGES.payroll.sub },
  { name: "Outsourced CFO", path: "/services/outsourced-cfo", description: MAIN_PAGES["outsourced-cfo"].sub },
  { name: "Nominee Directorship", path: "/services/nominee-directorship", description: MAIN_PAGES["nominee-directorship"].sub },
  { name: "Digitalisation, Automation and Dashboarding", path: "/services/digitalisation-automation", description: MAIN_PAGES["digitalisation-automation"].sub },
];

// Sub pages of all three service lines: /services/{accounting|tax|corporate-secretarial}/{slug}.
export const accountingPages: Entry[] = Object.values(SUB_PAGES).map((s) => ({ name: s.name, path: `/services/${s.par}/${s.slug}`, description: s.lede }));

export const solutionPages: Entry[] = Object.values(SEGMENT_PAGES).map((s) => ({ name: s.name, path: `/solutions/${s.slug}`, description: s.lede }));

export const guides: Entry[] = [
  { name: "Start a business in Singapore", path: "/start-a-business-in-singapore", description: "Register a company in Singapore with an ACRA Registered Filing Agent." },
  { name: "Compliance deadline calculator", path: "/compliance-deadline-calculator", description: "ECI, AGM, annual return, IR8A and corporate tax dates from your financial year end." },
];

export const allServices = [...mainPages, ...accountingPages];
