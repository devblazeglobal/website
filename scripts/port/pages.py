"""Ports the mock-up views to page components. Interactive parts become
islands (React components); everything else is the mock-up markup as JSX."""
import re, html, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from html2jsx import convert

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(__file__).resolve().parents[2]

def balanced(s, start):
    i = s.index(start)
    tag = re.match(r'<([a-z0-9]+)', s[i:]).group(1)
    depth, j = 0, i
    pat = re.compile(rf'<(/?){tag}\b[^>]*?(/?)>')
    for m in pat.finditer(s, i):
        if m.group(1): depth -= 1
        elif not m.group(2): depth += 1
        if depth == 0: return i, m.end()
    raise ValueError(start)

def island(s, start, jsx, all_=False):
    while True:
        try: a, b = balanced(s, start)
        except ValueError: return s
        s = s[:a] + f'<x-island jsx="{html.escape(jsx, quote=True)}"></x-island>' + s[b:]
        if not all_: return s

def inner(s, start):
    a, b = balanced(s, start); seg = s[a:b]
    o = seg.index('>') + 1; c = seg.rindex('<')
    return seg[o:c]

def imgs(jsx):
    return jsx.replace('<Image src="/images/', '<Image sizes="(max-width: 900px) 90vw, 33vw" src="/images/')

def page(name, jsx, imports, extra=''):
    body = imgs(jsx).replace('<main className="view"', '<main className="view"').replace(' hidden>', '>', 1)
    imports = list(imports)
    if '<Image' in body and not any('next/image' in i for i in imports): imports.insert(0, 'import Image from "next/image";')
    if '<Image' not in body: imports = [i for i in imports if 'next/image' not in i]
    if '<Link' in body: imports.insert(0, 'import Link from "next/link";')
    head = '\n'.join(imports).replace('\n\n\n', '\n\n').lstrip()
    return f'{head}\n\n{extra}export function {name}() {{\n  return (\n{body}\n  );\n}}\n'

def read(n): return (SRC / n).read_text()

# ---------- Home ----------
h = read('chunk-home.html')
h = island(h, '<form class="askbar"', '<AskBar />')
h = island(h, '<span data-count="120">', '<CountUp to={120} />')
h = island(h, '<div class="gstars" data-stars>', '<Stars />', all_=True)
h = island(h, '<section class="reviews" id="reviews"', '<Reviews id="reviews" />')
h = island(h, '<div class="seg-grid seg-two" data-rail="services">', '<SegCards items={HOME_SERVICES} />')
h = island(h, '<div class="xs-vis">', '<StructureChart />')
h = island(h, '<section class="cal2"', '<section className="cal2" aria-labelledby="cal2-title"><div className="wide"><ComplianceCalendar /></div></section>')
h = island(h, '<section class="creds" id="credentials"', '<Credentials id="credentials" />')
h = h.replace('<main class="view" id="view-home">', '<main className="view" id="view-home">')
(OUT / 'components/views/home.tsx').write_text(page('HomeView', convert(h), [
    'import Image from "next/image";', '',
    'import { AskBar, CountUp, SegCards, type SegItem } from "@/components/interactive";',
    'import { Credentials, Reviews, Stars } from "@/components/ui";',
    'import { ComplianceCalendar, StructureChart } from "@/components/widgets";'],
    extra='''const HOME_SERVICES: SegItem[] = [
  { name: "Accounting", card: "Bookkeeping, management reports, GST returns, unaudited financial statements, XBRL and corporate tax, filed with ACRA and IRAS.", cta: "Accounting services", href: "/services/accounting",
    screen: ["Year-end close", [["Bank, card and cash reconciled", "Done", "done"], ["Management report", "Ready", "done"], ["Unaudited financial statements", "In review", "next"], ["XBRL", "Next", "todo"], ["Filed with ACRA and IRAS", "Next", "todo"]]] },
  { name: "Corporate Secretarial", card: "Incorporation, a qualified company secretary, AGMs, annual returns, registers and changes to directors and shareholders.", cta: "Corporate secretarial services", href: "/services/corporate-secretarial",
    screen: ["Annual compliance", [["Company secretary appointed", "Done", "done"], ["Company registers updated", "Done", "done"], ["AGM documents", "Ready", "next"], ["Annual return filed with ACRA", "Scheduled", "todo"], ["Directors' resolutions", "Scheduled", "todo"]]] },
];

'''))

# ---------- Start a business ----------
s = read('chunk-sab.html')
s = island(s, '<div class="rh-imgs"', '<div className="rh-imgs" aria-hidden="true"><Image className="on" src="/images/sg-1.jpg" alt="" fill priority sizes="100vw" /></div>')
s = island(s, '<ul class="td-list" id="td-list">', '<ul className="td-list">{CHECKLIST.map(([t, done], j) => <li key={t} className={done ? "done" : undefined} style={{ "--d": `${j * 70}ms` }}><span className="td-c">{done ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}</span>{t}</li>)}</ul>')
s = s.replace('<span id="td-n">5 of 7</span>', '<span>5 of 7 done</span>')
s = island(s, '<div class="seg-grid seg-two" data-rail="founders">', '<SegCards items={FOUNDERS} />')
s = island(s, '<div class="lg-card" data-xs2>', '<StructureTabs />')
hv = inner(s, '<div class="hv-grid" data-hv>')
s = island(s, '<div class="hv-grid" data-hv>', '<ScrollTabs><div className="hv-grid">' + convert(hv) + '</div></ScrollTabs>')
s = island(s, '<section class="reviews" id="reviews-sab"', '<Reviews heading="What our clients say" />')
s = island(s, '<div data-cr-slot>', '<Credentials />')
s = island(s, '<div data-help-slot', '<Help wa="Hello Blaze Global, I would like to register a company in Singapore." chat={["Can you register my company this week?", "Yes. Send the company name and director details. Most companies are registered within 1 working day."]} />')
s = s.replace('<main class="view" id="view-start-a-business" hidden>', '<main className="view" id="view-start-a-business">')
(OUT / 'components/views/start-a-business.tsx').write_text(page('StartBusinessView', convert(s), [
    'import Image from "next/image";', '',
    'import { ScrollTabs, SegCards, type SegItem } from "@/components/interactive";',
    'import { Credentials, Help, Reviews } from "@/components/ui";',
    'import { StructureTabs } from "@/components/widgets";',
    'import { whatsappUrl } from "@/lib/site";'],
    extra='''const CHECKLIST: [string, boolean][] = [["Business structure chosen", true], ["Company name approved", true], ["Resident director", true], ["Shareholders and paid-up capital", true], ["Registered address", true], ["Company secretary, within 6 months", false], ["Bank account documents", false]];

const FOUNDERS: SegItem[] = [
  { name: "For local founders", card: "Citizens, permanent residents and pass holders. Incorporation, company secretary and books from day one.", cta: "Incorporate as a local founder", href: "#get-started", openStart: true,
    screen: ["Bizfile application", [["Company name", "Approved", "done"], ["Directors and shareholders", "Singpass verified", "done"], ["Constitution", "Ready", "done"], ["Registration", "Submitted", "next"]]] },
  { name: "For overseas founders", card: "Founders outside Singapore. Identity checks, signing and filing online. No visit needed.", cta: "Incorporate from overseas", external: true,
    href: whatsappUrl("Hello Blaze Global, I am an overseas founder and would like to register a company in Singapore."),
    screen: ["Overseas founder", [["Identity verified", "Online", "done"], ["Resident director", "Options sent", "next"], ["Registered address", "Confirmed", "done"], ["Documents", "To sign", "todo"]]] },
];

'''))

# ---------- About ----------
a = read('chunk-about.html')
a = island(a, '<div data-cr-slot>', '<Credentials />')
a = island(a, '<div data-help-slot', '<Help wa="Hello Blaze Global, I would like to speak to your team." chat={["Who will look after our account?", "A Chartered Accountant on our team, reachable here on WhatsApp."]} />')
a = a.replace('<main class="view" id="view-about" hidden>', '<main className="view" id="view-about">')
(OUT / 'components/views/about.tsx').write_text(page('AboutView', convert(a), ['import { Credentials, Help } from "@/components/ui";']))
print('ok')
