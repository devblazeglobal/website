import { EnquiryForm } from "@/components/enquiry-form";
import { site, whatsappUrl } from "@/lib/site";

export function ContactDetails() {
  return (
    <dl className="space-y-md text-base">
      <div>
        <dt className="label text-gold-text">Phone, WhatsApp or Telegram</dt>
        <dd className="mt-xs">
          <a href={site.phoneHref} className="text-ink underline underline-offset-4">{site.phone}</a>
          {" · "}
          <a href={whatsappUrl()} target="_blank" rel="noopener" className="text-ink underline underline-offset-4">WhatsApp</a>
        </dd>
      </div>
      <div>
        <dt className="label text-gold-text">Email</dt>
        <dd className="mt-xs">
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">{site.email}</a>
        </dd>
      </div>
      <div>
        <dt className="label text-gold-text">Office</dt>
        <dd className="mt-xs text-muted">{site.address.display}</dd>
      </div>
    </dl>
  );
}

export function ContactBlock({ defaultService }: { defaultService?: string }) {
  return (
    <div className="grid gap-lg lg:grid-cols-[1fr_1.6fr]">
      <ContactDetails />
      <EnquiryForm defaultService={defaultService} />
    </div>
  );
}
