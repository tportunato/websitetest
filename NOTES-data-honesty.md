# Data honesty notes — DAA website

Plain-language notes on how exact everything on this site is.

| Element | Tag | Notes |
|---|---|---|
| Hero video (Paris vans) | REPRESENTATIVE | AI-generated (Veo 3.1) mood footage. Not owned assets. Never present as portfolio. |
| Market video (warehouse time-lapse) | REPRESENTATIVE | AI-generated. Depicts a typical first-ring urban logistics asset, not a DAA property. |
| Asset mgmt video (facade) | REPRESENTATIVE | AI-generated. Illustrates the refurbishment thesis, not a specific asset. Replaced 2026-09-17 with a 15s extended cut. |
| Origination canvas (Sonar scan) | REAL (snapshot), candidates withheld | The Lyon data files were refreshed from the Sonar repo on 2026-09-16, so the section now draws the same geography the app's own cold-open draws: 5,624 real road segments, real motorway isochrones from the metro file, and the engine's REAL industrial points (6,675, public land-use data) as the orange dots. The RED CANDIDATES REMAIN SYNTHETIC — a seeded scatter anchored to the road network — because the engine's real candidate locations are commercially confidential. That is a deliberate choice, not a data gap. Caption reads "Sonar engine · Lyon corridor" — it had gone missing from the markup and has been restored. The engine counters (parcels, industrial sites, owners named, communes) are now actually rendered from the snapshot file; .scan-stats had been styled since pass 1 with nothing using it. |
| Portfolio beat (corridor network) | REPRESENTATIVE | An ABSTRACT canvas: real European logistics axes drawn as braided corridors, with 14 asset markers at invented positions. It is not a map of holdings and never was — the asset-map version described here previously was reverted in 1921682 ("restore the original portfolio canvas") but this row was not updated with it, so the record certified a representative visual as REAL. The on-page caption "Illustrative visual" was also missing and has been restored. The five real assets live on the #/portfolio page. |
| -35% completions (CBRE) | REMOVED | The stat and its placeholder badge have been taken off the Market section. Nothing on the page now quotes a market figure, so the dashed-amber badge system is gone with it. Reinstate with a verified CBRE citation if the number is wanted back. |
| XX% off-market | REMOVED | The placeholder stat is no longer on the page. The Origination copy now describes sourcing qualitatively (wide broker network plus proprietary sourcing technology) instead of quoting an unverified share. Reinstate only with a signed-off figure. |
| 12%+ target IRR / EUR 300m / 6 markets | REMOVED | The Track record section (counters plus placeholder quote and team photography) has been deleted and replaced by News & insights. Nothing on the page now quotes fund-level performance, so no compliance sign-off is outstanding for it. |
| Contact page | REAL | Offices, phones and email are the same details the footer already carries, from daacap.com. The form has no backend on this deploy: it opens a pre-filled mail draft to info@daacap.com rather than appearing to send and silently dropping the message. |
| Firm statement (under the hero) | REAL (supplied) | Copy supplied verbatim by DAA, including the FINMA-regulated claim. Rendered as given; not independently verified here. |
| Article pages (#/news/<id>) | REAL | All 22 articles DAA has published, pulled from the WordPress REST API on daacap.com on 2026-09-17 and covering 27 March 2020 to 10 September 2025. Titles, dates, standfirsts and body text are the firm's own, verbatim apart from tag stripping and whitespace collapsing. Every third-party figure keeps the attribution its article gave it. Nothing is paraphrased into a new claim and no figure is added. The WordPress permalink each article came from is kept in the data as `link` for this record, but is NOT rendered: daacap.com is being switched off, so every one of those URLs will be dead. |
| Article images | MIXED | The five transaction announcements carry the real photograph of the asset, the same media the portfolio panels use, now local under public/images/assets/. The other 17 carry a PLACEHOLDER photograph from public/images with no relationship to the subject. `imgReal` on each record says which is which. The posts' own inline images were almost all charts, so none is used as a hero. |
| About / Vision / Sustainability / Investment profile | REAL (qualitative) | Written for these pages in DAA house voice. NO fund-level figures: no fund size, target return, market count or third-party market statistic. The About and Investment profile pages no longer quote the EUR 5m-50m band either, at the client's instruction to describe the mandate as "small- and mid-box" rather than by ticket size. The band is still stated on the Origination beat and the contact page, which were not in scope for that edit. The only other figure anywhere is Heyrieux's BREEAM "Very Good", from DAA's own press release. |
| Page and news-card photography | PLACEHOLDER | Every image on the new pages (about, vision, sustainability, investment profile, news, the future-proof section, Our team) is stock supplied for layout only. None of it is a DAA asset, office or employee. The news-card images have no relationship to the articles they sit on. All of it must be replaced before this is shown to investors. |
| Addresses, phones, links | REAL | Taken from the current daacap.com site. |
| Portfolio map page (5 assets) | REAL | Locations, GLA, tenants, dates and photos all from DAA's own public press releases on daacap.com. Coordinates geocoded to commune level (approximate, not exact addresses). Images are local under public/images/assets/, downloaded from the WordPress media library on 2026-09-22 when the site was cut free of it. |
| Leadership page | REAL | Bios and photos from the existing daacap.com/leadership page, lightly edited for length. |
| Terms of Use, Privacy Policy (#/terms, #/privacy) | REAL | Both documents reproduced verbatim from daacap.com on 2026-09-22, when the site was cut free of WordPress. They used to be outbound links to that site; they are now routes, so nothing depends on the old domain staying up. Neither is the investor disclaimer, which is a separate document and is not on this site. |
| September 2025 update — the four charts | REAL (the article's own) | The WordPress REST API returns Divi posts as raw shortcodes, so this article had been shipping with its markup visible, its eight headings flattened and its "Bottom line" section dropped entirely. It was rebuilt from the rendered permalink on 2026-09-22. The four graphs are the article's own figures, downloaded local to public/images/charts/. No chart was redrawn, recalculated or re-captioned here. |
| About / Vision / Sustainability (#/about) | REAL (qualitative) | Written for this page in DAA house voice. Carries NO fund-level figures: the only numbers are the EUR 5m-50m mandate band, already stated on the Origination beat and the contact page, and Heyrieux's BREEAM "Very Good" rating from DAA's own press release. The FINMA claim repeats the supplied firm statement. Everything else is qualitative on purpose, per the rule below. |

Rule of thumb: no unverified number goes on the page. After the pass-5 edits
there are none left, so the dashed-amber "placeholder" badge has been removed
from the stylesheet entirely. If a figure needs to go up before sign-off, bring
the badge back rather than shipping it bare.

The basemap under every map is now Esri's dark canvas, not CARTO: CARTO began
watermarking unauthenticated tiles with "API KEY REQUIRED" on 2026-08-24. Set
VITE_CARTO_KEY in Vercel and CARTO takes the lead again automatically — see
src/lib/basemap.js, ported from the Sonar repo, which hit this first.
AI footage is mood, not inventory: real assets get real photography.

All three background videos carried a visible "Veo" watermark in the bottom
right of every frame, which is the generator's own mark and would have gone out
on an investor-facing page. They are cropped 1184x666 off the top-left and
rescaled to 1280x720, which removes it; the framing shifts by under 8% and the
videos are full-bleed behind a scrim, so the crop is not visible. Uncropped
originals are recoverable from git history. If a future clip is generated on a
tier that does not watermark, drop the crop rather than carrying it forward.
