# Sadbhaav Child Development Foundation — Static Site (v1)

A hand-coded, dependency-free recreation of `sadbhaav.mindrops.com` in plain
HTML5, CSS3 and vanilla JavaScript (no frameworks, no build step). Built from
your uploaded homepage HTML export plus the Home/About screenshots.

## What's included

| Page | Status |
|---|---|
| `index.html` (Home) | Hero slider, "Every Child Counts" checklist, quote banner, "Create future with us" centre badges, 15-card services grid, events + auto-rotating testimonial carousel, video-placeholder story block, volunteer CTA, footer. |
| `about.html` | Page banner, foundation intro, "Our Journey" timeline image, Mission/Vision, "What We Do", Directors grid (**hover** a card to see it highlight dark navy, per spec), sliding Team carousel with arrows + dots, services grid. |
| `services.html` | Sticky left sidebar of 13 service tabs + a 3-column grid of service cards. Clicking a sidebar tab (or a card's "Read More") smooth-scrolls to and highlights the matching card and syncs the active tab; scroll-spy keeps the sidebar in sync as you scroll. Sidebar collapses to a horizontal scrollable bar under 992px. |
| `gallery.html` | ALL / 2025 / 2022 filter buttons (vanilla JS show/hide), responsive photo grid with hover zoom-in-place. |
| `csr-partnerships.html` | Hero, 13-card "Why Partner" grid, 4 CSR-opportunity pillars, alternating Infrastructure/Outreach image+checklist blocks, two-column compliance comparison, CSR projects table, and a Contact-info + Enquiry form split layout. |
| `events.html` | "Upcoming Events" empty state, "Past Events" as a sliding carousel (date badges, arrows + dots). |
| `contact.html` | Get-in-touch form (service dropdown, textarea), Address/Contact info cards, full-width Google Maps embed. |
| `donate.html` | Simple donate CTA page (kept from the first pass — no screenshot supplied yet for a full redesign). |

Every page shares the same header, footer and icon sprite, and the same
`css/styles.css` / `js/script.js`.

## Structure

```
site/
├── index.html
├── about.html
├── services.html / events.html / gallery.html / csr-partnerships.html / contact.html / donate.html
├── css/
│   └── styles.css        — one shared stylesheet (variables, layout, components, responsive)
├── js/
│   └── script.js         — mobile menu, hero slider, testimonial/team sliders, director card
│                            selection, active-nav-link highlighting, top-bar hide-on-scroll
└── assets/
    ├── images/           — logo + all photo/badge/avatar placeholders (SVG)
    └── icons/sprite.svg  — reference copy of the icon set inlined at the top of every page
```

Every page inlines the same `<svg style="display:none">` icon sprite and the
same header/footer markup (there's no server-side templating in a static
vanilla site, so this is copy-pasted intentionally — keep it in sync if you
hand-edit one page).

## About the images

Your uploaded HTML/screenshots point at photos hosted on the live WordPress
site, which this sandbox can't fetch. Every photo, avatar and badge is
currently a lightweight **generated SVG placeholder** (soft gradient + icon +
label) sized to match the original layout exactly, so swapping in the real
files is a one-line change:

```html
<img src="assets/images/hero-slide-1.svg" alt="...">
<!-- becomes -->
<img src="assets/images/hero-slide-1.jpg" alt="...">
```

Just drop your real JPG/PNG files into `assets/images/` with matching names
(or update the `src` paths) — no CSS changes needed, since all image
containers are sized responsively, not to a fixed placeholder aspect ratio.

## Colors & type (sampled from your screenshots)

- Navy (headings): `#2c3374`
- Footer navy: `#0a1245`
- Orange (buttons/accents): `#f1ae44`
- Body gray: `#6b6b6b`
- Section gray background: `#f2f2f4`
- Headings: Poppins (Google Fonts) · Body: Open Sans (Google Fonts)

## Running it

No build step — just open `index.html` in a browser, or serve the folder
with any static server, e.g.:

```
python3 -m http.server 8000
```

## Known simplifications to revisit

- "Our Journey" is a single generated SVG placeholder image (`assets/images/our-journey-placeholder.svg`)
  standing in for the original infographic — swap the `<img>` src in `about.html`
  for the real graphic whenever you have it.
- All photos across every page (hero slides, service photos, gallery shots,
  event thumbnails, director/team portraits, CSR imagery) are generated SVG
  placeholders sized to match their containers exactly — see "About the
  images" below for how to swap in real files.
- The Services page reuses the sidebar-driven anchor/scroll-spy pattern the
  live site uses (all cards render inline; a click scrolls + highlights the
  matching card) rather than hiding/showing separate panels, since that's
  what the screenshots show.
- Contact and CSR enquiry forms are structured and validate client-side, but
  aren't wired to a backend or payment gateway (none was provided) — they
  show a confirmation note instead of actually sending data.
- The Contact page map is a keyless Google Maps `output=embed` iframe
  centered on "Jalaram Society, Piplod, Surat" — swap in an API-key'd embed
  if you need custom pin styling.
- `donate.html` is still the simple CTA page from the first pass — send a
  screenshot whenever you have one and I'll match it exactly.
