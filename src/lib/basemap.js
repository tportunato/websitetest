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

/* Dark rungs, best first. With a key CARTO leads; without one it is dropped
   entirely rather than left to draw a watermark. */
export const DARK_CHAIN = KEY
  ? [
      { id: 'carto-dark', url: carto('dark_all'), credit: CREDIT.carto },
      { id: 'esri-dark', url: ESRI_DARK, credit: CREDIT.esri }
    ]
  : [{ id: 'esri-dark', url: ESRI_DARK, credit: CREDIT.esri }]

export const DARK = DARK_CHAIN[0].url
export const DARK_CREDIT = DARK_CHAIN[0].credit
