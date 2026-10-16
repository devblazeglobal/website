import { WhatsAppIcon } from "@/components/icons";
import { site, whatsappUrl } from "@/lib/site";

// Brand guide Button: every WhatsApp action is gold with navy text and the
// WhatsApp glyph. Secondary actions are outlines (btn-line on light
// grounds, btn-ghost on navy).

export function WhatsAppButton({ text, label = "WhatsApp us", className = "", style }: { text?: string; label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener" className={`btn btn-wa ${className}`} style={style}>
      <WhatsAppIcon />
      {label}
    </a>
  );
}

export function CallButton({ onNavy = false, className = "" }: { onNavy?: boolean; className?: string }) {
  return (
    <a href={site.phoneHref} className={`btn ${onNavy ? "btn-ghost" : "btn-line"} ${className}`}>
      Call {site.phone}
    </a>
  );
}

/** Fixed bar on phones: the two ways to reach the firm, one tap each. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={site.phoneHref} className="btn btn-line">
        Call
      </a>
      <WhatsAppButton label="WhatsApp" />
    </div>
  );
}
