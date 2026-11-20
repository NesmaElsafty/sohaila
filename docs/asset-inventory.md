# Asset Inventory

Machine-readable index: `assets/data/asset-manifest.json` (163 entries, 0 missing at build time).

## User-supplied brand assets

| Asset | Path | Notes |
|---|---|---|
| Hero portrait | `assets/images/hero/sohaila-hero.png` | Used unchanged; `object-fit: contain`; no circular mask/filters |
| Light logo | `assets/images/brand/logo-light.png` | Available for dark backgrounds |
| Dark logo | `assets/images/brand/logo-dark.png` | Header + watermark |
| Brand guideline | `assets/images/brand/brand-guideline.png` | Color tokens sampled: `#ED0C65`, `#B5D334`, `#FBEFF3`, `#FFFFFF`, `#202020` |

## Extracted from PDF

| Category | Count | Path |
|---|---|---|
| Personal brand portraits | 23 | `assets/images/clients/personal/` |
| Corporate logos | 4 | `assets/images/clients/corporate/` |
| Care & Beauty logos | 11 | `assets/images/clients/care-beauty/` |
| Healthcare logos | 7 | `assets/images/clients/healthcare/` |
| Real estate logos | 10 | `assets/images/clients/real-estate/` |
| Government logos | 6 | `assets/images/clients/government/` |
| Startup logos | 17 | `assets/images/clients/startups/` |
| Results evidence | 26 | `assets/images/results/` |
| Testimonials | 52 | `assets/images/testimonials/` |
| About / map / contact portraits | several | `assets/images/about/` |

## Naming uncertainty (logo-only, no plain-text name in PDF)

Flagged in `assets/data/portfolio.js` with `nameUncertain: true`:

- `healthcare-01`, `healthcare-07`
- `d-logo` (real estate mark)
- `government-01` … `government-04`, `government-06`
- `startup-08`, `startup-13`

Original logos are displayed. Exact English legal names require manual confirmation from the client.

## Working extracts (not shipped as primary site assets)

- `assets/images/_pdf_extract/` — raw PDF embedded images
- `assets/images/_pdf_pages/` — rendered page previews for QA
- `assets/images/_extract1|2|3/` — unpacked Drive zip contents
