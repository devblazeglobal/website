// The eight products in three groups, in menu order. Navigation, home, footer,
// the services index and Get started all read from here.
export type Group = "set-up" | "finance" | "scale";
export interface ProductEntry { key: string; group: Group; name: string; href: string; line: string; services: [string, string][] }

export const GROUPS: { key: Group; name: string; line: string }[] = [
  { key: "set-up", name: "Set Up", line: "Register and set up the company" },
  { key: "finance", name: "Finance", line: "Books, tax and payroll, every month" },
  { key: "scale", name: "Scale", line: "CFO and automation" },
];

export const PRODUCTS: ProductEntry[] = [
  { key: "incorporation", group: "set-up", name: "Incorporation", href: "/start-a-business-in-singapore", line: "Company registered on Bizfile by an ACRA Registered Filing Agent.",
    services: [["Business structure", ""], ["Name application", ""], ["Registration on Bizfile", ""], ["Bank account documents", ""]] },
  { key: "corporate-secretarial", group: "set-up", name: "Corporate Secretarial", href: "/services/corporate-secretarial", line: "A company secretary and every ACRA filing on time.",
    services: [["Company secretary", ""], ["AGMs and resolutions", ""], ["Annual returns", ""], ["Company changes", ""]] },
  { key: "nominee-directorship", group: "set-up", name: "Nominee Directorship", href: "/services/nominee-directorship", line: "A locally resident director, as ACRA requires.",
    services: [["Resident director", ""], ["Due diligence", ""], ["ACRA filing", ""], ["Change of director", ""]] },
  { key: "accounting", group: "finance", name: "Accounting", href: "/services/accounting", line: "Books on Xero, monthly reports, statements filed with ACRA.",
    services: [["Bookkeeping", "/services/accounting/bookkeeping"], ["Management reports", "/services/accounting/management-reports"], ["Financial statements and XBRL", "/services/accounting/financial-statements-xbrl"], ["GST", "/services/accounting/gst"]] },
  { key: "tax", group: "finance", name: "Tax", href: "/services/tax", line: "Corporate tax filed with IRAS, planned before year end.",
    services: [["Corporate income tax", "/services/tax/corporate-income-tax"], ["Tax advisory and forecasting", "/services/tax/tax-advisory"], ["Compliance deadline calculator", "/compliance-deadline-calculator"], ["Exemptions applied", ""]] },
  { key: "payroll", group: "finance", name: "Payroll", href: "/services/payroll", line: "Salaries, CPF, SHG and IR8A, every month.",
    services: [["Payroll and payslips", ""], ["CPF and SDL", ""], ["SHG contributions", ""], ["IR8A", ""]] },
  { key: "outsourced-cfo", group: "scale", name: "Outsourced CFO", href: "/services/outsourced-cfo", line: "A CFO for your numbers, without a full-time hire.",
    services: [["Financial models", ""], ["Cash flow visibility", ""], ["Budgets and forecasts", ""], ["Process streamlining", ""]] },
  { key: "digitalisation-automation", group: "scale", name: "Digitalisation, Automation and Dashboarding", href: "/services/digitalisation-automation", line: "Less manual work and live figures, on the systems you already use.",
    services: [["Process improvement", ""], ["AI automation", ""], ["Dashboards", ""], ["Systems integration", ""]] },
];
export const inGroup = (g: Group) => PRODUCTS.filter((p) => p.group === g);
