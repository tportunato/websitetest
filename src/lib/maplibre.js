import { DARK, darkRasterPaint } from './basemap.js'

/* Lazy MapLibre loader. The library and its stylesheet are pulled from jsDelivr
   the first time a map section comes into range, then shared by every caller.
   cb(err) is invoked once; err is set if the CDN did not deliver. */
const JS_ID = 'mljs'
const CSS_ID = 'mlcss'
const VERSION = '4.7.1'

export function ensureMaplibre(cb) {
  if (window.maplibregl) { cb(); return }

  if (!document.getElementById(CSS_ID)) {
    const c = document.createElement('link')
    c.id = CSS_ID
    c.rel = 'stylesheet'
    c.href = `https://cdn.jsdelivr.net/npm/maplibre-gl@${VERSION}/dist/maplibre-gl.css`
    document.head.appendChild(c)
  }

  let s = document.getElementById(JS_ID)
  if (s) {
    if (window.maplibregl) cb()
    else {
      s.addEventListener('load', () => cb())
      s.addEventListener('error', () => cb(new Error('maplibre')))
    }
    return
  }

  s = document.createElement('script')
  s.id = JS_ID
  s.src = `https://cdn.jsdelivr.net/npm/maplibre-gl@${VERSION}/dist/maplibre-gl.js`
  s.onload = () => cb()
  s.onerror = () => cb(new Error('maplibre'))
  document.head.appendChild(s)
}

/* The house map style: a dark raster basemap on a near-black ground. The tile
   URL comes from basemap.js rather than being pasted here, so the watermark
   fix and the key fallback live in exactly one place. */
export const DARK_STYLE = {
  version: 8,
  sources: {
    base: { type: 'raster', tiles: [DARK], tileSize: 256 }
  },
  layers: [
    { id: 'bg', type: 'background', paint: { 'background-color': '#060d16' } },
    /* the standalone map page shows the basemap properly rather than fading it
       in behind an animation, so it runs well above the section ramp */
    /* The standalone map page is a map, not a backdrop: the section ramp's
       brightness-max of 0.32 crushed the Esri rung so far down that land,
       borders and labels were barely separable from the background. */
    {
      id: 'base',
      type: 'raster',
      source: 'base',
      paint: { ...darkRasterPaint(0.95, 300), 'raster-brightness-max': 0.72, 'raster-contrast': 0.05 }
    }
  ]
}
