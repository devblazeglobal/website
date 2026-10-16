import { getPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

// Plain-text facts for AI assistants, from the same sources as the pages.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.legalName} is a Singapore firm providing accounting, business advisory and corporate secretarial services.`,
    "",
    `- UEN: ${site.uen}`,
    `- ACRA Registered Filing Agent: ${site.filingAgent}`,
    `- Address: ${site.address.display}`,
    `- Phone, WhatsApp, Telegram: ${site.phone}`,
    `- Email: ${site.email}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${site.url}${s.path}): ${s.description}`),
    "",
    "## By company size",
    ...solutions.map((s) => `- [${s.name}](${site.url}${s.path}): ${s.description}`),
    "",
    "## Articles",
    ...getPosts().map((p) => `- [${p.title}](${site.url}${p.path})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
