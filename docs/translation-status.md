# Translation Status

## Policy

- English portfolio body copy is the approved source and is preserved **verbatim** in HTML.
- Arabic **interface** strings (nav, buttons, filters, accessibility labels, empty states) are implemented.
- Full Arabic translation of portfolio body copy was **not supplied** as approved content.
- Therefore Arabic mode currently uses English body text as a documented temporary fallback (per project rules). Do not treat body Arabic as complete or approved.

## Coverage

| Layer | EN | AR |
|---|---|---|
| Navigation / chrome | Complete | Complete (UI) |
| Buttons / filters / lightbox labels | Complete | Complete (UI) |
| Hero / about / expertise / results body copy | Complete (source) | Pending approval |
| Portfolio client names/titles | Complete (source) | Pending (some titles already Arabic in source) |
| Testimonials | Screenshots only | Screenshots only |
| Contact details | Complete | Complete (same data) |

## Files

- Runtime: `assets/js/translations.js`
- Mirror JSON: `locales/en.json`, `locales/ar.json`

## RTL

When AR is selected: `lang="ar"`, `dir="rtl"`, mirrored layout rules in `assets/css/rtl.css`.  
Photographs, logos, charts, and screenshots are **not** mirrored.
