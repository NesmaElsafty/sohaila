# Content Inventory — Sohaila Halim Portfolio Website

Source of truth: `Suhaila Portfolio 7-11-2026.pdf` (26 pages).

**Machine-readable granular inventory:** `assets/data/content-manifest.json`  
(184 items after refinement pass — includes clients, metrics, screenshots, contacts, with selectors + verificationStatus.)

Status legend: `implemented` | `pending-translation` | `flagged-review` | `uncertain-name`

## Page 1 — Home hero source

| ID | Type | Original text (verbatim) | Destination |
|---|---|---|---|
| home-name-001 | heading | SOHAILA HALIM | index.html#hero |
| home-title-001 | subtitle | Brand, Marketing & Business Growth Strategist | index.html#hero |
| home-tagline-001 | tagline | Building Brands. Shaping Strategies. Driving Growth. | index.html#hero |
| home-services-001 | line | Brand Strategy · Marketing Strategy · Business Growth · Product & Offer Development | index.html#hero |

## Pages 2–4 + 15 — About

| ID | Source page | Type | Destination |
|---|---|---|---|
| about-intro-001 | 2 | body (full about paragraphs) | about.html#introduction |
| about-stats-001 | 3 | stats 12+ / 600+ | about.html#experience, index preview |
| about-credentials-001 | 3 | Professional Background & Credentials | about.html#credentials |
| about-education-001 | 3 | Education & Professional Qualifications (5 items) | about.html#education |
| about-exp-001 | 3 | Former Media Consultant at Facebook + description | about.html#professional-experience |
| about-core-001 | 3 | Core Areas of Expertise (9 bullets) | about.html#core-expertise |
| about-where-001 | 4 | Where We Work + Multi-Market Experience | about.html#where-we-work |
| about-markets-001 | 4 | Libya, Egypt, Jordan, Saudi Arabia, Kuwait, Qatar, UAE, Oman | about.html#where-we-work |
| about-why-001 | 15 | Why Work With Me (4 differentiators) | about.html#why-work-with-me, index preview |

## Pages 5–10 — Expertise

| ID | Source page | Section | Destination |
|---|---|---|---|
| expertise-philosophy-001 | 5 | My Strategic Philosophy + statement + 4 principles | expertise.html#strategic-philosophy |
| expertise-who-001 | 6 | Who I Work With (6 audiences) | expertise.html#who-i-work-with |
| expertise-areas-001 | 7 | Strategic Expertise (6 categories) | expertise.html#strategic-expertise |
| expertise-impact-001 | 8 | Beyond Marketing. Focused on Business Impact. (4 areas) | expertise.html#business-impact |
| expertise-special-001 | 9 | Specialized Business Expertise (4 specializations) | expertise.html#specialized |
| expertise-approach-001 | 10 | My Strategic Approach (5 stages) | expertise.html#strategic-approach |

## Pages 11–13 — Portfolio

| ID | Source page | Section | Destination |
|---|---|---|---|
| portfolio-intro-001 | 11–13 | CLIENT PORTFOLIO headers + category intros | portfolio.html |
| portfolio-personal-001 | 11 | 23 personal brands (names, titles, Instagram links) | portfolio.html filter=personal |
| portfolio-corporate-001 | 12 | Corporate / Care & Beauty / Healthcare logos | portfolio.html |
| portfolio-other-001 | 13 | Real Estate / Government / Start-ups logos | portfolio.html |

**Flagged for review:** Several government and startup logos are Arabic calligraphy / mark-only with no plain-text English name in the PDF. Displayed with original logo + documented uncertain-name labels in `assets/data/portfolio.js` (`nameUncertain: true`).

## Page 14 — Results tables

| ID | Table | Destination |
|---|---|---|
| results-highticket-001 | High-Ticket Business Scaling (4 rows) | results.html#high-ticket |
| results-medical-001 | Medical Personal Branding & Clinic Growth (4 rows) | results.html#medical |
| results-ecom-001 | E-commerce & Consumer Brand Growth (5 rows) | results.html#ecommerce |

## Pages 16–18 — Results evidence

| ID | Count | Destination |
|---|---|---|
| results-evidence-001 | 26 original screenshots | results.html#evidence |

## Pages 19–25 — Testimonials

| ID | Count | Destination |
|---|---|---|
| testimonials-gallery-001 | 52 original screenshots | testimonials.html |

No fabricated transcripts. Screenshots only.

## Page 26 — Contact

| ID | Content | Destination |
|---|---|---|
| contact-cta-001 | Let's Build What's Next. / Your Next Stage of Growth… | contact.html, index CTA |
| contact-copy-001 | Supporting paragraph | contact.html |
| contact-channels-001 | Email, phones, LinkedIn `/sohailahalim` | contact.html, footer |

Verified LinkedIn URL: `https://www.linkedin.com/in/sohailahalim/`

## Translation status

All source English body copy: **preserved verbatim** in HTML.  
Arabic body translation: **pending approval** (see `docs/translation-status.md`).  
Arabic UI strings: **implemented** for navigation/controls.
