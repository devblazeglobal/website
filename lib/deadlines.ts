// Statutory deadlines counted from a financial year end (FYE).
// Rules: ECI 3 months (IRAS); AGM 6 months, 4 if listed (Companies Act s175);
// annual return 7 months, 5 if listed (s197); IR8A 1 March after the
// calendar year (IRAS AIS); Form C-S/C 30 November of the Year of Assessment. A year end on the last day of a month moves deadlines
// to the last day of the target month, as ACRA counts them.

export interface Deadline {
  date: Date;
  name: string;
  /** Short timing line, e.g. "3 months after year end". */
  when: string;
  agency: string;
  rule: string;
  note: string;
  href: string;
  link: string;
  /** The exact ACRA or IRAS page for this filing. */
  url: string;
}

const URL = {
  eci: "https://www.iras.gov.sg/taxes/corporate-income-tax/estimated-chargeable-income-(eci)-filing",
  agm: "https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/holding-annual-general-meetings/due-dates-requirements/",
  ar: "https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/filing-annual-returns-companies/deadline-requirements/",
  ir8a: "https://www.iras.gov.sg/taxes/individual-income-tax/employers/auto-inclusion-scheme-(ais)-for-employment-income/reporting-employee-earnings-(ir8a-appendix-8a-appendix-8b)",
  tax: "https://www.iras.gov.sg/taxes/corporate-income-tax/form-c-s-form-c-s-(lite)-form-c-filing/overview-of-form-c-s-form-c-s-(lite)-form-c",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

const lastDay = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

export function addMonths(d: Date, n: number): Date {
  const eom = d.getDate() === lastDay(d.getFullYear(), d.getMonth());
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = lastDay(t.getFullYear(), t.getMonth());
  return new Date(t.getFullYear(), t.getMonth(), eom ? last : Math.min(d.getDate(), last));
}

export const formatLong = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
export const formatShort = (d: Date) => `${d.getDate()} ${SHORT[d.getMonth()]} ${d.getFullYear()}`;
const p2 = (n: number) => String(n).padStart(2, "0");
export const formatDmy = (d: Date) => `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}`;

/** Accepts 31/12/2026, 31-12-26, 31 Dec 2026, 31/dec/2026 and 2026-12-31. */
export function parseDate(input: string): Date | null {
  const v = input.trim().toLowerCase().replace(/,/g, " ").replace(/\s+/g, " ");
  if (!v) return null;
  let d: number, m: number, y: number;
  const iso = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(v);
  if (iso) {
    [y, m, d] = [+iso[1], +iso[2] - 1, +iso[3]];
  } else {
    const r = /^(\d{1,2})[\s/.\-]+([a-z]{3,9}|\d{1,2})[\s/.\-]+(\d{2}|\d{4})$/.exec(v);
    if (!r) return null;
    d = +r[1];
    m = /\d/.test(r[2]) ? +r[2] - 1 : SHORT.findIndex((s) => s.toLowerCase() === r[2].slice(0, 3));
    y = +r[3] < 100 ? 2000 + +r[3] : +r[3];
  }
  if (m < 0 || m > 11 || y < 1990 || y > 2100 || d < 1 || d > lastDay(y, m)) return null;
  return new Date(y, m, d);
}

/** The last day of the current month: the default year end. */
export function defaultYearEnd(today = new Date()) {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
}

export function deadlines(fye: Date, listed = false): Deadline[] {
  const y = fye.getFullYear();
  const rows: Deadline[] = [
    {
      date: addMonths(fye, 3), name: "Estimated Chargeable Income", when: "3 months after year end", agency: "IRAS",
      rule: "Within 3 months after the financial year end",
      note: "No ECI filing is needed if annual revenue is S$5 million or below and ECI is nil, before deducting the partial or start-up tax exemption. You self-assess the waiver; there is no need to inform IRAS.",
      href: "/services/tax/corporate-income-tax", link: "Corporate income tax", url: URL.eci,
    },
  ];
  if (!listed) rows.push({
    date: addMonths(fye, 5), name: "Send financial statements to members", when: "5 months after year end", agency: "ACRA",
    rule: "Within 5 months after the financial year end, if not holding an AGM (Companies Act 1967 s175A)",
    note: "A private company that sends its financial statements to all members within 5 months does not need to hold an AGM. Members may still ask for one up to 14 days before the 6-month deadline.",
    href: "/services/corporate-secretarial", link: "Corporate Secretarial", url: URL.agm,
  });
  rows.push(
    {
      date: addMonths(fye, listed ? 4 : 6), name: "Annual General Meeting", when: `${listed ? 4 : 6} months after year end`, agency: "ACRA",
      rule: `${listed ? "Listed" : "Non-listed"} company: within ${listed ? 4 : 6} months after the financial year end (Companies Act 1967 s175)`,
      note: listed
        ? "Listed companies must hold an AGM each year."
        : "A private company may dispense with AGMs if all members pass a resolution (s175A), or is exempt if it sends financial statements within 5 months. A dormant non-listed private company with total assets of S$500,000 or less is also exempt. AGM details are still declared in the annual return.",
      href: "/services/corporate-secretarial", link: "Corporate Secretarial", url: URL.agm,
    },
    {
      date: addMonths(fye, listed ? 5 : 7), name: "Annual return", when: `${listed ? 5 : 7} months after year end`, agency: "ACRA",
      rule: `${listed ? "Listed" : "Non-listed"} company: within ${listed ? 5 : 7} months after the financial year end (Companies Act 1967 s197)`,
      note: `Companies with a share capital that keep a branch register outside Singapore have one extra month (${formatLong(addMonths(fye, listed ? 6 : 8))}). The annual return must be filed even if the company is dormant. Financial statements in XBRL are filed with it.`,
      href: "/services/corporate-secretarial", link: "Corporate Secretarial", url: URL.ar,
    },
    {
      date: new Date(y + 1, 2, 1), name: "IR8A employee income", when: "1 March each year", agency: "IRAS",
      rule: `1 March ${y + 1}, for employment income paid in ${y}`,
      note: "Employers in the Auto-Inclusion Scheme submit IR8A, Appendix 8A and Appendix 8B to IRAS electronically. AIS is compulsory for employers with 5 or more employees.",
      href: "/services/payroll", link: "Payroll", url: URL.ir8a,
    },
    {
      date: new Date(y + 1, 10, 30), name: "Corporate tax", when: "30 November each year", agency: "IRAS",
      rule: `30 November ${y + 1}, for Year of Assessment ${y + 1} (the financial year ending in ${y}), filed at mytax.iras.gov.sg`,
      note: "Form C-S (Lite) for revenue of S$200,000 or below, Form C-S up to S$5 million, Form C above. A first financial period longer than 12 months may straddle two Years of Assessment.",
      href: "/services/tax/corporate-income-tax", link: "Corporate income tax", url: URL.tax,
    },
  );
  return rows.sort((a, b) => +a.date - +b.date);
}

export function daysUntil(date: Date, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((date.getTime() - t.getTime()) / 864e5);
}

export function dueLabel(days: number) {
  if (days < 0) return `Passed ${-days} days ago`;
  if (days === 0) return "Due today";
  return `Due in ${days} days`;
}

/** An .ics file of the deadlines, one all-day event each. */
export function toIcs(rows: Deadline[]) {
  const ds = (d: Date) => `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}`;
  const stamp = ds(new Date());
  const events = rows.map((r, i) => {
    const end = new Date(r.date);
    end.setDate(end.getDate() + 1);
    return ["BEGIN:VEVENT", `UID:blaze-${ds(r.date)}-${i}@blazeglobal.com.sg`, `DTSTAMP:${stamp}T000000Z`, `DTSTART;VALUE=DATE:${ds(r.date)}`, `DTEND;VALUE=DATE:${ds(end)}`, `SUMMARY:${r.name} due`, `DESCRIPTION:${r.rule}`, "END:VEVENT"].join("\r\n");
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Blaze Global//Compliance deadlines//EN", ...events, "END:VCALENDAR", ""].join("\r\n");
}

export { MONTHS };
