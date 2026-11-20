# Motion Design System — Sohaila Halim

## Motion tokens

Defined in `assets/css/variables.css`:

| Token | Default | Role |
|---|---|---|
| `--motion-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals / exits |
| `--motion-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Utility transitions |
| `--motion-fast` | `180ms` | Micro feedback |
| `--motion-medium` | `360ms` | Hover / UI |
| `--motion-reveal` | `600ms` | Scroll / card entrance |
| `--motion-transition` | `450ms` | Page overlay fade |
| `--motion-stagger` | `75ms` | Grid stagger step |
| `--motion-reveal-distance` | `22px` | Fade-up distance |

## Animation categories

1. **Scroll reveal** — IntersectionObserver (`assets/js/animations.js` + `assets/css/animations.css`)
2. **Card hover / focus** — transform + shadow; hover gated to `(hover: hover) and (pointer: fine)`
3. **Staggered grids** — children of `.reveal-stagger` after parent reveal
4. **Dynamic enter** — Load More / filter newly shown items via `SohailaMotion.enterItems`
5. **Tabs / accordion panels** — subtle fade-up when shown
6. **Lightbox** — dialog + backdrop entrance
7. **Page transition** — fuchsia overlay + PNG logo mask reveal

## Page transition strategy

- Intercepts eligible same-origin clicks among the seven HTML pages
- Skips: `#` anchors, `mailto:`, `tel:`, downloads, new-tab modifier clicks, external URLs
- Uses `sessionStorage` flag for destination entrance
- Handles `pageshow` (including bfcache)
- Safety timeout prevents stuck overlay
- **No artificial minimum wait** beyond a short reveal before navigation assign

## Logo reveal method

**Assets (approved reveal SVGs):**
- `assets/images/brand/sohaila_logo_reveal_light.svg` — used on the fuchsia page-transition overlay
- `assets/images/brand/sohaila_logo_reveal_fuchsia.svg` — alternate for light backgrounds

These SVGs embed the original logo pixels and reveal them with an authored directional mask (SMIL). They are **not** fabricated stroke-path handwriting.

**Duration:** `2s` one-shot (`repeatCount="1"`, `fill="freeze"`).

**Runtime:** `assets/js/page-transition.js` plays a **2s CSS mask wipe** on boot and on internal navigations (PNG art extracted from the reveal SVGs). Exit/boot: fuchsia veil + light logo. Entrance: light veil + fuchsia logo. SVG SMIL is not relied on in-page (unreliable in Chromium).

## Progressive enhancement

- Without JS: all content visible
- With JS + IntersectionObserver: offscreen elements may become `is-reveal-pending`, then `is-revealed`
- Initial viewport elements are revealed immediately (Hero never hidden during init)
- Unsupported observer / reduced motion: everything remains visible

## Accessibility

- Overlay is `aria-hidden` and `pointer-events: none` (does not trap focus)
- Logo in overlay uses empty `alt` (decorative)
- Focus-visible styles on interactive cards/buttons/nav
- Hover is not the only affordance
- Filtered-out / batched-hidden items stay non-focusable (existing filter/load-more logic)

## Reduced motion

- CSS `@media (prefers-reduced-motion: reduce)` zeroes durations and disables reveal/page animations
- JS removes `js-motion` arming and forces revealed state
- Page transition navigates directly

## Performance

- Prefer `transform` / `opacity`
- One shared IntersectionObserver; elements unobserved after reveal
- No per-card scroll listeners
- Dynamic galleries re-registered via `refresh` / `enterItems` only

## Browser test notes (2026-11-20)

Executed via local static server + browser CDP:

| Test | Result |
|---|---|
| Home EN — nav DM Sans / `text-transform: none` | PASS |
| Home — `js-motion` with no-preference; 25 pending offscreen | PASS |
| Home — scroll +900px reduces pending / increases revealed | PASS |
| Home → About page transition; overlay not stuck | PASS |
| About AR RTL — Arabic nav font; no overflow | PASS |
| Testimonials Load More → 16/52; motion hooks present | PASS |
| Reduced motion — content opacity 1; `js-motion` removed | PASS |
| All seven pages include `animations.css` / `animations.js` / `page-transition.js` | PASS |

**Not fully completed:** exhaustive 360–1920 × EN/AR screenshot matrix; axe/Lighthouse.

**Limitation:** Automation environments that default to `prefers-reduced-motion: reduce` will correctly disable motion until preference is unset.
