import Link from "next/link";

import { AxPlay } from "@/components/ax-play";

// Outsourced CFO and Digitalisation: four tinted panels, each ending in a
// live card (alex.com style). Figures in the cards are examples.
const Tk = () => <span className="tk">✓</span>;
export const CARDS: Record<string, React.ReactNode> = {
  "Financial models": (
    <>
      <div className="axc-h"><span>Scenarios · FY2027</span><span className="syn">Example</span></div>
      <div className="axt r1"><span>Scenario</span><span>Runway</span><span>Margin</span></div>
      <div className="axt r2"><span>Base plan</span><b>18 mo</b><b>22%</b></div>
      <div className="axt r3 on"><span>Hire 2 sales staff</span><b>14 mo</b><b>26%</b></div>
      <div className="axt r4"><span>Open Malaysia</span><b>11 mo</b><b>19%</b></div>
      <div className="axfoot r5">Built on Xero actuals <Tk /></div>
    </>
  ),
  "Cash flow visibility": (
    <>
      <div className="axc-h"><span>Cash forecast · 6 months</span><span className="live"><i />Live</span></div>
      <div className="axbars r1">{[62, 70, 54, 28, 46, 66].map((h, i) => <span key={i} className={i === 3 ? "low" : i > 1 ? "fc" : ""} style={{ "--h": `${h}%` } as React.CSSProperties}><i /></span>)}</div>
      <div className="axbl r2"><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></div>
      <div className="axr ok warn r3"><i /><span>February below S$50,000</span><span className="tk">!</span></div>
      <div className="axfoot r4">Updated after each close <Tk /></div>
    </>
  ),
  "Budgets and forecasts": (
    <>
      <div className="axc-h"><span>Budget vs actual · September</span><span className="syn">Example</span></div>
      <div className="axt r1"><span>Line</span><span>Budget</span><span>Actual</span></div>
      <div className="axt r2"><span>Revenue</span><b>S$120k</b><b className="up">S$128k</b></div>
      <div className="axt r3"><span>Staff costs</span><b>S$54k</b><b>S$53k</b></div>
      <div className="axt r4 on"><span>Marketing</span><b>S$8k</b><b className="dn">S$11k</b></div>
      <div className="axfoot r5">Variances explained <Tk /></div>
    </>
  ),
  "Process streamlining": (
    <>
      <div className="axc-h"><span>Month-end close</span><span className="live"><i />Live</span></div>
      <ul className="axl">
        <li className="r1"><span>Bank reconciled</span><b>✓</b></li>
        <li className="r2"><span>Bills approved online</span><b>✓</b></li>
        <li className="r3"><span>Accruals posted</span><b>✓</b></li>
        <li className="r4 wait"><span>Management report</span><b className="dots"><i /><i /><i /></b></li>
      </ul>
      <div className="axbar r5"><span>Close</span><span className="pg"><i /></span><span>Day 4 of 5</span></div>
    </>
  ),
  "Digitalisation and process improvement": (
    <>
      <div className="axc-h"><span>Purchase-to-pay workflow</span><span className="syn">Example</span></div>
      <div className="axt r1"><span>Step</span><span>Before</span><span>After</span></div>
      <div className="axt r2"><span>Bill entry</span><b>Manual</b><b className="up">Automatic</b></div>
      <div className="axt r3"><span>Approval</span><b>Email</b><b className="up">One click</b></div>
      <div className="axt r4"><span>Manual steps</span><b>12</b><b className="up">4</b></div>
      <div className="axfoot r5">Live on existing systems <Tk /></div>
    </>
  ),
  "AI-powered automation": (
    <>
      <div className="axc-h"><span>Supplier bill · automated</span><span className="live"><i />Live</span></div>
      <ol className="axflow">
        <li className="r1"><span className="nd" /><div><b>Bill received</b><small>Email from Acme Office Supplies · PDF</small></div><em>09:02</em></li>
        <li className="r2"><span className="nd" /><div><b>Read by AI</b><small>Supplier, date, amount and GST extracted</small></div><em>09:02</em></li>
        <li className="r3"><span className="nd" /><div><b>Checked</b><small>S$1,090.00 incl. GST 9% · matches purchase order</small></div><em>09:03</em></li>
        <li className="r4"><span className="nd" /><div><b>Coded</b><small>Office supplies · standard-rated</small></div><em>09:03</em></li>
        <li className="r5 end"><span className="nd" /><div><b>Posted to Xero for review</b><small>Waiting for approval</small></div><Tk /></li>
      </ol>
    </>
  ),
  "Sales and customers": (
    <>
      <div className="axc-h"><span>Sales · October</span><span className="live"><i />Live</span></div>
      <div className="axt r1"><span>Customer</span><span>Sales</span><span>Paid in</span></div>
      <div className="axt r2"><span>Customer A</span><b>S$32k</b><b>28 days</b></div>
      <div className="axt r3 on"><span>Customer B</span><b>S$21k</b><b className="dn">48 days</b></div>
      <div className="axt r4"><span>Customer C</span><b>S$14k</b><b>30 days</b></div>
      <div className="axfoot r5">From Xero and your CRM <Tk /></div>
    </>
  ),
  "Margin by product": (
    <>
      <div className="axc-h"><span>Gross margin by product</span><span className="syn">Example</span></div>
      <div className="axk r1"><span>Product line 1</span><b>48%</b></div>
      <div className="axk r2"><span>Product line 2</span><b>39%</b></div>
      <div className="axk r3"><span>Product line 3</span><b className="dn" style={{ color: "#b4430e" }}>22%</b></div>
      <div className="axr ok warn r4"><i /><span>Line 3 below 30% for 2 months</span><span className="tk">!</span></div>
    </>
  ),
  "Cash and forecast": (
    <>
      <div className="axc-h"><span>Cash · next 6 months</span><span className="live"><i />Live</span></div>
      <div className="axbars r1">{[66, 62, 48, 30, 44, 58].map((h, i) => <span key={i} className={i === 3 ? "low" : i > 0 ? "fc" : ""} style={{ "--h": `${h}%` } as React.CSSProperties}><i /></span>)}</div>
      <div className="axbl r2"><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span></div>
      <div className="axfoot r3">Forecast from receivables and bills <Tk /></div>
    </>
  ),
  "Compliance dates": (
    <>
      <div className="axc-h"><span>Upcoming filings</span><span className="syn">Synced</span></div>
      <div className="axf r1"><div><b>GST F5</b><small>IRAS</small></div><em className="sch">31 Oct</em></div>
      <div className="axf r2"><div><b>CPF and SHG</b><small>CPF Board</small></div><em className="sch">14 Nov</em></div>
      <div className="axf r3"><div><b>Annual return</b><small>ACRA</small></div><em>Filed</em></div>
      <div className="axfoot r4">From your compliance calendar <Tk /></div>
    </>
  ),
  "Dashboards and reporting": (
    <>
      <div className="axc-h"><span>Company dashboard</span><span className="live"><i />Live</span></div>
      <div className="axkpi r1"><div><small>Revenue · Oct</small><b>S$128k</b></div><div><small>Gross margin</small><b>41%</b></div><div><small>Cash</small><b>S$212k</b></div></div>
      <div className="axbars sm r2">{[40, 52, 48, 61, 58, 72, 80].map((h, i) => <span key={i} className={i === 6 ? "now" : ""} style={{ "--h": `${h}%` } as React.CSSProperties}><i /></span>)}</div>
      <div className="axfoot r3">Updated as transactions arrive <Tk /></div>
    </>
  ),
  "Connected sources": (
    <>
      <div className="axc-h"><span>Connections</span><span className="syn">Synced</span></div>
      <div className="axs r1"><b>Xero</b><span className="ln" /><b>BlazeOS</b></div>
      <div className="axs r2"><b>Google Sheets</b><span className="ln" /><b>BlazeOS</b></div>
      <div className="axs r3"><b>CRM</b><span className="ln" /><b>BlazeOS</b></div>
      <div className="axr ok r4"><i /><span>Refreshed daily</span><span className="tk">✓</span></div>
    </>
  ),
  "Trends and anomalies": (
    <>
      <div className="axc-h"><span>Trends and anomalies · October</span><span className="syn">Example</span></div>
      <div className="axt r1"><span>Metric</span><span>September</span><span>October</span></div>
      <div className="axt r2"><span>Revenue</span><b>S$120k</b><b className="up">S$128k</b></div>
      <div className="axt r3 on"><span>Days to pay · Customer B</span><b>36</b><b className="dn">48</b></div>
      <div className="axt r4 on"><span>Marketing spend</span><b>S$8k</b><b className="dn">S$11k</b></div>
      <div className="axfoot r5">Reviewed by a Chartered Accountant <Tk /></div>
    </>
  ),
  "Systems integration": (
    <>
      <div className="axc-h"><span>Connections</span><span className="syn">Synced</span></div>
      <div className="axs r1"><b>Xero</b><span className="ln" /><b>Google Sheets</b></div>
      <div className="axs r2"><b>Bank feeds</b><span className="ln" /><b>Xero</b></div>
      <div className="axs r3"><b>Sales platform</b><span className="ln" /><b>Xero</b></div>
      <div className="axr ok r4"><i /><span>Last sync 2 minutes ago</span><span className="tk">✓</span></div>
    </>
  ),
};

export function DeliverPanels({ h, items }: { h: string; items: [string, string, string][] }) {
  return (
    <section className="ax-sec ax-dlv" aria-labelledby="dlv-h">
      <AxPlay className="wide">
        <h2 className="ax-h" id="dlv-h">{h}</h2>
        <div className="ax c2">
          {items.map(([, t, d], i) => (
            <article key={t} className={`axp a${i + 1}`}>
              <h3>{t}</h3><p>{d}</p>
              <div className="axc" aria-hidden="true">{CARDS[t]}</div>
            </article>
          ))}
        </div>
      </AxPlay>
    </section>
  );
}

export function IncorporationBand() {
  return (
    <section className="ax-sec ax-inc" aria-labelledby="inc-h">
      <AxPlay className="wide">
        <article className="axp a1 axp-wide">
          <div className="axw-copy">
            <p className="ax-k">Starting a company?</p>
            <h2 className="ax-h" id="inc-h">Start with incorporation</h2>
            <p>As your ACRA Registered Filing Agent, we register your company on Bizfile and appoint your company secretary, so you are set up correctly from day one.</p>
            <Link className="btn btn-navy btn-lg" href="/start-a-business-in-singapore">Explore Incorporation</Link>
          </div>
          <div className="axc" aria-hidden="true">
            <div className="axc-h"><span>Incorporation · Pte Ltd</span><span className="live"><i />Live</span></div>
            <ul className="axl">
              <li className="r1"><span>Company name approved</span><b>✓</b></li>
              <li className="r2"><span>Constitution and consents signed</span><b>✓</b></li>
              <li className="r3"><span>Filed on Bizfile</span><b>✓</b></li>
              <li className="r4"><span>UEN issued</span><b>✓</b></li>
            </ul>
            <div className="axfoot r5">Company secretary appointed <Tk /></div>
          </div>
        </article>
      </AxPlay>
    </section>
  );
}
