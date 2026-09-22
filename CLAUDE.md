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
- **One serif moment**: now the Closing line only. The Manifesto was restyled to
  mirror the firm section and then moved off the landing page onto
  Sustainability, so Cormorant appears once. Do not add a second.

When a section starts to read like a generic marketing band, that is the bug.
The firm section was rebuilt once for exactly this reason: two supplied
paragraphs set at equal weight in two columns. The fix was hierarchy — one claim
at display size, notes demoted under it, a mono spec rail on a hairline.

## Structure (pass 7)

The one-pager became a site. Home is hero, firm, market, portfolio and a
future-proof section that mirrors the firm section; origination, asset
management, the thesis and news all moved to their own routes. Every nav
destination is a real route in `src/App.jsx`'s ROUTES table.

Shared page furniture lives in `src/sections/`: `PageHero` (variants `full` and
`boxed` — boxed stops the image short and puts the copy on a solid panel under
it), `SplitFeature` (the firm section's layout, reusable), `NewsStrip`,
`GetInTouch`, and `PageBar`, which is just the shared `Nav`. Page copy is in
`src/data/pages.js`.

Buttons are one `.btn` component. The old `.beat-cta` underlined link is gone.

## The DAA group is one page

Vision & Mission, Sustainability and the team are SECTIONS of `#/about`, not
routes. `src/pages/About.jsx` carries all four; `src/sections/TeamGrid.jsx`
holds what was lifted out of the old Leadership page - the advisory grid -
and `src/sections/TeamCarousel.jsx` is the team row.

**The section is LABELLED "Team"; its id and its URL are still `leadership`.**
That split is deliberate. `#/leadership` is a published address, `SECTION_OF`
maps it to the section id, and renaming the id to match a word nobody sees
would break every existing link. Rename both together or neither.

**Each section keeps the hero it had as a page.** Vision & Mission and
Sustainability open on the same boxed `PageHero`, with the same photograph, as
when they were routes of their own, and the team section opens on the team
photo.
`section` on PageHero is the in-page form: a `<section>` with an id and an h2
instead of a `<header>` with the page's one h1. The first attempt folded them
in as plain eyebrow-and-statement bands and the page stopped feeling like the
places it carries. Do not flatten them again.

**Their URLs still exist and still mean something.** `#/vision`,
`#/sustainability` and `#/leadership` render About and land on the matching
section, which is what keeps every old link, bookmark and dropdown item honest
without rewriting any of them. `SECTION_OF` in `src/App.jsx` maps URL to
section id; the ids live on the sections in About.jsx. Rename one and fix both
in the same commit.

Arriving at a section from another page JUMPS; moving between sections while
already on About EASES, because that is an in-page anchor. A ref tells the two
apart. Bare `#/about` has to be handled explicitly: the page key does not
change between these four URLs, so `jumpToTop` never fires for them.

## The team row

Four members do not fit across, so the row in `src/sections/TeamCarousel.jsx`
scrolls sideways instead of wrapping to three and one, which reads as a team
with a hole in it. It was five until the incoming CIO's seat was pulled before
the appointment was announced; `src/data/team.js` says where that copy went. **The CARDS are the grid's cards, unchanged** - same width,
same 108px circular portrait, same copy. Only the container moved. The advisers
stay a grid: there are three of them and they are a board, not a sequence.
`src/sections/TeamCard.jsx` is the one card, shared by both.

It is a NATIVE scroller, not a transform track: momentum on a phone, trackpad,
keyboard and scroll-snap all come for free, and a hand-driven scroll rig is
exactly what Lenis taught this repo not to build. Nothing hijacks wheel events
here - Lenis is constructed by Landing and destroyed on a route change.

Four things there are load-bearing:

- **The viewport is 3.18 cards wide.** A sliver of the fourth is the cue that
  the row continues; three fitting exactly looks like a short grid. `--cards`
  and `--peek` on `.teamtrack` own it, one card and 0.15 below 960px.
- **The pointer is captured only once a drag actually starts**, never on
  pointerdown. Capturing up front retargets the pointerup to the scroller, the
  click is then dispatched at the common ancestor rather than the button under
  the cursor, and every Read more and LinkedIn in the row silently stops
  working. Snap is switched off for the same window, or mandatory snap drags
  the row back under the cursor every frame.
- **A drag that ends on a button must not also press it.** The click fires
  after pointerup, so it is swallowed in `onClickCapture`.
- **The rail is the scrollbar**, drawn in the page's hairline: the thumb is as
  wide a share of it as the viewport is of the row, so it reports how much is
  off-screen as well as where you are. The native bar is hidden.

`TeamCard` clamps a bio at 150 characters and shows Read more ONLY if it is
longer, and drops the LinkedIn link when `linkedin` is null. Neither was true
of the old card, which truncated unconditionally and always rendered the link:
the first short bio got a "…" and a button that revealed nothing. Tomaso's
`linkedin` is null today because the URL has not been supplied. Do not guess
one.

## Team portraits

All eight portraits are local under `public/images/team/`. The five that were
hotlinked from daacap.com were pulled down on 2026-09-22 when the site was cut
free of WordPress, and every one of them was out of frame: crown between 0.028
and 0.081 where the frame wants 0.080, which is up to 21px of vertical drift in
a 400px picture and plainly visible as heads bobbing along the row. They were
re-cut to the measurements below. `placeholder.jpg` is referenced by nothing
right now - it is the grey silhouette for the CIO seat that was pulled, kept so
restoring the seat is one line.

They are cut to a MEASURED frame rather than by eye, because the row puts them
side by side and a head half a size out is obvious: 400x400, crown at 0.08 of
the frame, crown-to-neck 0.54, face centred. The neck is found as the narrowest
row between the crown and the shoulders, which is what makes three different
source photographs comparable. At 0.54 the head still clears the circle's edge
at its widest.

Two traps, both of which shipped once:

- **A studio backdrop is not pure white.** Philippe's is a flat 250,250,250, so
  padding the frame out with 255 left a grey rectangle plainly visible inside
  the 108px circle. Near-neutral, very bright pixels are snapped to 255 first;
  the test is deliberately narrow so it cannot reach a pale blue shirt.
- **The oval bottom must fall OUTSIDE the inscribed circle.** The portraits are
  rounded off at the bottom rather than ending on a straight cut, but the cards
  crop them to a circle, and an arc that bites inside it puts a white wedge at
  the lower flanks that the published portraits do not have. The arc is
  swept wide and deep (cy 0.55, ry 0.60, rx 0.90, band 0.07) so no column of it
  intrudes - verified, 0 of 2001 sampled columns. It is only visible if a
  portrait is ever shown square.

Tomaso's source is 118x150. It is upscaled and soft; a larger original is the
only fix.

The cutter is not in the repo, deliberately - it is a one-off, and keeping a
script that nothing runs invites someone to trust it without re-reading it. The
measurements above are the specification; re-derive from them. The extraction
that matters is the neck: find the widest row of the head first, then take the
narrowest row BELOW it, or a jaw gets mistaken for a neck. Validate any new
implementation against philippe-riachi.jpg and tomaso-portunato.jpg, which sit
on the frame at crown 0.080 and crown-to-neck 0.532 and 0.540.

## Regulatory status is not a marketing argument

The firm is not allowed to use its regulatory status as a selling point, and the
homepage carried exactly that: "A FINMA regulated Swiss investment firm..." set
at display size as the firm statement. It is gone.

FINMA now appears in two places only, and nowhere else:
- one quiet line in the footer, `.regstatus`, at the same weight as the
  copyright, never larger and never styled as a badge;
- the full wording on `#/legal` (`src/pages/Legal.jsx`).

Do not reintroduce it into a heading, an eyebrow, a stat, a spec rail or a hero.
`#/legal` is NOT the full investor disclaimer, which is a separate document;
folding that in here would make the page read as defensive.

The About page still says the firm is "regulated in Switzerland" in body copy.
That is deliberate and pending a decision from the partners; leave it.

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
- **The nav groups.** One dropdown (`DAA`) plus four flat links, following
  axis-re.nl's grouping. **The DAA label is a link, not a button**: it goes to
  `#/about`. As a button it appeared to do nothing, because hover had already
  opened the menu. Below 980px they collapse into a full-screen
  panel — before that there was no mobile navigation at all and every subpage
  was unreachable on a phone. There is deliberately no `#track-record` link:
  that section was deleted in pass 5.
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
decides the phase list. **The second A's main stroke is ONE dash, SHORT 0.63 to
1.0 — do not split it there.** An earlier version cut it into top, bottom and
foot: that put the bottom sweep's start at the far corner of the foot, which
the foot had not reached yet, and the letter broke apart at the bottom right.
The foot is traversed in passing, the same way the long contour dips through
the first A's foot. The ONE split that is correct is the tip, below, and it
overlaps rather than abuts.

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
second A's main stroke starts at SHORT 0.63, not earlier: at 0.62 the leading
edge of an 11-wide brush still reaches 276 pixels sideways across the gap onto
the crossing, which is drawn at the end; and it uses a brush of 11, since 7.6 cannot reach the inner edge at
x 120-123 from the side the pen travels. Every timing
map is also forced to end at 1, or each phase leaves its interval's last sliver
undrawn. There is no settle phase.

**VERIFY COVERAGE AT 10x AGAINST THE PLAIN FILL, NOT AT 4x.** A 4x render with a
>128 threshold pronounced all of this complete and shipped a black slash across
the crossing where the first A passes under the second - 3.3 square units of
hole that 4x smeared over. The check that matters renders at 10x and compares
pixel for pixel with the two fills.

That 10x check is necessary but NOT sufficient, and believing otherwise cost
three rounds. It reported six stubborn dark pixels, which got written off as an
antialiasing floor; they were not. A butt-cap seam scores the same on it as a
mark with no seam at all. The live-page check above is the one that settles it,
and it now reports ZERO pixels dimmer than the fill.

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

There is no third place. Content pages route through `PageBar` -> the same
`Nav`, so one logo serves every route; the per-page headers that used to draw
on mount, animating the furniture on every route change, are gone with the
pass-7 restructure.

**The veil lifts when the wordmark reports itself finished** (`onDone`), never
on a timer. Timing it by hand needs two clocks to agree and they do not: React
mounts and starts the draw's rAF loop about 300ms after the veil's own CSS
animation begins, so a delay picked to match the 2320ms draw still lifted while
the last stroke was travelling. It used to lift at 1750ms and nobody had ever
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
- **Opening a page must JUMP to the top, not animate there.** Navigation used
  to call `scrollToTop()` from the hashchange handler, which failed twice: it
  ran before React had rendered the new page, so it scrolled the old one; and on
  the landing page it started a 1.1s Lenis animation on an instance Landing
  destroys a moment later when it unmounts, killing the scroll mid-flight.
  Clicking through to Strategy landed you halfway down it. `jumpToTop()` is
  instant and separate from `scrollToTop()`, which stays eased for the Back to
  top button, and App calls it from a `useLayoutEffect` keyed on the page — so
  after render, before paint. Two articles count as two pages, so the key
  includes the article id.
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
- **`opacity: 0` does not make an overlay inert.** The mobile nav panel is
  `display: block` at all times below the breakpoint and only fades, so with
  opacity alone it stayed a full-screen, `overflow-y: auto`, pointer-accepting
  layer sitting over the page. Every touch landed in it, a drag scrolled the
  panel instead of the document, and the site was unscrollable on a phone from
  the moment it loaded. It needs `visibility: hidden` AND
  `pointer-events: none` when closed. Any full-screen overlay added later needs
  the same three, not just the one.
- **Do not centre a GSAP-animated element with `left:50%` + `translate:-50%`.**
  GSAP takes ownership of transforms and folds the standalone `translate`
  property into its own matrix. Chromium survives it, Safari does not: on iOS
  the -50% was dropped and `.hero-content` sat at `left:50%`, shoved half a
  screen right and running off the edge. Use `left:0; right:0; margin-inline:
  auto` — pure layout, nothing for GSAP to consume. `.nav-menu` still uses
  translate centring and is fine, because nothing animates it.
- **Lenis is for a mouse, not a finger.** It drives scroll position from a rAF
  loop, which fights the browser's own momentum and rubber-banding on a phone:
  the page stalls, overshoots, or will not move. It is not constructed at all
  when `(hover: none) and (pointer: coarse)` matches. `src/lib/motion.js` owns
  that check alongside the reduced-motion one. Lenis also ships a stylesheet
  from 1.1 onwards, `lenis/dist/lenis.css`, imported in `main.jsx`; it was
  missing for several passes.
- **A sticky beat is a dead zone under a thumb.** A `.beat` is 165svh around a
  sticky 100svh stage, so ~430px of scrolling happens with the stage pinned and
  nothing on screen changing. With a mouse that reads as a deliberate hold; on a
  phone it reads as the page having stopped responding. Below 880px a beat is
  the height of its stage, so there is no pin at all.
- **Full-screen centred sections clip their own copy on a phone.** `.firm` and
  `.split` are `min-height:100svh` with `align-items:center` and
  `overflow:hidden` (the latter to contain the photo panel). Narrow screens make
  the copy taller than a viewport, centring pushes it out of both ends, and the
  overflow rule cuts it off — 42px of the firm section's text was simply not
  rendered. Below 880px these sections grow with their content and the photo
  moves behind the copy. Any new full-height centred section needs the same.
- **`100vh` is wrong on a phone.** It counts the collapsing URL bar, so every
  full-screen stage is taller than the visible viewport and the page jumps as
  the bar hides and shows. Every `100vh` carries a `100svh` line after it;
  browsers without `svh` ignore the second and keep the first. A new
  full-height rule needs both.
- **Reduced motion means the whole page settles**, not just the veil and the
  scroll cue: Lenis is not constructed at all (it is smooth-scroll hijacking),
  and the scrub tweens are skipped. `src/lib/motion.js` is the one check.
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

Sandboxed sessions may have restricted egress, and it varies between sessions.
`daacap.com` was blocked for several passes and was reachable on 2026-09-22,
which is what finally allowed the site to be cut free of WordPress. jsDelivr
(MapLibre) and the tile providers are still blocked, so maps render blank
locally and are fine on the deploy. If you need to verify a map, serve MapLibre
from `node_modules` and stub the tiles rather than concluding something is
broken.

Nothing on the site fetches from daacap.com any more, so a block there no longer
hides anything: every image is local. Check with

    grep -rn "wp-content" src/ index.html public/

which should return nothing at all.
