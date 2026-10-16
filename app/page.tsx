import Link from "next/link";

import { ContactBlock } from "@/components/contact-block";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { Accreditations, ProofStrip, ServiceCards, Testimonial } from "@/components/home-blocks";
import { Container, Section, SectionHeading } from "@/components/page-blocks";
import { about, intro } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  title: "Blaze Global | Accounting, Business Advisory and Corporate Secretarial in Singapore",
  description:
    "Singapore accounting, business advisory and corporate secretarial services. Chartered Accountants, ACRA Registered Filing Agent FA20210247, Robinson Road.",
});

// Page flow from the brand guide (lawhive.co.uk order): hero, proof,
// services, about, testimonial, accreditations, call to action, contact.
export default function Home() {
  return (
    <>
      <section className="on-navy bg-navy text-on-navy">
        <Container className="pb-xl pt-2xl">
          <div className="grid gap-md lg:grid-cols-[1.7fr_1fr] lg:items-end">
            <h1 className="display-lg">Accounting, business advisory and corporate secretarial services in Singapore</h1>
            <div className="space-y-md">
              <p className="text-lg leading-relaxed text-on-navy-muted">{site.tagline} We do the hard work to make things simple.</p>
              <div className="flex flex-wrap gap-sm">
                <WhatsAppButton />
                <CallButton onNavy />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface py-lg">
        <Container>
          <ProofStrip />
        </Container>
      </section>

      <Section>
        <SectionHeading eyebrow="Services">Our services</SectionHeading>
        <div className="mb-lg grid gap-md text-muted lg:grid-cols-2">
          {intro.map((p) => (
            <p key={p.slice(0, 20)} className="leading-relaxed">{p}</p>
          ))}
        </div>
        <ServiceCards />
      </Section>

      <Section tone="alt">
        <div className="grid gap-lg lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="About">About Blaze Global</SectionHeading>
          <div className="space-y-sm text-lg leading-relaxed">
            {about.slice(0, 2).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <Link href="/about-us" className="inline-block pt-sm text-sm font-medium underline underline-offset-4">
              About us
            </Link>
          </div>
        </div>
      </Section>

      <Section id="testimonials">
        <p className="label mb-md text-gold-text">Client review</p>
        <Testimonial />
      </Section>

      <Section tone="alt">
        <SectionHeading eyebrow="Accreditations">Partners and accreditations</SectionHeading>
        <Accreditations />
      </Section>


      <Section id="contact">
        <SectionHeading eyebrow="Contact">Contact us</SectionHeading>
        <ContactBlock />
      </Section>
    </>
  );
}
