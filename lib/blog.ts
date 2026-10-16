import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Articles live in content/blog/<slug>.md: a JSON front-matter block, then
// a small Markdown subset (headings, paragraphs, lists, bold, links). The
// two articles from the Wix site keep their exact URLs under /post-1/.

export interface Post {
  slug: string;
  path: string;
  title: string;
  description: string;
  publishedAt: string;
  body: string;
}

const DIR = path.join(process.cwd(), "content", "blog");

function firstParagraph(md: string): string {
  const p = md.split(/\n{2,}/).find((b) => b.trim() && !b.startsWith("#") && b.length > 80) ?? "";
  const plain = p.replace(/\*\*|\[|\]\([^)]*\)/g, "").trim();
  return plain.length > 155 ? `${plain.slice(0, plain.lastIndexOf(" ", 152))}…` : plain;
}

function parse(file: string): Post {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`${file}: missing front matter`);
  const fm = JSON.parse(match[1]) as Record<string, string>;
  const body = match[2].trim();
  return {
    slug: fm.slug,
    path: fm.legacyPath ?? `/post-1/${fm.slug}`,
    title: fm.title,
    description: fm.description || firstParagraph(body),
    publishedAt: fm.publishedAt,
    body,
  };
}

export function getPosts(): Post[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return escape(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, href) => `<a href="${href}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

/** The subset the migrated articles use, rendered to HTML at build time. */
export function renderMarkdown(md: string): string {
  const out: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (list) {
      const tag = list.ordered ? "ol" : "ul";
      out.push(`<${tag}>${list.items.map((li) => `<li>${inline(li)}</li>`).join("")}</${tag}>`);
    }
    list = null;
  };
  for (const block of md.split(/\n{2,}/)) {
    const line = block.trim();
    if (!line) continue;
    const bullet = /^- ([\s\S]*)$/.exec(line);
    const numbered = /^\d+\. ([\s\S]*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flush();
    const h = /^(#{2,4}) (.*)$/.exec(line);
    if (h) out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
    else out.push(`<p>${inline(line)}</p>`);
  }
  flush();
  return out.join("\n");
}
