// Generated from the approved mock-up (docs/brand/home-mockup.html) by
// scripts/port. Copy lives here so pages render it, never retype it.
import { CFO_PAGE, DIGITAL_PAGE, EXTRAS, NOMINEE_PAGE, PAYROLL_PAGE, TAX_PAGE, TILES_LONG } from "@/lib/content-new";

export type Pair = [title: string, text: string];
export type Card = [title: string, text: string, art: ArtKind, chip: string, href: string];
export type ArtKind = "doc" | "bars" | "toggles" | "cal" | "ring" | "stamp" | "route";
export type IconKey = keyof typeof ICONS;
export type Status = "ok" | "wait" | "todo";
export interface Benefit { h: string; p: string; img: string; card: [string, [string, string, Status][]] }
export type Parent = "accounting" | "tax" | "corporate-secretarial";
export type Product = Parent | "payroll" | "outsourced-cfo" | "nominee-directorship" | "blazeos";
/** Optional storyboard sections (20 Oct 2026). Rendered in a fixed order when present. */
export interface PageExtras {
  h1?: string;
  chips?: string[];
  who?: { h: string; items: [IconKey, string, string][] };
  rules?: { h: string; rows: [string, string][] };
  does?: { h: string; yes: [string, string[]]; no: [string, string[]] };
  plans?: { h: string; included: string[]; note: string };
  steps?: { h: string; items: [string, string][] };
  safeguards?: { h: string; items: [IconKey, string, string][] };
  compare?: { h: string; cols: [string, string, string]; rows: [string, string, string][] };
  ai?: { q: string; metrics: [string, string][] };
  calendar?: boolean;
  skip?: ("benefits" | "how" | "grid")[];
}
export interface SubPage { par: Parent; slug: string; name: string; line: string; art: [ArtKind, string]; h1: string; lede: string; why: Pair[] }
export interface MainPage extends PageExtras { slug: string; img: string; heading: string; sub: string; gridHeading: string; wa: string; cards: Card[]; faq: Pair[]; chat: Pair; benefits: Benefit[]; delivers?: { h: string; items: [IconKey, string, string][] } }
export interface SegmentPage { slug: string; name: string; line: string; h1: string; lede: string; wa: string; bandHeading: string; bandIcons: IconKey[]; why: Pair[]; needHeading: string; needs: [IconKey, string, string, string][]; chat: Pair }
export interface Review { n: string; role: string; head: string; body: string[] }

export const ICONS = {
 "doc": "<path d=\"M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6\"/>",
 "building": "<path d=\"M4 21V5l8-3 8 3v16 M4 21h16 M9 9h1 M14 9h1 M9 13h1 M14 13h1 M10 21v-4h4v4\"/>",
 "user": "<circle cx=\"12\" cy=\"8\" r=\"3.5\"/><path d=\"M5 20c1.2-3.6 3.8-5 7-5s5.8 1.4 7 5\"/>",
 "shield": "<path d=\"M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M9 12l2 2 4-4\"/>",
 "chart": "<path d=\"M4 20V10 M10 20V4 M16 20v-7 M3 20h18\"/>",
 "cal": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"15\" rx=\"2.5\"/><path d=\"M3.5 10h17 M8 3v4 M16 3v4\"/>",
 "receipt": "<path d=\"M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6\"/>",
 "bank": "<path d=\"M3 9l9-5 9 5 M5 10v8 M10 10v8 M14 10v8 M19 10v8 M3 20h18\"/>",
 "percent": "<path d=\"M5 19L19 5\"/><circle cx=\"7\" cy=\"7\" r=\"2\"/><circle cx=\"17\" cy=\"17\" r=\"2\"/>",
 "layers": "<path d=\"M12 3l9 5-9 5-9-5z M3 13l9 5 9-5\"/>",
 "chat": "<path d=\"M4 5h16v11H9l-5 4z\"/>",
 "check": "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"3\"/><path d=\"M8 12l3 3 5-6\"/>",
 "clock": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 7v5l3 2\"/>",
 "scale": "<path d=\"M12 4v16 M6 20h12 M5 8h14 M5 8l-3 6h6z M19 8l-3 6h6z\"/>",
 "link": "<path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"/>",
 "globe": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M3.5 12h17 M12 3.5c2.5 2.5 2.5 14.5 0 17 M12 3.5c-2.5 2.5-2.5 14.5 0 17\"/>"
} as const;

export const SUB_PAGES: Record<string, SubPage> = {
 "bookkeeping": {
  "par": "accounting",
  "slug": "bookkeeping",
  "name": "Bookkeeping",
  "line": "Bank, card and cash records reconciled on Xero every week.",
  "art": [
   "doc",
   "Reconciled"
  ],
  "h1": "Bookkeeping, reconciled every week",
  "lede": "Bookkeeping services in Singapore by Chartered Accountants. Bank, card and cash matched on Xero every week, so your books are always current.",
  "why": [
   [
    "Reconciled weekly",
    "Transactions matched as they land, not rebuilt at year end."
   ],
   [
    "Questions on WhatsApp",
    "Unclear items sent to you in one message, with the receipt we need."
   ],
   [
    "Ready for every filing",
    "Records kept to the Singapore Financial Reporting Standards, ready for GST, ECI and Form C-S."
   ]
  ]
 },
 "management-reports": {
  "par": "accounting",
  "slug": "management-reports",
  "name": "Management reports",
  "line": "Profit and loss, balance sheet and cash flow, closed every month.",
  "art": [
   "bars",
   "Closed"
  ],
  "h1": "Know your numbers by the first week",
  "lede": "Monthly management reports: profit and loss, balance sheet and cash flow, with a rolling 12-month cash forecast.",
  "why": [
   [
    "Closed on a fixed timetable",
    "The same close checklist every month, so figures compare month to month."
   ],
   [
    "Variances listed",
    "Lines that move against last month are listed with the transactions behind them."
   ],
   [
    "Forecast included",
    "A 12-month cash forecast updated with each close."
   ]
  ]
 },
 "financial-statements-xbrl": {
  "par": "accounting",
  "slug": "financial-statements-xbrl",
  "name": "Financial statements and XBRL",
  "line": "Unaudited financial statements and XBRL, filed with ACRA.",
  "art": [
   "stamp",
   "Filed with ACRA"
  ],
  "h1": "Year-end statements, filed with ACRA",
  "lede": "Unaudited financial statements prepared to SFRS and lodged in XBRL with your annual return, by an ACRA Registered Filing Agent.",
  "why": [
   [
    "Filed directly",
    "ACRA Registered Filing Agent FA20210247. No third party in between."
   ],
   [
    "Audit exemption checked",
    "Small company status confirmed from revenue, assets and headcount."
   ],
   [
    "One team for year end",
    "Statements, AGM and annual return prepared together."
   ]
  ]
 },
 "gst": {
  "par": "accounting",
  "slug": "gst",
  "name": "GST",
  "line": "Registration and quarterly F5 returns, filed with IRAS.",
  "art": [
   "toggles",
   "GST registered"
  ],
  "h1": "GST returns, filed every quarter",
  "lede": "GST registration and quarterly F5 filing in Singapore, prepared from reconciled books and lodged with IRAS before each deadline.",
  "why": [
   [
    "Registration checked",
    "Taxable turnover watched against the S$1 million threshold every quarter."
   ],
   [
    "Returns from reconciled books",
    "Input tax claimed only against valid tax invoices."
   ],
   [
    "Filed by the due date",
    "Each F5 filed within 1 month of the quarter end."
   ]
  ]
 },
 "corporate-income-tax": {
  "par": "tax",
  "slug": "corporate-income-tax",
  "name": "Corporate income tax",
  "line": "ECI and Form C-S, C-S (Lite) or C, filed with IRAS.",
  "art": [
   "cal",
   "Due 30 Nov"
  ],
  "h1": "Corporate tax, computed and filed",
  "lede": "ECI and Form C-S, C-S (Lite) or C, prepared from your accounts with the exemptions you qualify for, and filed with IRAS.",
  "why": [
   [
    "The right form",
    "Form chosen from revenue: C-S (Lite), C-S or C."
   ],
   [
    "Exemptions applied",
    "Start-up and partial tax exemptions and capital allowances claimed where they qualify."
   ],
   [
    "No late filing",
    "ECI within 3 months of year end. Form C-S by 30 November."
   ]
  ]
 },
 "tax-advisory": {
  "par": "tax",
  "slug": "tax-advisory",
  "name": "Tax advisory and forecasting",
  "line": "Tax planning and cash forecasts from your own numbers.",
  "art": [
   "route",
   "Scenario"
  ],
  "h1": "Decide with your numbers, not estimates",
  "lede": "Tax planning, scenario models and 12-month cash forecasts, built from your reconciled books.",
  "why": [
   [
    "From your accounts",
    "Advice based on reconciled figures, not estimates."
   ],
   [
    "Scenarios before decisions",
    "Hiring, expansion and pricing modelled before you commit."
   ],
   [
    "Big Four experience",
    "Managerial experience in a Big Four firm."
   ]
  ]
 }
} as Record<string, SubPage>;

export const TILES: Record<string, [IconKey, string, string][]> = {
 "bookkeeping": [
  [
   "link",
   "Xero bank feeds",
   "Every bank account and card connected, so transactions arrive daily."
  ],
  [
   "bank",
   "Weekly reconciliation",
   "Each transaction matched to an invoice, bill or receipt every week."
  ],
  [
   "receipt",
   "Receipts on every expense",
   "Snap a photo or forward an email. We attach it to the transaction."
  ],
  [
   "doc",
   "Sales invoices",
   "Recorded and matched to payments as they arrive."
  ],
  [
   "clock",
   "Bills and payables",
   "Supplier bills recorded with due dates, so nothing is paid late."
  ],
  [
   "layers",
   "Recurring entries",
   "Rent, subscriptions and repeat suppliers coded once by rule."
  ],
  [
   "percent",
   "GST coding",
   "Each line coded with the right GST treatment for your F5 return."
  ],
  [
   "chat",
   "Questions on WhatsApp",
   "Unclear items sent to you in one message each week."
  ],
  [
   "check",
   "Ready for year end",
   "Books kept to SFRS, ready for financial statements, ECI and Form C-S."
  ]
 ],
 "management-reports": [
  [
   "chart",
   "Profit and loss",
   "Revenue, costs and margin for the month and year to date."
  ],
  [
   "layers",
   "Balance sheet",
   "Assets, liabilities and equity at each month end."
  ],
  [
   "bank",
   "Cash flow",
   "Where cash came from and where it went."
  ],
  [
   "clock",
   "Monthly close",
   "Closed in the first week of each month on a fixed checklist."
  ],
  [
   "scale",
   "Month-on-month comparison",
   "Each line set against last month and last year."
  ],
  [
   "doc",
   "Variance list",
   "Lines that move are listed with the transactions behind them."
  ],
  [
   "cal",
   "12-month cash forecast",
   "Updated with every close."
  ],
  [
   "user",
   "Board-ready format",
   "Laid out for directors, investors and lenders."
  ],
  [
   "check",
   "SFRS basis",
   "Prepared under the Singapore Financial Reporting Standards."
  ]
 ],
 "financial-statements-xbrl": [
  [
   "doc",
   "Statement of financial position",
   "Assets, liabilities and equity at year end."
  ],
  [
   "chart",
   "Statement of profit or loss",
   "Revenue and expenses for the financial year."
  ],
  [
   "layers",
   "Changes in equity",
   "Share capital, retained earnings and dividends."
  ],
  [
   "bank",
   "Statement of cash flows",
   "Operating, investing and financing cash flows."
  ],
  [
   "receipt",
   "Notes to the accounts",
   "Accounting policies and the disclosures SFRS requires."
  ],
  [
   "user",
   "Directors' statement",
   "Prepared for directors to sign with the statements."
  ],
  [
   "shield",
   "Audit exemption check",
   "Small company status confirmed from revenue, assets and headcount."
  ],
  [
   "globe",
   "XBRL conversion",
   "Statements prepared in the format ACRA requires."
  ],
  [
   "building",
   "Filed with the annual return",
   "Lodged on Bizfile as your Registered Filing Agent."
  ]
 ],
 "gst": [
  [
   "check",
   "Registration check",
   "Turnover watched against the S$1 million threshold every quarter."
  ],
  [
   "doc",
   "GST registration",
   "Application prepared and filed with IRAS."
  ],
  [
   "percent",
   "Quarterly F5 returns",
   "Filed within 1 month of each quarter end."
  ],
  [
   "receipt",
   "Input tax claims",
   "Claimed only against valid tax invoices."
  ],
  [
   "layers",
   "Tax codes",
   "Standard-rated, zero-rated and exempt supplies coded correctly."
  ],
  [
   "globe",
   "Imported services",
   "Reviewed for reverse charge."
  ],
  [
   "bank",
   "GST payments",
   "Amount due confirmed before each payment date."
  ],
  [
   "scale",
   "Voluntary registration",
   "Advice on registering below the threshold."
  ],
  [
   "cal",
   "Deadline calendar",
   "Every F5 date mapped for the year."
  ]
 ],
 "corporate-income-tax": [
  [
   "check",
   "ECI",
   "Filed or waived within 3 months of year end."
  ],
  [
   "doc",
   "Tax computation",
   "Accounting profit adjusted to chargeable income, line by line."
  ],
  [
   "scale",
   "The right return",
   "Form C-S (Lite), C-S or C, chosen from your revenue."
  ],
  [
   "percent",
   "Partial tax exemption",
   "Applied to the first S$200,000 of chargeable income."
  ],
  [
   "building",
   "Start-up tax exemption",
   "Claimed in the first 3 Years of Assessment where eligible."
  ],
  [
   "layers",
   "Capital allowances",
   "Claimed on qualifying plant and equipment."
  ],
  [
   "receipt",
   "Non-deductible expenses",
   "Identified and added back before filing."
  ],
  [
   "cal",
   "Filed by 30 November",
   "Each return lodged on myTax Portal before the due date."
  ],
  [
   "chat",
   "IRAS queries",
   "Questions from IRAS answered on your behalf."
  ]
 ],
 "tax-advisory": [
  [
   "percent",
   "Tax planning",
   "Savings identified from your reconciled figures each year."
  ],
  [
   "clock",
   "12-month cash forecast",
   "Rolling forecast updated after each close."
  ],
  [
   "scale",
   "Scenario models",
   "Hiring, expansion and pricing modelled before you commit."
  ],
  [
   "chart",
   "Financial analysis",
   "Margin, cost and cash trends from your own books."
  ],
  [
   "layers",
   "Group relief",
   "Losses transferred between qualifying Singapore companies."
  ],
  [
   "user",
   "Director remuneration",
   "Salary and dividend mix reviewed for tax."
  ],
  [
   "building",
   "Sustainability review",
   "Cash runway and break-even reviewed."
  ],
  [
   "shield",
   "Key person insurance",
   "Advice through our partners."
  ],
  [
   "check",
   "Big Four experience",
   "Managerial experience in a Big Four firm."
  ]
 ]
} as Record<string, [IconKey, string, string][]>;

export const MAIN_PAGES: Record<Product, MainPage> = {
 "accounting": {
  "slug": "accounting",
  "img": "/images/sg-2.jpg",
  "heading": "Close faster. File on time.",
  "sub": "Accounting for Singapore companies, run by Chartered Accountants on Xero. Books closed in the first week of every month. Every filing lodged before its deadline.",
  "gridHeading": "Every accounting service, one team",
  "wa": "Hello Blaze Global, I would like help with accounting.",
  "cards": [
   [
    "Bookkeeping",
    "Bank, card and cash records reconciled on Xero every week.",
    "doc",
    "Reconciled",
    "/services/accounting/bookkeeping"
   ],
   [
    "Management reports",
    "Profit and loss, balance sheet and cash flow, closed every month.",
    "bars",
    "Closed",
    "/services/accounting/management-reports"
   ],
   [
    "Financial statements and XBRL",
    "Unaudited financial statements and XBRL, filed with ACRA.",
    "stamp",
    "Filed with ACRA",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "GST",
    "Registration and quarterly F5 returns, filed with IRAS.",
    "toggles",
    "GST registered",
    "/services/accounting/gst"
   ],
   [
    "Payroll",
    "Monthly payroll, CPF and IR8A, prepared and filed on time.",
    "cal",
    "Paid on time",
    "/services/payroll"
   ],
   [
    "Tax",
    "Corporate tax, tax planning and a outsourced CFO.",
    "route",
    "Tax services",
    "/services/tax"
   ]
  ],
  "faq": [
   [
    "Which accounting software do you use?",
    "Xero, with bank feeds and Aspire connected."
   ],
   [
    "Do I need an audit?",
    "Most small private companies are exempt. We confirm your status from revenue, assets and headcount."
   ],
   [
    "When must the annual tax return be filed?",
    "Form C-S or C is due by 30 November each year."
   ],
   [
    "When must a company register for GST?",
    "When taxable turnover passes S$1 million in 12 months, or is expected to."
   ]
  ],
  "chat": [
   "Is our ECI due this month?",
   "Yes, by 31 March. Your ECI is nil, so no filing is needed."
  ],
  "benefits": [
   {
    "h": "Receipts, matched weekly",
    "p": "Snap a photo or forward an email. We attach it to the transaction and list anything missing.",
    "img": "/images/acc-1.jpg",
    "card": [
     "Receipts this week",
     [
      [
       "Office supplies",
       "Attached",
       "ok"
      ],
      [
       "Client lunch",
       "Attached",
       "ok"
      ],
      [
       "Software",
       "Attached",
       "ok"
      ],
      [
       "Courier",
       "Missing",
       "wait"
      ]
     ]
    ]
   },
   {
    "h": "Your numbers by the first week",
    "p": "Profit and loss, balance sheet and cash flow every month, with a 12-month cash forecast.",
    "img": "/images/acc-2.jpg",
    "card": [
     "September close",
     [
      [
       "Bank and card reconciled",
       "Done",
       "ok"
      ],
      [
       "Management report",
       "Ready",
       "ok"
      ],
      [
       "Cash forecast",
       "Updated",
       "ok"
      ],
      [
       "Director review",
       "In review",
       "wait"
      ]
     ]
    ]
   },
   {
    "h": "Filed before every deadline",
    "p": "GST, ECI, financial statements, XBRL and Form C-S, prepared and filed with ACRA and IRAS.",
    "img": "/images/acc-3.jpg",
    "card": [
     "Filings this year",
     [
      [
       "GST F5",
       "Filed",
       "ok"
      ],
      [
       "ECI",
       "Filed",
       "ok"
      ],
      [
       "Financial statements and XBRL",
       "In review",
       "wait"
      ],
      [
       "Form C-S",
       "30 Nov",
       "todo"
      ]
     ]
    ]
   }
  ]
 },
 "corporate-secretarial": {
  "slug": "corporate-secretarial",
  "img": "/images/sg-4.jpg",
  "heading": "Your company, always in good standing",
  "sub": "A qualified company secretary, registers kept current and annual returns filed within 7 months, every year.",
  "gridHeading": "Corporate secretarial, handled end to end",
  "wa": "Hello Blaze Global, I would like help with corporate secretarial work.",
  "cards": [
   [
    "Company secretary",
    "A qualified secretary, appointed within 6 months of incorporation.",
    "ring",
    "Appointed",
    ""
   ],
   [
    "AGM and annual returns",
    "AGM documents prepared and annual returns filed on Bizfile.",
    "cal",
    "Due 31 Jul",
    ""
   ],
   [
    "Registers and minutes",
    "Statutory registers, minutes and resolutions kept current.",
    "doc",
    "Updated",
    ""
   ],
   [
    "Company changes",
    "Directors, shareholders, share transfers, address and activity.",
    "route",
    "Filed",
    ""
   ],
   [
    "Registered address",
    "A Singapore registered office for notices and filings.",
    "stamp",
    "Registered",
    ""
   ],
   [
    "Nominee Directorship",
    "A locally resident director to meet the ACRA requirement.",
    "ring",
    "Resident director",
    "/services/nominee-directorship"
   ]
  ],
  "faq": [
   [
    "When must a company secretary be appointed?",
    "Within 6 months of incorporation."
   ],
   [
    "Can a director be the company secretary?",
    "Yes, unless they are the sole director."
   ],
   [
    "When is the annual return due?",
    "Within 7 months after the financial year end."
   ],
   [
    "Does a private company need to hold an AGM?",
    "Within 6 months of year end, unless it dispenses with AGMs by shareholder resolution."
   ]
  ],
  "chat": [
   "Can we add a new director?",
   "Yes. Send the passport and address. We file it on Bizfile once the consent is signed."
  ],
  "benefits": [
   {
    "h": "A company secretary from day one",
    "p": "Appointed within the 6 months the Companies Act allows, and ordinarily resident in Singapore.",
    "img": "/images/cs-1.jpg",
    "card": [
     "Company officers",
     [
      [
       "Director",
       "Appointed",
       "ok"
      ],
      [
       "Company secretary",
       "Blaze Global",
       "ok"
      ],
      [
       "Registered address",
       "Confirmed",
       "ok"
      ],
      [
       "Auditor",
       "Exempt",
       "todo"
      ]
     ]
    ]
   },
   {
    "h": "Registers, always current",
    "p": "Members, directors and controllers updated after every change, with resolutions drafted for online signing.",
    "img": "/images/cs-2.jpg",
    "card": [
     "Registers",
     [
      [
       "Register of members",
       "Updated",
       "ok"
      ],
      [
       "Register of directors",
       "Updated",
       "ok"
      ],
      [
       "Register of controllers",
       "Updated",
       "ok"
      ],
      [
       "Share transfer",
       "Signing online",
       "wait"
      ]
     ]
    ]
   },
   {
    "h": "AGMs and annual returns, on schedule",
    "p": "AGM documents prepared and the annual return filed on Bizfile, with reminders from your financial year end.",
    "img": "/images/cs-3.jpg",
    "card": [
     "Annual compliance",
     [
      [
       "AGM documents",
       "Ready",
       "ok"
      ],
      [
       "Annual return",
       "Scheduled",
       "wait"
      ],
      [
       "XBRL financial statements",
       "With accounting",
       "todo"
      ]
     ]
    ]
   }
  ]
 }
} as Record<Product, MainPage>;

export const SEGMENT_PAGES: Record<string, SegmentPage> = {
 "startups": {
  "slug": "startups",
  "name": "Start-ups",
  "line": "Incorporation, a company secretary and the first books.",
  "h1": "From incorporation to first close",
  "lede": "Accounting and incorporation for start-ups in Singapore. Company registered, secretary appointed and books live on Xero, in one go.",
  "wa": "Hello Blaze Global, I am starting a company and would like help.",
  "bandHeading": "Set up once. Ready to raise.",
  "bandIcons": [
   "building",
   "link",
   "scale"
  ],
  "why": [
   [
    "One team from day one",
    "Incorporation, company secretary and books without hand-offs between providers."
   ],
   [
    "Books before the first invoice",
    "Xero and bank feeds set up before you trade."
   ],
   [
    "Ready for investors",
    "Registers, share allotments and statements in the shape investors ask for."
   ]
  ],
  "needHeading": "Everything a start-up needs",
  "needs": [
   [
    "building",
    "Incorporation",
    "Name, constitution and registration on Bizfile",
    "/start-a-business-in-singapore"
   ],
   [
    "user",
    "Company secretary",
    "Appointed within 6 months of incorporation",
    "/services/corporate-secretarial"
   ],
   [
    "globe",
    "Nominee director",
    "A resident director for overseas founders",
    "/services/nominee-directorship"
   ],
   [
    "layers",
    "Share allotments",
    "New shares issued and filed with ACRA",
    "/services/corporate-secretarial"
   ],
   [
    "doc",
    "Registers",
    "Members, directors and controllers kept current",
    "/services/corporate-secretarial"
   ],
   [
    "link",
    "Xero from day one",
    "Bank and card feeds from the first transaction",
    "/services/accounting/bookkeeping"
   ],
   [
    "receipt",
    "Receipts and claims",
    "Captured by photo and matched every week",
    "/services/accounting/bookkeeping"
   ],
   [
    "percent",
    "GST threshold watch",
    "Flagged as turnover nears S$1 million",
    "/services/accounting/gst"
   ],
   [
    "check",
    "Start-up tax exemption",
    "Claimed in the first 3 Years of Assessment where eligible",
    "/services/tax/corporate-income-tax"
   ],
   [
    "doc",
    "ECI and Form C-S",
    "Prepared and filed with IRAS",
    "/services/tax/corporate-income-tax"
   ],
   [
    "chart",
    "Financial statements",
    "Unaudited statements prepared to SFRS",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "layers",
    "XBRL",
    "Lodged with the annual return",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "cal",
    "Deadline calendar",
    "Every date from your financial year end",
    "/compliance-deadline-calculator"
   ],
   [
    "scale",
    "Investor-ready records",
    "Cap table, registers and accounts in order",
    "/services/corporate-secretarial"
   ],
   [
    "chat",
    "WhatsApp support",
    "Questions answered by the team",
    ""
   ]
  ],
  "chat": [
   "We incorporated last month. What is next?",
   "Appoint a company secretary within 6 months. We can do that this week."
  ]
 },
 "smes": {
  "slug": "smes",
  "name": "SMEs",
  "line": "Monthly books, GST and annual compliance.",
  "h1": "You run the business. We run the books.",
  "lede": "Accounting for SMEs in Singapore: monthly books, reports, GST and every annual filing, with one team.",
  "wa": "Hello Blaze Global, I run an SME and would like help with accounting.",
  "bandHeading": "Close monthly. File on time.",
  "bandIcons": [
   "clock",
   "percent",
   "check"
  ],
  "why": [
   [
    "A monthly close",
    "Bank, card and cash reconciled and a report ready every month."
   ],
   [
    "GST every quarter",
    "Returns prepared from reconciled books and filed on time."
   ],
   [
    "Year end, filed",
    "AGM, annual return, XBRL and Form C-S with one team."
   ]
  ],
  "needHeading": "Everything an SME needs",
  "needs": [
   [
    "link",
    "Monthly bookkeeping",
    "Bank, card and cash reconciled on Xero",
    "/services/accounting/bookkeeping"
   ],
   [
    "user",
    "Payroll",
    "Salaries, CPF and IR8A every month",
    "/services/payroll"
   ],
   [
    "receipt",
    "Receipts and bills",
    "Attached to every expense",
    "/services/accounting/bookkeeping"
   ],
   [
    "chart",
    "Management reports",
    "Profit and loss, balance sheet and cash flow monthly",
    "/services/accounting/management-reports"
   ],
   [
    "clock",
    "Cash forecast",
    "12 months ahead, updated each close",
    "/services/accounting/management-reports"
   ],
   [
    "percent",
    "GST registration",
    "Compulsory above S$1 million taxable turnover",
    "/services/accounting/gst"
   ],
   [
    "doc",
    "GST F5 returns",
    "Filed within 1 month of each quarter",
    "/services/accounting/gst"
   ],
   [
    "check",
    "ECI",
    "Filed or waived within 3 months of year end",
    "/services/tax/corporate-income-tax"
   ],
   [
    "doc",
    "Form C-S",
    "Prepared from your accounts, filed by 30 November",
    "/services/tax/corporate-income-tax"
   ],
   [
    "scale",
    "Capital allowances",
    "Claimed on qualifying assets",
    "/services/tax/corporate-income-tax"
   ],
   [
    "layers",
    "Financial statements and XBRL",
    "Prepared to SFRS and filed with ACRA",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "user",
    "Company secretary",
    "AGMs, resolutions and registers kept current",
    "/services/corporate-secretarial"
   ],
   [
    "building",
    "Annual return",
    "Filed on Bizfile within 7 months of year end",
    "/services/corporate-secretarial"
   ],
   [
    "cal",
    "Deadline calendar",
    "Every date from your financial year end",
    "/compliance-deadline-calculator"
   ],
   [
    "chat",
    "WhatsApp support",
    "Questions answered by the team",
    ""
   ]
  ],
  "chat": [
   "Can you take over our books mid-year?",
   "Yes. We start from your last reconciled month and catch up from there."
  ]
 },
 "large-companies": {
  "slug": "large-companies",
  "name": "Large companies",
  "line": "Group reporting, forecasting and tax advisory.",
  "h1": "One close for every entity",
  "lede": "Accounting and advisory for groups in Singapore: multi-entity reporting, forecasting, tax and corporate secretarial.",
  "wa": "Hello Blaze Global, I would like to discuss accounting and advisory for a larger company.",
  "bandHeading": "Every entity. One timetable.",
  "bandIcons": [
   "layers",
   "chart",
   "user"
  ],
  "why": [
   [
    "Every entity, one timetable",
    "Each company closed on the same monthly schedule."
   ],
   [
    "Board-ready packs",
    "Reports and forecasts prepared for directors and investors."
   ],
   [
    "Big Four experience",
    "Managerial experience in a Big Four firm."
   ]
  ],
  "needHeading": "Everything a group needs",
  "needs": [
   [
    "layers",
    "Multi-entity close",
    "Every company closed on one monthly timetable",
    "/services/accounting/management-reports"
   ],
   [
    "chart",
    "Consolidation",
    "Group results in one view",
    "/services/accounting/management-reports"
   ],
   [
    "doc",
    "Outsourced CFO",
    "Budgets, forecasts and board packs, part-time",
    "/services/outsourced-cfo"
   ],
   [
    "clock",
    "Cash forecast",
    "Rolling 12 months for each entity",
    "/services/outsourced-cfo"
   ],
   [
    "scale",
    "Scenario models",
    "Expansion, hiring and pricing modelled before you commit", "/services/outsourced-cfo"
   ],
   [
    "percent",
    "Tax advisory",
    "Savings identified from your financials each year",
    "/services/tax/tax-advisory"
   ],
   [
    "check",
    "Group relief",
    "Losses transferred between qualifying companies",
    "/services/tax/tax-advisory"
   ],
   [
    "doc",
    "Form C",
    "Prepared and filed for each Singapore entity",
    "/services/tax/corporate-income-tax"
   ],
   [
    "receipt",
    "GST",
    "Returns for every registered entity",
    "/services/accounting/gst"
   ],
   [
    "building",
    "Financial statements and XBRL",
    "For each entity, filed with ACRA",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "user",
    "Company secretary",
    "For every Singapore entity",
    "/services/corporate-secretarial"
   ],
   [
    "globe",
    "Director and shareholder changes",
    "Filed with ACRA as they happen",
    "/services/corporate-secretarial"
   ],
   [
    "shield",
    "Key person insurance",
    "Advice through our partners",
    ""
   ],
   [
    "cal",
    "Deadline calendar",
    "Every entity, every date",
    "/compliance-deadline-calculator"
   ],
   [
    "chat",
    "WhatsApp support",
    "Questions answered by the team",
    ""
   ]
  ],
  "chat": [
   "Can you close all four entities by the 10th?",
   "Yes. Each entity closes on the same timetable, then we consolidate."
  ]
 }
} as Record<string, SegmentPage>;

export const REVIEWS: Review[] = [
 {
  "n": "Joel",
  "role": "Founder, Medical Clinics",
  "head": "I now have greater understanding and insights into my business performance.",
  "body": [
   "We started engaging Blaze Global in 2021 for their accounting and corporate secretarial services. They have a fantastic team who are knowledgeable about the accounting standards, regulations and even systems and platforms to help facilitate general operations such as payments and HR. The best part is that you can trust them to be patient to equip and explain these jargons in simple terms.",
   "In 2022, we further engaged Blaze Global for their advisory services which consist of tax advisory and business financials analysis and forecasting. Again, very pleased with the services! I now have greater understanding and insights into my business performance and am able to focus in the right areas. Would definitely recommend Blaze Global if you\u2019re looking to expand your business."
  ]
 },
 {
  "n": "Reviewer",
  "role": "Google review",
  "head": "Review headline appears here.",
  "body": [
   "Google review text appears here once the Business Profile is connected."
  ]
 },
 {
  "n": "Reviewer",
  "role": "Google review",
  "head": "Review headline appears here.",
  "body": [
   "Google review text appears here once the Business Profile is connected."
  ]
 },
 {
  "n": "Reviewer",
  "role": "Google review",
  "head": "Review headline appears here.",
  "body": [
   "Google review text appears here once the Business Profile is connected."
  ]
 },
 {
  "n": "Reviewer",
  "role": "Google review",
  "head": "Review headline appears here.",
  "body": [
   "Google review text appears here once the Business Profile is connected."
  ]
 },
 {
  "n": "Reviewer",
  "role": "Google review",
  "head": "Review headline appears here.",
  "body": [
   "Google review text appears here once the Business Profile is connected."
  ]
 }
];

// Added after the client review (lib/content-new.ts).
Object.assign(MAIN_PAGES, { tax: TAX_PAGE, payroll: PAYROLL_PAGE, "outsourced-cfo": CFO_PAGE, "nominee-directorship": NOMINEE_PAGE, blazeos: DIGITAL_PAGE });
for (const [k, v] of Object.entries(EXTRAS)) Object.assign(MAIN_PAGES[k as Product], v);
Object.assign(TILES, TILES_LONG);
