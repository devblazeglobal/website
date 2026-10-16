"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { whatsappUrl } from "@/lib/site";

const prefersStill = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Rail: a horizontal track moved by arrow buttons only ----------
// The wheel scrolls the page, never the rail. Used for reviews and credentials.
export function Rail({ variant, children }: { variant: "reviews" | "creds"; children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const item = variant === "reviews" ? ".rvc" : ".crc";
  useEffect(() => {
    const t = track.current!;
    const sync = () => setEdge({ start: t.scrollLeft < 4, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 4 });
    const onScroll = () => { if (t.scrollTop) t.scrollTop = 0; sync(); };
    t.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", sync);
    sync();
    return () => { t.removeEventListener("scroll", onScroll); removeEventListener("resize", sync); };
  }, []);
  const move = (dir: number) => {
    const t = track.current!;
    const w = (t.querySelector(item) as HTMLElement | null)?.getBoundingClientRect().width ?? 300;
    t.scrollBy({ left: dir * (w + 20), behavior: "smooth" });
  };
  const prev = <button className="arrow" type="button" aria-label={`Previous ${variant === "reviews" ? "reviews" : "credentials"}`} disabled={edge.start} onClick={() => move(-1)}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg></button>;
  const next = <button className="arrow" type="button" aria-label={`Next ${variant === "reviews" ? "reviews" : "credentials"}`} disabled={edge.end} onClick={() => move(1)}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg></button>;
  return variant === "reviews" ? (
    <>
      <div className="track" ref={track}>{children}</div>
      <div className="wide rv-foot"><div className="arrows">{prev}{next}</div></div>
    </>
  ) : (
    <>
      <div className="cr-track" ref={track}>{children}</div>
      <div className="wide cr-foot">{prev}{next}</div>
    </>
  );
}

// ---------- Reveal: blocks fade up as they enter the viewport ----------
const FU = ".pc-h,.pc-cards li,.bn-row,.tl-h,.tl-grid li,.ev-h,.ev-grid li,.cx-hin>*,.stp-row,.rh-todo,.fk-h,.fk-cards li,.sp-hero h1,.sp-hero p,.hp-copy,.hp-fig,.lo-h,.lo-lead,.wh-h,.wh-tiles li,.hv-h,.hv-grid,.bl-lede,.bl-feat,.bl-grid li,.rv-cards li,.ab-ticks li,.ab-hero h1,.ab-hero p,.ab-who-copy,.ab-cr li,.team-h,.team-p,.seg,.intro,.xs-copy,.xs-vis,.cal2-head,.ap,.crc,.rvc";
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (prefersStill()) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    const scan = () => document.querySelectorAll<HTMLElement>(FU).forEach((el) => {
      if (el.classList.contains("fu")) return;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) return; // already in view on load: no animation
      el.classList.add("fu");
      const sib = [...(el.parentElement?.children ?? [])].filter((c) => c.matches(FU));
      el.style.transitionDelay = `${Math.min(sib.indexOf(el), 5) * 70}ms`;
      io.observe(el);
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const chats = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); chats.unobserve(e.target); } }), { threshold: 0.3 });
    document.querySelectorAll(".hp-chat:not(.in)").forEach((c) => chats.observe(c));
    const foot = document.querySelector(".site-footer");
    const fio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); fio.disconnect(); } }), { threshold: 0.2 });
    if (foot) fio.observe(foot);
    return () => { io.disconnect(); mo.disconnect(); chats.disconnect(); fio.disconnect(); };
  }, [pathname]);
  return null;
}

// ---------- Hero ask bar: the request opens in WhatsApp ----------
const EXAMPLES = ["XBRL filing for my company", "A company secretary for a new Pte Ltd", "Monthly bookkeeping on Xero", "Help with my GST registration", "Annual return and AGM documents"];
export function AskBar() {
  const [i, setI] = useState(0);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (prefersStill() || focus || q) return;
    const t = setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 2800);
    return () => clearInterval(t);
  }, [focus, q]);
  return (
    <form className="askbar" onSubmit={(e) => { e.preventDefault(); window.open(whatsappUrl(`Hello Blaze Global, I need help with: ${q.trim() || EXAMPLES[i]}`), "_blank", "noopener"); }}>
      <label className="sr" htmlFor="ask">Tell us what you need</label>
      <input id="ask" name="ask" autoComplete="off" maxLength={300} value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={`Tell us what you need, e.g. ${EXAMPLES[i]}`} />
      <button className="btn btn-wa" type="submit"><svg><use href="#wa" /></svg>Send on WhatsApp</button>
    </form>
  );
}

// ---------- Count-up figure ----------
export function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (prefersStill()) return;
    let raf = 0;
    const t0 = performance.now() + 400;
    const step = (t: number) => {
      const p = Math.max(0, Math.min(1, (t - t0) / 1400));
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}</span>;
}

// ---------- Service cards: mock windows drift with scroll ----------
export interface SegItem { name: string; card: string; cta: string; href: string; external?: boolean; openStart?: boolean; screen: [string, [string, string, string][]] }
function Seg({ c, className, children }: { c: SegItem; className: string; children: React.ReactNode }) {
  if (c.external) return <a className={className} href={c.href} target="_blank" rel="noopener">{children}</a>;
  if (c.openStart) return <a className={className} href={c.href} data-open-start="">{children}</a>;
  return <Link className={className} href={c.href}>{children}</Link>;
}

export function SegCards({ items }: { items: SegItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersStill()) return;
    let tick = false;
    const run = () => {
      root.current?.querySelectorAll<HTMLElement>(".seg .screen").forEach((s, k) => {
        const r = s.parentElement!.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
        s.style.setProperty("--py", `${(p * 70 + (k % 3) * 10).toFixed(1)}px`);
      });
      tick = false;
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(run); } };
    addEventListener("scroll", onScroll, { passive: true });
    run();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="seg-grid seg-two" ref={root}>
      {items.map((c, k) => (
        <Seg key={c.name} c={c} className={`seg seg-${k + 1}`}>
          <div className="copy"><h3>{c.name}</h3><p>{c.card}</p><span className="btn btn-ghost">{c.cta}</span></div>
          <div className="screen" aria-hidden="true">
            <div className="bar"><b>{c.screen[0]}</b></div>
            <ul>{c.screen[1].map((r) => <li key={r[0]}>{r[0]}<span className={`st ${r[2]}`}>{r[1]}</span></li>)}</ul>
          </div>
        </Seg>
      ))}
    </div>
  );
}

// ---------- Tabs that pick one panel (business structures, filings) ----------
export function useTabs(count: number) {
  const [k, setK] = useState(0);
  return { k, set: (i: number) => setK(Math.max(0, Math.min(count - 1, i))) };
}

// ---------- "What we handle": the active item follows the scroll ----------
// Wraps the static list markup; toggles .on on the list items and windows.
export function ScrollTabs({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = root.current!;
    const sec = box.closest("section") as HTMLElement;
    const items = [...box.querySelectorAll<HTMLLIElement>(".hv-list li")];
    const wins = [...box.querySelectorAll<HTMLElement>(".hv-win")];
    let cur = 0;
    const set = (i: number) => {
      cur = i;
      items.forEach((x, j) => { x.classList.toggle("on", i === j); x.querySelector("button")?.setAttribute("aria-expanded", String(i === j)); });
      wins.forEach((w, j) => w.classList.toggle("on", i === j));
    };
    const on = () => {
      if (innerWidth < 961) return;
      const r = sec.getBoundingClientRect(), span = r.height - innerHeight;
      if (span <= 0) return;
      const i = Math.floor(Math.max(0, Math.min(0.999, -r.top / span)) * items.length);
      if (i !== cur) set(i);
    };
    const clicks = items.map((li, i) => {
      const f = () => {
        set(i);
        if (innerWidth < 961) return;
        const span = sec.offsetHeight - innerHeight;
        scrollTo({ top: sec.getBoundingClientRect().top + scrollY + span * (i + 0.5) / items.length, behavior: "smooth" });
      };
      li.querySelector("button")?.addEventListener("click", f);
      return f;
    });
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); items.forEach((li, i) => li.querySelector("button")?.removeEventListener("click", clicks[i])); };
  }, []);
  return <div ref={root} style={{ display: "contents" }}>{children}</div>;
}
