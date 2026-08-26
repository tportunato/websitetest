# Data honesty notes — DAA website

Plain-language notes on how exact everything on this site is.

| Element | Tag | Notes |
|---|---|---|
| Hero video (Paris vans) | REPRESENTATIVE | AI-generated (Veo 3.1) mood footage. Not owned assets. Never present as portfolio. |
| Market video (warehouse time-lapse) | REPRESENTATIVE | AI-generated. Depicts a typical first-ring urban logistics asset, not a DAA property. |
| Asset mgmt video (facade) | REPRESENTATIVE | AI-generated. Illustrates the refurbishment thesis, not a specific asset. |
| Origination canvas (sonar scan) | REAL (snapshot) | Ported from the actual Sonar engine intro. Industrial points (2,901), top candidates (71) and counters (61,689 parcels, 21,799 owners named, 9 communes) are a REAL engine snapshot of the Lyon corridor dated 2026-07-07, bundled at public/data/showcase-lyon.json. Road network and isochrones are REAL (from showcase/lyon.json and metro/lyon.json). Orange dots and red candidates are REPRESENTATIVE: seeded decorative clusters generated from the road network. Deliberate choice: the engine's real candidate locations are confidential and are NOT shown. Page caption states "Engine snapshot - Lyon corridor". |
| Portfolio beat (asset map) | REAL | Replaced the former abstract corridor-network canvas. Plots the five publicly announced assets from `src/data/assets.js` on the dark basemap. The stat strip (5 assets, 3 countries, 38,384 m2) is computed from that file at build time; the GLA total is labelled "4 of 5 assets disclosed" because Spinetta Marengo's GLA was never published. Coordinates are commune-level, which the on-page caption states. |
| -35% completions (CBRE) | UNVERIFIED | From draft materials; must be verified against the CBRE source before publication. |
| XX% off-market | REMOVED | The placeholder stat is no longer on the page. The Origination copy now describes sourcing qualitatively (wide broker network plus proprietary sourcing technology) instead of quoting an unverified share. Reinstate only with a signed-off figure. |
| 12%+ target IRR / EUR 300m / 6 markets | REMOVED | The Track record section (counters plus placeholder quote and team photography) has been deleted and replaced by News & insights. Nothing on the page now quotes fund-level performance, so no compliance sign-off is outstanding for it. |
| Firm statement (under the hero) | REAL (supplied) | Copy supplied verbatim by DAA, including the FINMA-regulated claim. Rendered as given; not independently verified here. |
| News & insights section | REAL | Titles and links are DAA's own published articles on daacap.com (`src/data/news.js`). Standfirsts paraphrase figures the articles themselves cite (CBRE). Publication dates are deliberately omitted rather than guessed: the only periods shown are those the article titles name. Hand-maintained until the WordPress feed is wired. |
| Addresses, phones, links | REAL | Taken from the current daacap.com site. |

| Portfolio map page (5 assets) | REAL | Locations, GLA, tenants, dates and photos all from DAA's own public press releases on daacap.com. Coordinates geocoded to commune level (approximate, not exact addresses). Images hotlinked from the existing WordPress media library. |
| Leadership page | REAL | Bios and photos from the existing daacap.com/leadership page, lightly edited for length. |

Rule of thumb: any number still awaiting sign-off wears a dashed amber
"placeholder" badge, and nothing loses its badge until someone senior signs it
off. After the pass-4 edits exactly one badge remains on the page: the -35%
completions (CBRE) stat in the Market section.
AI footage is mood, not inventory: real assets get real photography.
