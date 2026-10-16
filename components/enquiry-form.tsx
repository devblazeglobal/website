"use client";

import { useState } from "react";

import { services } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";

// Option A: nothing is stored on the website. The form writes the
// enquiry into a WhatsApp message to the firm's number and opens it; the
// visitor presses send. Email is offered as the alternative.

export function EnquiryForm({ defaultService = "" }: { defaultService?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: defaultService, message: "" });
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const text = [
    "Hello Blaze Global,",
    "",
    `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    form.service && `Service: ${form.service}`,
    "",
    form.message,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please enter your name and a message.");
      return;
    }
    setError("");
    window.open(whatsappUrl(text), "_blank", "noopener");
  }

  const field = "mt-xs w-full rounded-sm border border-line-strong bg-surface px-3 py-2.5 text-base font-normal text-ink focus:border-ink";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry${form.service ? `: ${form.service}` : ""}`)}&body=${encodeURIComponent(text)}`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-md sm:grid-cols-2">
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Full name
        <input className={field} value={form.name} onChange={set("name")} autoComplete="name" required />
      </label>
      <label className="text-sm font-medium text-ink">
        Phone
        <input className={field} value={form.phone} onChange={set("phone")} type="tel" autoComplete="tel" />
      </label>
      <label className="text-sm font-medium text-ink">
        Email
        <input className={field} value={form.email} onChange={set("email")} type="email" autoComplete="email" />
      </label>
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Service
        <select className={field} value={form.service} onChange={set("service")}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Message
        <textarea className={`${field} min-h-32`} value={form.message} onChange={set("message")} required />
      </label>
      {error && (
        <p role="alert" className="text-sm text-error sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-md sm:col-span-2">
        <button type="submit" className="rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-navy hover:bg-[#f3c262]">
          Send on WhatsApp
        </button>
        <a href={mailto} className="text-sm text-ink underline underline-offset-4">
          Send by email instead
        </a>
      </div>
    </form>
  );
}
