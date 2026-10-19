import { Icon } from "@/components/ui";
import { whatsappUrl } from "@/lib/site";

// How to get started: three steps, then the two ways in. Home and every
// product page.
const STEPS: ["cal" | "doc" | "check", string, string][] = [
  ["cal", "Book a call", "Pick a time or send a WhatsApp message. A Chartered Accountant replies."],
  ["doc", "Share your requirements", "Tell us what the company needs. We list the documents and confirm the fee."],
  ["check", "We handle the rest", "Filings, books and deadlines managed. Every update on WhatsApp."],
];

export function GetStartedSteps({ wa = "Hello Blaze Global, I would like to book a call." }: { wa?: string }) {
  return (
    <section className="gss" aria-labelledby="gss-h"><div className="wide">
      <h2 className="gss-h" id="gss-h">How to get started</h2>
      <ol className="gss-grid">
        {STEPS.map(([k, t, d], i) => <li key={t}><Icon k={k} /><small>Step {i + 1}</small><h3>{t}</h3><p>{d}</p></li>)}
      </ol>
      <div className="gss-acts">
        <button className="btn btn-navy btn-lg" type="button" data-open-start>Book a free consultation</button>
        <a className="btn btn-wa btn-lg" href={whatsappUrl(wa)} target="_blank" rel="noopener"><svg><use href="#wa" /></svg>WhatsApp us</a>
      </div>
    </div></section>
  );
}
