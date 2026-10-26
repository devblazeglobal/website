// BlazeOS: ported from the approved mock-up (claude.ai artifact GPzCjkcXQCMh7WwDfoiAGT, 24 Oct 2026).
// Data integration, dashboards and insights: consolidation, visibility and
// actionable insights. Styles are the b2-* block at the end of app/site.css.
export function BlazeOSView() {
  return (
    <main className="view b2-root" id="view-blazeos">
      <section className="b2-hero" aria-labelledby="h1"><div className="b2-in">
        <h1 id="h1">BlazeOS</h1>
        <div className="b2-hero-line">
          <p>The agentic operating system for your business data</p>
        </div>
        <p className="b2-hero-sub">All your data. One clear view. Smarter decisions.</p>
      </div></section>

      <section className="b2-band" aria-label="Example BlazeOS dashboard"><div className="b2-in">
        <div className="b2-dash b2-rv">
          <div className="b2-dh"><span>BlazeOS · Example Pte Ltd</span><span>Updated 08:00 · Example figures</span></div>
          <div className="b2-kpis">
            <div><small>Operating cash flow · Oct</small><b>S$96k</b><em>+8.0% vs Sep</em></div>
            <div><small>Free cash flow · Oct</small><b>S$74k</b><em>+11.0% vs Sep</em></div>
            <div><small>Debt service cover</small><b>4.4x</b><em>Serviceable</em></div>
            <div><small>Available to reinvest</small><b className="b2-gd">S$43k</b><em>After debt and tax</em></div>
          </div>
          <div className="b2-drow">
            <div className="b2-chart"><div className="b2-ch"><small>Cash flow and free cash flow, S$k</small><span className="b2-lg"><i className="b2-l1"></i>Cash flow<i className="b2-l2"></i>Free cash flow</span></div>
              <div className="b2-cf" role="img" aria-label="Operating cash flow and free cash flow, May to October. October: cash flow S$96k, free cash flow S$74k.">
                <div><span><i className="b2-o" style={{"--h": "68%", "--n": "0"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "48%", "--n": "0"} as React.CSSProperties}></i></span><em>May</em></div>
                <div><span><i className="b2-o" style={{"--h": "72%", "--n": "1"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "50%", "--n": "1"} as React.CSSProperties}></i></span><em>Jun</em></div>
                <div><span><i className="b2-o" style={{"--h": "66%", "--n": "2"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "44%", "--n": "2"} as React.CSSProperties}></i></span><em>Jul</em></div>
                <div><span><i className="b2-o" style={{"--h": "78%", "--n": "3"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "56%", "--n": "3"} as React.CSSProperties}></i></span><em>Aug</em></div>
                <div><span><i className="b2-o" style={{"--h": "84%", "--n": "4"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "63%", "--n": "4"} as React.CSSProperties}></i></span><em>Sep</em></div>
                <div><span><i className="b2-o" style={{"--h": "92%", "--n": "5"} as React.CSSProperties}></i><i className="b2-f" style={{"--h": "71%", "--n": "5"} as React.CSSProperties}></i></span><em>Oct</em></div>
              </div>
            </div>
            <div className="b2-flags"><small>Reinvestment capacity · October</small>
              <ul className="b2-wf"><li><span>Free cash flow</span><span>S$74k</span></li><li><span>Debt service</span><span className="b2-m">−S$22k</span></li><li><span>Tax reserve</span><span className="b2-m">−S$9k</span></li><li className="b2-tot"><span>Available to reinvest</span><span>S$43k</span></li></ul>
            </div>
          </div>
        </div>
      </div></section>

      <section className="b2-trust" aria-label="Credentials"><div className="b2-in">
        <ul><li><b>OCBC</b><span>Qualified Introducer and Channel Partner</span></li><li><b>ACRA Registered Filing Agent</b><span>FA20210247</span></li><li><b>Chartered Accountants</b><span>Members of ISCA</span></li><li><b>120+</b><span>Businesses served</span></li></ul>
      </div></section>

      <section className="b2-sec" aria-labelledby="how-h"><div className="b2-in">
        <div className="b2-sec-head b2-c b2-full b2-rv"><p className="b2-eyebrow">How BlazeOS works</p><h2 className="b2-h2 b2-one" id="how-h">From scattered data to actionable insights</h2></div>
        <div className="b2-flow">
          <article className="b2-stage b2-rv">
            <p className="b2-k">1 · Connect</p>
            <h3>Consolidation</h3>
            <p>Financial and operational data from your accounting, sales and operations systems, brought together in one place.</p>
            <div className="b2-chips"><span>Xero</span><span>Google Sheets</span><span>CRM</span><span>Bank feeds</span><span>Invoices and bills</span></div>
          </article>
          <div className="b2-pipe" aria-hidden="true"></div>
          <article className="b2-stage b2-core b2-rv">
            <p className="b2-k">2 · Configure</p>
            <h3>Rules and proprietary AI</h3>
            <p>Your metrics, rules and thresholds, set up with our own AI configuration around how your business runs.</p>
            <div className="b2-rules"><div><span>Revenue mapped by product</span><b>Rule</b></div><div><span>Sales grouped by customer</span><b>Rule</b></div><div><span>Trends and anomalies</span><b>AI</b></div></div>
          </article>
          <div className="b2-pipe" aria-hidden="true"></div>
          <article className="b2-stage b2-rv">
            <p className="b2-k">3 · Understand</p>
            <h3>Visibility and actionable insights</h3>
            <p>Key metrics at a glance, and insights that point to the next decision. Reviewed by Chartered Accountants.</p>
            <div className="b2-outs"><div>Cash flow and free cash flow</div><div>Capacity to reinvest</div><div>Trends and anomalies flagged</div></div>
          </article>
        </div>
        <div className="b2-flow-cta b2-rv"><a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20see%20a%20BlazeOS%20demo." target="_blank" rel="noopener"><svg><use href="#wa"></use></svg>WhatsApp us</a></div>
      </div></section>

      <section className="b2-sec" style={{paddingTop: "0"} as React.CSSProperties} aria-labelledby="cg-h"><div className="b2-in">
        <div className="b2-sec-head b2-rv"><p className="b2-eyebrow">Capabilities</p><h2 className="b2-h2" id="cg-h">Your business, connected. Your numbers, explained.</h2><p className="b2-lead">Your business runs on multiple systems. BlazeOS brings your financial and operational data together into interactive dashboards, from Xero and spreadsheets to your CRM, so you can track performance, identify trends and make better-informed decisions.</p></div>
        <div className="b2-cg">
          <article className="b2-big b2-rv">
            <div className="b2-scene" aria-hidden="true">
              <div className="b2-glass"><div className="b2-glass b2-sub"><small>Xero · Sheets · CRM</small></div><small>BlazeOS · Monthly report</small><p>October report ready. Revenue S$128k, up 6.7% on September. Gross margin 41%.</p></div>
            </div>
            <h3>Turn scattered data into one connected view</h3>
            <p>Xero, spreadsheets, your CRM and bank feeds land in one database set up for your company alone. Every report draws on the same figures, so every team works from one version.</p>
          </article>
          <article className="b2-big b2-rv">
            <div className="b2-scene b2-b" aria-hidden="true">
              <div className="b2-glass"><small>BlazeOS AI · Flagged for review</small><p>Customer B is paying in 48 days, up from 36. Marketing spend is S$3k above plan this month.</p></div>
            </div>
            <h3>Go beyond reports and act on what changes</h3>
            <p>Rules-based checks and our proprietary AI watch the numbers every day. Trends and anomalies are flagged, reviewed by a Chartered Accountant, then sent to you.</p>
          </article>
          <article className="b2-rv">
            <div className="b2-tiles" aria-hidden="true"><span>Xero</span><span>Google Sheets</span><span>CRM</span><span>Bank feeds</span></div>
            <h3>Connect the systems you already use</h3>
          </article>
          <article className="b2-rv">
            <div className="b2-tags" aria-hidden="true"><span style={{"--p": "80%"} as React.CSSProperties}>P&amp;L</span><span style={{"--p": "60%"} as React.CSSProperties}>Cash flow</span><span style={{"--p": "45%"} as React.CSSProperties}>Margin</span><span style={{"--p": "70%"} as React.CSSProperties}>Receivables</span><span style={{"--p": "55%"} as React.CSSProperties}>Budget</span><span style={{"--p": "35%"} as React.CSSProperties}>KPIs</span></div>
            <h3>Report on what management reads every month</h3>
          </article>
          <article className="b2-rv">
            <div className="b2-sliders" aria-hidden="true">
              <div className="b2-sl"><span>Margin floor</span><span className="b2-tr"><i style={{"--v": "60%", "--c": "var(--royal)"} as React.CSSProperties}></i></span><b>30%</b></div>
              <div className="b2-sl"><span>Days to pay</span><span className="b2-tr"><i style={{"--v": "45%", "--c": "var(--gold)"} as React.CSSProperties}></i></span><b>45</b></div>
              <div className="b2-sl"><span>Spend vs plan</span><span className="b2-tr"><i style={{"--v": "30%", "--c": "#4e6bd6"} as React.CSSProperties}></i></span><b>+10%</b></div>
            </div>
            <h3>Set the rules to match how you run the business</h3>
          </article>
        </div>
      </div></section>

      <section className="b2-sec b2-val" aria-labelledby="val-h"><div className="b2-in">
        <h2 id="val-h" className="b2-rv">BlazeOS brings every system into one view, so management sees the business clearly and knows what it can reinvest.</h2>
        <div className="b2-val-g">
          <div className="b2-lights b2-rv" role="img" aria-label="Evening light through a row of office windows"></div>
          <div className="b2-val-list">
            <div className="b2-rv"><h3>Consolidation</h3><p>From Xero and spreadsheets to CRM and other business platforms, we transform disconnected data into meaningful insights, helping you track performance, identify trends and make better-informed decisions.</p></div>
            <div className="b2-rv"><h3>Visibility</h3><p>Dynamic dashboards with regularly refreshed data. Revenue, margin, cash flow and free cash flow at a glance, without compiling a report.</p></div>
            <div className="b2-rv"><h3>Actionable insights</h3><p>AI-assisted analysis surfaces trends and anomalies, and shows how much cash is free after debt and tax, so you know what you can reinvest. A Chartered Accountant reviews each insight.</p></div>
          </div>
        </div>
      </div></section>

      <section className="b2-cta" id="cta" aria-label="Book a demo"><div className="b2-in">
        <div className="b2-bar2 b2-rv"><div className="b2-bt"><p>Deploy the BlazeOS AI layer</p><small>Powered by technology. Backed by financial expertise.</small></div><div className="b2-b"><button className="btn btn-white" type="button" data-open-start>Get started</button><a className="btn btn-wa" href="https://wa.me/6598199108?text=Hello%20Blaze%20Global%2C%20I%20would%20like%20to%20see%20a%20BlazeOS%20demo." target="_blank" rel="noopener"><svg><use href="#wa"></use></svg>WhatsApp us</a></div></div>
      </div></section>
    </main>
  );
}
