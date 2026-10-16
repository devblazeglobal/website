import type { Post } from "@/lib/blog";
import { allServices, type Entry } from "@/lib/catalog";
import { site } from "@/lib/site";

// JSON-LD builders. The Wix site declared only "WebSite"; these give Google
// and AI assistants the firm's name, UEN, filing agent number, address,
// phone and services in a form they read directly.

const ORG_ID = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/blaze-global-wordmark-navy-1200.png`,
    image: `${site.url}/brand/blaze-global-wordmark-navy-1200.png`,
    telephone: site.phone,
    email: site.email,
    taxID: site.uen,
    identifier: [
      { "@type": "PropertyValue", propertyID: "UEN", value: site.uen },
      { "@type": "PropertyValue", propertyID: "ACRA Registered Filing Agent", value: site.filingAgent },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: allServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${site.url}${s.path}` } })),
    },
    sameAs: Object.values(site.social),
  };
}

export function serviceSchema(service: Entry) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${site.url}${service.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Singapore" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path === "/" ? "" : it.path}` })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${site.url}${post.path}`,
    datePublished: post.publishedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
