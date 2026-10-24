// Firm facts, stated once. Every page, the structured data and the footer
// read from here, so the name, phone and address cannot disagree across
// the site. The old Wix site linked the home-page phone number to a UK
// firm's email address (docs/seo-baseline/README.md).

export const site = {
  url: "https://www.blazeglobal.com.sg",
  name: "Blaze Global",
  legalName: "Blaze Global Pte. Ltd.",
  uen: "202011886G",
  filingAgent: "FA20210247",
  tagline: "We are here so you may focus on what truly matters.",
  phone: "+65 9819 9108",
  phoneHref: "tel:+6598199108",
  whatsapp: "6598199108",
  email: "contact@blazeglobal.com.sg",
  address: {
    street: "14 Robinson Road, #08-01A Far East Finance Building",
    locality: "Singapore",
    postalCode: "048545",
    country: "SG",
    display: "14 Robinson Road, #08-01A Far East Finance Building, Singapore 048545",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/blaze-global-pte-ltd/",
    instagram: "https://www.instagram.com/blazeglobal.sg/",
  },
} as const;

/** A WhatsApp chat with Blaze Global, pre-filled with `text`. */
export function whatsappUrl(text = "Hello Blaze Global, I would like to find out more about your services.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

// WhatsApp button label per service: the person the client reaches.
const TALK: Record<string, string> = {
  incorporation: "Talk to a corporate secretary",
  "corporate-secretarial": "Talk to a corporate secretary",
  "nominee-directorship": "Talk to a corporate secretary",
  accounting: "Talk to an accountant",
  payroll: "Talk to an accountant",
  tax: "Talk to a tax specialist",
  "outsourced-cfo": "Talk to a tax specialist",
};

/** WhatsApp button label for a product or parent slug; "WhatsApp us" elsewhere. */
export const talkLabel = (key?: string) => (key && TALK[key]) || "WhatsApp us";
