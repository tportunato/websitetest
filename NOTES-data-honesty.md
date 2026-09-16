# Data honesty notes — DAA website

Plain-language notes on how exact everything on this site is.

| Element | Tag | Notes |
|---|---|---|
| Hero video (Paris vans) | REPRESENTATIVE | AI-generated (Veo 3.1) mood footage. Not owned assets. Never present as portfolio. |
| Market video (warehouse time-lapse) | REPRESENTATIVE | AI-generated. Depicts a typical first-ring urban logistics asset, not a DAA property. |
| Asset mgmt video (facade) | REPRESENTATIVE | AI-generated. Illustrates the refurbishment thesis, not a specific asset. |
| Origination canvas (Sonar scan) | REAL (snapshot), candidates withheld | The Lyon data files were refreshed from the Sonar repo on 2026-09-16, so the section now draws the same geography the app's own cold-open draws: 5,624 real road segments, real motorway isochrones from the metro file, and the engine's REAL industrial points (6,675, public land-use data) as the orange dots. The RED CANDIDATES REMAIN SYNTHETIC — a seeded scatter anchored to the road network — because the engine's real candidate locations are commercially confidential. That is a deliberate choice, not a data gap. Caption reads "Sonar engine · Lyon corridor". |
| Portfolio beat (asset map) | REAL | Replaced the former abstract corridor-network canvas. Plots the five publicly announced assets from `src/data/assets.js` on the dark basemap. The stat strip (5 assets, 3 countries, 38,384 m2) is computed from that file at build time; the GLA total is labelled "4 of 5 assets disclosed" because Spinetta Marengo's GLA was never published. Coordinates are commune-level, which the on-page caption states. |
| -35% completions (CBRE) | REMOVED | The stat and its placeholder badge have been taken off the Market section. Nothing on the page now quotes a market figure, so the dashed-amber badge system is gone with it. Reinstate with a verified CBRE citation if the number is wanted back. |
| XX% off-market | REMOVED | The placeholder stat is no longer on the page. The Origination copy now describes sourcing qualitatively (wide broker network plus proprietary sourcing technology) instead of quoting an unverified share. Reinstate only with a signed-off figure. |
| 12%+ target IRR / EUR 300m / 6 markets | REMOVED | The Track record section (counters plus placeholder quote and team photography) has been deleted and replaced by News & insights. Nothing on the page now quotes fund-level performance, so no compliance sign-off is outstanding for it. |
| Contact page | REAL | Offices, phones and email are the same details the footer already carries, from daacap.com. The form has no backend on this deploy: it opens a pre-filled mail draft to info@daacap.com rather than appearing to send and silently dropping the message. |
| Firm statement (under the hero) | REAL (supplied) | Copy supplied verbatim by DAA, including the FINMA-regulated claim. Rendered as given; not independently verified here. |
| News & insights section | REAL | Titles and links are DAA's own published articles on daacap.com (`src/data/news.js`). Standfirsts paraphrase figures the articles themselves cite (CBRE). Publication dates are deliberately omitted rather than guessed: the only periods shown are those the article titles name. Hand-maintained until the WordPress feed is wired. |
| Addresses, phones, links | REAL | Taken from the current daacap.com site. |

| Portfolio map page (5 assets) | REAL | Locations, GLA, tenants, dates and photos all from DAA's own public press releases on daacap.com. Coordinates geocoded to commune level (approximate, not exact addresses). Images hotlinked from the existing WordPress media library. |
| Leadership page | REAL | Bios and photos from the existing daacap.com/leadership page, lightly edited for length. |

Rule of thumb: no unverified number goes on the page. After the pass-5 edits
there are none left, so the dashed-amber "placeholder" badge has been removed
from the stylesheet entirely. If a figure needs to go up before sign-off, bring
the badge back rather than shipping it bare.

The basemap under every map is now Esri's dark canvas, not CARTO: CARTO began
watermarking unauthenticated tiles with "API KEY REQUIRED" on 2026-08-24. Set
VITE_CARTO_KEY in Vercel and CARTO takes the lead again automatically — see
src/lib/basemap.js, ported from the Sonar repo, which hit this first.
AI footage is mood, not inventory: real assets get real photography.
