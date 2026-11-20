# Sohaila Halim — Personal Brand Website

Premium bilingual (EN/AR) personal brand website for **Sohaila Halim**, Brand, Marketing & Business Growth Strategist.

Built from the source portfolio PDF: `Suhaila Portfolio 7-11-2026.pdf`.

## Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- No React / Vue / Angular / Tailwind / Bootstrap

## Pages

| URL | Purpose |
|---|---|
| `index.html` | Home — hero, credibility, previews, CTA |
| `about.html` | About, credentials, markets, differentiators |
| `expertise.html` | Philosophy, audiences, expertise, impact, approach |
| `portfolio.html` | Filterable client gallery |
| `results.html` | Results tables + evidence lightbox |
| `testimonials.html` | Testimonial screenshot gallery |
| `contact.html` | Contact channels |

## Local preview

Serve the project root over HTTP (required for some browsers with module/path edge cases; also works via simple static server):

```bash
# Python
python -m http.server 8080

# Then open
# http://localhost:8080/
```

## Brand tokens

Sampled from `assets/images/brand/brand-guideline.png`:

- Fuchsia `#ED0C65`
- Lime `#B5D334`
- Blush `#FBEFF3`
- White `#FFFFFF`
- Charcoal `#202020`

Typography uses temporary fallbacks (Barlow Condensed, DM Sans, Noto Sans Arabic) until original brand fonts are provided.

## Localization

- Default: English
- Switcher stores preference in `localStorage` (`sohaila-lang`)
- Full EN/AR for chrome **and** page body (same meaning)
- UI strings: `assets/js/translations.js` + `locales/*.json`
- Body strings: `assets/js/page-content.js`
- Runtime: `assets/js/i18n.js` (RTL + content mapping)
- Details: `docs/translation-status.md`

## Motion design

Vanilla CSS/JS motion system (no animation libraries):

- Tokens in `assets/css/variables.css`
- Scroll reveals + card motion: `assets/css/animations.css`, `assets/js/animations.js`
- Branded boot + page transitions (2s handwriting-style wipe): `assets/js/page-transition.js`
- Reveal art: `logo-reveal-light.png` / `logo-reveal-fuchsia.png` (from the approved reveal SVGs), CSS mask wipe over 2s
- Spec: `docs/motion-design-system.md`

## Refinement notes

See `docs/refinement-report.md` for the production QA pass covering i18n, mobile nav, lightbox a11y, testimonials Load More, overflow fixes, motion system, and testing evidence.

## Documentation

- `docs/content-inventory.md`
- `docs/content-mapping.md`
- `docs/asset-inventory.md`
- `docs/translation-status.md`
- `docs/qa-report.md`
- `docs/motion-design-system.md`
- `docs/refinement-report.md`
- `assets/data/asset-manifest.json`

## Contact (from source)

- Email: Sohaila.a.halim@gmail.com
- Phone: 01012537915 / 01060420920
- LinkedIn: https://www.linkedin.com/in/sohailahalim/
