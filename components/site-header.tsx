"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { WhatsAppButton } from "@/components/cta";
import { Chevron } from "@/components/icons";
import { type NavItem, products, solutionItems } from "@/lib/nav";

type Menu = "products" | "solutions" | null;

function Item({ item }: { item: NavItem }) {
  return (
    <li>
      <Link className="item" href={item.href}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={item.icon} />
        </svg>
        <div>
          <b>{item.name}</b>
          <span>{item.text}</span>
        </div>
      </Link>
    </li>
  );
}

// Floating navy bar: Products and Solutions mega menus left, logo centred,
// WhatsApp right. One menu open at a time; click outside or Escape closes.
export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close every menu after navigation.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setMenu(null);
    setMobile(false);
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const tab = (id: Exclude<Menu, null>, label: string) => (
    <button className="tab" type="button" aria-expanded={menu === id} aria-controls={`mega-${id}`} onClick={() => setMenu(menu === id ? null : id)}>
      {label} <Chevron />
    </button>
  );

  return (
    <header className="topbar wide">
      <nav className="nav" aria-label="Main" ref={navRef}>
        <div className="links">
          {tab("products", "Products")}
          {tab("solutions", "Solutions")}
        </div>
        <Link className="logo" href="/" aria-label="Blaze Global home">
          <Image src="/brand/blaze-global-wordmark-gold-1200.png" alt="Blaze Global" width={1200} height={100} priority />
        </Link>
        <div className="right">
          <WhatsAppButton />
          <button className="burger" type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mnav" onClick={() => setMobile((v) => !v)}>
            <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
              <path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        <div className={`mega${menu === "products" ? " open" : ""}`} id="mega-products" role="region" aria-label="Products">
          {products.map((g) => (
            <div key={g.name}>
              <h4>{g.name}</h4>
              <ul>
                {g.items.map((it) => (
                  <Item key={it.name} item={it} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mega${menu === "solutions" ? " open" : ""}`} id="mega-solutions" role="region" aria-label="Solutions">
          <div>
            <h4>By company size</h4>
            <ul>
              {solutionItems.map((it) => (
                <Item key={it.name} item={it} />
              ))}
            </ul>
          </div>
          <div className="promo">
            <p>Not sure which applies to you?</p>
            <WhatsAppButton text="Hello Blaze Global, I am not sure which service I need." />
          </div>
        </div>
      </nav>

      <div className={`mnav${mobile ? " open" : ""}`} id="mnav">
        <h4>Products</h4>
        {products.map((g) => (
          <Link key={g.name} href={g.href}>{g.name}</Link>
        ))}
        <h4>Solutions</h4>
        {solutionItems.map((s) => (
          <Link key={s.name} href={s.href}>{s.name}</Link>
        ))}
        <h4>Company</h4>
        <Link href="/about-us">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <WhatsAppButton style={{ marginTop: "var(--sm)", width: "100%", border: 0 }} />
      </div>
    </header>
  );
}
