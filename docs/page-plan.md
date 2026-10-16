# Page plan

Every URL the Wix site had indexed keeps its exact path (docs/seo-baseline/inventory.json). `pnpm check:seo` fails if one is dropped.

| URL | Page | Wix status (15 Oct 2026) | Source of copy |
| --- | --- | --- | --- |
| `/` | Home | 200 | Wix home |
| `/about-us` | About | 200 | Wix About |
| `/services` | Services overview | 200 | Wix Services |
| `/services/accounting` | Accounting | new | Wix Services, Accounting block |
| `/services/business-advisory` | Business Advisory | new | Wix Services, Advisory block |
| `/services/corporate-secretarial` | Corporate Secretarial | new | Wix Services, Corp sec block |
| `/blog` | Blog index | 404 on Wix (fixed) | – |
| `/post-1/how-do-taxes-affect-business-decisions` | Article | 200 | Wix post, text unchanged |
| `/post-1/importance-of-bookkeeping-in-your-business` | Article | 200 | Wix post, text unchanged |
| `/contact` | Contact | new (was a home-page anchor) | Wix contact block |
| `/blog-feed.xml` | RSS | 200 | generated |
| `/llms.txt` | Facts for AI assistants | new | lib/site.ts |

## Redirects (308)

| From | To | Why |
| --- | --- | --- |
| `/home` | `/` | Wix alias of the home page |
| `/blog1` | `/blog` | Password-protected "NEWS" page on Wix |
| `/post`, `/post-1` | `/blog` | Wix blog template pages |
| `/search` | `/blog` | Wix search page (noindex) |
| `/testimonials` | `/#testimonials` | Menu item was a home-page anchor |

Wix members-area pages (`/profile-1`, `/my-account`, `/notifications`, `/settings`) and the `popup-lg9z7` lightbox already answered 404 on Wix and stay 404.

## Enquiries (Option A)

Nothing is stored on the website. The enquiry form writes the message into WhatsApp to +65 9819 9108; email is the alternative. Option B moves enquiries into a Google Cloud database.
