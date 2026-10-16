# Future: sales agent and marketing agent

**Status: proposal only.** Blaze Global has not agreed to this work, and no
Google Cloud infrastructure exists for it. Nothing in this repository runs
an agent today. This file records the design so the site can grow into it
without a rebuild.

## Summary

| Agent | Job | Output | Human step |
| --- | --- | --- | --- |
| Sales | Find and qualify Singapore companies likely to need accounting or corporate secretarial help | A ranked lead list with the reason each company qualifies | Blaze approves every message before it is sent |
| Marketing | Write SEO articles for the blog from a topic plan | Draft articles in `content/blog/` as pull requests | Blaze edits and merges each draft |

Both agents draft. People approve. No message is sent and no article is
published without a named person at Blaze approving it.

## Why these two

- **Leads:** the site converts visitors through WhatsApp and Get started.
  It does not find companies that have not visited yet.
- **Articles:** the blog has 2 articles. The calculator and the service
  pages answer high-intent searches (ECI, AGM, XBRL, GST registration), but
  each topic ranks better with a dedicated article linking to the service.

## Sales agent

### Inputs

| Source | What it gives | Notes |
| --- | --- | --- |
| ACRA Bizfile company data (paid extracts or licensed data provider) | New incorporations, financial year ends, officers | Licensing terms must allow outreach use |
| Website events | Get started answers, calculator year ends, WhatsApp clicks | Needs a consent line and a privacy notice before collection |
| Blaze's existing client list | Exclusions | Never contact current clients as leads |

### Flow

1. **Collect:** a scheduled job (Cloud Scheduler, then Cloud Run job) pulls
   new companies for the week.
2. **Qualify:** rules first, then a model call for the reason text. Example
   rules: incorporated within 6 months with no company secretary filed;
   year end within 90 days; GST threshold signals.
3. **Score and rank:** store each lead with its score and reason in
   Firestore or Cloud SQL (`leads` table).
4. **Draft:** the agent drafts a first message in Blaze's voice for each
   lead above the threshold.
5. **Approve:** a Blaze user reviews the queue in a small internal page and
   approves, edits or rejects each draft.
6. **Send:** approved messages go out by email from a Blaze mailbox.
   WhatsApp outreach to people who have not opted in is not allowed under
   WhatsApp Business policy, so WhatsApp stays inbound only.

### Guardrails

- PDPA: a lawful basis for each contact, an unsubscribe line in every
  email, and a do-not-contact list checked before each send.
- Rate limit sends per day; stop automatically on bounces or complaints.
- Every lead keeps an audit row: source, rule matched, who approved, when sent.

## Marketing agent

### Inputs

- A topic plan in `content/blog/plan.json`: target query, the service page
  to link, and the facts to cite (ACRA, IRAS, Companies Act sections).
- Search Console queries for the site (after DNS cutover), to find topics
  that already get impressions but rank below position 10.

### Flow

1. **Pick:** the next topic from the plan, or the highest-impression
   query without an article.
2. **Draft:** the agent writes the article in the house voice: a question
   heading that matches the search, the answer in the first paragraph,
   official sources linked, one internal link to the service page.
3. **Check:** automated checks run before a human sees it:
   - every figure and deadline matches `lib/deadlines.ts` or a cited source
   - title under 60 characters, description under 155
   - no banned phrases (the voice rules in the Kyn writing guide)
   - one H1, question-style H2s, at least one internal link
4. **Open a pull request** adding `content/blog/<slug>.md`. The site's
   build turns it into a page, adds it to the sitemap, `llms.txt` and the
   blog feed with no code change.
5. **Approve:** Blaze edits and merges. Vercel deploys on merge.

### Guardrails

- Tax and filing facts are checked against the source before merge; the
  agent never invents a rate, threshold or deadline.
- Articles are never deleted or redirected once live; they are improved in
  place, so ranking history is kept.

## Infrastructure (when approved)

| Piece | Service | Why |
| --- | --- | --- |
| Scheduled jobs | Cloud Scheduler + Cloud Run jobs | Pay per run, no always-on server |
| Data | Firestore (leads, audit) | Small volume, no schema migrations needed |
| Secrets | Secret Manager | API keys, mailbox credentials |
| Model calls | Claude API | Drafting and qualification reasons |
| Repo access | GitHub App with write access to this repo only | Opens article pull requests |
| Review UI | A protected route on this site, or a small internal app | Approve leads and drafts |

**Cost:** the jobs scale to zero between runs. The steady cost is model
usage per lead and per article, plus any paid company-data licence. Get a
quote for the data licence before committing to the sales agent.

## What the site already provides

- `content/blog/*.md` plus `lib/blog.ts`: drop a file in, and the site
  builds the article page, sitemap entry, feed item and structured data.
- `lib/deadlines.ts`: one source of truth for statutory dates, usable by
  both agents.
- `lib/catalog.ts`: every service page and URL, for internal links.
- The Get started questionnaire and WhatsApp links: the inbound side of the
  sales flow.

## Decisions needed from Blaze before any build

1. Approve the scope and budget for either agent.
2. Choose the company-data source and confirm its licence allows outreach.
3. Name the person who approves leads and articles.
4. Confirm the sending mailbox and the PDPA notice wording.
