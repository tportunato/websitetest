/* Portfolio map page: dark MapLibre map of Western Europe, one marker per
   asset, click opens a slide-in sidebar with photo, specs and press link.
   All asset data from public press releases (src/data/assets.js). */
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../data/assets.js'
import { ensureMaplibre, DARK_STYLE } from '../lib/maplibre.js'

export default function PortfolioMap() {
  const mapDiv = useRef(null)
  const mapRef = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    let cancelled = false
    ensureMaplibre((err) => {
      if (cancelled || err || !window.maplibregl) return
      const map = new window.maplibregl.Map({
        container: mapDiv.current,
        center: [5.5, 47.5],
        zoom: 4.6,
        interactive: true,
        attributionControl: false,
        style: DARK_STYLE
      })
      map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')
      mapRef.current = map

      map.on('load', () => {
        if (cancelled) return
        const bounds = new window.maplibregl.LngLatBounds()
        ASSETS.forEach((a) => bounds.extend(a.coords))
        map.fitBounds(bounds, { padding: { top: 120, bottom: 80, left: 80, right: 80 }, maxZoom: 6.2, duration: 2200 })

        ASSETS.forEach((a) => {
          const el = document.createElement('div')
          el.className = 'asset-marker'
          el.innerHTML = '<span class="asset-dot"></span><span class="asset-label">' + a.name + '</span>'
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            setActive(a)
            map.flyTo({ center: a.coords, zoom: 7.5, duration: 1400, padding: { right: 380 } })
          })
          new window.maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(a.coords).addTo(map)
        })
        map.on('click', () => setActive(null))
      })
    })
    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div className="page-map">
      <header className="page-bar">
        <a className="page-home" href="#/"><img className="logo-img" src="/images/daa-logo-white.svg" alt="DAA Capital Partners" /></a>
        <div className="page-title">Portfolio</div>
        <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">Investor Login</a>
      </header>
      <div ref={mapDiv} className="map-full" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
      <div className="map-hint">Select an asset</div>

      <aside className={'asset-panel' + (active ? ' open' : '')}>
        {active && (
          <>
            <button className="panel-close" onClick={() => setActive(null)}>&times;</button>
            <div className="panel-img" style={{ backgroundImage: 'url(' + active.img + ')' }} />
            <div className="panel-body">
              <p className="eyebrow">{active.country}</p>
              <h3>{active.name}</h3>
              <p className="panel-city">{active.city}</p>
              <div className="panel-specs">
                {active.gla && (
                  <div><span className="spec-label">GLA</span><span>{active.gla}</span></div>
                )}
                <div><span className="spec-label">Type</span><span>{active.type}</span></div>
                <div><span className="spec-label">Acquired</span><span>{active.acquired}</span></div>
                <div><span className="spec-label">Tenant</span><span>{active.tenant}</span></div>
                <div><span className="spec-label">Highlights</span><span>{active.highlight}</span></div>
              </div>
              <p className="panel-blurb">{active.blurb}</p>
              <a className="panel-link" href={active.link} target="_blank" rel="noreferrer">
                Read the announcement &rarr;
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
