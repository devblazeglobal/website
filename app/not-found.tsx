import Link from "next/link";

export default function NotFound() {
  return (
    <main className="view" id="view-company">
      <section className="sp-hero pull-under"><div className="wide">
        <h1>Page not found</h1>
        <p>This page does not exist or has moved.</p>
        <div className="fk-acts"><Link className="btn btn-navy btn-lg" href="/">Home</Link><Link className="btn btn-ghost-navy btn-lg" href="/services">Services</Link></div>
      </div></section>
    </main>
  );
}
