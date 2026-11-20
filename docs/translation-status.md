# Translation Status

## Policy

- English portfolio body copy remains the HTML source (default language).
- Arabic is a **full meaning-equivalent translation** of the same site content (UI + body).
- Proper nouns, client/brand names, emails, phones, and metrics stay in their source form where appropriate (e.g. Sohaila Halim, ROAS, EGP, Facebook).
- Testimonial **screenshot images** are unchanged (no invented transcripts).

## Coverage

| Layer | EN | AR |
|---|---|---|
| Primary nav + CTA + chrome | Yes | Yes |
| Home / About / Expertise / Portfolio / Results / Testimonials / Contact body | Yes | Yes |
| Portfolio filters + category/role meta | Yes | Yes |
| Results table headers + section copy | Yes | Yes |
| Gallery captions (Results / Testimonials patterns) | Yes | Yes |
| Document title + meta description | Yes | Yes |

## Runtime

| File | Role |
|---|---|
| `assets/js/translations.js` | Chrome / interface strings |
| `assets/js/page-content.js` | Full page body EN + AR dictionaries |
| `assets/js/i18n.js` | Language switch, RTL, body text mapping |
| `locales/en.json` / `locales/ar.json` | Mirror of chrome strings |

## Notes

- Language preference is stored in `localStorage` (`sohaila-lang`).
- Switching EN ↔ AR restores original English from remembered source text attributes.
- The old “Arabic translation pending” banner has been removed.
