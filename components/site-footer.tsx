import Image from "next/image";
import Link from "next/link";

import { services } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";

const link = "text-on-navy-muted hover:text-on-navy";

export function SiteFooter() {
  return (
    <footer className="on-navy bg-navy text-on-navy">
      <div className="mx-auto grid w-full max-w-[1092px] gap-lg px-sm pb-lg pt-xl md:grid-cols-4 md:px-md">
        <div className="md:col-span-2">
          <Image src="/brand/blaze-global-wordmark-gold-1200.png" alt="Blaze Global" width={1200} height={100} className="h-[17px] w-auto" />
          <address className="mt-md space-y-xs text-sm not-italic text-on-navy-muted">
            <p>{site.address.display}</p>
            <p>
              <a href={site.phoneHref} className={link}>{site.phone}</a>
              {" · "}
              <a href={whatsappUrl()} target="_blank" rel="noopener" className={link}>WhatsApp</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
            </p>
          </address>
        </div>
        <div>
          <p className="label text-gold">Services</p>
          <ul className="mt-sm space-y-xs text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.path} className={link}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-gold">Company</p>
          <ul className="mt-sm space-y-xs text-sm">
            <li><Link href="/about-us" className={link}>About</Link></li>
            <li><Link href="/blog" className={link}>Blog</Link></li>
            <li><Link href="/contact" className={link}>Contact</Link></li>
            <li><a href={site.social.linkedin} target="_blank" rel="noopener" className={link}>LinkedIn</a></li>
            <li><a href={site.social.instagram} target="_blank" rel="noopener" className={link}>Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-[1092px] px-sm py-md text-xs text-on-navy-muted md:px-md">
          © {new Date().getFullYear()} {site.legalName} · UEN {site.uen} · ACRA Registered Filing Agent {site.filingAgent}
        </p>
      </div>
    </footer>
  );
}
