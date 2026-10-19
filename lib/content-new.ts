// Services added after the 19 Oct 2026 client review: Tax (main page),
// Payroll, Fractional CFO and Nominee Directorship. Draft copy: Blaze to
// confirm the scope of each before launch (docs/content-gaps.md).
import type { IconKey, MainPage, SubPage } from "@/lib/content-data";

export const NEW_SUB_PAGES: Record<string, SubPage> = {
  payroll: {
    par: "accounting", slug: "payroll", name: "Payroll", line: "Monthly payroll, CPF and IR8A, prepared and filed on time.", art: ["cal", "Paid on time"],
    h1: "Payroll, run every month",
    lede: "Payroll services in Singapore: salaries calculated, CPF contributions submitted and IR8A filed with IRAS each year.",
    why: [["Paid on the same day", "Salaries calculated and ready to pay on your schedule."], ["CPF on time", "Contributions submitted by the 14th of the following month."], ["IR8A handled", "Employee income filed with IRAS by 1 March."]],
  },
  "fractional-cfo": {
    par: "tax", slug: "fractional-cfo", name: "Fractional CFO", line: "A part-time finance lead for planning, reporting and decisions.", art: ["route", "Board ready"],
    h1: "A finance lead, without a full-time hire",
    lede: "Fractional CFO services in Singapore: budgets, forecasts, board reporting and funding preparation, from a Chartered Accountant.",
    why: [["Senior judgement", "Managerial experience in a Big Four firm, applied to your numbers."], ["Plans you can act on", "Budgets and cash forecasts tied to the decisions in front of you."], ["Ready for investors and banks", "Board packs, models and data rooms prepared when you need them."]],
  },
  "nominee-directorship": {
    par: "corporate-secretarial", slug: "nominee-directorship", name: "Nominee Directorship", line: "A locally resident director to meet the ACRA requirement.", art: ["ring", "Resident director"],
    h1: "Meet the resident director requirement",
    lede: "Nominee director services in Singapore for overseas founders: a locally resident director appointed so your company can register with ACRA.",
    why: [["Meets ACRA's rule", "Every Singapore company needs at least one director ordinarily resident in Singapore."], ["Clear terms", "Scope, duties and fees agreed in writing before appointment."], ["Works with your secretary", "Appointment and changes filed with ACRA by our corporate secretarial team."]],
  },
};

export const NEW_TILES: Record<string, [IconKey, string, string][]> = {
  payroll: [
    ["cal", "Monthly payroll run", "Salaries, allowances and deductions calculated every month."],
    ["receipt", "Payslips", "Itemised payslips issued to each employee."],
    ["bank", "CPF contributions", "Employer and employee CPF submitted by the 14th."],
    ["doc", "IR8A", "Employee income filed with IRAS by 1 March each year."],
    ["user", "New hires and leavers", "Joining and final pay handled, including pro-rated salary."],
    ["percent", "Skills Development Levy", "SDL calculated and paid with CPF."],
    ["clock", "Leave records", "Leave balances tracked and reflected in pay."],
    ["link", "Synced to Xero", "Payroll journals posted to your books each month."],
    ["chat", "Questions on WhatsApp", "Employees' pay queries answered by the team."],
  ],
  "fractional-cfo": [
    ["chart", "Budgets", "Annual budget built with you and tracked monthly."],
    ["clock", "Cash forecasts", "A rolling 12-month cash forecast, updated each close."],
    ["scale", "Scenario models", "Hiring, pricing and expansion modelled before you commit."],
    ["doc", "Board packs", "Monthly or quarterly reporting for directors and investors."],
    ["layers", "Unit economics", "Margin, cost and payback by product or customer."],
    ["bank", "Bank and funding", "Lender and investor materials prepared and reviewed."],
    ["percent", "Tax planning", "Tax built into every plan, not added at year end."],
    ["shield", "Controls", "Approval limits and month-end checks that scale with you."],
    ["user", "One senior contact", "A Chartered Accountant who knows your business."],
  ],
  "nominee-directorship": [
    ["user", "Resident director", "A director ordinarily resident in Singapore, as ACRA requires."],
    ["doc", "Written agreement", "Duties, limits and fees agreed before appointment."],
    ["shield", "Due diligence", "Identity and business checks completed first."],
    ["building", "ACRA filing", "Appointment filed on Bizfile by our filing agent."],
    ["check", "Compliance oversight", "Annual filings tracked so obligations are met."],
    ["clock", "Change of director", "Replacement handled when you appoint your own resident director."],
    ["globe", "For overseas founders", "Register and run your company from abroad."],
    ["layers", "With company secretary", "Works alongside our corporate secretarial service."],
    ["chat", "Questions on WhatsApp", "Answers from the team, start to finish."],
  ],
};

export const TAX_PAGE: MainPage = {
  slug: "tax",
  img: "/images/sg-1.jpg",
  heading: "Pay what you owe. Not a dollar more.",
  sub: "Corporate tax, tax planning and a fractional CFO for Singapore companies, from Chartered Accountants who also keep your books.",
  gridHeading: "Every tax service, one team",
  wa: "Hello Blaze Global, I would like help with tax.",
  cards: [
    ["Corporate income tax", "ECI and Form C-S, C-S (Lite) or C, filed with IRAS.", "cal", "Due 30 Nov", "/services/tax/corporate-income-tax"],
    ["Tax advisory and forecasting", "Tax planning and cash forecasts from your own numbers.", "route", "Scenario", "/services/tax/tax-advisory"],
    ["Fractional CFO", "A part-time finance lead for planning, reporting and decisions.", "bars", "Board ready", "/services/tax/fractional-cfo"],
    ["GST", "Registration and quarterly F5 returns, filed with IRAS.", "toggles", "GST registered", "/services/accounting/gst"],
    ["Payroll", "Monthly payroll, CPF and IR8A, prepared and filed on time.", "doc", "Paid on time", "/services/accounting/payroll"],
    ["Compliance deadline calculator", "Every tax and filing date from your financial year end.", "stamp", "Calculator", "/compliance-deadline-calculator"],
  ],
  faq: [
    ["When is Form C-S due?", "30 November of the Year of Assessment, the year after the financial year ends."],
    ["Do we need to file ECI?", "Not if annual revenue is S$5 million or below and ECI is nil."],
    ["Which tax exemptions can a new company claim?", "Qualifying new companies can claim the start-up tax exemption for their first three Years of Assessment; others get the partial tax exemption."],
    ["What does a fractional CFO do?", "Budgets, forecasts, board reporting and funding preparation, part-time, without a full-time hire."],
  ],
  chat: ["Can you review our tax before year end?", "Yes. Send last year's computation and your current books, and we will list what can be claimed."],
  benefits: [
    { h: "Every exemption you qualify for", p: "Start-up and partial tax exemptions, capital allowances and deductions applied, line by line.", img: "/images/consultation.jpg", card: ["Tax computation", [["Accounting profit", "S$318,400", "ok"], ["Capital allowances", "Claimed", "ok"], ["Partial exemption", "Applied", "ok"], ["Form C-S", "Director review", "wait"]]] },
    { h: "Plans before deadlines", p: "Tax considered when you hire, price and expand, not discovered at year end.", img: "/images/sg-3.jpg", card: ["Tax review", [["Director remuneration", "Planned", "ok"], ["Group relief", "Reviewed", "ok"], ["Capital purchases", "Timed", "wait"], ["Year-end close", "Scheduled", "todo"]]] },
    { h: "A finance lead on call", p: "Budgets, forecasts and board packs from a Chartered Accountant who knows your numbers.", img: "/images/sme.jpg", card: ["Board pack", [["Management accounts", "Ready", "ok"], ["Cash forecast", "Updated", "ok"], ["Budget variance", "Reviewed", "ok"], ["Board meeting", "Next week", "todo"]]] },
  ],
};
