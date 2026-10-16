import { MAIN_PAGES, SEGMENT_PAGES, SUB_PAGES } from "@/lib/content-data";

// Every service and solution page, with its URL and one-line description.
// The sitemap, structured data, llms.txt and redirects read from here.

export interface Entry { name: string; path: string; description: string }

export const mainPages: Entry[] = [
  { name: "Accounting", path: "/services/accounting", description: MAIN_PAGES.accounting.sub },
  { name: "Corporate Secretarial", path: "/services/corporate-secretarial", description: MAIN_PAGES["corporate-secretarial"].sub },
];

export const accountingPages: Entry[] = Object.values(SUB_PAGES).map((s) => ({ name: s.name, path: `/services/accounting/${s.slug}`, description: s.lede }));

export const solutionPages: Entry[] = Object.values(SEGMENT_PAGES).map((s) => ({ name: s.name, path: `/solutions/${s.slug}`, description: s.lede }));

export const guides: Entry[] = [
  { name: "Start a business in Singapore", path: "/start-a-business-in-singapore", description: "Register a company in Singapore with an ACRA Registered Filing Agent. Most companies are registered within 1 working day." },
  { name: "Compliance deadline calculator", path: "/compliance-deadline-calculator", description: "ECI, AGM, annual return and Form C-S dates from your financial year end." },
];

export const allServices = [...mainPages, ...accountingPages];
