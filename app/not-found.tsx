import Link from "next/link";

import { Container } from "@/components/page-blocks";

export default function NotFound() {
  return (
    <Container className="py-2xl">
      <h1 className="display-lg">Page not found</h1>
      <p className="mt-3 text-muted">This page does not exist or has moved.</p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-ink">
        <Link href="/" className="underline underline-offset-4">Home</Link>
        <Link href="/services" className="underline underline-offset-4">Services</Link>
        <Link href="/contact" className="underline underline-offset-4">Contact</Link>
      </div>
    </Container>
  );
}
