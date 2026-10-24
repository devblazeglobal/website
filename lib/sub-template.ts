// Sub-page copy for the juliusbaer.com-style template (24 Oct 2026):
// introduction, requirements, how we work and questions, per sub page.
// "What's included" stays in TILES (lib/content-data.ts).
import type { Pair } from "@/lib/content-data";

export interface SubTemplate {
  intro: [string, string];
  req: { h: string; rows: Pair[] };
  steps: [string, string][];
  faq: Pair[];
}

export const SUB_TEMPLATE: Record<string, SubTemplate> = {
  bookkeeping: {
    intro: [
      "Accurate bookkeeping is the foundation of every other service. When your transactions are reconciled each week, the monthly report, the GST return and the year-end statements all come from the same figures, without rework.",
      "We connect every bank account and card to Xero. A Chartered Accountant matches each transaction to its invoice, bill or receipt, and any unclear items reach you as one short list on WhatsApp, so you can stay focused on running the business.",
    ],
    req: { h: "What the law requires", rows: [
      ["Accounting records", "Kept for at least 5 years"],
      ["Supporting documents", "Receipts and invoices kept with the records"],
      ["Records that explain the accounts", "Sufficient to prepare true and fair financial statements"],
      ["GST-registered companies", "Quarterly F5 return, 1 month after each quarter"],
    ] },
    steps: [
      ["Message us", "Send us your bank statements and latest accounts on WhatsApp."],
      ["Connect Xero", "We connect your bank feeds and cards, and catch up on past months."],
      ["Reconcile weekly", "Transactions matched every week, with any questions sent as one list."],
    ],
    faq: [
      ["Which software do you use?", "Xero, with bank feeds and Aspire connected."],
      ["Can you catch up on past months?", "Yes. We start from your last reconciled month and bring the books up to date from there."],
      ["How long must records be kept?", "At least 5 years. Records kept on Xero, with receipts attached, meet this requirement."],
    ],
  },
  "management-reports": {
    intro: [
      "Management reports show how your business performed last month while there is still time to act. Your profit and loss, balance sheet and cash flow arrive in the first week of the following month.",
      "Each report compares the month with the one before and highlights the variances that matter, alongside a rolling 12-month cash forecast built from receivables, bills and payroll, helping you make better-informed decisions.",
    ],
    req: { h: "What you receive each month", rows: [
      ["Monthly close", "First week of the following month"],
      ["Statements", "Profit and loss, balance sheet and cash flow"],
      ["Comparison", "Month on month, with a variance list"],
      ["Cash forecast", "Rolling 12 months"],
      ["Basis", "SFRS, the same as your year-end statements"],
    ] },
    steps: [
      ["Agree the format", "We agree the figures and layout your board or lender needs."],
      ["Close the month", "Books reconciled and closed in the first week."],
      ["Review the report", "Your report is sent, with a call to walk through it if you would like one."],
    ],
    faq: [
      ["When do I get the report?", "In the first week of the following month."],
      ["Can the report go to my board or bank?", "Yes. It is laid out in a board-ready format."],
      ["Is a cash forecast included?", "Yes. A rolling 12-month forecast built from receivables, bills and payroll."],
    ],
  },
  "financial-statements-xbrl": {
    intro: [
      "Every Singapore company prepares financial statements each year, lays them before its members and files them with ACRA in XBRL with the annual return.",
      "We prepare unaudited statements to SFRS from your books, check whether your company is exempt from audit, convert them to XBRL and file them as your ACRA Registered Filing Agent, so your statutory obligations are met with confidence.",
    ],
    req: { h: "What ACRA requires", rows: [
      ["Financial statements to members", "Within 5 months of the financial year end"],
      ["Annual General Meeting", "Within 6 months of the financial year end"],
      ["Annual return with XBRL", "Within 7 months of the financial year end"],
      ["Audit exemption", "Small company: 2 of 3 of revenue up to S$10 million, assets up to S$10 million, up to 50 employees"],
    ] },
    steps: [
      ["Close the year", "Books reconciled to the financial year end."],
      ["Prepare and sign", "Statements and the directors' statement prepared for signing online."],
      ["File with ACRA", "XBRL lodged with the annual return before the deadline."],
    ],
    faq: [
      ["Does my company need an audit?", "Not if it qualifies as a small company: 2 of 3 of revenue up to S$10 million, assets up to S$10 million and up to 50 employees."],
      ["What is XBRL?", "The data format ACRA requires for financial statements filed with the annual return."],
      ["Who signs the statements?", "Your directors. We prepare the directors' statement for signing online."],
    ],
  },
  gst: {
    intro: [
      "A company must register for GST once its taxable turnover passes S$1 million in 12 months, or is expected to. From then on, a return is due every quarter.",
      "We check whether you need to register, apply on your behalf and prepare each F5 return from reconciled books, with every line coded standard-rated, zero-rated or exempt, so each return is accurate and on time.",
    ],
    req: { h: "What IRAS requires", rows: [
      ["Registration", "Within 30 days of becoming liable"],
      ["Threshold", "Taxable turnover above S$1 million in 12 months"],
      ["F5 return and payment", "1 month after each quarter end"],
      ["GST rate", "9%"],
      ["Late filing", "S$200 penalty for each month late, up to S$10,000"],
    ] },
    steps: [
      ["Check registration", "We review your turnover against the S$1 million threshold."],
      ["Register", "We file the application with IRAS and set up tax codes on Xero."],
      ["File every quarter", "Each F5 prepared from the books and filed before the deadline."],
    ],
    faq: [
      ["When must we register?", "When taxable turnover passes S$1 million in 12 months, or is expected to in the next 12 months."],
      ["Can we register voluntarily?", "Yes. It lets you claim input tax, and you must stay registered for at least 2 years."],
      ["What if a return is late?", "IRAS charges S$200 for each month late, up to S$10,000, and may estimate the tax due."],
    ],
  },
  "corporate-income-tax": {
    intro: [
      "Every Singapore company files its Estimated Chargeable Income within 3 months of its year end and a tax return by 30 November each year.",
      "We compute your tax from the accounts, apply the exemptions and capital allowances you qualify for, choose the right form and file it with IRAS. Any queries from IRAS come to us, so you can focus on the business.",
    ],
    req: { h: "What IRAS requires", rows: [
      ["Estimated Chargeable Income", "Within 3 months of the financial year end"],
      ["ECI waiver", "Revenue up to S$5 million and ECI of nil"],
      ["Form C-S", "Revenue up to S$5 million"],
      ["Form C-S (Lite)", "Revenue up to S$200,000"],
      ["Tax return", "By 30 November each year"],
      ["Corporate tax rate", "17%"],
    ] },
    steps: [
      ["Share the accounts", "Send us your year-end accounts, or we use the books we keep for you."],
      ["Compute the tax", "Exemptions, allowances and non-deductible items applied."],
      ["File with IRAS", "ECI and the tax return filed before each deadline."],
    ],
    faq: [
      ["Which form do we file?", "Form C-S (Lite) for revenue up to S$200,000, Form C-S up to S$5 million and Form C above that."],
      ["Do we need to file ECI?", "Not if your revenue is S$5 million or below and your ECI is nil."],
      ["What exemptions apply?", "New companies may claim the start-up exemption for their first 3 years; other companies claim the partial exemption."],
    ],
  },
  "tax-advisory": {
    intro: [
      "Tax planning works best before the year ends, while there is still time to act. Advice grounded in reconciled figures shows the real effect of each decision.",
      "We model scenarios on your own numbers, from director remuneration to group relief, and maintain a 12-month cash forecast so tax payments are planned for well in advance.",
    ],
    req: { h: "Singapore tax at a glance", rows: [
      ["Corporate tax rate", "17%"],
      ["Partial tax exemption", "75% of the first S$10,000, 50% of the next S$190,000"],
      ["Start-up tax exemption", "75% of the first S$100,000, 50% of the next S$100,000, for 3 years"],
      ["Group relief", "Unused losses transferred between qualifying Singapore companies"],
    ] },
    steps: [
      ["Review the numbers", "We start from your reconciled books and the year's forecast."],
      ["Model the options", "Scenarios compared on both tax and cash."],
      ["Decide and act", "Clear advice in writing, actioned before year end."],
    ],
    faq: [
      ["When should planning start?", "Before the financial year ends, while there is still time to act."],
      ["Is the advice based on our real numbers?", "Yes. Every model is built from your reconciled books."],
      ["Do you advise groups?", "Yes, including group relief between Singapore companies."],
    ],
  },
};
