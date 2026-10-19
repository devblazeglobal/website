import type { Product } from "@/lib/content-data";

// The six products, in menu order. Navigation, home, footer, the services
// index and Get started all read from here.
export interface ProductEntry { key: Product; name: string; href: string; line: string; services: [string, string][] }

export const PRODUCTS: ProductEntry[] = [
  { key: "accounting", name: "Accounting", href: "/services/accounting", line: "Books, reports, statements and GST, filed with ACRA and IRAS.",
    services: [["Bookkeeping", "/services/accounting/bookkeeping"], ["Management reports", "/services/accounting/management-reports"], ["Financial statements and XBRL", "/services/accounting/financial-statements-xbrl"], ["GST", "/services/accounting/gst"]] },
  { key: "tax", name: "Tax", href: "/services/tax", line: "Corporate tax filed with IRAS, and planning before year end.",
    services: [["Corporate income tax", "/services/tax/corporate-income-tax"], ["Tax advisory and forecasting", "/services/tax/tax-advisory"], ["Compliance deadline calculator", "/compliance-deadline-calculator"]] },
  { key: "corporate-secretarial", name: "Corporate Secretarial", href: "/services/corporate-secretarial", line: "A company secretary and every ACRA filing on time.",
    services: [["Incorporation", "/start-a-business-in-singapore"], ["Company secretary", "/services/corporate-secretarial"], ["AGMs and annual returns", "/services/corporate-secretarial"], ["Company changes", "/services/corporate-secretarial"]] },
  { key: "payroll", name: "Payroll", href: "/services/payroll", line: "Salaries, CPF and IR8A, prepared and filed every month.",
    services: [["Payroll and payslips", "/services/payroll"], ["CPF and SDL", "/services/payroll"], ["IR8A", "/services/payroll"], ["New hires and leavers", "/services/payroll"]] },
  { key: "fractional-cfo", name: "Fractional CFO", href: "/services/fractional-cfo", line: "Budgets, forecasts and board reporting, part-time.",
    services: [["Budgets", "/services/fractional-cfo"], ["Cash forecasts", "/services/fractional-cfo"], ["Board reporting", "/services/fractional-cfo"], ["Funding preparation", "/services/fractional-cfo"]] },
  { key: "nominee-directorship", name: "Nominee Directorship", href: "/services/nominee-directorship", line: "A locally resident director, as ACRA requires.",
    services: [["Resident director", "/services/nominee-directorship"], ["Due diligence", "/services/nominee-directorship"], ["ACRA filing", "/services/nominee-directorship"], ["Change of director", "/services/nominee-directorship"]] },
];
export const productBy = (k: Product) => PRODUCTS.find((p) => p.key === k)!;
