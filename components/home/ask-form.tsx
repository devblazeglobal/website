"use client";

import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/site";

const EXAMPLES = [
  "XBRL filing for my company",
  "A company secretary for a new Pte Ltd",
  "Monthly bookkeeping on Xero",
  "Help with my GST registration",
  "Annual return and AGM documents",
];

// "What can we help with?" Option A stores nothing: submitting opens a
// WhatsApp chat pre-filled with the request.
export function AskForm() {
  const [value, setValue] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (document.activeElement !== inputRef.current && !inputRef.current?.value) setI((n) => (n + 1) % EXAMPLES.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ask">
      <label htmlFor="ask">What can we help with?</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = value.trim() || EXAMPLES[i];
          window.open(whatsappUrl(`Hello Blaze Global, I need help with: ${q}`), "_blank", "noopener");
        }}
      >
        <input id="ask" ref={inputRef} name="ask" autoComplete="off" placeholder={EXAMPLES[i]} value={value} onChange={(e) => setValue(e.target.value)} maxLength={300} />
        <button className="btn btn-wa" type="submit">
          <WhatsAppIcon />
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
