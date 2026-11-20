# Translation Status (Post-Refinement)

## Policy

- English portfolio body copy is the approved source and remains verbatim in HTML.
- Regions with `data-source-content` receive `lang="en"` + `dir="ltr"` even when the document is RTL.
- Arabic **interface** strings are implemented for chrome and interactive controls.
- Full Arabic body translation was **not** supplied as approved content and is **not** fabricated.

## Interface coverage (implemented)

| Surface | EN | AR |
|---|---|---|
| Primary nav + CTA | Yes | Yes |
| Mobile open/close menu labels | Yes | Yes |
| Language switcher group label | Yes | Yes |
| Skip link / back to top | Yes | Yes |
| Portfolio filters | Yes | Yes |
| Empty filter state | Yes | Yes |
| Lightbox prev/next/close/position | Yes | Yes |
| Load more + showing count | Yes | Yes |
| Table scroll hint | Yes | Yes |
| Translation-pending banner | Yes | Yes (visible only in AR) |
| Contact form unavailable note | Yes | Yes |

## Body content

| Content | Status |
|---|---|
| About / expertise / results tables / contact copy | English source; AR pending |
| Client names/titles | Source (some titles already Arabic in PDF) |
| Testimonials | Screenshots only |

## Runtime files

- `assets/js/translations.js`
- `locales/en.json`
- `locales/ar.json`
