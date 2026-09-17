/* The firm. Sits directly under the hero.

   REBUILT as a statement rather than a body-copy band. The first version set
   both supplied paragraphs at the same weight in two columns, which read like
   an "about us" block on a SaaS site and shared no vocabulary with the rest of
   the page. The page's own language is: one large claim, supporting notes
   demoted, and a mono instrument rail. That is what this is now.

   THREE BACKGROUNDS ARE BUILT. Pick one and the other two come out:
     corridors - the European coastline and the logistics corridors drawn as
                 hairlines (public/data/europe-land.json). NOTE: the portfolio
                 beat has gone back to its own corridor-network canvas, so this
                 one now repeats it further up the same page. That is why the
                 default moved to `hold`.
     hold      - near-black, one rule, grain. The type carries it.
     frame     - the hero's own poster frame, held and darkened, so the section
                 reads as the opening shot settling into stillness.
   Override at runtime with ?bg=hold while reviewing. */
import { useEffect, useRef, useState } from 'react'

const DEFAULT_BG = 'hold'

/* Western Europe's main logistics axes, as drawn in the earlier corridor
   canvas: Randstad-Antwerp-Lille-Paris-Lyon-Marseille, the Rhine, the Po
   valley, the Mediterranean arc. Representative geography, not holdings. */
const CORRIDORS = [
  [[4.48, 51.92], [4.40, 51.22], [4.35, 50.85], [4.87, 50.47], [5.56, 49.61], [6.18, 48.69], [5.04, 47.32], [4.85, 45.75], [4.80, 44.93], [5.37, 43.30]],
  [[3.06, 50.63], [2.35, 48.85], [2.88, 47.95], [5.04, 47.32]],
  [[4.48, 51.92], [5.47, 51.44], [6.17, 51.37], [6.76, 51.43], [6.96, 50.94], [8.27, 50.00], [8.68, 50.11], [7.59, 47.56], [8.54, 46.05], [9.19, 45.46], [8.93, 44.41]],
  [[9.19, 45.46], [10.99, 45.44], [11.34, 44.49]],
  [[-3.70, 40.42], [-0.88, 41.65], [2.17, 41.39], [3.88, 43.61], [4.80, 44.93]],
  [[4.35, 50.85], [5.47, 51.44]],
  [[2.35, 48.85], [1.45, 47.08], [-0.55, 44.84]]
]

const SPEC = ['Geneva · FINMA regulated', 'Last-mile & urban logistics', 'Western European corridors']

/* Web-Mercator, BOTH AXES IN RADIANS. Projecting y through Mercator while
   leaving x in degrees puts the two axes on scales that differ by ~57x, so a
   fit computed across them lands about 40x too far in and you see a couple of
   stray coastline segments instead of Europe. */
const mercX = (lng) => (lng * Math.PI) / 180
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))

function Corridors() {
  const wrap = useRef(null)
  const cvs = useRef(null)

  useEffect(() => {
    const el = wrap.current
    const canvas = cvs.current
    if (!el || !canvas) return
    let cancelled = false
    let raf = 0
    let land = null
    let scene = null
    let t0 = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const build = () => {
      if (!land) return
      const W = el.offsetWidth
      const H = el.offsetHeight
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      const g = canvas.getContext('2d')
      g.setTransform(dpr, 0, 0, dpr, 0, 0)

      /* Contain the bbox, then push past it so the landmass bleeds off the top
         and bottom, and sit it right of centre so the statement keeps the left
         of the section to itself. */
      const [w0, s0, e0, n0] = land.bbox
      const x0 = mercX(w0)
      const x1 = mercX(e0)
      const y0 = mercY(s0)
      const y1 = mercY(n0)
      const scale = Math.min(W / (x1 - x0), H / (y1 - y0)) * (W < 880 ? 1.1 : 1.28)
      const cx = W * (W < 880 ? 0.5 : 0.77)
      const cy = H * 0.5
      const mxm = (x0 + x1) / 2
      const mym = (y0 + y1) / 2
      const P = ([lng, lat]) => [
        cx + (mercX(lng) - mxm) * scale,
        cy - (mercY(lat) - mym) * scale
      ]

      scene = {
        g,
        W,
        H,
        rings: land.rings.map((r) => r.map(P)),
        corridors: CORRIDORS.map((c) => c.map(P))
      }
    }

    const draw = (k) => {
      if (!scene) return
      const { g, W, H, rings, corridors } = scene
      g.clearRect(0, 0, W, H)

      /* coastline: the quietest possible hairline */
      g.strokeStyle = `rgba(247, 245, 240, ${0.11 * Math.min(1, k * 1.6)})`
      g.lineWidth = 1
      for (const ring of rings) {
        if (ring.length < 2) continue
        g.beginPath()
        g.moveTo(ring[0][0], ring[0][1])
        for (let i = 1; i < ring.length; i++) g.lineTo(ring[i][0], ring[i][1])
        g.stroke()
      }

      /* corridors: brighter, drawn on progressively */
      const ck = Math.min(1, Math.max(0, (k - 0.25) / 0.75))
      if (ck <= 0) return
      g.lineWidth = 1.4
      g.lineCap = 'round'
      for (const c of corridors) {
        g.strokeStyle = 'rgba(247, 245, 240, 0.42)'
        const span = (c.length - 1) * ck
        const full = Math.floor(span)
        g.beginPath()
        g.moveTo(c[0][0], c[0][1])
        for (let i = 1; i <= Math.min(full, c.length - 1); i++) g.lineTo(c[i][0], c[i][1])
        if (full < c.length - 1) {
          const f = span - full
          const a = c[full]
          const b = c[full + 1]
          g.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f)
        }
        g.stroke()
      }
    }

    const tick = (now) => {
      if (cancelled) return
      if (!t0) t0 = now
      const k = Math.min(1, (now - t0) / 2600)
      draw(k)
      if (k < 1) raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduced) { draw(1); return }
      t0 = 0
      raf = requestAnimationFrame(tick)
    }

    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started && scene) {
            started = true
            start()
          }
        })
      },
      { threshold: 0.2 }
    )

    fetch('/data/europe-land.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return
        land = d
        build()
        draw(0)
        io.observe(el)
      })
      .catch(() => {})

    const onResize = () => {
      build()
      draw(started ? 1 : 0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="firm-bg firm-bg--corridors" ref={wrap} aria-hidden="true">
      <canvas ref={cvs} />
      <span className="firm-vignette" />
    </div>
  )
}

function Hold() {
  return (
    <div className="firm-bg firm-bg--hold" aria-hidden="true">
      <span className="firm-grain" />
    </div>
  )
}

function Frame() {
  return (
    <div className="firm-bg firm-bg--frame" aria-hidden="true">
      <img src="/videos/beat01-city-vans-poster.jpg" alt="" />
      <span className="firm-vignette" />
      <span className="firm-grain" />
    </div>
  )
}

export default function Firm() {
  const [bg] = useState(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('bg')
      return ['corridors', 'hold', 'frame'].includes(q) ? q : DEFAULT_BG
    } catch (e) {
      return DEFAULT_BG
    }
  })

  return (
    <section className={'firm firm--photo firm--' + bg} id="firm">
      {bg === 'corridors' && <Corridors />}
      {bg === 'hold' && <Hold />}
      {bg === 'frame' && <Frame />}

      <div className="firm-photo" aria-hidden="true">
        <img src="/images/geneva.jpg" alt="" />
      </div>

      <div className="firm-inner">
        <p className="eyebrow" data-reveal>The firm</p>

        <h2 className="firm-statement" data-reveal>
          A FINMA&nbsp;regulated Swiss investment firm, specializing in logistics
          real estate across key European corridors.
        </h2>

        <div className="firm-notes">
          <p data-reveal>
            We focus on last-mile properties in prime locations, leveraging our
            expertise, global network, and market insights to create long-term value.
          </p>
          <p data-reveal>
            We enhance asset performance through strategic asset management, including
            refurbishment, repositioning, and ESG-driven upgrades, all while meeting
            evolving tenant needs.
          </p>
        </div>

        <ul className="firm-spec" data-reveal>
          {SPEC.map((sp) => (
            <li key={sp}>{sp}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
