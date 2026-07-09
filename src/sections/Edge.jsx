/* Beat 03 - Origination. Faithful port of the Sonar cold-open intro (v10):
   MapLibre dark basemap as static backdrop, all animation on a 2D canvas.
   Exact palette, timeline and drawing code from the app. Differences from
   the app version: scoped to a scroll section (not fullscreen), starts when
   the section first enters the viewport, no ENTER/SKIP buttons, no counters,
   endless patrol.
   Data (copy from the sonar repo for the exact original visual):
   - /data/showcase/lyon.json  (roads + industrial points + candidates)
   - /data/metro/lyon.json     (motorway isochrones)
   Fallback: /data/showcase-lyon.json (bundled salvaged snapshot, no roads:
   road network is synthesized until the real file is copied in). */
import { useEffect, useRef, useState } from 'react'

const MAP_MS = 800
const ROADS_START = 250
const ROADS_MS = 1550
const SWEEP_START = 1800
const SWEEP_MS = 4000

function ensureMaplibre(cb) {
  if (window.maplibregl) { cb(); return }
  if (!document.getElementById('mlcss')) {
    const c = document.createElement('link')
    c.id = 'mlcss'
    c.rel = 'stylesheet'
    c.href = 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css'
    document.head.appendChild(c)
  }
  let s = document.getElementById('mljs')
  if (s) {
    if (window.maplibregl) cb()
    else {
      s.addEventListener('load', () => cb())
      s.addEventListener('error', () => cb(new Error('ml')))
    }
    return
  }
  s = document.createElement('script')
  s.id = 'mljs'
  s.src = 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js'
  s.onload = () => cb()
  s.onerror = () => cb(new Error('ml'))
  document.head.appendChild(s)
}

function mulberry32(s) {
  return function () {
    s |= 0
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Edge() {
  const sectionRef = useRef(null)
  const mapDiv = useRef(null)
  const cvs = useRef(null)
  const mapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = cvs.current
    if (!section || !canvas) return
    let cancelled = false
    let raf = 0
    let started = false
    let startPending = false
    let sceneReady = false
    let scene = null
    let vt = 0
    let last = 0

    const g = canvas.getContext('2d')

    ;(async () => {
      let show = null
      let metro = null
      try {
        let r = await fetch('/data/showcase/lyon.json')
        if (!r.ok) r = await fetch('/data/showcase-lyon.json')
        if (r.ok) show = await r.json()
      } catch (e) {}
      try {
        const r = await fetch('/data/metro/lyon.json')
        if (r.ok) metro = await r.json()
      } catch (e) {}
      if (!show || cancelled) return

      ensureMaplibre((err) => {
        if (cancelled || err || !window.maplibregl) return
        const ctr = show.center
        const map = new window.maplibregl.Map({
          container: mapDiv.current,
          center: [ctr[0], ctr[1] - 0.008],
          zoom: 11.05,
          pitch: 40,
          bearing: -10,
          interactive: false,
          attributionControl: false,
          style: {
            version: 8,
            sources: {
              carto: {
                type: 'raster',
                tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
                tileSize: 256
              }
            },
            layers: [
              { id: 'bg', type: 'background', paint: { 'background-color': '#060d16' } },
              { id: 'base', type: 'raster', source: 'carto', paint: { 'raster-opacity': 0, 'raster-fade-duration': 0 } }
            ]
          }
        })
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return
          setLoaded(true)

          const build = () => {
            const W = section.offsetWidth
            const H = section.offsetHeight
            const P = (ll) => {
              const p = map.project(ll)
              return [p.x, p.y]
            }
            const brg = (c) => ((Math.atan2(c[0] - ctr[0], c[1] - ctr[1]) * 180) / Math.PI + 360) % 360
            const center = P(ctr)
            let roads = (show.roads || []).map((r) => ({ d: r.d, m: r.m, pts: r.pts.map(P) }))
            const inds = show.inds.map((c) => ({ a: brg(c), p: P(c) }))
            const tops = show.top.map((t) => ({ a: brg(t.c), s: t.s, p: P(t.c) }))
            const isos = metro && metro.iso_junctions
              ? metro.iso_junctions.polys.map((gm) =>
                  (gm.type === 'Polygon' ? gm.coordinates[0] : gm.coordinates[0][0])
                    .filter((_, i) => i % 3 === 0)
                    .map(P)
                )
              : []
            const maxR = Math.hypot(W, H) * 0.42

            if (!roads.length) {
              const rand = mulberry32(11)
              for (let i = 0; i < 38; i++) {
                const ang = rand() * Math.PI * 2
                const len = maxR * (0.5 + rand() * 0.55)
                const m = rand() < 0.24
                const steps = 7 + Math.floor(rand() * 5)
                const pts = []
                for (let sIdx = 0; sIdx <= steps; sIdx++) {
                  const f = sIdx / steps
                  const jitter = (rand() - 0.5) * maxR * 0.07
                  pts.push([
                    center[0] + Math.cos(ang) * len * f + Math.cos(ang + Math.PI / 2) * jitter,
                    center[1] + Math.sin(ang) * len * f * 0.72 + Math.sin(ang + Math.PI / 2) * jitter * 0.72
                  ])
                }
                roads.push({ d: rand() * 0.55, m, pts })
              }
            }

            const dpr = Math.min(2, window.devicePixelRatio || 1)
            canvas.width = W * dpr
            canvas.height = H * dpr
            canvas.style.width = W + 'px'
            canvas.style.height = H + 'px'
            g.setTransform(dpr, 0, 0, dpr, 0, 0)
            scene = { W, H, center, roads, inds, tops, isos, maxR }
            sceneReady = true
          }
          build()

          const resize = () => {
            map.resize()
            build()
          }
          window.addEventListener('resize', resize)
          section.__cleanupResize = () => window.removeEventListener('resize', resize)

          const tick = (now) => {
            if (cancelled || !scene) return
            if (!last) last = now
            vt += Math.min(now - last, 50)
            last = now
            const t = vt
            const { W, H, center, roads, inds, tops, isos, maxR } = scene
            map.setPaintProperty('base', 'raster-opacity', Math.min(0.34, (t / MAP_MS) * 0.34))
            g.clearRect(0, 0, W, H)

            /* radar rings */
            const ringsK = Math.min(1, Math.max(0, (t - ROADS_START) / ROADS_MS))
            g.strokeStyle = `rgba(46,78,110,${0.5 * ringsK})`
            g.lineWidth = 1
            for (const k of [0.35, 0.7, 1]) {
              g.beginPath()
              g.ellipse(center[0], center[1], maxR * k, maxR * k * 0.72, 0, 0, Math.PI * 2)
              g.stroke()
            }

            /* roads growing outward */
            if (t > ROADS_START) {
              const rad = Math.min(1.02, ((t - ROADS_START) / ROADS_MS) * 1.02)
              for (const r of roads) {
                const diff = rad - r.d
                if (diff <= 0) continue
                const edge = diff < 0.12 ? 1 - diff / 0.12 : 0
                const base = r.m ? 0.55 : 0.26
                g.strokeStyle = r.m
                  ? `rgba(143,176,206,${base + edge * 0.45})`
                  : `rgba(62,92,124,${base + edge * 0.5})`
                g.lineWidth = r.m ? 1.7 : 0.9
                g.beginPath()
                g.moveTo(r.pts[0][0], r.pts[0][1])
                for (let i = 1; i < r.pts.length; i++) g.lineTo(r.pts[i][0], r.pts[i][1])
                g.stroke()
              }
            }

            const raw = t <= SWEEP_START ? -1 : ((t - SWEEP_START) / SWEEP_MS) * 360
            const sweep = raw < 0 ? -1 : Math.min(360, raw)

            /* birth ripple as the sonar fires */
            if (t > SWEEP_START - 100 && t < SWEEP_START + 600) {
              const k = (t - SWEEP_START + 100) / 700
              g.strokeStyle = `rgba(226,124,56,${0.7 * (1 - k)})`
              g.lineWidth = 2
              g.beginPath()
              g.ellipse(center[0], center[1], maxR * k, maxR * k * 0.72, 0, 0, Math.PI * 2)
              g.stroke()
            }

            if (sweep >= 0) {
              /* conic beam: first revolution reveals, following ones patrol dimmer */
              const beamK = raw <= 360 ? 1 : 0.55
              const a1 = ((raw % 360) * Math.PI) / 180
              g.save()
              g.translate(center[0], center[1])
              g.scale(1, 0.72)
              for (let w = 0; w < 22; w += 2) {
                const a0 = a1 - ((w + 2) * Math.PI) / 180
                g.fillStyle = `rgba(200,105,42,${0.20 * (1 - w / 22) * beamK})`
                g.beginPath()
                g.moveTo(0, 0)
                g.arc(0, 0, maxR, -Math.PI / 2 + a0, -Math.PI / 2 + a1 - (w * Math.PI) / 180)
                g.closePath()
                g.fill()
              }
              g.restore()

              /* industrial dots ignite under the beam */
              for (const d of inds) {
                if (d.a > sweep) continue
                const trail = sweep - d.a
                const op = trail < 30 ? 1 - (trail / 30) * 0.35 : 0.6
                g.fillStyle = `rgba(226,124,56,${op})`
                g.fillRect(d.p[0] - 1.1, d.p[1] - 1.1, 2.2, 2.2)
              }

              /* isochrones from mid-sweep */
              if (isos.length && t > SWEEP_START) {
                g.strokeStyle = `rgba(79,184,201,${Math.min(0.35, ((t - SWEEP_START) / 1000) * 0.35)})`
                g.lineWidth = 0.8
                for (const path of isos) {
                  g.beginPath()
                  g.moveTo(path[0][0], path[0][1])
                  for (let i = 1; i < path.length; i++) g.lineTo(path[i][0], path[i][1])
                  g.closePath()
                  g.stroke()
                }
              }

              /* candidates bloom 25 degrees behind the beam */
              const tr = sweep - 25
              for (const c of tops) {
                if (c.a > tr) continue
                const r = 3 + (c.s - 6) * 0.7
                g.fillStyle = 'rgba(224,57,43,0.85)'
                g.beginPath()
                g.arc(c.p[0], c.p[1], r, 0, Math.PI * 2)
                g.fill()
                g.strokeStyle = 'rgba(242,160,90,0.9)'
                g.lineWidth = 1
                g.beginPath()
                g.arc(c.p[0], c.p[1], r + 1.5, 0, Math.PI * 2)
                g.stroke()
              }
            }
            raf = requestAnimationFrame(tick)
          }

          const startAnim = () => {
            if (started) return
            started = true
            raf = requestAnimationFrame(tick)
          }
          if (startPending) startAnim()
          section.__startAnim = startAnim
        })
      })
    })()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (section.__startAnim) section.__startAnim()
            else startPending = true
          }
        })
      },
      { threshold: 0.3 }
    )
    io.observe(section)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      if (section.__cleanupResize) section.__cleanupResize()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <section className="beat" id="origination" ref={sectionRef}>
      <div className="stage" style={{ background: '#060d16' }}>
        <div ref={mapDiv} style={{ position: 'absolute', inset: 0 }} />
        <div className="canvas-wrap">
          <canvas ref={cvs} />
        </div>
        <div className="scrim scrim-light" />
        <div className="beat-content">
          <p className="eyebrow" data-reveal>Origination</p>
          <h2 data-reveal>Most of what we buy is never on the market.</h2>
          <p className="body" data-reveal>
            Off-market and corporate-sourced opportunities in the &euro;5m to &euro;50m
            segment, surfaced by proprietary sourcing technology, where competition
            is structurally thinner.
          </p>
          <div className="stat" data-reveal>
            <span className="stat-num">XX%</span>
            <span className="stat-label">of acquisitions sourced off-market</span>
            <span className="badge">Placeholder &middot; pending sign-off</span>
          </div>
        </div>
        <div className="caption">Illustrative visual</div>
      </div>
    </section>
  )
}
