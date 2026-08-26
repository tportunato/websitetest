/* Beat 05 - The portfolio. Replaces the earlier abstract corridor-network
   canvas with the real thing: the five assets DAA has publicly announced,
   plotted on the house dark basemap and labelled. Everything on screen is a
   fact from src/data/assets.js (public press releases); coordinates are
   geocoded to commune level, which the caption states.

   The map is only instantiated once the section is within 600px of the
   viewport, in line with the rest of the page's perf architecture. */
import { useEffect, useRef } from 'react'
import { ASSETS } from '../data/assets.js'
import { ensureMaplibre, DARK_STYLE } from '../lib/maplibre.js'

/* GLA strings look like '11,749 m²' or '~7,300 m²'; some assets never had a
   figure published, so the total is reported as disclosed-only. */
function parseGla(v) {
  if (!v) return null
  const digits = v.replace(/[^\d]/g, '')
  return digits ? parseInt(digits, 10) : null
}

const GLA_VALUES = ASSETS.map((a) => parseGla(a.gla)).filter((n) => n !== null)
const GLA_TOTAL = GLA_VALUES.reduce((sum, n) => sum + n, 0)
const COUNTRIES = new Set(ASSETS.map((a) => a.country)).size

const STATS = [
  { num: String(ASSETS.length), label: 'assets acquired' },
  { num: String(COUNTRIES), label: 'countries' },
  {
    num: GLA_TOTAL.toLocaleString('en-GB'),
    label: `m² GLA, ${GLA_VALUES.length} of ${ASSETS.length} assets disclosed`
  }
]

/* The copy block sits bottom-left and the stat column bottom-right, so the
   assets are framed into the clear upper-right field rather than the centre.
   Padding is proportional so the composition survives a resize; below the
   880px breakpoint the stat column is hidden and the copy runs full width,
   so the map simply centres above it. */
function framePadding(map) {
  const { width, height } = map.getCanvas().getBoundingClientRect()
  if (width < 880) {
    return {
      top: Math.round(height * 0.12),
      bottom: Math.round(height * 0.52),
      left: Math.round(width * 0.08),
      right: Math.round(width * 0.08)
    }
  }
  return {
    top: Math.round(height * 0.17),
    bottom: Math.round(height * 0.42),
    left: Math.round(width * 0.38),
    right: Math.round(width * 0.10)
  }
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const mapDiv = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let cancelled = false

    const initSection = () => {
      ensureMaplibre((err) => {
        if (cancelled || err || !window.maplibregl) return

        const map = new window.maplibregl.Map({
          container: mapDiv.current,
          center: [5.6, 48.2],
          zoom: 4.2,
          interactive: false,
          attributionControl: false,
          style: DARK_STYLE
        })
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return

          const bounds = new window.maplibregl.LngLatBounds()
          ASSETS.forEach((a) => bounds.extend(a.coords))
          map.fitBounds(bounds, {
            padding: framePadding(map),
            maxZoom: 5.8,
            duration: 2400
          })

          ASSETS.forEach((a, i) => {
            const el = document.createElement('a')
            el.className = 'asset-marker asset-marker--beat'
            el.href = '#/portfolio'
            el.style.setProperty('--d', `${900 + i * 220}ms`)
            el.setAttribute('aria-label', `${a.name}, ${a.country}`)

            const dot = document.createElement('span')
            dot.className = 'asset-dot'
            const label = document.createElement('span')
            label.className = 'asset-label'
            label.textContent = a.name
            el.appendChild(dot)
            el.appendChild(label)

            new window.maplibregl.Marker({ element: el, anchor: 'center' })
              .setLngLat(a.coords)
              .addTo(map)
          })
        })
      })
    }

    let inited = false
    const ioInit = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !inited) {
            inited = true
            initSection()
            ioInit.disconnect()
          }
        })
      },
      { rootMargin: '600px' }
    )
    ioInit.observe(section)

    return () => {
      cancelled = true
      ioInit.disconnect()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <section className="beat" id="portfolio-story" ref={sectionRef}>
      <div className="stage" style={{ background: '#060d16' }}>
        <div ref={mapDiv} style={{ position: 'absolute', inset: 0 }} />
        <div className="scrim scrim-light" />

        <div className="portfolio-stats" data-reveal>
          {STATS.map((s) => (
            <div className="portfolio-stat" key={s.label}>
              <span className="portfolio-stat-num">{s.num}</span>
              <span className="portfolio-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="beat-content">
          <p className="eyebrow" data-reveal>The portfolio</p>
          <h2 data-reveal>Asset by asset, corridor by corridor.</h2>
          <p className="body" data-reveal>
            A consolidation strategy in a fragmented market: aggregating urban logistics assets
            across Western Europe&rsquo;s main corridors into an institutional portfolio.
          </p>
          <a className="beat-cta" data-reveal href="#/portfolio">Explore the portfolio <span className="cta-arrow">&rarr;</span></a>
        </div>

        <div className="caption">Announced acquisitions &middot; commune-level locations</div>
      </div>
    </section>
  )
}
