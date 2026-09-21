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
- **Headers** are 80px on the landing page and the subpages, both using the same
  three-column grid so the bar does not resize between routes.
- **Maps** take their tiles from `src/lib/basemap.js` and nowhere else. See
  below.
- Comments explain *why*, not what. Several in this repo record a bug that was
  expensive to find; keep that habit rather than trimming them.

## The wordmark draws itself

`src/sections/Wordmark.jsx` + `src/lib/wordmark.js`. The logo is inline SVG now,
not an `<img>`, so it can write itself on, in the order the mark is built and
per the client's own sketch: down the D's stem, round the bowl to close the D,
out along the BOTTOM of the first A, round the second A, then back leftward
along the TOP of the first A to finish. The feet under each A land whenever the
brush passes them and are not sequenced.

It takes SEVEN PHASES, not two, and that is not an accident. The logo is an
interlaced ribbon and neither contour maps onto a letter: on the long one the
first A's bottom sits at dash 0.10-0.25 but the D's bowl at 0.45-0.65, so a
single continuous dash cannot put the D first whichever way it runs. Each phase
draws an INTERVAL of a contour, and intervals can be replayed in any order
because revealing is additive. The two directions of travel round the long
contour sweep the bowl the SAME way, so reversing does not help - only a
different interval does. Directions are verified by tracking the centroid of
newly revealed ink frame by frame, never by eye: three earlier attempts each
had some arrow backwards and looked fine to me. Read the comment at the top
of `wordmark.js` before touching it — the short version is that the logo is a
monoline saved as FILLED outlines, so there is no centreline to dash. It uses
the fill as a mask and dashes a fat brush along the outline underneath, and the
timing maps were MEASURED in a browser (coverage sampled per path, then
inverted) because a contour reveals area in fits and starts.

A DASH ONLY GROWS FORWARD FROM ITS OWN START, so a phase whose interval begins
away from where the pen is appears as a mark of its own, floating. That is what
decides the phase list. **The whole second A is ONE dash, SHORT 0.605 to 1.0 —
do not split it.** Splitting it put the bottom sweep's start at the far corner
of the foot, which the foot had not reached yet, and the letter broke apart at
the bottom right. The foot is traversed in passing, the same way the long
contour dips through the first A's foot.

THREE THINGS ABOUT A DASH DECIDE HOW IT READS: where it starts, which way it
grows, and whether it merely abuts the next one. **Two dashes that share a
butt-cap edge do not composite to solid** — they leave a one-pixel dark seam
across the finished letter. The second A's tip (SHORT 0.60-0.635, narrow brush)
and its main stroke (0.63-1.0, brush 11) therefore OVERLAP rather than meet.
The tip needs the narrow brush: 11 wide there reaches 276 pixels sideways
across the gap onto the crossing, which is drawn at the end.

**CHECK THE LIVE PAGE, NOT JUST A CANVAS.** That seam does not show in an
offscreen rasterisation of the same SVG at 10x — it measured the same as a mark
with no seam — but it is plainly visible in a screenshot of the rendered page.
The check that matters screenshots the real element, redraws it as the plain
fill, and compares pixel for pixel.

PHASES MAY OVERLAP IN TIME, so each carries its own `start`/`end` window rather
than a share of a running total. One does: the crossing is a stretch no pen
passes through, and it runs just as the second A's pen lands on the junction
beside it. It is taken on **`SHORT_R`, the same contour reversed**, because a
dash only grows forward — on `SHORT` it grows away from the junction and stands
as an island until nearly complete.

Three things there are load-bearing and easy to undo by accident: the brush
has a FLAT cap and is as narrow as will still cover (a round cap is a disc that
reaches into the neighbouring letterform and lights stray fragments early); the
short path is re-authored to START AT THE JUNCTION so the second stroke
continues the first rather than restarting in mid-air; and the maps are
specific to this artwork, these brush widths, this cap and this direction.
Change any of those and re-measure.

THREE NUMBERS THERE WERE SWEPT, not chosen, and each closes a visible defect:
the stem stops at dash 0.07 (0.075 spills 716 pixels of the first A's diagonal
and 0.09 spills 2872 - it grew a branch out of the D before the D existed); the
second A starts at SHORT 0.62, not earlier, or its first ink lands on the
crossing; and it uses a brush of 11, since 7.6 cannot reach the inner edge at
x 120-123 from the side the pen travels. Every timing
map is also forced to end at 1, or each phase leaves its interval's last sliver
undrawn. There is no settle phase.

**VERIFY COVERAGE AT 10x AGAINST THE PLAIN FILL, NOT AT 4x.** A 4x render with a
>128 threshold pronounced all of this complete and shipped a black slash across
the crossing where the first A passes under the second - 3.3 square units of
hole that 4x smeared over. The check that matters renders at 10x and compares
pixel for pixel with the two fills. Six pixels stay dark; that is the floor,
since brushing both contours whole with no phases at all leaves five.

## Where the wordmark animation plays

The draw is the ARRIVAL MOMENT, not a decoration on every page. It runs in
exactly two places:

- **The intro veil** on the landing page (`src/Landing.jsx`), on a real page
  load — including a refresh of the home tab — but not when you navigate back
  from a subpage. The gate is a MODULE-LEVEL flag, deliberately: `Landing`
  unmounts on a route change, so a component-level one would replay, and
  `sessionStorage` survives a reload, so that played once per tab and never
  again.
- **The nav logo** (`src/sections/Nav.jsx`), on pointer enter. It never plays
  unbidden.

The three subpage headers are `mode="none"` — a static fill. They used to draw
on mount, which animated the furniture on every route change.

**The veil lifts when the wordmark reports itself finished** (`onDone`), never
on a timer. Timing it by hand needs two clocks to agree and they do not: React
mounts and starts the draw's rAF loop about 300ms after the veil's own CSS
animation begins, so a delay picked to match the 2320ms draw still lifted while
the last stroke was travelling. It used to lift at 1150ms and nobody had ever
seen the last 15% of the mark on the real site. Measured end to end: the draw
finishes at 2320ms, the veil holds 300ms, the lift takes 600ms, the page is
there at 3240ms. Change the pace and none of those numbers need touching.

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
  `src/lib/scroll.js`.
- **Film grain uses `mix-blend-mode: overlay`**, which *lightens* near-black.
  Fine over footage, a veil over a dark instrument — hence `.stage--instrument`.
- **A zero-length dash is not nothing.** With `stroke-linecap: round` it still
  paints a round cap, so an un-started brush leaves a dot on screen.
- **`if (!t0) t0 = now`** re-stamps the start on every frame when a rAF
  timestamp is legitimately 0, freezing an animation at its first step. Use an
  explicit `null` sentinel.

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
- **Contact form has no backend.** It opens a pre-filled mail draft rather than
  appearing to send and dropping the message. Wire a real endpoint when one
  exists.
- **Header size and the contact page** were built against `axis-re.nl` as a
  reference, which could not be loaded from the build environment. They may need
  refining against the real thing.
- Copy says "specializing"; `index.html`'s meta says "specialising". Supplied
  copy was left as given.

## Environment

Sandboxed sessions may have restricted egress. In the session this file was
written in, only GitHub and package registries were reachable: `daacap.com`
(hotlinked asset and team photos), jsDelivr (MapLibre) and the tile providers
were all blocked, so maps and images render blank locally and are fine on the
deploy. If you need to verify a map, serve MapLibre from `node_modules` and stub
the tiles rather than concluding something is broken.
