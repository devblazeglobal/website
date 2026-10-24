// Product-page template copy (24 Oct 2026): legora.com/product/word-add-in
// order in the juliusbaer.com look. Headline, lede, cards, requirements,
// steps and questions come from MAIN_PAGES; this file holds the parts the
// template adds. Figures in panels are examples and say so.
import type { Pair } from "@/lib/content-data";

/** A document-style panel: title, meta, rows [label, value, tone], footnote. */
export type DocPanel = [title: string, meta: string, rows: [string, string, "" | "ok" | "gd" | "tot"][], foot: string];

export interface ProductTemplate {
  hue: [c1: string, c2: string, c3: string, glow: string];
  hero: DocPanel;
  statement: string;
  features: { h: string; sub: string; items: [title: string, text: string, panel: DocPanel][] };
  cardsHeading: string;
  req?: { h: string; rows: Pair[] };
  steps?: [string, string][];
  cta: [heading: string, line: string];
}

export const PRODUCT_TEMPLATE: Record<string, ProductTemplate> = {
  accounting: {
    hue: ["#3f63b8", "#7ea1de", "#c3d4f0", "rgba(243,214,189,.75)"],
    hero: ["Month-end close · October", "Example Pte Ltd", [["Bank and cards reconciled", "Done", "ok"], ["Bills and invoices posted", "Done", "ok"], ["GST coded", "Done", "ok"], ["Management report", "Sent 4 Nov", ""]], "Example figures"],
    statement: "Every month closed and every filing lodged, to the same professional standard, every year.",
    features: {
      h: "Books you can rely on",
      sub: "Chartered Accountants keep your books on Xero, from the first transaction to the year-end filing, so your numbers are always ready when you need them.",
      items: [
        ["Reconciled every week", "We match bank, card and cash on Xero every week, and send any questions to you as one short list on WhatsApp.", ["Bank reconciliation · week 43", "Xero", [["Transactions", "142", ""], ["Matched", "139", "ok"], ["Questions sent to you", "3", "gd"]], "Example figures"]],
        ["Closed in the first week", "Profit and loss, balance sheet and cash flow every month, with a rolling 12-month cash forecast to guide your decisions.", ["Management report · October", "Sent 4 Nov", [["Revenue", "S$128k", ""], ["Gross margin", "41%", ""], ["Cash", "S$212k", ""], ["12-month forecast", "Included", "ok"]], "Example figures"]],
        ["Filed before each deadline", "Financial statements, XBRL, ECI and Form C-S prepared from the same books and filed for you as an ACRA Registered Filing Agent.", ["Year-end filings · FYE 31 Dec 2026", "Example Pte Ltd", [["ECI", "31 Mar 2027", ""], ["AGM", "30 Jun 2027", ""], ["Annual return and XBRL", "31 Jul 2027", ""], ["Form C-S", "30 Nov 2027", ""]], "Dates from the financial year end"]],
      ],
    },
    cardsHeading: "Accounting services",
    req: { h: "What Singapore companies must file", rows: [
      ["Estimated Chargeable Income", "Within 3 months of the financial year end"],
      ["Annual General Meeting", "Within 6 months of the financial year end"],
      ["Annual return and XBRL", "Within 7 months of the financial year end"],
      ["Form C-S or C", "By 30 November each year"],
      ["GST registration", "When taxable turnover passes S$1 million in 12 months"],
    ] },
    steps: [
      ["Message us", "Send your latest accounts on WhatsApp. We review your books and the filings due."],
      ["Set up on Xero", "We connect your bank feeds and bring past months up to date."],
      ["Close every month", "Your books are closed in the first week, and every filing is lodged on time."],
    ],
    cta: ["Ready to hand over your books?", "Send your latest accounts on WhatsApp, and a Chartered Accountant will reply with practical next steps."],
  },
  tax: {
    hue: ["#2c4a96", "#6489d2", "#b4c7ec", "rgba(241,207,182,.7)"],
    hero: ["Tax computation · YA 2027", "Example Pte Ltd", [["Chargeable income", "S$420,000", ""], ["Partial tax exemption", "−S$102,500", "gd"], ["Taxable income", "S$317,500", ""], ["Tax at 17%", "S$53,975", "tot"]], "Example figures"],
    statement: "Tax computed from accurate books, with every exemption you qualify for.",
    features: {
      h: "Tax planned before year end",
      sub: "The same team keeps your books and computes your tax, so your numbers are ready before IRAS asks for them.",
      items: [
        ["The right return, every year", "We choose Form C-S (Lite), C-S or C from your revenue, and file or waive ECI as the rules allow.", ["Return check · YA 2027", "Example Pte Ltd", [["Revenue", "S$3.2 million", ""], ["Form C-S", "Eligible", "ok"], ["ECI waiver", "Not eligible", ""], ["Return due", "30 Nov 2027", ""]], "Example figures"]],
        ["Every exemption applied", "Start-up or partial tax exemption, capital allowances and non-deductible items worked through line by line.", ["Exemptions and allowances", "YA 2027", [["Partial tax exemption", "S$102,500", ""], ["Capital allowances", "S$12,000", ""], ["Non-deductible expenses", "Added back", "ok"]], "Example figures"]],
        ["Planned before the year ends", "We estimate your tax during the year, so you can still act on it and set cash aside with confidence.", ["Tax forecast · FY 2026", "Updated monthly", [["Estimated tax", "S$54k", ""], ["Monthly tax reserve", "S$4.5k", "gd"], ["Return due", "30 Nov 2027", ""]], "Example figures"]],
      ],
    },
    cardsHeading: "Tax services",
    steps: [
      ["Share your accounts", "Send your year-end accounts, or we work from the books we keep."],
      ["We compute the tax", "Exemptions, allowances and non-deductible items are applied."],
      ["Filed with IRAS", "ECI and your return are filed before each deadline."],
    ],
    cta: ["Ready to plan this year's tax?", "Send your accounts on WhatsApp, and a tax specialist will reply with practical advice."],
  },
  "corporate-secretarial": {
    hue: ["#22407c", "#5576bf", "#a6bbe4", "rgba(233,211,180,.65)"],
    hero: ["Company register", "Example Pte Ltd", [["Company secretary", "Appointed", "ok"], ["Registered address", "14 Robinson Road", ""], ["AGM · FY 2026", "Due 30 Jun 2027", ""], ["Annual return", "Due 31 Jul 2027", ""]], "Example company"],
    statement: "Every statutory duty handled and every filing on time, so your company stays in good standing.",
    features: {
      h: "Every statutory duty, handled",
      sub: "A company secretary who knows the Companies Act, with your registers and filings kept current on your behalf.",
      items: [
        ["A qualified company secretary", "Appointed within 6 months of incorporation and ordinarily resident in Singapore, as the law requires.", ["Appointment check", "Companies Act, section 171", [["Appointed within 6 months", "Yes", "ok"], ["Resident in Singapore", "Yes", "ok"], ["Separate from a sole director", "Yes", "ok"]], "Example company"]],
        ["Registers kept current", "Members, directors and controllers updated after every change, with resolutions drafted for you to sign online.", ["Statutory registers", "Example Pte Ltd", [["Register of members", "Updated", "ok"], ["Register of directors", "Updated", "ok"], ["Register of controllers", "Updated", "ok"], ["Resolutions", "Signed online", "ok"]], "Example company"]],
        ["AGM and annual return on time", "AGM documents prepared and your annual return filed on Bizfile, with reminders from your financial year end.", ["Annual filings · FYE 31 Dec 2026", "Example Pte Ltd", [["AGM", "30 Jun 2027", ""], ["Annual return", "31 Jul 2027", ""], ["Late fee avoided", "S$300 to S$600", "gd"]], "Dates from the financial year end"]],
      ],
    },
    cardsHeading: "What's included",
    cta: ["Ready to switch company secretary?", "Send your UEN on WhatsApp, and a company secretary will guide you through the change."],
  },
  payroll: {
    hue: ["#4a76c8", "#8db3e8", "#d0e0f5", "rgba(244,220,198,.8)"],
    hero: ["Payroll run · October 2026", "Example Pte Ltd", [["Employees", "12", ""], ["Gross salaries", "S$54,000", ""], ["Payslips", "Issued", "ok"], ["CPF, SDL and SHG", "Due 14 Nov", ""]], "Example figures"],
    statement: "Every employee paid correctly, and every contribution submitted on time.",
    features: {
      h: "Payroll, start to finish",
      sub: "Salaries, statutory contributions and year-end filings handled by the team that keeps your books.",
      items: [
        ["Every employee paid correctly", "Salaries, allowances, overtime and deductions checked before each run, with itemised payslips for your team.", ["Payroll run checks", "October 2026", [["Salaries calculated", "Done", "ok"], ["Allowances and overtime", "Checked", "ok"], ["Itemised payslips", "Issued", "ok"]], "Example figures"]],
        ["CPF, SDL and SHG by the 14th", "Employer and employee CPF, the Skills Development Levy and Self-Help Group contributions submitted together.", ["Contributions · October 2026", "Due 14 Nov", [["Employer CPF", "Submitted", "ok"], ["Employee CPF", "Submitted", "ok"], ["Skills Development Levy", "Submitted", "ok"], ["CDAC, ECF, MBMF, SINDA", "Submitted", "ok"]], "Example figures"]],
        ["IR8A by 1 March", "Employee income filed with IRAS under the Auto-Inclusion Scheme, and every run posted to Xero.", ["Year-end · 2026", "Example Pte Ltd", [["Auto-Inclusion Scheme", "5+ employees", ""], ["IR8A", "Due 1 Mar 2027", ""], ["Payroll journals", "Posted to Xero", "ok"]], "Example figures"]],
      ],
    },
    cardsHeading: "What's included",
    steps: [
      ["Send your employee list", "Salaries, start dates and allowances, shared on WhatsApp."],
      ["We run the payroll", "Pay is calculated and checked, and payslips are issued."],
      ["Submitted and posted", "CPF, SDL and SHG submitted, with journals posted to Xero."],
    ],
    cta: ["Ready to hand over payroll?", "Send your employee list on WhatsApp, and an accountant will reply with the next steps."],
  },
  "outsourced-cfo": {
    hue: ["#30468a", "#6a82cc", "#b0c0e8", "rgba(234,209,187,.7)"],
    hero: ["Cash runway · next 12 months", "Example Pte Ltd", [["Opening cash", "S$212k", ""], ["Average monthly outflow", "S$18k", ""], ["Budget variance · October", "+3.2%", "ok"], ["Runway", "12 months", "tot"]], "Example figures"],
    statement: "Senior finance leadership for the decisions that matter, a few days a month.",
    features: {
      h: "What your outsourced CFO delivers",
      sub: "Models, forecasts and budgets built on your Xero data and reviewed with you every month, giving you the clarity to plan and grow.",
      items: [
        ["Financial models", "Hiring plans, pricing and expansion modelled before you commit.", ["Scenario model · 2027", "Example Pte Ltd", [["Base case · revenue", "S$1.6m", ""], ["Two sales hires", "+S$140k cost", "gd"], ["Expansion to Malaysia", "Modelled", "ok"]], "Example figures"]],
        ["Cash flow visibility", "A rolling cash forecast from receivables, bills and payroll, so any shortfall shows months ahead.", ["13-week cash forecast", "Updated weekly", [["Opening cash", "S$212k", ""], ["Receivables over 60 days", "S$24k", "gd"], ["Lowest point", "Feb · S$148k", ""]], "Example figures"]],
        ["Budgets and forecasts", "Budget against actual every month, with each variance explained in your monthly review.", ["Budget vs actual · October", "Example Pte Ltd", [["Revenue", "+6.7%", "ok"], ["Staff costs", "−1.8%", "ok"], ["Marketing", "+37.5%", "gd"]], "Example figures"]],
      ],
    },
    cardsHeading: "Where an outsourced CFO helps",
    req: { h: "How it works in practice", rows: [
      ["Days a month", "Agreed with you, from a few days to a fixed weekly day"],
      ["Data", "Budgets and forecasts built on your Xero data"],
      ["Books", "Kept by the same team, if you would like one partner"],
      ["Review", "A monthly review of the numbers with the founders"],
    ] },
    steps: [
      ["First call", "Your goals, your numbers and the decisions ahead."],
      ["Agree the days", "From a few days a month to a fixed weekly day."],
      ["Monthly review", "Models, forecast and budget reviewed with you."],
    ],
    cta: ["Ready for a CFO view of your numbers?", "Message us on WhatsApp to arrange a first call."],
  },
  "nominee-directorship": {
    hue: ["#2858a0", "#6d9dd8", "#b9d3ef", "rgba(239,216,191,.72)"],
    hero: ["Nominee appointment", "Example Pte Ltd", [["Due diligence", "Complete", "ok"], ["Nominee agreement", "Signed online", "ok"], ["Filed on Bizfile", "Within 14 days", "ok"], ["Register of nominee directors", "Updated", "ok"]], "Example company"],
    statement: "A resident director appointed properly, while control of your business stays with you.",
    features: {
      h: "A nominee director, with safeguards",
      sub: "Every appointment starts with due diligence and a written agreement, and is reviewed with you every year.",
      items: [
        ["Due diligence first", "Identity, source of funds and business checks are completed before any appointment.", ["Due diligence", "Before appointment", [["Identity of founders", "Verified", "ok"], ["Source of funds", "Verified", "ok"], ["Business review", "Complete", "ok"]], "Example company"]],
        ["A written agreement", "Duties, limits, indemnity and fees are agreed in writing before appointment.", ["Nominee agreement", "Signed online", [["Duties", "Agreed", "ok"], ["Limits", "Agreed", "ok"], ["Indemnity", "Agreed", "ok"], ["Fees", "Confirmed in writing", "ok"]], "Example company"]],
        ["Control stays with you", "The nominee meets the residency requirement and signs statutory filings. You run the business.", ["What stays with you", "Example Pte Ltd", [["Running the business", "You", ""], ["Commercial contracts", "You", ""], ["Bank accounts and payments", "You", ""], ["Share ownership", "You", ""]], "Example company"]],
      ],
    },
    cardsHeading: "What's included",
    cta: ["Ready to appoint a resident director?", "Message us on WhatsApp, and a company secretary will guide you through each step."],
  },
};
