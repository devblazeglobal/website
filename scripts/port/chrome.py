"""Ports the mock-up header, footer and SVG sprite to components."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from html2jsx import convert
SRC = pathlib.Path(sys.argv[1])
MOBILE = (pathlib.Path(__file__).parent / 'mobile-menu.jsx.txt').read_text().strip()
OUT = pathlib.Path(__file__).resolve().parents[2]
s = convert((SRC / 'chunk-header.html').read_text())
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:80], s.count(a)); s = s.replace(a, b)
rep('<div className="navwrap" id="navwrap">', '<div className={`navwrap${menu ? " open" : ""}`} ref={wrap} onMouseLeave={leave} onMouseEnter={() => clearTimeout(timer.current)}>')
for m in ['products', 'solutions']:
    rep(f'data-menu="{m}" aria-expanded="false" aria-controls="drop"', f'aria-expanded={{menu === "{m}"}} aria-controls="drop" onClick={{() => toggle("{m}")}} onMouseEnter={{() => hover("{m}")}}')
    rep(f'<div className="dpanel" data-panel="{m}">', f'<div className={{`dpanel${{menu === "{m}" ? " on" : ""}}`}} onClick={{(e) => {{ if ((e.target as HTMLElement).closest("a")) setMenu(null); }}}}>')
rep('<button className="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">', '<button className={`burger${mobile ? " x" : ""}`} type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mnav" onClick={() => setMobile((o) => !o)}>')
import re as _re
a = s.index('<div className="mnav" id="mnav">'); b = s.index('</div>', a) + len('</div>')
s = s[:a] + MOBILE + s[b:]
rep('alt="Blaze Global" width={1200} height={100} />', 'alt="Blaze Global" width={1200} height={100} priority />')
s = s.replace(' style={{background: "#fff", color: "var(--navy)"}}', '')
(OUT / 'components/site-header.tsx').write_text('''"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Navy bar that follows the scroll. Products and Solutions open a panel
// over the page: hover on desktop, click anywhere. The burger opens the
// mobile menu. Markup ported from the approved mock-up (scripts/port).

type Menu = "products" | "solutions" | null;

export function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const [group, setGroup] = useState<"p" | "s" | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setMenu(null); setMobile(false); setGroup(null); }
  const canHover = () => matchMedia("(hover: hover) and (min-width: 1101px)").matches;
  const toggle = (m: Menu) => setMenu((cur) => (cur === m ? null : m));
  const hover = (m: Menu) => { if (canHover()) { clearTimeout(timer.current); setMenu(m); } };
  const leave = () => { if (canHover() && menu) timer.current = setTimeout(() => setMenu(null), 180); };

  useEffect(() => {
    const away = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setMenu(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(null); setMobile(false); } };
    document.addEventListener("click", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", away); document.removeEventListener("keydown", esc); };
  }, []);

  return (
''' + s + '''
  );
}
''')
f = convert((SRC / 'chunk-footer.html').read_text()).replace('<footer className="site-footer xf" id="footer">', '<footer className="site-footer xf">')
(OUT / 'components/site-footer.tsx').write_text('''import Link from "next/link";

// exa.ai-style footer: the words rise in when it scrolls into view (Reveal adds .in).
export function SiteFooter() {
  return (
''' + f + '''
  );
}
''')
sp = convert((SRC / 'chunk-sprite.html').read_text())
sp = '\n'.join(l for l in sp.split('\n') if 'id="mag"' not in l)
(OUT / 'components/sprite.tsx').write_text('''// SVG symbols used across the site: WhatsApp, Google, star, chevron.
export function Sprite() {
  return (
''' + sp.strip() + '''
  );
}
''')
print('ok')
