# Sadbhaav Child Development Foundation — Static Site

A hand-coded, dependency-free recreation of `sadbhaav.mindrops.com` in plain
HTML5, CSS3 and vanilla JavaScript (no frameworks, no build step), now using
**real photos and the real logo** supplied in your assets pack.

## Pages

| Page | Notes |
|---|---|
| `index.html` | Home — real hero banners (clickable, linking to About/Services), real "Every Child Counts" collage photos, real centre badges, 15-card services grid, real event-card photos, auto-rotating testimonial carousel, scroll-to-top button. |
| `about.html` | Real about photo, real "Our Journey" infographic, real director photos (hover to highlight dark navy), and a **16-person Team carousel** with true seamless infinite looping in both directions. |
| `services.html` | Sticky sidebar of 13 service tabs + a 3-column grid, each card now using its real service photo. Sidebar/card sync + scroll-spy unchanged. |
| `gallery.html` | 15 real gallery photos in a tight, seamless collage grid (4px gaps) with ALL/2025/2022 filters and hover zoom. |
| `csr-partnerships.html` | Real hero/infrastructure/outreach photos; icon grids (Why Partner / CSR Opportunities) intentionally stay icon-based, matching the original design. |
| `events.html` | 6 real past events (posters + photos), including 2 read directly off the real event posters you supplied (SLD & WRAT Workshop, Blood Donation Drive) — sliding carousel with arrows + dots. |
| `contact.html` | Form, address/contact cards, keyless Google Maps embed. |
| `donate.html` | Rebuilt to match your Donation screenshot: First/Last name, Email/Phone (with live 0/10 counter), Address, City/State, ZIP/Country, Donation Purpose radios, PAN + amount-with-INR-suffix, message, Donate button. |

## What changed in this pass

1. **Header/top bar** — top contact bar is now dark navy (`--navy-dark`)
   instead of white.
2. **Real logos** — header uses `assets/img/sadbhaav-logo-transparent.png`;
   footer uses `assets/img/sadbhaav-logo-white-bg.jpg`; both replace the
   hand-drawn placeholder mark everywhere, including the favicon.
3. **Footer rebuilt compact** — single top row (logo + address + email +
   phone), a second row (nav links + social + Donate), then the copyright
   line — matching your reference's height instead of the old tall 3-column
   grid.
4. **Text-overflow fix (global)** — `overflow-wrap`/`word-break` added to
   all text elements and `min-width: 0` added to every grid/flex card
   child, so long labels (e.g. "Psychoeducational Assessment",
   "Prevocational & Vocational Skills") wrap inside their card instead of
   spilling past the border, at every breakpoint.
5. **Real images everywhere** — hero slides, home-page collage, centre
   badges, about hero + "Our Journey" infographic, all 4 director photos,
   all 13 service photos, CSR photos, event posters/photos, and all 15
   gallery photos now use your real assets (resized + compressed from
   ~30MB down to ~6MB total, no visible quality loss).
6. **16 real team members** — your assets pack had photos for 12 people
   beyond the original 4 named in the screenshots. All 16 are now in the
   Team carousel; the 4 with confirmed titles keep their real titles, the
   rest are labelled "Team Member" (or "ABA Therapist" for Priya, inferred
   directly from her filename) rather than guessing credentials for real,
   named people.
7. **Infinite Team carousel** — rebuilt the carousel engine to support a
   true seamless loop: the item set is cloned before/after itself, and the
   carousel snaps invisibly across the clone boundary once a transition
   finishes, so scrolling past the last card continues straight into the
   first with no visible "snap back." Enabled via `data-infinite="true"`
   on `about.html`'s Team carousel only (per spec); other carousels keep
   simple modulo looping.
8. **Gallery collage tightened** — grid gap dropped to 4px (from 18px),
   4-column desktop grid, square aspect-ratio tiles, hover zoom kept with
   fixed container size.
9. **Donate page redesigned** — full form matching your new screenshot
   exactly (see table above).
10. **Scroll-to-top button** — a small floating button (bottom-right)
    fades in after scrolling and smooth-scrolls back to top; injected by
    `script.js` on every page, no HTML duplication needed.

## Structure

```
site/
├── index.html / about.html / services.html / gallery.html
├── csr-partnerships.html / events.html / contact.html / donate.html
├── css/styles.css        — one shared stylesheet
├── js/script.js          — mobile menu, hero slider, infinite/looping
│                            carousel engine, gallery filters, services
│                            sidebar sync, scroll-to-top, donation form
├── assets/icons/sprite.svg   — reference copy of the icon sprite
│                                (also inlined at the top of every page)
└── assets/img/            — all real photos/logos supplied in your
                              assets pack, renamed descriptively and
                              compressed for the web
```

## Known gaps / things to send next

- The "story from a parent" video block on the Home page still uses a
  generated placeholder thumbnail (`assets/images/video-thumbnail.svg`) —
  no matching real asset was in the pack. Send a real video/thumbnail and
  I'll wire it in.
- 4 of the 10 event photos you sent (`events-5/7/9/10.jpg`, all real
  therapy/session candids) weren't a clean fit for the 6 named events on
  the Events page and are sitting unused in `assets/img/` — happy to add
  more event entries if you send titles/dates for them.
- The CSR "Why Partner" (13-card) and "CSR Opportunities" (4-card) grids
  intentionally stay icon-based rather than photo-based, matching the
  original site's design in your screenshots.
- Donate and Contact forms are structured and validate client-side but
  aren't wired to Razorpay / a backend yet (none was provided).
