/* WHERE THE MAP UNDER THE DATA COMES FROM, in one place.

   Ported from the Sonar repo (src/basemap.mjs), which hit this first: on
   2026-08-24 CARTO began stamping "API KEY REQUIRED" across every
   unauthenticated tile, so every map on this site started carrying a
   watermark. Nothing here was broken — it was the picture underneath,
   supplied by someone else, on terms that changed without notice.

   THE DEFAULT ON THIS SITE IS THE KEYLESS RUNG. Sonar puts CARTO first
   because Sonar has a key set in Vercel. This repo has no key, so leading
   with CARTO would mean shipping the watermark. Esri's dark canvas needs no
   key and is the default; set VITE_CARTO_KEY and CARTO takes the lead
   automatically, no code change.

   THE KEY IS FREE AND CARRIES NO ACCOUNT: carto.com/basemaps/apikey, 5m tile
   requests a month against a domain. Never commit it — Vite exposes anything
   named VITE_* to the browser, so it belongs in Vercel's env vars only. */

const KEY = (import.meta.env && import.meta.env.VITE_CARTO_KEY) || ''

export const hasCartoKey = () => !!KEY

/* VERBATIM FROM CARTO'S KEY EMAIL: the parameter is `key`, not `api_key`.
   Guessing the commoner spelling returns tiles watermarked exactly as an
   absent key does, so the failure reads as "the key does not work" rather
   than "the URL is wrong". */
const carto = (style) =>
  'https://basemaps.cartocdn.com/' + style + '/{z}/{x}/{y}.png' +
  (KEY ? '?key=' + encodeURIComponent(KEY) : '')

/* Esri's dark canvas — no key. NOTE THE AXIS ORDER: Esri's REST tiles are
   /tile/{z}/{y}/{x}, row before column, the reverse of every other raster
   source here. Getting it backwards does not error, it draws somewhere else. */
const ESRI_DARK =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'

const CREDIT = {
  carto: '© OpenStreetMap · © CARTO',
  esri: '© Esri · © OpenStreetMap contributors'
}

/* THE RUNGS ARE NOT INTERCHANGEABLE TO LOOK AT, which is the whole reason each
   one carries its own paint. CARTO's dark_all is very nearly black: at 0.34
   opacity over #060d16 you read the labels and almost nothing else, which is
   the ground Sonar's intro composites on. Esri's canvas is called Dark GRAY
   and means it — land comes back around rgb(58,58,58). Dropped in at the same
   opacity it lifts the whole frame to a blue-grey wash and the cyan road
   network stops popping.

   So the Esri rung is knocked back through MapLibre's own raster paint —
   brightness-max, saturation, contrast — rather than by a CSS filter over the
   container, which would hit the markers and the canvas overlay too.

   THIS IS A STOPGAP, NOT A MATCH. Setting VITE_CARTO_KEY in Vercel (free, the
   same key Sonar already uses) puts CARTO back in front and the sections
   become identical to the app. */
const RUNGS = {
  carto: {
    id: 'carto-dark',
    url: carto('dark_all'),
    credit: CREDIT.carto,
    opacity: 0.34,
    adjust: {}
  },
  esri: {
    id: 'esri-dark',
    url: ESRI_DARK,
    credit: CREDIT.esri,
    opacity: 0.3,
    adjust: {
      'raster-brightness-max': 0.32,
      'raster-saturation': -0.35,
      'raster-contrast': 0.12
    }
  }
}

/* With a key CARTO leads; without one it is dropped entirely rather than left
   to draw a watermark. */
export const DARK_CHAIN = KEY ? [RUNGS.carto, RUNGS.esri] : [RUNGS.esri]

const RUNG = DARK_CHAIN[0]

export const DARK = RUNG.url
export const DARK_CREDIT = RUNG.credit
/* the opacity the map should ramp UP to, and the paint that keeps this rung
   sitting on the same ground as every other one */
export const DARK_OPACITY = RUNG.opacity
export const DARK_ADJUST = RUNG.adjust

/* Paint for the basemap raster layer. `opacity` is usually 0 at build time
   because the sections fade the map in themselves. */
export function darkRasterPaint(opacity = DARK_OPACITY, fade = 0) {
  return {
    'raster-opacity': opacity,
    'raster-fade-duration': fade,
    ...RUNG.adjust
  }
}
