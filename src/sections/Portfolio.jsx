/* Beat 05 - The portfolio. Corridor network view (approved preview v12):
   dark MapLibre basemap of Western Europe, shorelines, braided organic
   corridor bundles with scribble mesh crystallising along them (sonar visual
   family), goods-flow lights, then theoretical asset markers igniting along
   the corridors. Corridors follow real European logistics axes; asset
   positions are REPRESENTATIVE (caption: Illustrative visual).
   Land/coast geometry bundled at /data/europe-land.json (no external fetches).
   All randomness is seeded: every visitor sees the identical composition. */
import { useEffect, useRef } from 'react'

const CORRIDORS = [
  { pts: [[4.48,51.92],[4.40,51.22],[4.35,50.85],[4.87,50.47],[5.56,49.61],[6.18,48.69],[5.04,47.32],[4.85,45.75],[4.80,44.93],[5.37,43.30]] },
  { pts: [[3.06,50.63],[2.35,48.85],[2.88,47.95],[5.04,47.32]] },
  { pts: [[4.48,51.92],[5.47,51.44],[6.17,51.37],[6.76,51.43],[6.96,50.94],[8.27,50.00],[8.68,50.11],[7.59,47.56],[8.54,46.05],[9.19,45.46],[8.93,44.41]] },
  { pts: [[9.19,45.46],[10.99,45.44],[11.34,44.49]] },
  { pts: [[-3.70,40.42],[-0.88,41.65],[2.17,41.39],[3.88,43.61],[4.80,44.93]] },
  { pts: [[4.35,50.85],[5.47,51.44]] },
  { pts: [[2.35,48.85],[1.45,47.08],[-0.55,44.84]] }
]
const ASSETS = [
  [3.02,50.57],[2.45,48.78],[2.20,48.99],[4.92,45.68],[5.30,43.42],
  [4.42,51.88],[4.46,51.17],[5.42,51.40],[6.90,50.99],[8.60,50.05],
  [9.10,45.40],[9.28,45.52],[11.28,44.55],[2.10,41.45]
]

const MAP_MS = 900
const SHORE_START = 250
const SHORE_MS = 1200
const COR_START = 1600
const COR_MS = 3800
const ASSETS_START = 5000
const ASSET_GAP = 180

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

export default function Portfolio() {
  const sectionRef = useRef(null)
  const mapDiv = useRef(null)
  const cvs = useRef(null)
  const mapRef = useRef(null)

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
    const g = canvas.getContext('2d')

    const initSection = async () => {
      let land = null
      try {
        const r = await fetch('/data/europe-land.json')
        if (r.ok) land = await r.json()
      } catch (e) {}
      if (cancelled) return

      ensureMaplibre((err) => {
        if (cancelled || err || !window.maplibregl) return
        const map = new window.maplibregl.Map({
          container: mapDiv.current,
          center: [5.1, 47.4],
          zoom: 5.25,
          pitch: 30,
          bearing: -6,
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

          const build = () => {
            const W = section.offsetWidth
            const H = section.offsetHeight
            const dpr = Math.min(1.5, window.devicePixelRatio || 1)
            canvas.width = W * dpr
            canvas.height = H * dpr
            canvas.style.width = W + 'px'
            canvas.style.height = H + 'px'
            g.setTransform(dpr, 0, 0, dpr, 0, 0)

            const P = (ll) => {
              const p = map.project(ll)
              return [p.x, p.y]
            }
            const inBox = (ll) => ll[0] > -12 && ll[0] < 20 && ll[1] > 35 && ll[1] < 58

            /* shores + geographic land test */
            const shores = []
            const landRings = land && land.rings ? land.rings : []
            landRings.forEach((ring) => {
              const proj = ring.map(P)
              let run = []
              ring.forEach((ll, i) => {
                if (inBox(ll)) run.push(proj[i])
                else {
                  if (run.length > 1) shores.push(run)
                  run = []
                }
              })
              if (run.length > 1) shores.push(run)
            })
            const onLand = (x, y) => {
              if (!landRings.length) return true
              const ll = map.unproject([x, y])
              const px = ll.lng
              const py = ll.lat
              for (const ring of landRings) {
                let inside = false
                for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                  const xi = ring[i][0], yi = ring[i][1]
                  const xj = ring[j][0], yj = ring[j][1]
                  if (((yi > py) !== (yj > py)) && (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)) inside = !inside
                }
                if (inside) return true
              }
              return false
            }

            /* corridors: resampled, organic wobble pinned at junctions, braided strands */
            const randC = mulberry32(13)
            const buildPath = (rawPts) => {
              let len = 0
              const segs = []
              for (let i = 1; i < rawPts.length; i++) {
                const d = Math.hypot(rawPts[i][0] - rawPts[i-1][0], rawPts[i][1] - rawPts[i-1][1])
                segs.push(d)
                len += d
              }
              return { pts: rawPts, segs, len }
            }
            const corridors = CORRIDORS.map((c) => {
              const base = buildPath(c.pts.map(P))
              const f1 = 0.008 + randC() * 0.006
              const f2 = 0.021 + randC() * 0.01
              const p1 = randC() * 6.28
              const p2 = randC() * 6.28
              const amp = 9 + randC() * 8
              const wavy = []
              const step = 22
              const positions = []
              for (let sPos = 0; sPos < base.len; sPos += step) positions.push(sPos)
              positions.push(base.len)
              for (const sPos of positions) {
                let acc = 0, x = base.pts[0][0], y = base.pts[0][1], tx = 1, ty = 0
                for (let i = 1; i < base.pts.length; i++) {
                  const d = base.segs[i-1]
                  if (acc + d >= sPos) {
                    const r = (sPos - acc) / d
                    const dx = base.pts[i][0] - base.pts[i-1][0]
                    const dy = base.pts[i][1] - base.pts[i-1][1]
                    x = base.pts[i-1][0] + dx * r
                    y = base.pts[i-1][1] + dy * r
                    tx = dx / (d || 1)
                    ty = dy / (d || 1)
                    break
                  }
                  acc += d
                }
                const env = Math.min(1, sPos / 130, (base.len - sPos) / 130)
                const w = (Math.sin(sPos * f1 + p1) * amp + Math.sin(sPos * f2 + p2) * amp * 0.45) * Math.max(0, env)
                wavy.push([x - ty * w, y + tx * w])
              }
              const path = buildPath(wavy)
              path.strands = []
              for (let k = 0; k < 4; k++) {
                const off = (k - 1.5) * 3.2 + (randC() - 0.5) * 2
                const fS = 0.03 + randC() * 0.02
                const pS = randC() * 6.28
                const aS = 2 + randC() * 3
                const spts = wavy.map((p, i) => {
                  const prev = wavy[Math.max(0, i - 1)]
                  const next = wavy[Math.min(wavy.length - 1, i + 1)]
                  const dx = next[0] - prev[0]
                  const dy = next[1] - prev[1]
                  const dl = Math.hypot(dx, dy) || 1
                  const env = Math.min(1, i / 6, (wavy.length - 1 - i) / 6)
                  const w = (off + Math.sin(i * fS * 22 + pS) * aS) * Math.max(0, env)
                  return [p[0] - dy / dl * w, p[1] + dx / dl * w]
                })
                path.strands.push(buildPath(spts))
              }
              return path
            })
            const assets = ASSETS.map(P)

            const pointAt = (c, target) => {
              let acc = 0
              for (let i = 1; i < c.pts.length; i++) {
                const d = c.segs[i-1]
                if (acc + d >= target) {
                  const r = (target - acc) / d
                  const dx = c.pts[i][0] - c.pts[i-1][0]
                  const dy = c.pts[i][1] - c.pts[i-1][1]
                  return [c.pts[i-1][0] + dx * r, c.pts[i-1][1] + dy * r, dx / (d || 1), dy / (d || 1)]
                }
                acc += d
              }
              const e = c.pts.length - 1
              return [c.pts[e][0], c.pts[e][1], 0, 0]
            }

            /* scribble mesh: cells, along-walks, short outward branches with tip cells */
            const rand = mulberry32(77)
            const scribbles = []
            corridors.forEach((c, ci) => {
              const step = 24
              for (let s2 = 0; s2 < c.len; s2 += step) {
                const frac = s2 / c.len
                const [x, y, tx, ty] = pointAt(c, s2)
                const nx = -ty
                const ny = tx
                if (rand() < 0.9) {
                  const n = 6 + Math.floor(rand() * 6)
                  const baseR = 11 + rand() * 41
                  const offN = (rand() - 0.5) * 2 * (rand() * 46)
                  const cx = x + nx * offN
                  const cy = y + ny * offN
                  if (onLand(cx, cy)) {
                    const pts = []
                    for (let i = 0; i < n; i++) {
                      const ang = (i / n) * Math.PI * 2 + rand() * 0.5
                      const r = baseR * (0.4 + rand() * 0.82)
                      pts.push([cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * 0.85])
                    }
                    scribbles.push({ pts, closed: true, a: 0.2 + rand() * 0.2, birth: frac, ci })
                  }
                }
                if (rand() < 0.55) {
                  const side = rand() < 0.5 ? 1 : -1
                  let bx = x, by = y
                  let dirx = nx * side, diry = ny * side
                  const rot = (rand() - 0.5) * 1.1
                  const cosR = Math.cos(rot), sinR = Math.sin(rot)
                  let dx2 = dirx * cosR - diry * sinR
                  let dy2 = dirx * sinR + diry * cosR
                  const bpts = [[bx, by]]
                  const segsN = 2 + Math.floor(rand() * 3)
                  let wet = false
                  for (let i = 0; i < segsN; i++) {
                    const stepL = 8 + rand() * 12
                    const bend = (rand() - 0.5) * 0.7
                    const cB = Math.cos(bend), sB = Math.sin(bend)
                    const ndx = dx2 * cB - dy2 * sB
                    const ndy = dx2 * sB + dy2 * cB
                    dx2 = ndx; dy2 = ndy
                    bx += dx2 * stepL; by += dy2 * stepL
                    if (!onLand(bx, by)) { wet = true; break }
                    bpts.push([bx, by])
                  }
                  if (!wet && bpts.length > 2) {
                    scribbles.push({ pts: bpts, closed: false, a: 0.22 + rand() * 0.18, birth: frac, ci })
                    if (rand() < 0.55) {
                      const n2 = 5 + Math.floor(rand() * 5)
                      const r2 = 5 + rand() * 13
                      const cpts = []
                      let dry = true
                      for (let i = 0; i < n2; i++) {
                        const ang = (i / n2) * Math.PI * 2 + rand() * 0.5
                        const rr = r2 * (0.5 + rand() * 0.8)
                        const vx = bx + Math.cos(ang) * rr
                        const vy = by + Math.sin(ang) * rr * 0.85
                        if (!onLand(vx, vy)) { dry = false; break }
                        cpts.push([vx, vy])
                      }
                      if (dry && cpts.length > 2) scribbles.push({ pts: cpts, closed: true, a: 0.18 + rand() * 0.16, birth: frac, ci })
                    }
                  }
                }
                if (rand() < 0.75) {
                  const steps = 5 + Math.floor(rand() * 7)
                  const pts = []
                  let px = x + nx * (rand() - 0.5) * 31
                  let py = y + ny * (rand() - 0.5) * 31
                  let wet = false
                  for (let i = 0; i < steps; i++) {
                    if (!onLand(px, py)) { wet = true; break }
                    pts.push([px, py])
                    px += tx * (10 + rand() * 25) + nx * (rand() - 0.5) * 25
                    py += ty * (10 + rand() * 25) + ny * (rand() - 0.5) * 25
                  }
                  if (!wet && pts.length > 2) scribbles.push({ pts, closed: false, a: 0.22 + rand() * 0.18, birth: frac, ci })
                }
              }
            })
            scene = { W, H, shores, corridors, assets, scribbles, pointAt }
          }
          build()

          const resize = () => {
            map.resize()
            build()
          }
          window.addEventListener('resize', resize)
          section.__cleanupResize = () => window.removeEventListener('resize', resize)

          const drawCorridorPath = (c, f) => {
            const target = c.len * f
            let acc = 0
            g.beginPath()
            g.moveTo(c.pts[0][0], c.pts[0][1])
            for (let i = 1; i < c.pts.length; i++) {
              const d = c.segs[i-1]
              if (acc + d <= target) {
                g.lineTo(c.pts[i][0], c.pts[i][1])
                acc += d
              } else {
                const r = (target - acc) / d
                g.lineTo(c.pts[i-1][0] + (c.pts[i][0] - c.pts[i-1][0]) * r,
                         c.pts[i-1][1] + (c.pts[i][1] - c.pts[i-1][1]) * r)
                break
              }
            }
          }

          const tick = (now) => {
            if (cancelled || !scene || !rafOn) return
            if (!last) last = now
            vt += Math.min(now - last, 50)
            last = now
            const t = vt
            const { W, H, shores, corridors, assets, scribbles, pointAt } = scene
            map.setPaintProperty('base', 'raster-opacity', Math.min(0.30, (t / MAP_MS) * 0.30))
            g.clearRect(0, 0, W, H)

            const sf = Math.min(1, Math.max(0, (t - SHORE_START) / SHORE_MS))
            if (sf > 0 && shores.length) {
              g.strokeStyle = `rgba(126,168,199,${(0.5 * sf).toFixed(3)})`
              g.lineWidth = 1.1
              shores.forEach((line) => {
                g.beginPath()
                g.moveTo(line[0][0], line[0][1])
                for (let i = 1; i < line.length; i++) g.lineTo(line[i][0], line[i][1])
                g.stroke()
              })
            }

            const cf = Math.min(1, Math.max(0, (t - COR_START) / COR_MS))
            const ease = 1 - Math.pow(1 - cf, 2)
            if (cf > 0) {
              corridors.forEach((c) => {
                drawCorridorPath(c, ease)
                g.strokeStyle = 'rgba(79,184,201,0.14)'
                g.lineWidth = 9
                g.stroke()
                c.strands.forEach((st, k) => {
                  drawCorridorPath(st, ease)
                  g.strokeStyle = k === 1
                    ? 'rgba(190,235,245,0.7)'
                    : `rgba(126,204,220,${(0.3 + k * 0.08).toFixed(2)})`
                  g.lineWidth = k === 1 ? 1.3 : 0.9
                  g.stroke()
                })
              })

              g.lineWidth = 0.8
              scribbles.forEach((sc) => {
                if (sc.birth > ease) return
                const age = Math.min(1, (ease - sc.birth) * 6)
                const pop = age < 1 ? 1 + (1 - age) * 0.8 : 1
                g.strokeStyle = `rgba(79,184,201,${(sc.a * age * pop).toFixed(3)})`
                g.beginPath()
                g.moveTo(sc.pts[0][0], sc.pts[0][1])
                for (let i = 1; i < sc.pts.length; i++) g.lineTo(sc.pts[i][0], sc.pts[i][1])
                if (sc.closed) g.closePath()
                g.stroke()
              })
            }

            if (cf >= 1) {
              corridors.forEach((c) => {
                const n = Math.max(2, Math.round(c.len / 300))
                for (let k = 0; k < n; k++) {
                  const tf = ((now / 5600) + k / n) % 1
                  const [x, y] = pointAt(c, c.len * tf)
                  g.fillStyle = 'rgba(232,163,61,0.65)'
                  g.beginPath()
                  g.arc(x, y, 1.7, 0, Math.PI * 2)
                  g.fill()
                }
              })
            }

            assets.forEach((p, i) => {
              const t0 = ASSETS_START + i * ASSET_GAP
              if (t < t0) return
              const age = t - t0
              if (age < 700) {
                const k = age / 700
                g.strokeStyle = `rgba(232,163,61,${(0.8 * (1 - k)).toFixed(3)})`
                g.lineWidth = 1.6
                g.beginPath()
                g.arc(p[0], p[1], 4 + k * 26, 0, Math.PI * 2)
                g.stroke()
              }
              const pulse = 0.7 + 0.3 * Math.sin(now / 640 + i * 1.3)
              g.fillStyle = 'rgba(232,163,61,0.14)'
              g.beginPath()
              g.arc(p[0], p[1], 11, 0, Math.PI * 2)
              g.fill()
              g.fillStyle = `rgba(232,163,61,${(0.9 * pulse).toFixed(3)})`
              g.beginPath()
              g.arc(p[0], p[1], 3.4, 0, Math.PI * 2)
              g.fill()
            })

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
          section.__startAnim5 = startAnim
          section.__pauseAnim5 = pauseAnim
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
            if (section.__startAnim5) section.__startAnim5()
            else startPending = true
          } else {
            if (section.__pauseAnim5) section.__pauseAnim5()
            else startPending = false
          }
        })
      },
      { threshold: 0.25 }
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
    <section className="beat" id="portfolio-story" ref={sectionRef}>
      <div className="stage" style={{ background: '#060d16' }}>
        <div ref={mapDiv} style={{ position: 'absolute', inset: 0 }} />
        <div className="canvas-wrap">
          <canvas ref={cvs} />
        </div>
        <div className="scrim scrim-light" />
        <div className="beat-content">
          <p className="eyebrow" data-reveal>The portfolio</p>
          <h2 data-reveal>Asset by asset, corridor by corridor.</h2>
          <p className="body" data-reveal>
            A consolidation strategy in a fragmented market: aggregating urban logistics assets
            across Western Europe&rsquo;s main corridors into an institutional portfolio.
          </p>
          <a className="beat-cta" data-reveal href="#/portfolio">Explore the portfolio <span className="cta-arrow">&rarr;</span></a>
        </div>
        <div className="caption">Illustrative visual</div>
      </div>
    </section>
  )
}
