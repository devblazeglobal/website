import { Calculator } from "@/components/calculator";
import { Credentials, EvGrid, Help } from "@/components/ui";
import type { IconKey } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/compliance-deadline-calculator",
  title: "Singapore Compliance Deadline Calculator | ECI, AGM, Annual Return",
  description: "Enter your financial year end to see ECI, AGM, annual return, IR8A and corporate tax deadlines for your Singapore company, with the rules and sources behind each date.",
});

const KNOW: [IconKey, string, string][] = [
  ["check", "ECI waiver", "No ECI when revenue is S$5 million or below and ECI is nil"],
  ["user", "AGM exemption", "None needed if financial statements reach members within 5 months"],
  ["scale", "Dispensing with AGMs", "Private companies may dispense by resolution of all members"],
  ["building", "Dormant companies", "The annual return is still required"],
  ["chart", "Listed companies", "AGM within 4 months, annual return within 5"],
  ["globe", "Branch register overseas", "One extra month for the annual return"],
  ["layers", "XBRL", "Most companies file financial statements in XBRL"],
  ["doc", "Form C-S (Lite)", "For revenue of S$200,000 or below"],
  ["doc", "Form C", "For revenue above S$5 million"],
  ["cal", "Year of Assessment", "The calendar year after the financial year ends"],
  ["percent", "GST F5", "Due 1 month after each accounting period"],
  ["bank", "CPF", "Contributions due by the 14th of the following month"],
  ["receipt", "IR8A", "Employee income for the year, due 1 March"],
  ["clock", "Late annual returns", "ACRA charges late lodgement fees"],
  ["shield", "Late tax returns", "IRAS may estimate tax and impose penalties"],
];

const DETAILS: [string, React.ReactNode][] = [
  ["How each date is calculated", "Each deadline counts whole months from the financial year end. When the year ends on the last day of a month, the deadline falls on the last day of the target month. Form C-S is due on 30 November of the Year of Assessment, the calendar year after the financial year ends."],
  ["Financial statements sent to members", "A private company that sends its financial statements to all members within 5 months of year end does not need to hold an AGM. Members may still ask for one up to 14 days before the 6-month deadline. Companies Act 1967, section 175A."],
  ["Listed companies", "AGM within 4 months and annual return within 5 months after the financial year end. Choose Listed above the dates to recalculate."],
  ["Dormant companies", "The annual return is still required. A dormant private company with total assets of S$500,000 or less is exempt from holding an AGM."],
  ["Branch register outside Singapore", "Companies with a share capital that keep a branch register outside Singapore have one extra month to file the annual return."],
  ["Sources", <>
    <a href="https://www.iras.gov.sg/taxes/corporate-income-tax/estimated-chargeable-income-(eci)-filing" target="_blank" rel="noopener">IRAS: ECI filing</a><br />
    <a href="https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/holding-annual-general-meetings/due-dates-requirements/" target="_blank" rel="noopener">ACRA: AGM due dates</a><br />
    <a href="https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/filing-annual-returns-companies/deadline-requirements/" target="_blank" rel="noopener">ACRA: annual return deadlines</a><br />
    <a href="https://www.iras.gov.sg/taxes/corporate-income-tax/form-c-s-form-c-s-(lite)-form-c-filing/overview-of-form-c-s-form-c-s-(lite)-form-c" target="_blank" rel="noopener">IRAS: Form C-S, C-S (Lite) and C</a><br />
    <a href="https://sso.agc.gov.sg/Act/CoA1967" target="_blank" rel="noopener">Companies Act 1967, sections 175, 175A and 197</a>
  </>],
  ["Before you rely on these dates", "If a due date falls on a weekend or public holiday, file earlier. Late filing attracts penalties. Confirm each date on Bizfile and myTax Portal."],
];

export default function CalculatorPage() {
  return (
    <main className="view" id="view-compliance-calendar">
      <Calculator after={<>
        <section className="ev ev-know" aria-labelledby="ev-k-h"><div className="wide"><h2 className="ev-h" id="ev-k-h">Everything you need to know</h2><EvGrid items={KNOW} /></div></section>
        <Help wa="Hello Blaze Global, I would like help with my company's annual filings." chat={["Our year end is 30 June. When is the AGM?", "By 31 December, unless the financial statements reach members by 30 November."]} />
        <Credentials />
        <section className="cx-det" aria-labelledby="cx-det-h"><div className="wide lp-split">
          <h2 className="h2" id="cx-det-h">Details and sources</h2>
          <div className="faq">{DETAILS.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
        </div></section>
      </>} />
    </main>
  );
}
