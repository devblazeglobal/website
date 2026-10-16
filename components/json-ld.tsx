/** Structured data in the server-rendered HTML, where crawlers and AI
 * assistants read it without running JavaScript. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON from our own builders; "<" escaped so text can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
