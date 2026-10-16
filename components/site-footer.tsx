import Image from "next/image";
import Link from "next/link";

import { WhatsAppButton } from "@/components/cta";
import { products, solutionItems } from "@/lib/nav";
import { site } from "@/lib/site";

// harvey.ai footer: one serif line and a button, then link columns whose
// arrow slides in on hover.
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-cta">
          <p>Speak to a Chartered Accountant</p>
          <WhatsAppButton text="Hello Blaze Global, I would like to speak to an accountant." />
        </div>
        <div className="f-cols">
          <div className="f-brand">
            <Image src="/brand/blaze-global-wordmark-gold-1200.png" alt="Blaze Global" width={1200} height={100} />
            <address>
              14 Robinson Road, #08-01A
              <br />
              Far East Finance Building
              <br />
              Singapore {site.address.postalCode}
              <br />
              <a href={site.phoneHref}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
          </div>
          <div className="f-col">
            <h4>Products</h4>
            <ul>
              {products.map((g) => (
                <li key={g.name}><Link href={g.href}>{g.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>Solutions</h4>
            <ul>
              {solutionItems.map((s) => (
                <li key={s.name}><Link href={s.href}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about-us">About</Link></li>
              <li><Link href="/#team">Our team</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Follow</h4>
            <ul>
              <li><a href={site.social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="f-base">
          <span>Copyright © {new Date().getFullYear()} {site.legalName} All rights reserved.</span>
          <span>UEN {site.uen} · ACRA Registered Filing Agent {site.filingAgent}</span>
        </div>
      </div>
    </footer>
  );
}
