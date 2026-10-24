import { getPosts } from "@/lib/blog";
import { accountingPages, guides, mainPages, solutionPages } from "@/lib/catalog";
import { site } from "@/lib/site";

// Plain-text facts for AI assistants, from the same sources as the pages.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.legalName} is a Singapore firm of Chartered Accountants providing accounting, tax and corporate secretarial services, with over 60 years of combined experience across Big Four firms, high-growth startups and multinational corporations.`,
    "",
    `- UEN: ${site.uen}`,
    `- ACRA Registered Filing Agent: ${site.filingAgent}`,
    `- Address: ${site.address.display}`,
    `- Phone, WhatsApp, Telegram: ${site.phone}`,
    `- Email: ${site.email}`,
    "",
    "## Services",
    ...[...mainPages, ...accountingPages].map((s) => `- [${s.name}](${site.url}${s.path}): ${s.description}`),
    "",
    "## Guides and tools",
    ...guides.map((s) => `- [${s.name}](${site.url}${s.path}): ${s.description}`),
    "",
    "## By company size",
    ...solutionPages.map((s) => `- [${s.name}](${site.url}${s.path}): ${s.description}`),
    "",
    "## Articles",
    ...getPosts().map((p) => `- [${p.title}](${site.url}${p.path})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
