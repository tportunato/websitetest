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

Current files are 720p Veo Fast drafts. Final = 1080p Veo Quality renders.

## Where things live
- Copy: `src/sections/*.jsx` (each section is one story beat)
- Colors/typography: `src/styles.css` (`:root` variables at top)
- Canvas animations (beats 03/05): `src/sections/Edge.jsx`, `src/sections/Portfolio.jsx`

## Beat 03: the Sonar scan
`Edge.jsx` is a port of the Sonar app intro (canvas engine). It ships with a REAL
engine snapshot (`public/data/showcase-lyon.json`: 2,901 industrial points, 71
candidates, real counters, Lyon corridor, 2026-07-07). The road-growth phase is
synthesized because the full snapshot was too large to transfer. To get the real
road network: copy `public/data/showcase/lyon.json` from the sonar repo over
`public/data/showcase-lyon.json` in this repo (the component auto-detects roads).

## Placeholders requiring sign-off (all marked with dashed amber badges on the page)
- "-35% completions (CBRE)" stat — verify source and figure
- "XX% off-market" stat — real number needed
- Track record counters (12%+ target IRR, EUR 300m, 6 markets) — compliance sign-off
- Quote + team photography in the Proof section

## Known limitations of Pass 1 (deliberate)
- Videos play on scroll-enter and hold their last frame (no scroll-scrubbing yet)
- No News section wiring (WordPress API integration is a later pass)
- Mobile uses CSS-cropped 16:9 videos (fine for drafts)
- No cookie banner / GDPR wiring yet
- Wordmark is styled text; drop in the real DAA logo SVG when ready
