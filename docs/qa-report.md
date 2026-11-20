# QA Report — Sohaila Halim Website

Date: 2026-11-20

## Completion checklist

| Criterion | Status |
|---|---|
| Seven HTML pages exist | Pass |
| PDF content inventoried & mapped | Pass (see content-inventory / content-mapping) |
| English source text preserved | Pass |
| Hero image used unchanged | Pass |
| Original client/result/testimonial images used | Pass |
| Uncertain logo names flagged (not invented) | Pass / documented |
| EN interface | Pass |
| AR UI + RTL | Pass (body AR pending approval) |
| Tabs / accordion | Pass |
| Portfolio filters | Pass |
| Results + testimonial lightbox | Pass |
| Contact mailto / tel / LinkedIn | Pass |
| Sticky nav + mobile menu | Pass |
| No fictional testimonials/stats/clients added | Pass |

## Outstanding / incomplete (disclosed)

1. **Approved Arabic body translations** not supplied — English fallback for page copy in AR mode.
2. **Logo-only names** for some government/startup/healthcare marks need manual confirmation.
3. **Deployment domain** unknown — canonical URLs / sitemap absolute URLs pending.
4. **Contact form backend** not provided — form marked unavailable; direct channels work.
5. **Original brand fonts** not identified — temporary fallbacks: Barlow Condensed + DM Sans + Noto Sans Arabic (documented).
6. Working folders `_pdf_extract`, `_pdf_pages`, `_extract*` retained for audit; can be excluded from production deploy.

## Testing performed

- PDF text extraction (26 pages) via PyMuPDF
- Hyperlink extraction (Instagram + LinkedIn) and cleaning of tracking params
- Asset extraction and category mapping
- Static file presence check for all seven pages + CSS/JS/data
- Manual structure review against master prompt sitemap

## Recommended next QA (browser)

- [ ] Visual check 360 / 390 / 768 / 1024 / 1440 / 1920
- [ ] Keyboard tab order + Escape on lightbox/menu
- [ ] EN↔AR switch persistence across pages
- [ ] Portfolio filter empty-state path
- [ ] Lighthouse accessibility spot-check
