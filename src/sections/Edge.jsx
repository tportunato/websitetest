/* Beat 03 - Origination. Port of the Sonar cold-open intro (canvas engine):
   radar rings, road network growing outward, orbiting sonar beam, industrial
   dots igniting under the sweep, top candidates blooming behind it, counters
   pacing the revolution. Data: real engine snapshot (Lyon corridor) bundled
   at /data/showcase-lyon.json. Roads are synthesized unless the snapshot
   provides them (copy public/data/showcase/lyon.json from the sonar repo to
   get the real network). Animation starts when the section first scrolls
   into view, then patrols endlessly. */
import { useEffect, useRef, useState } from 'react'

const ROADS_START = 300
const ROADS_MS = 1600
const SWEEP_START = 2000
const SWEEP_MS = 4000

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
  const cvs = useRef(null)
  const statRefs = useRef({})
  const dataRef = useRef(null)
  const startedRef = useRef(false)
  const [snapshot, setSnapshot] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/data/showcase-lyon.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) {
          dataRef.current = d
          setSnapshot(d)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const canvas = cvs.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const g = canvas.getContext('2d')
    let raf = 0
    let scene = null
    let t0 = 0

    const project = (data, w, h) => {
      const lat0 = (data.center[1] * Math.PI) / 180
      const kx = Math.cos(lat0)
      const pts = []
      data.inds.forEach((c) => pts.push(c))
      data.top.forEach((t) => pts.push(t.c))
      pts.push(data.center)
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
      pts.forEach((p) => {
        const x = p[0] * kx
        const y = p[1]
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      })
      const pad = 0.08
      const sx = (w * (1 - pad * 2)) / (maxX - minX)
      const sy = (h * (1 - pad * 2)) / (maxY - minY)
      const s = Math.min(sx, sy)
      const ox = (w - s * (maxX - minX)) / 2
      const oy = (h - s * (maxY - minY)) / 2
      return (ll) => [
        ox + (ll[0] * kx - minX) * s,
        h - (oy + (ll[1] - minY) * s)
      ]
    }

    const build = () => {
      const w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio)
      const h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio)
      const maxR = Math.hypot(w, h) * 0.42
      const data = dataRef.current
      let center, inds = [], tops = [], roads = []
      const brgFrom = (cx, cy) => (px, py) =>
        ((Math.atan2(px - cx, cy - py) * 180) / Math.PI + 360) % 360

      if (data && data.inds && data.inds.length) {
        const P = project(data, w, h)
        center = P(data.center)
        const brg = brgFrom(center[0], center[1])
        inds = data.inds.map((c) => {
          const p = P(c)
          return { a: brg(p[0], p[1]), p }
        })
        tops = (data.top || []).map((t) => {
          const p = P(t.c)
          return { a: brg(p[0], p[1]), s: t.s || 8, p }
        })
        if (data.roads && data.roads.length) {
          roads = data.roads.map((r) => ({ d: r.d, m: r.m, pts: r.pts.map(P) }))
        }
      } else {
        center = [w / 2, h / 2]
      }

      if (!roads.length) {
        /* synthetic road network: radial polylines with jitter */
        const rand = mulberry32(11)
        for (let i = 0; i < 38; i++) {
          const ang = rand() * Math.PI * 2
          const len = maxR * (0.5 + rand() * 0.55)
          const m = rand() < 0.24
          const steps = 7 + Math.floor(rand() * 5)
          const pts = []
          let px = center[0], py = center[1]
          for (let sIdx = 0; sIdx <= steps; sIdx++) {
            const f = sIdx / steps
            const jitter = (rand() - 0.5) * maxR * 0.07
            const jx = Math.cos(ang + Math.PI / 2) * jitter
            const jy = Math.sin(ang + Math.PI / 2) * jitter * 0.72
            px = center[0] + Math.cos(ang) * len * f + jx
            py = center[1] + Math.sin(ang) * len * f * 0.72 + jy
            pts.push([px, py])
          }
          roads.push({ d: rand() * 0.55, m, pts })
        }
      }
      scene = { w, h, maxR, center, inds, tops, roads }
    }

    const tick = (now) => {
      if (!scene) return
      if (!t0) t0 = now
      const t = now - t0
      const { w, h, maxR, center, inds, tops, roads } = scene
      g.clearRect(0, 0, w, h)
      g.lineWidth = Math.max(1, w / 1800)

      /* radar rings */
      const ringsK = Math.min(1, Math.max(0, (t - ROADS_START) / ROADS_MS))
      g.strokeStyle = 'rgba(46,78,110,' + (0.5 * ringsK).toFixed(3) + ')'
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
          const base = r.m ? 0.5 : 0.22
          g.strokeStyle = r.m
            ? 'rgba(143,176,206,' + (base + edge * 0.45).toFixed(3) + ')'
            : 'rgba(62,92,124,' + (base + edge * 0.5).toFixed(3) + ')'
          g.lineWidth = r.m ? Math.max(1.4, w / 1300) : Math.max(0.8, w / 2200)
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
        g.strokeStyle = 'rgba(232,163,61,' + (0.7 * (1 - k)).toFixed(3) + ')'
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
        for (let wdg = 0; wdg < 22; wdg += 2) {
          const a0 = a1 - ((wdg + 2) * Math.PI) / 180
          g.fillStyle = 'rgba(232,163,61,' + (0.18 * (1 - wdg / 22) * beamK).toFixed(3) + ')'
          g.beginPath()
          g.moveTo(0, 0)
          g.arc(0, 0, maxR, -Math.PI / 2 + a0, -Math.PI / 2 + a1 - (wdg * Math.PI) / 180)
          g.closePath()
          g.fill()
        }
        g.restore()

        /* industrial dots ignite under the beam */
        const dotSize = Math.max(2, w / 900)
        for (const d of inds) {
          if (d.a > sweep) continue
          const trail = sweep - d.a
          const op = trail < 30 ? 1 - (trail / 30) * 0.35 : 0.6
          g.fillStyle = 'rgba(232,163,61,' + op.toFixed(3) + ')'
          g.fillRect(d.p[0] - dotSize / 2, d.p[1] - dotSize / 2, dotSize, dotSize)
        }

        /* top candidates bloom 25 degrees behind the beam */
        const tr = sweep - 25
        for (const c of tops) {
          if (c.a > tr) continue
          const r = (3 + (c.s - 6) * 0.7) * Math.max(1, w / 1900)
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

        /* counters pace the first revolution */
        const data = dataRef.current
        if (data && data.stats) {
          const ease = 1 - Math.pow(1 - sweep / 360, 3)
          const st = data.stats
          const vals = {
            communes: st.communes,
            parcels: st.parcels,
            industrial: st.industrial,
            candidates: st.candidates,
            owners: st.owners_named
          }
          Object.entries(vals).forEach(([k2, v]) => {
            const el = statRefs.current[k2]
            if (el && typeof v === 'number') el.textContent = Math.round(v * ease).toLocaleString('en-US')
          })
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      build()
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start()
        })
      },
      { threshold: 0.3 }
    )
    io.observe(section)

    const resize = () => {
      if (!startedRef.current) return
      build()
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [snapshot])

  return (
    <section className="beat" id="origination" ref={sectionRef}>
      <div className="stage stage-dark">
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
