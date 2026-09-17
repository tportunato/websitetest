/* Beat 03 - Origination. Faithful port of the Sonar cold-open intro (v10):
   MapLibre dark basemap as static backdrop, all animation on a 2D canvas.
   Road network and isochrones are REAL (Lyon corridor data files).
   Orange dots and red candidates are REPRESENTATIVE: seeded decorative
   clusters generated from the road network (approved composition, preview5):
   16 inner pockets (outer ones must hug main roads), 18 candidates at major
   intersections plus 4 singles on the first ring. Sweep 5.6s, soft ripple.
   Data files:
   - /data/showcase/lyon.json  (real road network)
   - /data/metro/lyon.json     (real motorway isochrones)
   Fallback: /data/showcase-lyon.json (salvaged snapshot, synthetic roads). */
import { useEffect, useRef, useState } from 'react'
import { ensureMaplibre } from '../lib/maplibre.js'
import { DARK, DARK_OPACITY, darkRasterPaint } from '../lib/basemap.js'

const MAP_MS = 800
const ROADS_START = 250
const ROADS_MS = 1550
const SWEEP_START = 1800
const SWEEP_MS = 5600

function mulberry32(s) {
  return function () {
    s |= 0
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Approved composition (preview5): clustered orange pockets + red candidates
   at major-road intersections + first-ring singles. All seeded: every visitor
   sees the identical picture. */
function genScatter(roads, center, maxR, rand) {
  const roadPts = []
  roads.forEach((r) => r.pts.forEach((p) => roadPts.push(p)))
  const majorPts = []
  roads.forEach((r) => { if (r.m) r.pts.forEach((p) => majorPts.push(p)) })
  const nearMajor = (x, y) =>
    majorPts.some((p) => {
      const dx = (p[0] - x) / maxR
      const dy = (p[1] - y) / (maxR * 0.72)
      return Math.hypot(dx, dy) < 0.07
    })
  const inEll = (x, y) => {
    const dx = (x - center[0]) / maxR
    const dy = (y - center[1]) / (maxR * 0.72)
    return dx * dx + dy * dy <= 0.94
  }
  const bear = (x, y) =>
    ((Math.atan2(x - center[0], -(y - center[1]) / 0.72) * 180) / Math.PI + 360) % 360
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5

  const dots = []
  const push = (x, y) => { if (inEll(x, y)) dots.push({ a: bear(x, y), p: [x, y] }) }
  const clusterCenters = []
  let guard = 0
  while (clusterCenters.length < 16 && guard++ < 6000) {
    let x, y
    if (rand() < 0.7 && roadPts.length) {
      const p = roadPts[Math.floor(rand() * roadPts.length)]
      x = p[0]; y = p[1]
    } else {
      const ang = rand() * Math.PI * 2
      const rr = Math.sqrt(rand()) * maxR * 0.62
      x = center[0] + Math.cos(ang) * rr
      y = center[1] + Math.sin(ang) * rr * 0.72
    }
    if (!inEll(x, y)) continue
    const dxc = (x - center[0]) / maxR
    const dyc = (y - center[1]) / (maxR * 0.72)
    const dc = Math.hypot(dxc, dyc)
    if (dc > 0.62) continue
    if (dc > 0.42 && !nearMajor(x, y)) continue
    const ok = clusterCenters.every((c) => {
      const dx = (x - c[0]) / maxR
      const dy = (y - c[1]) / (maxR * 0.72)
      return Math.hypot(dx, dy) > 0.22
    })
    if (ok) clusterCenters.push([x, y])
  }
  clusterCenters.forEach((c) => {
    const n = 70 + Math.floor(rand() * 90)
    const sig = maxR * (0.045 + rand() * 0.04)
    for (let i = 0; i < n; i++) push(c[0] + gauss() * sig, c[1] + gauss() * sig * 0.72)
  })
  for (let i = 0; i < 350 && roadPts.length; i++) {
    const p = roadPts[Math.floor(rand() * roadPts.length)]
    push(p[0] + (rand() - 0.5) * maxR * 0.03, p[1] + (rand() - 0.5) * maxR * 0.022)
  }

  const cell = maxR * 0.05
  const buckets = {}
  roads.forEach((r, ri) => {
    if (!r.m) return
    r.pts.forEach((p) => {
      const key = Math.floor(p[0] / cell) + '_' + Math.floor(p[1] / cell)
      if (!buckets[key]) buckets[key] = { pts: [], rs: new Set() }
      buckets[key].pts.push(p)
      buckets[key].rs.add(ri)
    })
  })
  const inter = []
  Object.values(buckets).forEach((b) => {
    if (b.rs.size < 2) return
    let sx = 0, sy = 0
    b.pts.forEach((p) => { sx += p[0]; sy += p[1] })
    const x = sx / b.pts.length
    const y = sy / b.pts.length
    const dx = (x - center[0]) / maxR
    const dy = (y - center[1]) / (maxR * 0.72)
    const d = Math.hypot(dx, dy)
    if (d > 0.12 && d < 0.6) inter.push([x, y])
  })
  const centers = []
  guard = 0
  const pool = inter.length ? inter : roadPts
  while (centers.length < 6 && guard++ < 6000 && pool.length) {
    const p = pool[Math.floor(rand() * pool.length)]
    const ok = centers.every((c) => {
      const dx = (p[0] - c[0]) / maxR
      const dy = (p[1] - c[1]) / (maxR * 0.72)
      return Math.hypot(dx, dy) > 0.2
    })
    if (ok) centers.push(p)
  }
  const tops = []
  centers.forEach((c) => {
    for (let k = 0; k < 3; k++) {
      const x = c[0] + (rand() - 0.5) * maxR * 0.07
      const y = c[1] + (rand() - 0.5) * maxR * 0.05
      tops.push({ a: bear(x, y), s: 7.5 + rand() * 2.5, p: [x, y] })
    }
  })
  const ringOff = rand() * Math.PI * 2
  for (let i = 0; i < 4; i++) {
    const ang = ringOff + (i / 4) * Math.PI * 2 + (rand() - 0.5) * 0.5
    const rr = maxR * (0.35 + (rand() - 0.5) * 0.05)
    const x = center[0] + Math.sin(ang) * rr
    const y = center[1] - Math.cos(ang) * rr * 0.72
    tops.push({ a: bear(x, y), s: 7 + rand() * 2, p: [x, y] })
  }
  return { dots, tops }
}

export default function Edge() {
  const sectionRef = useRef(null)
  const mapDiv = useRef(null)
  const cvs = useRef(null)
  const mapRef = useRef(null)
  /* The engine snapshot's own counters. .scan-stats has been styled since the
     first pass but nothing ever rendered it, so the figures the honesty notes
     describe as on-page were not actually on the page. */
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = cvs.current
    if (!section || !canvas) return
    let cancelled = false
    let raf = 0
    let started = false
    let rafOn = false
    let startPending = false
    let scene = null
    let vt = 0
    let last = 0
    /* After the sweep closes, the rings, the road network, the industrial dots,
       the isochrones and the candidate markers are all final — only the beam
       keeps turning. They were being re-stroked every frame regardless (the
       Lyon network alone is ~3,000 polylines), which is the single most
       expensive thing on the page. Bake once, then blit and draw the beam. */
    let groundLayer = null   /* rings + road network: drawn UNDER the beam */
    let markerLayer = null   /* dots, isochrones, candidates: drawn OVER it */
    let mapFaded = false

    const g = canvas.getContext('2d')

    const initSection = async () => {
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
      if (show.stats) setStats(show.stats)

      ensureMaplibre((err) => {
        if (cancelled || err || !window.maplibregl) return
        const ctr = show.center
        const map = new window.maplibregl.Map({
          container: mapDiv.current,
          center: [ctr[0], ctr[1] - 0.012],
          zoom: 10.35,
          pitch: 40,
          bearing: -10,
          interactive: false,
          attributionControl: false,
          style: {
            version: 8,
            sources: {
              base: { type: 'raster', tiles: [DARK], tileSize: 256 }
            },
            layers: [
              { id: 'bg', type: 'background', paint: { 'background-color': '#060d16' } },
              { id: 'base', type: 'raster', source: 'base', paint: darkRasterPaint(0, 0) }
            ]
          }
        })
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return

          const build = () => {
            /* The canvas must match the MAP's box, not the section's. The
               section is 165vh (it scrolls past a sticky 100vh stage), so
               sizing the backing store to it drew into 65vh of clipped space
               and inflated every screen-space radius below. */
            const W = mapDiv.current.offsetWidth
            const H = mapDiv.current.offsetHeight
            const P = (ll) => {
              const p = map.project(ll)
              return [p.x, p.y]
            }
            const center = P(ctr)
            const brg = (c) =>
              ((Math.atan2(c[0] - ctr[0], c[1] - ctr[1]) * 180) / Math.PI + 360) % 360
            let roads = (show.roads || []).map((r) => ({ d: r.d, m: r.m, pts: r.pts.map(P) }))
            const isos = metro && metro.iso_junctions
              ? metro.iso_junctions.polys.map((gm) =>
                  (gm.type === 'Polygon' ? gm.coordinates[0] : gm.coordinates[0][0])
                    .filter((_, i) => i % 3 === 0)
                    .map(P)
                )
              : []

            /* The orange dots are now the engine's REAL industrial points
               (show.inds, public land-use data), not a seeded scatter. The red
               candidates stay synthetic: the engine's real candidate locations
               are commercially confidential and are deliberately not shown. */
            const inds = (show.inds || []).map((c) => ({ a: brg(c), p: P(c) }))

            /* Radar radius from the CITY, not the screen: reach the furthest
               thing actually drawn, plus air, corrected for the 0.72 vertical
               squash, capped at half the diagonal. Screen-derived radii swept
               empty space on wide windows. */
            let far = 0
            const reach = (pt) => {
              const d = Math.hypot(pt[0] - center[0], (pt[1] - center[1]) / 0.72)
              if (isFinite(d) && d > far) far = d
            }
            for (const r of roads) for (const pt of r.pts) reach(pt)
            for (const d of inds) reach(d.p)
            const vpR = Math.hypot(W, H)
            const maxR = far > 40 ? Math.min(far * 1.06, vpR * 0.5) : vpR * 0.42

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

            const dots = inds.length ? inds : genScatter(roads, center, maxR, mulberry32(23)).dots
            const { tops } = genScatter(roads, center, maxR, mulberry32(23))

            const dpr = Math.min(1.5, window.devicePixelRatio || 1)
            canvas.width = W * dpr
            canvas.height = H * dpr
            canvas.style.width = W + 'px'
            canvas.style.height = H + 'px'
            g.setTransform(dpr, 0, 0, dpr, 0, 0)
            /* Reprojected, so any bake is stale. */
            groundLayer = null
            markerLayer = null
            scene = { W, H, center, roads, dots, tops, isos, maxR }
          }
          build()

          const resize = () => {
            map.resize()
            build()
          }
          window.addEventListener('resize', resize)
          section.__cleanupResize = () => window.removeEventListener('resize', resize)

          /* The draw order matters and is the original's: rings and roads, then
             the ripple, then the beam, then the markers on top of it. Baking it
             as one layer would have put the beam over the markers and tinted
             them. Hence two layers with the beam drawn between them. */
          const drawGround = (ctx, t) => {
            const { center, roads, maxR } = scene

            const ringsK = Math.min(1, Math.max(0, (t - ROADS_START) / ROADS_MS))
            ctx.strokeStyle = `rgba(46,78,110,${0.5 * ringsK})`
            ctx.lineWidth = 1
            for (const k of [0.35, 0.7, 1]) {
              ctx.beginPath()
              ctx.ellipse(center[0], center[1], maxR * k, maxR * k * 0.72, 0, 0, Math.PI * 2)
              ctx.stroke()
            }

            if (t > ROADS_START) {
              const rad = Math.min(1.02, ((t - ROADS_START) / ROADS_MS) * 1.02)
              for (const r of roads) {
                const diff = rad - r.d
                if (diff <= 0) continue
                const edge = diff < 0.12 ? 1 - diff / 0.12 : 0
                const base = r.m ? 0.55 : 0.26
                ctx.strokeStyle = r.m
                  ? `rgba(143,176,206,${base + edge * 0.45})`
                  : `rgba(62,92,124,${base + edge * 0.5})`
                ctx.lineWidth = r.m ? 1.7 : 0.9
                ctx.beginPath()
                ctx.moveTo(r.pts[0][0], r.pts[0][1])
                for (let i = 1; i < r.pts.length; i++) ctx.lineTo(r.pts[i][0], r.pts[i][1])
                ctx.stroke()
              }
            }
          }

          const drawMarkers = (ctx, t, sweep) => {
            const { dots, tops, isos } = scene
            if (sweep < 0) return

            for (const d of dots) {
              if (d.a > sweep) continue
              const trail = sweep - d.a
              const op = trail < 30 ? 1 - (trail / 30) * 0.35 : 0.6
              ctx.fillStyle = `rgba(226,124,56,${op})`
              ctx.fillRect(d.p[0] - 1.1, d.p[1] - 1.1, 2.2, 2.2)
            }

            if (isos.length && t > SWEEP_START) {
              ctx.strokeStyle = `rgba(79,184,201,${Math.min(0.35, ((t - SWEEP_START) / 1000) * 0.35)})`
              ctx.lineWidth = 0.8
              for (const path of isos) {
                ctx.beginPath()
                ctx.moveTo(path[0][0], path[0][1])
                for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1])
                ctx.closePath()
                ctx.stroke()
              }
            }

            const tr = sweep - 25
            for (const c of tops) {
              if (c.a > tr) continue
              const r = 3 + (c.s - 6) * 0.7
              ctx.fillStyle = 'rgba(224,57,43,0.85)'
              ctx.beginPath()
              ctx.arc(c.p[0], c.p[1], r, 0, Math.PI * 2)
              ctx.fill()
              ctx.strokeStyle = 'rgba(242,160,90,0.9)'
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.arc(c.p[0], c.p[1], r + 1.5, 0, Math.PI * 2)
              ctx.stroke()
            }
          }

          const drawBeam = (ctx, raw) => {
            const { center, maxR } = scene
            const beamK = raw <= 360 ? 1 : 0.55
            const a1 = ((raw % 360) * Math.PI) / 180
            ctx.save()
            ctx.translate(center[0], center[1])
            ctx.scale(1, 0.72)
            for (let w = 0; w < 22; w += 2) {
              const a0 = a1 - ((w + 2) * Math.PI) / 180
              ctx.fillStyle = `rgba(200,105,42,${0.20 * (1 - w / 22) * beamK})`
              ctx.beginPath()
              ctx.moveTo(0, 0)
              ctx.arc(0, 0, maxR, -Math.PI / 2 + a0, -Math.PI / 2 + a1 - (w * Math.PI) / 180)
              ctx.closePath()
              ctx.fill()
            }
            ctx.restore()
          }

          /* Bake the closed sweep at device resolution. */
          const bake = (fn) => {
            const { W } = scene
            const off = document.createElement('canvas')
            off.width = canvas.width
            off.height = canvas.height
            const octx = off.getContext('2d')
            const dpr = canvas.width / W
            octx.setTransform(dpr, 0, 0, dpr, 0, 0)
            fn(octx)
            return off
          }

          const bakeStatic = () => {
            const tEnd = SWEEP_START + SWEEP_MS
            groundLayer = bake((c) => drawGround(c, tEnd))
            markerLayer = bake((c) => drawMarkers(c, tEnd, 360))
          }

          const tick = (now) => {
            if (cancelled || !scene || !rafOn) return
            if (!last) last = now
            vt += Math.min(now - last, 50)
            last = now
            const t = vt
            const { W, H, center, maxR } = scene

            /* Only touch the basemap paint while the fade is running. */
            if (!mapFaded) {
              const o = Math.min(DARK_OPACITY, (t / MAP_MS) * DARK_OPACITY)
              map.setPaintProperty('base', 'raster-opacity', o)
              if (o >= DARK_OPACITY) mapFaded = true
            }

            g.clearRect(0, 0, W, H)

            const raw = t <= SWEEP_START ? -1 : ((t - SWEEP_START) / SWEEP_MS) * 360
            const sweep = raw < 0 ? -1 : Math.min(360, raw)
            const closed = raw > 360

            if (closed && !groundLayer) bakeStatic()

            /* 1. ground */
            if (closed) g.drawImage(groundLayer, 0, 0, W, H)
            else drawGround(g, t)

            /* 2. soft birth ripple */
            if (t > SWEEP_START - 100 && t < SWEEP_START + 1400) {
              const k = (t - SWEEP_START + 100) / 1500
              g.strokeStyle = `rgba(226,124,56,${0.7 * (1 - k)})`
              g.lineWidth = 2
              g.beginPath()
              g.ellipse(center[0], center[1], maxR * k, maxR * k * 0.72, 0, 0, Math.PI * 2)
              g.stroke()
            }

            /* 3. beam */
            if (sweep >= 0) drawBeam(g, raw)

            /* 4. markers, over the beam */
            if (closed) g.drawImage(markerLayer, 0, 0, W, H)
            else drawMarkers(g, t, sweep)

            raf = requestAnimationFrame(tick)
          }

          const startAnim = () => {
            if (started) {
              if (!rafOn) {
                rafOn = true
                last = 0
                raf = requestAnimationFrame(tick)
              }
              return
            }
            started = true
            rafOn = true
            raf = requestAnimationFrame(tick)
          }
          const pauseAnim = () => {
            if (!rafOn) return
            rafOn = false
            cancelAnimationFrame(raf)
          }
          if (startPending) startAnim()
          section.__startAnim = startAnim
          section.__pauseAnim = pauseAnim
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (section.__startAnim) section.__startAnim()
            else startPending = true
          } else {
            if (section.__pauseAnim) section.__pauseAnim()
            else startPending = false
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
      <div className="stage stage--instrument" style={{ background: '#060d16' }}>
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
            segment, where competition is structurally thinner. We originate through a
            deep and granular network of national and local brokers across Western
            Europe&rsquo;s main corridors, through direct corporate and owner
            relationships, and &mdash; alongside them &mdash; through proprietary
            sourcing technology.
          </p>
        </div>

        {stats && (
          <div className="scan-stats" aria-hidden="true">
            <div>
              <div className="scan-stat-num">{stats.parcels.toLocaleString('en-GB')}</div>
              <div className="scan-stat-label">parcels scanned</div>
            </div>
            <div>
              <div className="scan-stat-num">{stats.industrial.toLocaleString('en-GB')}</div>
              <div className="scan-stat-label">industrial sites</div>
            </div>
            <div>
              <div className="scan-stat-num">{stats.owners_named.toLocaleString('en-GB')}</div>
              <div className="scan-stat-label">owners named</div>
            </div>
            <div>
              <div className="scan-stat-num">{stats.communes.toLocaleString('en-GB')}</div>
              <div className="scan-stat-label">communes</div>
            </div>
          </div>
        )}

        <div className="caption">Sonar engine &middot; Lyon corridor</div>
      </div>
    </section>
  )
}
