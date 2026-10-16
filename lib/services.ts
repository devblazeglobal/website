// The three services, in the firm's own words from the Wix site
// (blazeglobal.com.sg/services, 15 Oct 2026). Copy edits awaiting the
// firm's approval are listed in docs/content-gaps.md.

export interface Service {
  slug: string;
  path: string;
  name: string;
  title: string;
  description: string;
  /** One line for cards, from the home page. */
  summary: string;
  /** Paragraphs for the service page, from the Services page. */
  body: string[];
  /** What the service covers, as stated in the body. */
  covers: string[];
  whatsappText: string;
}

export const services: Service[] = [
  {
    slug: "accounting",
    path: "/services/accounting",
    name: "Accounting",
    title: "Accounting Services in Singapore | Blaze Global",
    description:
      "Financial and management accounting for Singapore companies: monthly management reports, unaudited financial statements, XBRL, and ACRA and IRAS filing.",
    summary:
      "Bank accounts, credit cards, cash, we match them all as the information comes through so you have accurate information on hand at any given time.",
    body: [
      "Maintaining proper records in accordance with the Singapore Financial Reporting Standards (FRS) is a requirement for all Singapore incorporated companies.",
      "We provide the full spectrum of Financial and Management accounting services covering but not limited to, the preparation of monthly Management reports, unaudited financial statements, XBRL and filling requirements with ACRA and IRAS.",
    ],
    covers: ["Monthly management reports", "Unaudited financial statements", "XBRL", "ACRA and IRAS filing", "Bank, card and cash reconciliation"],
    whatsappText: "Hello Blaze Global, I would like to find out more about your accounting services.",
  },
  {
    slug: "business-advisory",
    path: "/services/business-advisory",
    name: "Business Advisory",
    title: "Business Advisory Services in Singapore | Blaze Global",
    description:
      "Financial analysis, tax planning and forecasting for Singapore businesses, plus business and key man insurance advice through partners.",
    summary:
      "We examine your financials to understand the sustainability of your business and identify potential tax saving opportunities.",
    body: [
      "We examine your financials to understand the sustainability of your business. We also strategise using smart tools to understand the implications of every choice you can make.",
      "Separately, we have partners who are able to provide you the business & key man insurances advices you need to protect your business.",
      "We are happy to assist in any other advisory work you may require.",
    ],
    covers: ["Financial analysis", "Tax saving opportunities", "Scenario planning", "Business and key man insurance, through partners"],
    whatsappText: "Hello Blaze Global, I would like to find out more about your business advisory services.",
  },
  {
    slug: "corporate-secretarial",
    path: "/services/corporate-secretarial",
    name: "Corporate Secretarial",
    title: "Corporate Secretarial Services in Singapore | Blaze Global",
    description:
      "Qualified company secretary, AGM documents, ACRA annual returns, company registers and company incorporation in Singapore.",
    summary:
      "The Singapore Companies Act mandates that every Singapore incorporated company is required to appoint at least one local company secretary.",
    body: [
      "The Singapore Companies Act mandates that every Singapore incorporated company is required to appoint at least one local company secretary.",
      "We are able to provide a qualified person as your company secretary, prepare Annual General Meeting (AGM) documents, file your annual returns to ACRA and safe keep and update your Company Registers.",
      "We are also able to assist with the incorporation of your company. We will walk you through the 5 different business structures and advice you according to your needs.",
    ],
    covers: ["Qualified company secretary", "AGM documents", "ACRA annual returns", "Company registers", "Company incorporation"],
    whatsappText: "Hello Blaze Global, I would like to find out more about your corporate secretarial services.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
