import Link from "next/link";

import { ExpenseChecker, type Expense } from "@/components/expense-checker";
import { JsonLd } from "@/components/json-ld";
import { Credentials, Help, WaButton } from "@/components/ui";
import data from "@/content/iras-expenses.json";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// IRAS Business Expense Deductibility Checker, same flow, rebuilt for Blaze (Emelia, 1 Nov 2026).
// content/iras-expenses.json is IRAS's own data.json, unedited (IRAS last
// updated 13 Oct 2026). To refresh: download
// https://expense-checker.app.tc1.airbase.sg/data.json over it.
const PATH = "/tools/expense-checker";

const ITEMS: Expense[] = (data as Record<string, string>[])
  .map((r) => ({ name: r["Expense Type"].trim(), treatment: r["Tax Treatment"], url: r["IRAS Website"]?.trim() || undefined }))
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

const CONDITIONS = [
  "The expenses are solely incurred in the production of income.",
  "The expenses must be incurred. It is considered incurred when the legal liability to pay arises, regardless of whether the actual payment has been made.",
  "The expenses are revenue in nature, and not capital expenses. Revenue expenses are generally costs incurred in the day-to-day operations of a business to generate revenue (such as salaries, rent, and utilities), while capital expenses are investments in the business that are expected to provide long-term benefits (such as acquisition of fixed assets).",
  "The expenses are not prohibited from deduction under the Income Tax Act 1947.",
];

export const metadata = pageMetadata({
  path: PATH,
  title: "Business expense checker",
  description: `Check whether a business expense is tax-deductible in Singapore, with IRAS guidance on ${ITEMS.length} expense types and IRAS's four-condition check for any other expense.`,
});

export default function ExpenseCheckerPage() {
  return (
    <main className="view jb pull-under" id="view-expense-checker">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Expense checker", path: PATH }])} />
      <div className="wrap">
        <nav className="jb-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i aria-hidden="true">·</i><span aria-current="page">Expense checker</span></nav>
        <div className="jb-title">
          <h1>Business expense checker</h1>
          <p>IRAS guidance on {ITEMS.length} business expense types.</p>
        </div>
      </div>

      <section className="xc-sec" aria-label="Checker"><div className="wrap xc-col">
        <ExpenseChecker items={ITEMS} conditions={CONDITIONS} after={
          <div className="xc-card xc-cta"><p>Not sure how this applies to your company?</p><WaButton text="Hello Blaze Global, I would like to check whether an expense is tax-deductible." /></div>
        } />
        <div className="xc-source">
          <p>This tool is for general understanding and is not meant to comprehensively address all possible issues that arise. The application of tax treatment depends on the totality of facts and circumstances of each case.</p>
        </div>
      </div></section>

      <Help wa="Hello Blaze Global, I have a question about my company's tax deductions." chat={["Can we deduct our office renovation?", "Send us the invoice and we will check it against the IRAS rules."]} />
      <Credentials />
    </main>
  );
}
