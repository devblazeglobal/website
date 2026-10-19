// Products added after the 19 Oct 2026 client review: Tax, Payroll,
// Outsourced CFO and Nominee Directorship, each its own product page.
// Draft copy: Blaze to confirm the scope of each before launch.
import type { MainPage } from "@/lib/content-data";

export const TAX_PAGE: MainPage = {
  slug: "tax",
  img: "/images/sg-1.jpg",
  heading: "Pay what you owe. Not a dollar more.",
  sub: "Corporate tax, tax planning and a outsourced CFO for Singapore companies, from Chartered Accountants who also keep your books.",
  gridHeading: "Every tax service, one team",
  wa: "Hello Blaze Global, I would like help with tax.",
  cards: [
    ["Corporate income tax", "ECI and Form C-S, C-S (Lite) or C, filed with IRAS.", "cal", "Due 30 Nov", "/services/tax/corporate-income-tax"],
    ["Tax advisory and forecasting", "Tax planning and cash forecasts from your own numbers.", "route", "Scenario", "/services/tax/tax-advisory"],
    ["Outsourced CFO", "A part-time finance lead for planning, reporting and decisions.", "bars", "Board ready", "/services/outsourced-cfo"],
    ["GST", "Registration and quarterly F5 returns, filed with IRAS.", "toggles", "GST registered", "/services/accounting/gst"],
    ["Payroll", "Monthly payroll, CPF and IR8A, prepared and filed on time.", "doc", "Paid on time", "/services/payroll"],
    ["Compliance deadline calculator", "Every tax and filing date from your financial year end.", "stamp", "Calculator", "/compliance-deadline-calculator"],
  ],
  faq: [
    ["When is Form C-S due?", "30 November of the Year of Assessment, the year after the financial year ends."],
    ["Do we need to file ECI?", "Not if annual revenue is S$5 million or below and ECI is nil."],
    ["Which tax exemptions can a new company claim?", "Qualifying new companies can claim the start-up tax exemption for their first three Years of Assessment; others get the partial tax exemption."],
    ["What does a outsourced CFO do?", "Budgets, forecasts, board reporting and funding preparation, part-time, without a full-time hire."],
  ],
  chat: ["Can you review our tax before year end?", "Yes. Send last year's computation and your current books, and we will list what can be claimed."],
  benefits: [
    { h: "Every exemption you qualify for", p: "Start-up and partial tax exemptions, capital allowances and deductions applied, line by line.", img: "/images/consultation.jpg", card: ["Tax computation", [["Accounting profit", "S$318,400", "ok"], ["Capital allowances", "Claimed", "ok"], ["Partial exemption", "Applied", "ok"], ["Form C-S", "Director review", "wait"]]] },
    { h: "Plans before deadlines", p: "Tax considered when you hire, price and expand, not discovered at year end.", img: "/images/sg-3.jpg", card: ["Tax review", [["Director remuneration", "Planned", "ok"], ["Group relief", "Reviewed", "ok"], ["Capital purchases", "Timed", "wait"], ["Year-end close", "Scheduled", "todo"]]] },
    { h: "A finance lead on call", p: "Budgets, forecasts and board packs from a Chartered Accountant who knows your numbers.", img: "/images/sme.jpg", card: ["Board pack", [["Management accounts", "Ready", "ok"], ["Cash forecast", "Updated", "ok"], ["Budget variance", "Reviewed", "ok"], ["Board meeting", "Next week", "todo"]]] },
  ],
};

export const PAYROLL_PAGE: MainPage = {
  slug: "payroll",
  img: "/images/sg-4.jpg",
  heading: "Paid on time. Filed on time.",
  sub: "Payroll services in Singapore: salaries calculated, CPF and SHG submitted by the 14th and IR8A filed with IRAS each year.",
  gridHeading: "Everything payroll needs",
  wa: "Hello Blaze Global, I would like help with payroll.",
  cards: [
    ["Payroll and payslips", "Salaries, allowances and deductions calculated, and itemised payslips issued, every month.", "cal", "Monthly", ""],
    ["CPF and SDL", "Employer and employee CPF and the Skills Development Levy, submitted by the 14th.", "toggles", "By the 14th", ""],
    ["Self-Help Group contributions", "CDAC, ECF, MBMF and SINDA contributions deducted and submitted with CPF.", "doc", "With CPF", ""],
    ["IR8A", "Employee income filed with IRAS under the Auto-Inclusion Scheme by 1 March.", "stamp", "By 1 March", ""],
    ["New hires and leavers", "Joining, final pay and pro-rated salary handled.", "route", "Pro-rated", ""],
    ["Payroll journals", "Payroll posted to your books on Xero each month.", "bars", "On Xero", ""],
  ],
  faq: [
    ["When is CPF due?", "By the 14th of the following month."],
    ["When is IR8A due?", "1 March, for employment income paid in the previous calendar year."],
    ["Do we need the Auto-Inclusion Scheme?", "It is compulsory for employers with 5 or more employees, and for any employer that has received an IRAS notice."],
    ["Can you run payroll for one employee?", "Yes. Payroll is priced by headcount."],
  ],
  chat: ["Can you take over our payroll next month?", "Yes. Send last month's payroll and employee list, and we will run the next one."],
  benefits: [
    { h: "Every employee paid correctly", p: "Salaries, allowances, overtime and deductions checked before each run.", img: "/images/acc-2.jpg", card: ["Payroll run", [["Salaries calculated", "Done", "ok"], ["Payslips issued", "Done", "ok"], ["CPF submitted", "By the 14th", "wait"], ["Bank file", "Ready", "ok"]]] },
    { h: "CPF and IR8A without reminders", p: "Monthly CPF and the annual IR8A filed on time, every time.", img: "/images/cs-2.jpg", card: ["Annual filings", [["CPF", "Monthly", "ok"], ["SDL", "Monthly", "ok"], ["IR8A", "1 March", "wait"], ["Appendix 8A", "1 March", "todo"]]] },
    { h: "Payroll in your books", p: "Each run posted to Xero, so management reports include staff costs.", img: "/images/help-1.jpg", card: ["Xero", [["Payroll journal", "Posted", "ok"], ["CPF payable", "Reconciled", "ok"], ["Staff costs", "In report", "ok"], ["Next run", "Scheduled", "todo"]]] },
  ],
};

export const CFO_PAGE: MainPage = {
  slug: "outsourced-cfo",
  img: "/images/city-calm.jpg",
  heading: "A CFO for your numbers, without a full-time hire.",
  sub: "Outsourced CFO services in Singapore: financial models, cash flow visibility, budgets and forecasts, from a Chartered Accountant.",
  gridHeading: "Where an outsourced CFO helps",
  wa: "Hello Blaze Global, I would like to speak about an outsourced CFO.",
  delivers: { h: "What your Outsourced CFO delivers every month", items: [
    ["chart", "Financial models", "Models the management team uses: scenarios, runway and unit economics."],
    ["clock", "Cash flow visibility", "Cash position forecast monthly, so shortfalls show months ahead."],
    ["scale", "Budgets and forecasts", "Budget built with you on Xero, actuals tracked against it each month."],
    ["layers", "Process streamlining", "Approvals, month-end and reporting simplified as the company grows."],
  ] },
  cards: [
    ["Hiring decisions", "Headcount plans costed before offers go out.", "toggles", "Costed", ""],
    ["Pricing reviews", "Margins by product or customer, reviewed with you.", "bars", "By margin", ""],
    ["Expansion plans", "New markets and entities modelled before you commit.", "route", "Modelled", ""],
    ["Bank and funding", "Lender and investor materials prepared and reviewed.", "stamp", "Prepared", ""],
    ["Month-end close", "A close timetable and checks that hold as volume grows.", "cal", "Monthly", ""],
    ["Management meetings", "A monthly review of the numbers with the founders.", "doc", "Monthly", ""],
  ],
  faq: [
    ["What does an outsourced CFO do?", "Financial models, cash flow forecasts, budgets and process improvement, part-time, without a full-time hire."],
    ["How many days a month?", "Agreed with you, from a few days a month to a fixed weekly day."],
    ["Do you keep our books as well?", "Yes, if you want one team for accounting, tax and finance."],
    ["Do you work with Xero?", "Yes. Budgets and forecasts are built on your Xero data."],
  ],
  chat: ["Can you build our budget for next year?", "Yes. Send this year's management accounts and your plans, and we will set up the first draft."],
  benefits: [
    { h: "Plans you can act on", p: "Models and forecasts tied to the decisions in front of you.", img: "/images/large.jpg", card: ["Budget", [["Revenue plan", "Agreed", "ok"], ["Headcount plan", "Agreed", "ok"], ["Cash forecast", "Updated", "ok"], ["Variance review", "Monthly", "todo"]]] },
    { h: "No cash surprises", p: "Cash position forecast every month, months ahead of any shortfall.", img: "/images/consultation.jpg", card: ["Cash forecast", [["Opening cash", "Reconciled", "ok"], ["Receivables", "Forecast", "ok"], ["Payroll and tax", "Scheduled", "ok"], ["Month 4", "Watch", "wait"]]] },
    { h: "Processes that scale", p: "Approvals, month-end and reporting set up to hold as the company grows.", img: "/images/acc-3.jpg", card: ["Month-end", [["Approvals", "Set", "ok"], ["Close checklist", "In use", "ok"], ["Reporting pack", "Automated", "ok"], ["Review", "Quarterly", "todo"]]] },
  ],
};

export const NOMINEE_PAGE: MainPage = {
  slug: "nominee-directorship",
  img: "/images/sg-3.jpg",
  heading: "A resident director, as ACRA requires.",
  sub: "Nominee director services in Singapore for overseas founders: a locally resident director appointed so the company can register and stay compliant.",
  gridHeading: "What the service covers",
  wa: "Hello Blaze Global, I would like to ask about a nominee director.",
  cards: [
    ["Resident director", "A director ordinarily resident in Singapore, as the Companies Act requires.", "ring", "Resident", ""],
    ["Written agreement", "Duties, limits and fees agreed in writing before appointment.", "doc", "Agreed", ""],
    ["Due diligence", "Identity and business checks completed before appointment.", "toggles", "Checked", ""],
    ["ACRA filing", "Appointment filed on Bizfile by our Registered Filing Agent.", "stamp", "Filed", ""],
    ["Compliance oversight", "Annual filings tracked with our corporate secretarial team.", "cal", "Tracked", ""],
    ["Change of director", "Resignation filed when you appoint your own resident director.", "route", "When ready", ""],
  ],
  faq: [
    ["Does every Singapore company need a resident director?", "Yes. At least one director must be ordinarily resident in Singapore."],
    ["Who counts as resident?", "Singapore citizens, permanent residents, and Employment Pass or EntrePass holders with a local address."],
    ["Does the nominee run the company?", "No. The nominee meets the residency requirement; the agreement sets out duties and limits."],
    ["What happens when we appoint our own resident director?", "We file the change on Bizfile and the nominee resigns."],
  ],
  chat: ["Can you be our resident director?", "Yes. We complete due diligence first, then agree the terms in writing before appointment."],
  benefits: [
    { h: "Register from abroad", p: "Overseas founders meet the residency rule and incorporate without relocating.", img: "/images/startup.jpg", card: ["Incorporation", [["Due diligence", "Done", "ok"], ["Nominee agreement", "Signed", "ok"], ["Resident director", "Appointed", "ok"], ["Company registered", "Filing", "wait"]]] },
    { h: "Clear terms", p: "Scope, duties and fees agreed in writing before appointment.", img: "/images/cs-3.jpg", card: ["Agreement", [["Scope", "Agreed", "ok"], ["Duties and limits", "Agreed", "ok"], ["Fees", "Agreed", "ok"], ["Review", "Annual", "todo"]]] },
    { h: "Works with your company secretary", p: "Appointment, changes and annual filings handled by one team.", img: "/images/cs-1.jpg", card: ["Annual compliance", [["Company secretary", "Appointed", "ok"], ["AGM", "Scheduled", "todo"], ["Annual return", "Scheduled", "todo"], ["Registers", "Updated", "ok"]]] },
  ],
};

export const DIGITAL_PAGE: MainPage = {
  slug: "digitalisation-automation",
  img: "/images/acc-1.jpg",
  heading: "Less manual work. Better data.",
  sub: "Technology, AI and automation that cut manual work and show how the business is performing, built on the systems you already use.",
  gridHeading: "Examples of what we automate",
  wa: "Hello Blaze Global, I would like to ask about digitalisation and automation.",
  delivers: { h: "What we do", items: [
    ["layers", "Digitalisation and process improvement", "Workflows reviewed, gaps found, digital tools put in to simplify day-to-day operations."],
    ["chat", "AI-powered automation", "AI tools such as Claude automate repetitive tasks, extract data and process documents."],
    ["chart", "Dashboards and reporting", "Interactive dashboards that combine several sources into live financial and operating figures."],
    ["link", "Systems integration", "Xero, Google Sheets and other applications connected, so data flows without re-keying."],
  ] },
  cards: [
    ["Bills and receipts", "Supplier bills and receipts read and posted to Xero.", "doc", "Automated", ""],
    ["Bank feeds", "Bank and card transactions matched automatically.", "toggles", "Matched", ""],
    ["Management dashboard", "Revenue, margin and cash on one live screen.", "bars", "Live", ""],
    ["Approval flows", "Purchases and claims approved online, with a record.", "route", "Approved", ""],
    ["Sheets to Xero", "Google Sheets connected to Xero, no re-keying.", "cal", "Synced", ""],
    ["Document extraction", "Contracts and forms read and filed by AI.", "stamp", "Extracted", ""],
  ],
  faq: [
    ["Do we need to change our systems?", "No. We work with the systems you already use, such as Xero and Google Sheets."],
    ["Which AI tools do you use?", "Tools such as Claude, chosen for the task and your data."],
    ["How do you start?", "A review of current workflows, then a short list of changes with cost and time saved."],
    ["Can you build dashboards on our own data?", "Yes. Dashboards combine accounting, sales and operating data in one place."],
  ],
  chat: ["Can you automate our receipt processing?", "Yes. Send us a sample month and we will show what can be read and posted automatically."],
  benefits: [
    { h: "Practical, cost-effective solutions", p: "Built on your existing systems, not new software for its own sake.", img: "/images/sme.jpg", card: ["Workflow review", [["Current process", "Mapped", "ok"], ["Manual steps", "Found", "ok"], ["Automation plan", "Agreed", "ok"], ["Build", "Next", "todo"]]] },
    { h: "Live figures, not month-old reports", p: "Dashboards that update as transactions arrive.", img: "/images/help-1.jpg", card: ["Dashboard", [["Revenue", "Live", "ok"], ["Margin", "Live", "ok"], ["Cash", "Live", "ok"], ["Targets", "Set", "ok"]]] },
    { h: "Less re-keying", p: "Systems connected so data is entered once.", img: "/images/cs-2.jpg", card: ["Integration", [["Xero", "Connected", "ok"], ["Google Sheets", "Connected", "ok"], ["Bank feeds", "Connected", "ok"], ["CRM", "Planned", "todo"]]] },
  ],
};
