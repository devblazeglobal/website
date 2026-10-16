"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { whatsappUrl } from "@/lib/site";

const NAV = [
  { href: "/about-us", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="on-navy sticky top-0 z-50 border-b border-white/10 bg-navy text-on-navy">
      <div className="mx-auto flex h-[72px] w-full max-w-[1728px] items-center justify-between px-sm md:px-md">
        <Link href="/" aria-label="Blaze Global home" onClick={() => setOpen(false)}>
          <Image src="/brand/blaze-global-wordmark-gold-1200.png" alt="Blaze Global" width={1200} height={100} priority className="h-[15px] w-auto md:h-[17px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`text-sm ${active(n.href) ? "text-gold" : "text-on-navy-muted hover:text-on-navy"}`}>
              {n.label}
            </Link>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noopener" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-[#f3c262]">
            WhatsApp us
          </a>
        </nav>
        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 px-sm pb-sm md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`block py-3 text-base ${active(n.href) ? "text-gold" : "text-white"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
