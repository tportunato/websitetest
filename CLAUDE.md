# DAA Capital Partners website — working notes

Read this first. `README.md` has the build/deploy mechanics and a per-pass
changelog; `NOTES-data-honesty.md` records how true every claim on the page is
and is not optional reading — it is the reason several things look the way they
do. This file is the standing context that is not obvious from either.

## What it is

A cinematic one-page scrolling site for DAA Capital Partners, a Geneva-based
investment manager in European urban logistics real estate. React 18 + Vite 5,
GSAP ScrollTrigger, Lenis smooth scroll, MapLibre for maps. Hash routing, so
Vercel needs no rewrite config. No tests, no linter, no CI.

Audience is professional/institutional investors. There is a `daa-brand-voice`
skill — use it before writing any DAA-facing copy.

## Creative direction

This matters more than any individual instruction, because the failure mode is
building something generic that technically satisfies the request. The page has
a specific language:

- **Cinematic beats.** Full-bleed video or canvas on a sticky 100vh stage inside
  a 165vh section, copy anchored bottom-left, beat numbers (`01`, `02`) in mono
  top-right. The scroll does the work.
- **Instrument, not decoration.** The Origination and Portfolio beats are real
  drawing engines on real geography — a radar sweep over Lyon, a corridor
  network over Western Europe. Mono captions, hairlines, tabular figures.
- **Swiss restraint.** White on near-black, one accent (white), no colour
  system to speak of. Claims are stated flatly and let to stand.
- **One serif moment**: the Manifesto, centred Cormorant Garamond italic. Do not
  add a second — it stops being a moment.

When a section starts to read like a generic marketing band, that is the bug.
The firm section was rebuilt once for exactly this reason: two supplied
paragraphs set at equal weight in two columns. The fix was hierarchy — one claim
at display size, notes demoted under it, a mono spec rail on a hairline.

## Conventions

- **Palette** lives in `:root` in `src/styles.css`. `--accent` is white. There
  was an amber/terracotta accent and a dashed "placeholder" badge; both were
  removed deliberately. Do not reintroduce orange without being asked. The one
  exception is the Sonar scan's red/orange candidate markers, which are the
  engine's own data semantics.
- **Eyebrows** (`.eyebrow`) are white, uppercase, mono, and set once globally so
  every section matches the hero. Change them in one place.
- **Headers** are `--nav-h` (104px) on the landing page and the subpages, both
  using the same three-column grid so the bar does not resize between routes.
  Raised from 80px and the logo from 38px to 50px against axis-re.nl, which was
  finally reachable — see below.
- **One container system.** `--nav-h`, `--gutter`, `--maxw` and `--band` in
  `:root` own every band's rhythm and measure. Sections used to carry their own
  numbers (firm 14vh/1240px, news 16vh, closing 24vh, beats flush-left at
  900px), so copy started at a different x depending where you were on the page.
  A new section resolves through the tokens; it does not invent a padding.
- **The nav groups.** Two dropdowns (`DAA`, `Strategy`) plus three flat links,
  following axis-re.nl's grouping. Below 980px they collapse into a full-screen
  panel — before that there was no mobile navigation at all and every subpage
  was unreachable on a phone. There is deliberately no `#track-record` link:
  that section was deleted in pass 5.
- **Maps** take their tiles from `src/lib/basemap.js` and nowhere else. See
  below.
- Comments explain *why*, not what. Several in this repo record a bug that was
  expensive to find; keep that habit rather than trimming them.

## Things that have already bitten

- **MapLibre owns a marker element's `transform`.** Animating the root's
  transform collapses every marker onto the map origin. Animate the children and
  share the delay through a custom property.
- **Canvas sizing on a beat.** Size the canvas to the *map's* box, not the
  165vh section, or you draw into 65vh of clipped space and every screen-space
  radius is inflated.
- **Projection units.** Mercator y is radians; longitude is degrees. Mixing them
  puts the axes on scales ~57x apart.
- **`window.scrollTo` fights Lenis** on the landing page. Go through
  `src/lib/scroll.js`. App did exactly this until it was fixed: it reset scroll
  on EVERY hashchange, so in-page anchors (`#market`, `#news`) threw you to the
  top of the page instead of to the section. Scroll is now only reset when the
  ROUTE changes; anchors go through `scrollToHash`.
- **Static canvas layers.** Both instrument beats used to re-stroke their entire
  finished composition every frame forever — ~5,600 Lyon polylines, the whole
  scribble mesh — which is what made scrolling stutter. Once the build-in
  closes, they bake to an offscreen canvas and blit. Edge bakes TWO layers
  (ground, markers) because the beam draws between them; baking one would tint
  the markers. Any resize invalidates the bake.
- **`scrub: true` reads as stutter** against Lenis's eased scroll, because the
  tween is tied to scroll position on the same frame. Use a scrub duration
  (0.6) so GSAP catches up over time instead.
- **Reduced motion means the whole page settles**, not just the veil and the
  scroll cue: Lenis is not constructed at all (it is smooth-scroll hijacking),
  and the scrub tweens are skipped. `src/lib/motion.js` is the one check.
- **Film grain uses `mix-blend-mode: overlay`**, which *lightens* near-black.
  Fine over footage, a veil over a dark instrument — hence `.stage--instrument`.

## The basemap, and why it is not simple

CARTO began stamping "API KEY REQUIRED" across unauthenticated tiles on
2026-08-24. `src/lib/basemap.js` (ported from the `tportunato/sonar` repo, which
hit this first) owns the tile URL for all three maps and carries a fallback
chain. Without a key it uses Esri's keyless canvas — which is called Dark *Gray*
and means it, so that rung is knocked back with MapLibre raster paint to sit on
the same near-black ground the Sonar app composites on.

**Setting `VITE_CARTO_KEY` in Vercel puts CARTO back in front and makes the
sections identical to the app.** Free key, same one Sonar uses. Never commit it:
Vite bakes `VITE_*` into the browser bundle.

## Related repo

`tportunato/sonar` is the origination engine. The Origination beat is a port of
its cold-open intro and its Lyon data files are copied into
`public/data/{showcase,metro}/lyon.json`. When that section needs work, read
`src/Intro.jsx` and `src/basemap.mjs` there first. **The engine's real candidate
locations are commercially confidential** — the red candidate markers on this
site are deliberately synthetic. The industrial points are real.

## Open decisions

- **Firm section background.** Three are built (`corridors`, `hold`, `frame`),
  switchable at runtime with `?bg=`. Default is `hold`. Once one is chosen,
  delete the other two and the query-param hatch.
- **The manifesto rail.** The serif line now carries a sans sub-line and a mono
  rail beneath it, because the claim alone gave a sceptical reader nothing. It
  is still the page's ONE serif moment; the support is deliberately in the
  page's other voices. If a graphic plate is ever made for this section, it goes
  behind the type, not beside it.
- **Contact form has no backend.** It opens a pre-filled mail draft rather than
  appearing to send and dropping the message. Wire a real endpoint when one
  exists.
- ~~**Header size and the contact page** were built against `axis-re.nl` as a
  reference, which could not be loaded from the build environment.~~ RESOLVED:
  axis-re.nl was reachable on 2026-09-17. Its header is a fixed bar with a wide
  logo and one grouped dropdown (`Axis` → About us / Vision & Mission / Team)
  alongside flat items. The bar height, the 50px logo and the two nav groups
  here follow it.
- Copy says "specializing"; `index.html`'s meta says "specialising". Supplied
  copy was left as given.

## Environment

Sandboxed sessions may have restricted egress. In the session this file was
written in, only GitHub and package registries were reachable: `daacap.com`
(hotlinked asset and team photos), jsDelivr (MapLibre) and the tile providers
were all blocked, so maps and images render blank locally and are fine on the
deploy. If you need to verify a map, serve MapLibre from `node_modules` and stub
the tiles rather than concluding something is broken.
