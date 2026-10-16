import { site, whatsappUrl } from "@/lib/site";

// Brand guide Button: primary = gold fill, navy text, radius-md; one per
// screen area. Secondary = outline in line-strong (light) or white (navy).
const base = "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors";

export function WhatsAppButton({ text, label = "WhatsApp us", className = "" }: { text?: string; label?: string; className?: string }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener" className={`${base} bg-gold text-navy hover:bg-[#f3c262] ${className}`}>
      {label}
    </a>
  );
}

export function CallButton({ onNavy = false, className = "" }: { onNavy?: boolean; className?: string }) {
  const tone = onNavy ? "border border-white/60 text-on-navy hover:bg-navy-raised" : "border border-line-strong text-ink hover:border-ink";
  return (
    <a href={site.phoneHref} className={`${base} ${tone} ${className}`}>
      Call {site.phone}
    </a>
  );
}

/** Fixed bar on phones: the two ways to reach the firm, one tap each. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={site.phoneHref} className={`${base} border border-line-strong text-ink`}>
        Call
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener" className={`${base} bg-gold text-navy`}>
        WhatsApp
      </a>
    </div>
  );
}
