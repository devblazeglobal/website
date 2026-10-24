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
  "line": "Bank, card and cash records reconciled on Xero every week, so your books stay current.",
  "art": [
   "doc",
   "Reconciled"
  ],
  "h1": "Bookkeeping, reconciled every week",
  "lede": "Bookkeeping services in Singapore by Chartered Accountants. We match your bank, card and cash transactions on Xero every week, so your books are always current and you can focus on running the business.",
  "why": [
   [
    "Reconciled weekly",
    "We match transactions as they come in, so nothing needs rebuilding at year end."
   ],
   [
    "Questions on WhatsApp",
    "Any unclear items come to you in one message, together with the receipt we need."
   ],
   [
    "Ready for every filing",
    "Your records are kept to the Singapore Financial Reporting Standards, ready for GST, ECI and Form C-S."
   ]
  ]
 },
 "management-reports": {
  "par": "accounting",
  "slug": "management-reports",
  "name": "Management reports",
  "line": "Profit and loss, balance sheet and cash flow, closed every month for a clear view of performance.",
  "art": [
   "bars",
   "Closed"
  ],
  "h1": "Know your numbers by the first week",
  "lede": "Monthly management reports covering profit and loss, balance sheet and cash flow, with a rolling 12-month cash forecast to help you make better-informed decisions.",
  "why": [
   [
    "Closed on a fixed timetable",
    "We follow the same close checklist every month, so your figures compare reliably from one month to the next."
   ],
   [
    "Variances listed",
    "Any line that moves against last month is listed with the transactions behind it, so you can see what changed."
   ],
   [
    "Forecast included",
    "A 12-month cash forecast, updated with each close, so you can plan ahead with confidence."
   ]
  ]
 },
 "financial-statements-xbrl": {
  "par": "accounting",
  "slug": "financial-statements-xbrl",
  "name": "Financial statements and XBRL",
  "line": "Unaudited financial statements and XBRL, prepared and filed with ACRA on your behalf.",
  "art": [
   "stamp",
   "Filed with ACRA"
  ],
  "h1": "Year-end statements, filed with ACRA",
  "lede": "Unaudited financial statements prepared to SFRS and lodged in XBRL with your annual return by an ACRA Registered Filing Agent, so your year end is handled in one place.",
  "why": [
   [
    "Filed directly",
    "As ACRA Registered Filing Agent FA20210247, we file for you directly, with no third party in between."
   ],
   [
    "Audit exemption checked",
    "We confirm your small company status from revenue, assets and headcount."
   ],
   [
    "One team for year end",
    "Your statements, AGM and annual return are prepared together by one team."
   ]
  ]
 },
 "gst": {
  "par": "accounting",
  "slug": "gst",
  "name": "GST",
  "line": "GST registration and quarterly F5 returns, prepared and filed with IRAS.",
  "art": [
   "toggles",
   "GST registered"
  ],
  "h1": "GST returns, filed every quarter",
  "lede": "GST registration and quarterly F5 filing in Singapore, prepared from your reconciled books and lodged with IRAS before each deadline, so you stay compliant every quarter.",
  "why": [
   [
    "Registration checked",
    "We monitor your taxable turnover against the S$1 million threshold every quarter."
   ],
   [
    "Returns from reconciled books",
    "We claim input tax only against valid tax invoices, keeping your returns accurate."
   ],
   [
    "Filed by the due date",
    "Each F5 return is filed within 1 month of the quarter end."
   ]
  ]
 },
 "corporate-income-tax": {
  "par": "tax",
  "slug": "corporate-income-tax",
  "name": "Corporate income tax",
  "line": "ECI and Form C-S, C-S (Lite) or C, prepared and filed with IRAS for you.",
  "art": [
   "cal",
   "Due 30 Nov"
  ],
  "h1": "Corporate tax, computed and filed",
  "lede": "We prepare your ECI and Form C-S, C-S (Lite) or C from your accounts, apply the exemptions you qualify for and file with IRAS.",
  "why": [
   [
    "The right form",
    "We select the right form from your revenue: C-S (Lite), C-S or C."
   ],
   [
    "Exemptions applied",
    "We claim start-up and partial tax exemptions and capital allowances wherever you qualify."
   ],
   [
    "Filed on time",
    "Your ECI is filed within 3 months of year end and Form C-S by 30 November."
   ]
  ]
 },
 "tax-advisory": {
  "par": "tax",
  "slug": "tax-advisory",
  "name": "Tax advisory and forecasting",
  "line": "Tax planning and cash forecasts built from your own numbers, so you can plan with confidence.",
  "art": [
   "route",
   "Scenario"
  ],
  "h1": "Decide with your numbers, not estimates",
  "lede": "Tax planning, scenario models and 12-month cash forecasts, built from your reconciled books to help you make better-informed decisions.",
  "why": [
   [
    "From your accounts",
    "Practical advice grounded in your reconciled figures, not estimates."
   ],
   [
    "Scenarios before decisions",
    "We model hiring, expansion and pricing before you commit, so you can see the impact first."
   ],
   [
    "Big Four experience",
    "Our team brings managerial experience from a Big Four firm to your business."
   ]
  ]
 }
} as Record<string, SubPage>;

export const TILES: Record<string, [IconKey, string, string][]> = {
 "bookkeeping": [
  [
   "link",
   "Xero bank feeds",
   "We connect every bank account and card, so your transactions arrive daily."
  ],
  [
   "bank",
   "Weekly reconciliation",
   "We match each transaction to an invoice, bill or receipt every week."
  ],
  [
   "receipt",
   "Receipts on every expense",
   "Snap a photo or forward an email, and we attach it to the right transaction."
  ],
  [
   "doc",
   "Sales invoices",
   "Your sales invoices recorded and matched to payments as they arrive."
  ],
  [
   "clock",
   "Bills and payables",
   "Supplier bills recorded with their due dates, so nothing is paid late."
  ],
  [
   "layers",
   "Recurring entries",
   "Rent, subscriptions and regular suppliers coded once by rule, saving you time every month."
  ],
  [
   "percent",
   "GST coding",
   "Every line coded with the correct GST treatment, ready for your F5 return."
  ],
  [
   "chat",
   "Questions on WhatsApp",
   "Any unclear items come to you in one message each week."
  ],
  [
   "check",
   "Ready for year end",
   "Your books kept to SFRS, ready for financial statements, ECI and Form C-S."
  ]
 ],
 "management-reports": [
  [
   "chart",
   "Profit and loss",
   "Your revenue, costs and margin for the month and year to date."
  ],
  [
   "layers",
   "Balance sheet",
   "Your assets, liabilities and equity at each month end."
  ],
  [
   "bank",
   "Cash flow",
   "A clear view of where your cash came from and where it went."
  ],
  [
   "clock",
   "Monthly close",
   "Your books closed in the first week of each month on a fixed checklist."
  ],
  [
   "scale",
   "Month-on-month comparison",
   "Each line compared with last month and last year, so trends are easy to see."
  ],
  [
   "doc",
   "Variance list",
   "Any line that moves is listed with the transactions behind it."
  ],
  [
   "cal",
   "12-month cash forecast",
   "Updated with every close to support your planning."
  ],
  [
   "user",
   "Board-ready format",
   "Laid out clearly for directors, investors and lenders."
  ],
  [
   "check",
   "SFRS basis",
   "Prepared in line with the Singapore Financial Reporting Standards."
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
   "Prepared for your directors to sign alongside the statements."
  ],
  [
   "shield",
   "Audit exemption check",
   "We confirm your small company status from revenue, assets and headcount."
  ],
  [
   "globe",
   "XBRL conversion",
   "Your statements prepared in the format ACRA requires."
  ],
  [
   "building",
   "Filed with the annual return",
   "Lodged on Bizfile by us as your Registered Filing Agent."
  ]
 ],
 "gst": [
  [
   "check",
   "Registration check",
   "We monitor your turnover against the S$1 million threshold every quarter."
  ],
  [
   "doc",
   "GST registration",
   "Your application prepared and filed with IRAS."
  ],
  [
   "percent",
   "Quarterly F5 returns",
   "Prepared and filed within 1 month of each quarter end."
  ],
  [
   "receipt",
   "Input tax claims",
   "Claimed only against valid tax invoices, keeping your returns accurate."
  ],
  [
   "layers",
   "Tax codes",
   "Standard-rated, zero-rated and exempt supplies coded correctly."
  ],
  [
   "globe",
   "Imported services",
   "Imported services reviewed for reverse charge."
  ],
  [
   "bank",
   "GST payments",
   "The amount due confirmed with you before each payment date."
  ],
  [
   "scale",
   "Voluntary registration",
   "Practical advice on whether to register below the threshold."
  ],
  [
   "cal",
   "Deadline calendar",
   "Every F5 date mapped out for the year ahead."
  ]
 ],
 "corporate-income-tax": [
  [
   "check",
   "ECI",
   "Your ECI filed or waived within 3 months of year end."
  ],
  [
   "doc",
   "Tax computation",
   "Accounting profit adjusted to chargeable income, line by line."
  ],
  [
   "scale",
   "The right return",
   "Form C-S (Lite), C-S or C, selected to match your revenue."
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
   "Each return lodged on myTax Portal ahead of the due date."
  ],
  [
   "chat",
   "IRAS queries",
   "We answer questions from IRAS on your behalf."
  ]
 ],
 "tax-advisory": [
  [
   "percent",
   "Tax planning",
   "Tax savings identified from your reconciled figures each year."
  ],
  [
   "clock",
   "12-month cash forecast",
   "A rolling forecast, updated after each close, to help you plan ahead."
  ],
  [
   "scale",
   "Scenario models",
   "We model hiring, expansion and pricing before you commit, so you can see the impact first."
  ],
  [
   "chart",
   "Financial analysis",
   "Margin, cost and cash trends drawn from your own books, for meaningful insight."
  ],
  [
   "layers",
   "Group relief",
   "Losses transferred between qualifying Singapore companies."
  ],
  [
   "user",
   "Director remuneration",
   "Your salary and dividend mix reviewed for tax efficiency."
  ],
  [
   "building",
   "Sustainability review",
   "Your cash runway and break-even point reviewed."
  ],
  [
   "shield",
   "Key person insurance",
   "Practical advice through our partners."
  ],
  [
   "check",
   "Big Four experience",
   "Our team brings managerial experience from a Big Four firm to your business."
  ]
 ]
} as Record<string, [IconKey, string, string][]>;

export const MAIN_PAGES: Record<Product, MainPage> = {
 "accounting": {
  "slug": "accounting",
  "img": "/images/sg-2.jpg",
  "heading": "Close faster. File on time.",
  "sub": "Expert accounting for Singapore companies, delivered by Chartered Accountants on Xero. We close your books in the first week of every month and lodge every filing before its deadline, so you can focus on growing the business.",
  "gridHeading": "Every accounting service, one partner",
  "wa": "Hello Blaze Global, I would like help with accounting.",
  "cards": [
   [
    "Bookkeeping",
    "Bank, card and cash records reconciled on Xero every week, so your books stay current.",
    "doc",
    "Reconciled",
    "/services/accounting/bookkeeping"
   ],
   [
    "Management reports",
    "Profit and loss, balance sheet and cash flow, closed every month for a clear view of performance.",
    "bars",
    "Closed",
    "/services/accounting/management-reports"
   ],
   [
    "Financial statements and XBRL",
    "Unaudited financial statements and XBRL, prepared and filed with ACRA on your behalf.",
    "stamp",
    "Filed with ACRA",
    "/services/accounting/financial-statements-xbrl"
   ],
   [
    "GST",
    "GST registration and quarterly F5 returns, prepared and filed with IRAS.",
    "toggles",
    "GST registered",
    "/services/accounting/gst"
   ],
   [
    "Payroll",
    "Monthly payroll, CPF and IR8A, prepared and filed on time so your team is paid correctly.",
    "cal",
    "Paid on time",
    "/services/payroll"
   ],
   [
    "Tax",
    "Corporate tax, tax planning and outsourced CFO support.",
    "route",
    "Tax services",
    "/services/tax"
   ]
  ],
  "faq": [
   [
    "Which accounting software do you use?",
    "We use Xero, with your bank feeds and Aspire connected."
   ],
   [
    "Do I need an audit?",
    "Most small private companies are exempt. We confirm your status from your revenue, assets and headcount."
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
    "p": "Snap a photo or forward an email. We attach it to the right transaction and let you know if anything is missing.",
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
    "p": "Your profit and loss, balance sheet and cash flow every month, with a 12-month cash forecast to guide your decisions.",
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
    "p": "GST, ECI, financial statements, XBRL and Form C-S, prepared and filed with ACRA and IRAS so you stay compliant.",
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
  "sub": "A qualified company secretary, statutory registers kept current and annual returns filed within 7 months, every year, so your company stays compliant while you focus on the business.",
  "gridHeading": "Corporate secretarial, handled end to end",
  "wa": "Hello Blaze Global, I would like help with corporate secretarial work.",
  "cards": [
   [
    "Company secretary",
    "A qualified company secretary, appointed within 6 months of incorporation.",
    "ring",
    "Appointed",
    ""
   ],
   [
    "AGM and annual returns",
    "We prepare your AGM documents and file annual returns on Bizfile.",
    "cal",
    "Due 31 Jul",
    ""
   ],
   [
    "Registers and minutes",
    "Your statutory registers, minutes and resolutions kept accurate and current.",
    "doc",
    "Updated",
    ""
   ],
   [
    "Company changes",
    "Changes to directors, shareholders, share transfers, address and business activity, filed for you.",
    "route",
    "Filed",
    ""
   ],
   [
    "Registered address",
    "A Singapore registered office address for your notices and filings.",
    "stamp",
    "Registered",
    ""
   ],
   [
    "Nominee Directorship",
    "A locally resident director, so you meet the ACRA requirement.",
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
   "Yes. Send us the passport and address, and we file it on Bizfile once the consent is signed."
  ],
  "benefits": [
   {
    "h": "A company secretary from day one",
    "p": "Your company secretary is appointed within the 6 months the Companies Act allows, and is ordinarily resident in Singapore.",
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
    "p": "Your registers of members, directors and controllers updated after every change, with resolutions drafted for convenient online signing.",
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
    "p": "We prepare your AGM documents and file the annual return on Bizfile, with reminders set from your financial year end.",
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
  "line": "Incorporation, a company secretary and your first set of books, handled by one team.",
  "h1": "From incorporation to first close",
  "lede": "Accounting and incorporation for start-ups in Singapore. We register your company, appoint your secretary and set up your books on Xero in one go, so you can focus on building the business.",
  "wa": "Hello Blaze Global, I am starting a company and would like help.",
  "bandHeading": "Set up once. Ready to raise.",
  "bandIcons": [
   "building",
   "link",
   "scale"
  ],
  "why": [
   [
    "One partner from day one",
    "Incorporation, company secretary and bookkeeping in one place, with no hand-offs between providers."
   ],
   [
    "Books before the first invoice",
    "Xero and bank feeds set up before you start trading."
   ],
   [
    "Ready for investors",
    "Registers, share allotments and statements prepared the way investors expect to see them."
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
    "Every date mapped from your financial year end",
    "/compliance-deadline-calculator"
   ],
   [
    "scale",
    "Investor-ready records",
    "Cap table, registers and accounts kept in order",
    "/services/corporate-secretarial"
   ],
   [
    "chat",
    "WhatsApp support",
    "Clear, practical answers from the team",
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
  "line": "Monthly books, GST and annual compliance, handled by one team.",
  "h1": "You run the business. We run the books.",
  "lede": "Accounting for SMEs in Singapore: monthly books, reports, GST and every annual filing, handled by one team that understands how your business operates.",
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
    "Your bank, card and cash reconciled, with a management report ready every month."
   ],
   [
    "GST every quarter",
    "Returns prepared from your reconciled books and filed on time."
   ],
   [
    "Year end, filed",
    "AGM, annual return, XBRL and Form C-S, all handled by one team."
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
    "Every date mapped from your financial year end",
    "/compliance-deadline-calculator"
   ],
   [
    "chat",
    "WhatsApp support",
    "Clear, practical answers from the team",
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
  "line": "Group reporting, forecasting and tax advisory across every entity.",
  "h1": "One close for every entity",
  "lede": "Accounting and advisory for groups in Singapore: multi-entity reporting, forecasting, tax and corporate secretarial, delivered with professional rigour.",
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
    "Each company closed on the same monthly schedule, giving you a consistent view across the group."
   ],
   [
    "Board-ready packs",
    "Reports and forecasts prepared clearly for directors and investors."
   ],
   [
    "Big Four experience",
    "Our team brings managerial experience from a Big Four firm to your business."
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
    "Practical advice through our partners",
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
    "Clear, practical answers from the team",
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
