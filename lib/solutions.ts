// Solutions by company size (rillet.com wayfinding). Each has its own page
// at /solutions/<slug> and a card on the home page. Copy is drawn from the
// firm's Wix pages; edits awaiting approval are in docs/content-gaps.md.

export interface Solution {
  slug: string;
  path: string;
  name: string;
  /** Nav and card line. */
  short: string;
  card: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  needsHeading: string;
  needs: { title: string; text: string }[];
  services: { name: string; group: string; href: string }[];
  ctaLine: string;
  whatsappText: string;
  /** Illustrative screen on the home card. */
  screen: { title: string; rows: { label: string; status: string; tone: "done" | "next" | "todo" }[] };
}

export const solutions: Solution[] = [
  {
    slug: "startups",
    path: "/solutions/startups",
    name: "Start-ups",
    short: "Incorporating, first books, first filings",
    card: "Incorporation, a company secretary from day one, and books set up on Xero.",
    title: "Accounting for Start-ups in Singapore | Blaze Global",
    description: "Company incorporation, a qualified company secretary and books on Xero for new Singapore companies. Chartered Accountants, ACRA Registered Filing Agent.",
    h1: "Accounting for start-ups in Singapore",
    lead: "From choosing a business structure to your first annual filing. We walk you through the 5 business structures and advise you according to your needs.",
    needsHeading: "What a new company needs",
    needs: [
      { title: "Choose a business structure", text: "Sole proprietorship, partnership, LLP or private limited. We explain each and recommend one." },
      { title: "Incorporate the company", text: "Registration with ACRA, company constitution and the first directors' resolutions." },
      { title: "Appoint a company secretary", text: "Required within 6 months of incorporation. We provide a qualified person." },
      { title: "Set up the books", text: "Bank, card and cash records on Xero, matched as they come in." },
      { title: "Plan the first financial year", text: "Tax treatment for newly incorporated companies, GST registration if required, and the first annual return." },
    ],
    services: [
      { name: "Incorporation", group: "Corporate Secretarial", href: "/services/corporate-secretarial" },
      { name: "Company secretary", group: "Corporate Secretarial", href: "/services/corporate-secretarial" },
      { name: "Bookkeeping", group: "Accounting", href: "/services/accounting" },
    ],
    ctaLine: "Starting a company in Singapore",
    whatsappText: "Hello Blaze Global, I am starting a company and would like help.",
    screen: {
      title: "Getting started",
      rows: [
        { label: "Business structure chosen", status: "Done", tone: "done" },
        { label: "Company registered with ACRA", status: "Done", tone: "done" },
        { label: "Company secretary appointed", status: "Within 6 months", tone: "next" },
        { label: "Books set up on Xero", status: "Next", tone: "todo" },
        { label: "First financial year planned", status: "Next", tone: "todo" },
      ],
    },
  },
  {
    slug: "smes",
    path: "/solutions/smes",
    name: "SMEs",
    short: "Monthly books, GST, annual compliance",
    card: "Monthly bookkeeping, management reports, GST and annual filings with ACRA and IRAS.",
    title: "Accounting for SMEs in Singapore | Blaze Global",
    description: "Monthly bookkeeping, management reports, GST, AGM, annual returns, financial statements and XBRL for Singapore SMEs.",
    h1: "Accounting for SMEs in Singapore",
    lead: "Accurate books every month and every filing on time, so you can focus on running the business.",
    needsHeading: "What an established company needs",
    needs: [
      { title: "Monthly bookkeeping", text: "Bank accounts, credit cards and cash matched as the information comes through." },
      { title: "Management reports", text: "Monthly reports prepared in accordance with the Singapore Financial Reporting Standards." },
      { title: "GST", text: "GST registration and GST returns filed with IRAS." },
      { title: "AGM and annual return", text: "AGM documents prepared and the annual return filed with ACRA." },
      { title: "Financial statements, XBRL and tax", text: "Unaudited financial statements, XBRL, and filing with ACRA and IRAS." },
    ],
    services: [
      { name: "Bookkeeping and reports", group: "Accounting", href: "/services/accounting" },
      { name: "AGM and annual returns", group: "Corporate Secretarial", href: "/services/corporate-secretarial" },
      { name: "Tax advisory", group: "Business Advisory", href: "/services/business-advisory" },
    ],
    ctaLine: "Accounting for your business",
    whatsappText: "Hello Blaze Global, I run an SME and would like help with accounting.",
    screen: {
      title: "Monthly close",
      rows: [
        { label: "Bank and card reconciliation", status: "Done", tone: "done" },
        { label: "Management report", status: "Ready", tone: "done" },
        { label: "GST return", status: "Due", tone: "next" },
        { label: "AGM and annual return", status: "Scheduled", tone: "todo" },
        { label: "Financial statements and XBRL", status: "Scheduled", tone: "todo" },
      ],
    },
  },
  {
    slug: "large-companies",
    path: "/solutions/large-companies",
    name: "Large companies",
    short: "Reporting, forecasting, tax advisory",
    card: "Management reporting, forecasting and tax advisory for established and multinational businesses.",
    title: "Accounting and Advisory for Large Companies in Singapore | Blaze Global",
    description: "Management reporting, financial analysis, forecasting, tax advisory and corporate secretarial for established and multinational companies in Singapore.",
    h1: "Accounting and advisory for large companies",
    lead: "Our team has exposure to high-growth start-ups working towards IPO and to established MNCs across varying industries.",
    needsHeading: "What a larger company needs",
    needs: [
      { title: "Management reporting", text: "Monthly management reports across the company's entities." },
      { title: "Financial analysis and forecasting", text: "We examine your financials and model the implications of each choice." },
      { title: "Tax advisory", text: "Tax saving opportunities identified from your financials." },
      { title: "Corporate secretarial", text: "Company secretary, registers, AGM documents and annual returns for each Singapore entity." },
      { title: "Business and key man insurance", text: "Advice through our partners to protect the business." },
    ],
    services: [
      { name: "Analysis and forecasting", group: "Business Advisory", href: "/services/business-advisory" },
      { name: "Management reports", group: "Accounting", href: "/services/accounting" },
      { name: "Company secretary", group: "Corporate Secretarial", href: "/services/corporate-secretarial" },
    ],
    ctaLine: "Accounting and advisory at scale",
    whatsappText: "Hello Blaze Global, I would like to discuss accounting and advisory for a larger company.",
    screen: {
      title: "Group reporting",
      rows: [
        { label: "Holding company", status: "Closed", tone: "done" },
        { label: "Operating company", status: "Closed", tone: "done" },
        { label: "Regional subsidiary", status: "In review", tone: "next" },
        { label: "Forecast update", status: "Next", tone: "todo" },
        { label: "Tax advisory review", status: "Next", tone: "todo" },
      ],
    },
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
