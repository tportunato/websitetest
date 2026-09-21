# DAA Capital Partners — Website Skeleton (Pass 1)

Cinematic one-pager: React + Vite, GSAP ScrollTrigger, Lenis smooth scroll.
Six story beats, three AI-generated draft video backgrounds, two code-driven
canvas animations, placeholder copy in DAA voice.

## Run locally
    npm install
    npm run dev

## Deploy
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel. Framework preset: Vite (auto-detected). No config needed.

## Swapping in final videos
Replace the files in `public/videos/` keeping the SAME filenames:
- `beat01-city-vans.mp4` (hero, Paris vans)
- `beat02-warehouse-timelapse.mp4` (market section)
- `beat04-facade-dolly.mp4` (asset management section)

Current files are 720p Veo Fast drafts, re-encoded to ~2MB each (crf 27) with
poster frames for instant paint. When the final 1080p Quality renders arrive,
give them to Claude for the same compression + poster treatment before committing.

Performance architecture: canvas sections pause their animation loops when
off-screen and resume on re-entry; MapLibre maps initialize only when their
section comes within 600px of the viewport; canvas DPR is capped at 1.5.

## Where things live
- Copy: `src/sections/*.jsx` (each section is one story beat)
- Colors/typography: `src/styles.css` (`:root` variables at top). `--accent` is the
  house light blue used for eyebrows, links and markers; `--flag` is amber and is
  reserved for placeholder badges only, so unsigned-off content stays obvious.
- Canvas animation (beat 03): `src/sections/Edge.jsx`
- Map sections: `src/sections/Portfolio.jsx` and `src/pages/PortfolioMap.jsx`.
  The lazy MapLibre loader and the shared dark basemap style live in
  `src/lib/maplibre.js`.
- News & insights list: `src/data/news.js`

## Beat 03: the Sonar scan — IMPORTANT, two files to copy
`Edge.jsx` is a faithful port of the Sonar app intro: same MapLibre dark basemap,
same palette, same timeline, same drawing code. To make it visually IDENTICAL to
the app, copy TWO files from the sonar repo into this repo:

    sonar/public/data/showcase/lyon.json  ->  daa-website/public/data/showcase/lyon.json
    sonar/public/data/metro/lyon.json     ->  daa-website/public/data/metro/lyon.json

(create the folders). The first carries the real road network; the second the
motorway isochrones. Without them the component falls back to the bundled
salvaged snapshot (`public/data/showcase-lyon.json`: real industrial points and
candidates, but synthesized roads and no isochrones).
The basemap loads MapLibre from jsDelivr and dark tiles from Carto's public CDN.

## Placeholders requiring sign-off
None. The "-35% completions (CBRE)" stat was removed in pass 5, joining the
"XX% off-market" stat, the track-record counters and the placeholder quote,
which went in pass 4. The dashed-amber badge component has been deleted with
them — bring it back rather than shipping an unverified figure bare. See
`NOTES-data-honesty.md`.

## Known limitations of Pass 1 (deliberate)
- Videos play on scroll-enter and hold their last frame (no scroll-scrubbing yet)
- No News section wiring (WordPress API integration is a later pass)
- Mobile uses CSS-cropped 16:9 videos (fine for drafts)
- No cookie banner / GDPR wiring yet
- Wordmark is styled text; drop in the real DAA logo SVG when ready


## Pages (added in pass 3)
Hash-routed pages, no server config needed:
- `#/portfolio` — interactive asset map (MapLibre), data in `src/data/assets.js`
- `#/leadership` — team page, data in `src/data/team.js`

Asset and team photos are hotlinked from the existing daacap.com WordPress.
To use better photos: drop files into `public/images/` and update the `img`
fields in the two data files. Keep the old WordPress running as long as the
new site hotlinks its media.


## Pass 4 edits
- **Nav**: taller bar (84px), larger wordmark, and a three-column grid so the
  logo sits level and the links are centred against the bar rather than against
  whatever the logo and the login button happen to measure.
- **Palette**: the terracotta/amber accent is retired in favour of a light blue
  (`--accent: #8fbfe0`). Amber survives only as `--flag`, on placeholder badges.
  The Sonar scan in beat 03 keeps its own red/orange candidate markers — those
  are the app's data semantics and the port is deliberately faithful.
- **The firm**: new section directly under the hero, copy supplied by DAA, on a
  code-drawn background (hairline grid, two soft washes, a very slow sheen — no
  video, no image).
- **Origination**: sourcing described as a mix of a wide broker network and
  proprietary sourcing technology; the "XX% off-market" placeholder is gone.
- **Portfolio beat**: the abstract corridor-network canvas is replaced by the
  five real assets on the dark basemap, with a stat strip computed from
  `src/data/assets.js`. Markers fade up in sequence; note that MapLibre owns the
  marker element's `transform`, so the rise animates the children, not the root.
- **News & insights** replaces the Track record section: three real articles from
  daacap.com plus an "All articles" link. Hand-maintained in `src/data/news.js`
  until the WordPress REST feed is wired.


## Pass 5 edits

### The "API KEY REQUIRED" watermark
CARTO began stamping unauthenticated tiles on 2026-08-24, so every map on the
site carried a watermark. `src/lib/basemap.js` (ported from the Sonar repo,
which hit this first) now owns the tile URL for all three maps. It leads with
Esri's dark canvas, which needs no key. Set `VITE_CARTO_KEY` in Vercel and
CARTO takes the lead automatically, no code change — the key is free from
carto.com/basemaps/apikey and must never be committed, since Vite exposes
anything named `VITE_*` to the browser.

Caveat worth recording: the Esri tile could not be fetched from the build
sandbox (egress-blocked), so that rung rests on the Sonar repo's own note of a
browser test on 2026-08-24, not on a check made here. Confirm it renders on the
Vercel deploy.

### Origination
The Lyon data files were refreshed from the Sonar repo, so the section draws
the same geography as the app's cold-open: 5,624 real road segments, real
isochrones, and the engine's real industrial points as the orange dots. The red
candidates stay synthetic on purpose — real candidate locations are
confidential. Camera now matches Sonar's intro (zoom 10.35, pitch 40,
bearing -10) and the radar radius is measured from the city rather than the
viewport. The canvas is sized to the map's box, not the 165vh section, which
was inflating every screen-space radius.

### Everything else
- Accent colour is now white (`--accent`). The amber `--flag` and the `.badge`
  component are deleted.
- Eyebrows are white and larger (`clamp(0.8rem, 1vw, 0.92rem)`), applied
  globally so the hero, Origination, Asset management, Portfolio and Closing
  all match.
- Header is 80px on the landing page AND on the subpages, which previously ran
  a shorter bar of their own. The back arrow beside the wordmark is gone.
- Market section: the -35% stat is removed.
- Asset management headline: "We underwrite the building it becomes."
- Closing section now names City Logistics Industrial Capital Fund I (CLIC).
- New `#/contact` page (`src/pages/Contact.jsx`); the nav Contact link points
  there instead of scrolling to the footer. The form opens a pre-filled mail
  draft — wire a real endpoint when one exists.


## Pass 6 notes

### Why the maps looked lighter than the Sonar app
Not a scrim — a different supplier. Sonar runs CARTO `dark_all`, which is very
nearly black. Without a key this repo falls back to Esri's canvas, which is
called Dark **Gray** and means it: land comes back around rgb(58,58,58), and at
the same opacity it lifts the whole frame to a blue-grey wash.

`src/lib/basemap.js` now gives each rung its own paint. The Esri rung is knocked
back with MapLibre's `raster-brightness-max`, `raster-saturation` and
`raster-contrast` (not a CSS filter, which would hit the markers and the canvas
overlay too) and ramps to a lower opacity. Measured against a stub tile at
Esri's own land value, the ground lands at rgb(6,12,20) vs Sonar's #060d16.

**To match the app exactly, set `VITE_CARTO_KEY` in Vercel** — the same free key
Sonar already uses. CARTO then leads automatically and nothing else changes.

### Portfolio beat
Reverted to the original corridor-network canvas (coastlines, braided corridor
bundles, scribble mesh, asset markers igniting along the axes). Its amber
markers were recoloured white to match the current palette, and it takes its
tiles from `basemap.js` like everything else. The five real assets still live on
the `#/portfolio` page.

Because that canvas is back, the firm section's `corridors` background now
repeats it on the same page, so the default there moved to `hold`.


## Pass 7 notes — three defects in the wordmark draw

All three were measured rather than eyeballed. **The measurement resolution was
itself the story**: the first round of fixes was verified at 4x with a >128
threshold, pronounced complete, and shipped a black slash across the crossing
where the first **a** passes under the second — 3.3 square units of hole that 4x
smeared above the threshold. Coverage is now checked by rendering at 10x and
comparing against the plain fill pixel for pixel. Six pixels stay dark, which is
the floor: brushing both contours whole, with no phases at all, leaves five in
the same place.

### A branch grew out of the D before the D was closed
The stem phase ran to dash 0.09 of the long contour, and past 0.07 that contour
has already turned into the first **a**'s diagonal. At 10x: 0.07 lays the stem
plus 77 pixels of its own turn, 0.075 spills 716, 0.09 spills 2872 — the branch.
The stem now stops at 0.07.

### The second A's foot finished before the rest of the A
Not a phase-order problem. Going round that contour the pen runs down the right
side, **around the foot**, and only then sweeps the bottom leftward, so in
outline order the foot genuinely completes first. No interval fixes it.

Phases therefore carry an explicit `start`/`end` window instead of a share of a
running total, and windows may overlap. The foot is now a **rider**: it takes
the first 30% of the bottom sweep's window, and since that sweep sets off from
the foot's own corner the foot fills in behind the pen — which is what the first
**a**'s foot already did for free.

### Zones on the second A that only finished at the very end
Three of them, with three different causes. There is no settle phase any more.

- x 120-123 was out of reach of a 7.6 brush from the side the pen travels.
  **Brush 11** on the three second-**a** phases closes it; 10 still leaves 6
  pixels.
- x 88-92, y 24-28 closes by starting arrow 7 at SHORT **0.605** rather than
  0.62 — worth 468 pixels.
- x 84-90, y 34-38 is an isolated patch at the crossing that **no stroke
  reaches**. It is a second rider, SHORT 0.32-0.34, on the first 25% of arrow
  7's window — arrow 7's pen starts on top of it.

Every timing map is also **forced to end at 1**. Left as measured, a map stops
at the dash fraction where its ink stopped growing, which usefully skips a
retrace plateau — but it leaves the interval's last sliver undrawn, and at arrow
10's terminal that cost 5 real pixels.

Every pixel the old build left to its settle phase now lands with the stroke
that passes over it, between 52% and 88% of the run.
