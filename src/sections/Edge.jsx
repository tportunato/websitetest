import { useEffect, useRef } from 'react'

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
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let parcels = []
    let raf

    const build = () => {
      const rand = mulberry32(7)
      parcels = []
      const w = canvas.width
      const h = canvas.height
      const cols = 26
      const rows = 15
      const cw = w / cols
      const ch = h / rows
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() < 0.14) continue
          const cx = c * cw + cw / 2
          const cy = r * ch + ch / 2
          parcels.push({
            x: c * cw + 3,
            y: r * ch + 3,
            w: cw - 6,
            h: ch - 6,
            hot: rand() < 0.18,
            target: rand() < 0.025,
            a: Math.atan2(cy - h / 2, cx - w / 2)
          })
        }
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      build()
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    const draw = (now) => {
      const w = canvas.width
      const h = canvas.height
      const t = ((now - start) % 13000) / 13000
      const sweep = t * Math.PI * 2 - Math.PI
      const fade = t > 0.92 ? 1 - (t - 0.92) / 0.08 : 1
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = Math.max(1, w / 1600)
      parcels.forEach((p) => {
        ctx.strokeStyle = 'rgba(247,245,240,0.09)'
        ctx.strokeRect(p.x, p.y, p.w, p.h)
        if (p.a < sweep) {
          if (p.target) {
            ctx.fillStyle = 'rgba(232,163,61,' + (0.55 * fade).toFixed(3) + ')'
            ctx.fillRect(p.x, p.y, p.w, p.h)
            ctx.strokeStyle = 'rgba(232,163,61,' + (0.9 * fade).toFixed(3) + ')'
            ctx.strokeRect(p.x - 2, p.y - 2, p.w + 4, p.h + 4)
          } else if (p.hot) {
            ctx.fillStyle = 'rgba(232,163,61,' + (0.16 * fade).toFixed(3) + ')'
            ctx.fillRect(p.x, p.y, p.w, p.h)
          }
        }
      })
      const cx = w / 2
      const cy = h / 2
      const len = Math.hypot(w, h)
      ctx.strokeStyle = 'rgba(232,163,61,' + (0.5 * fade).toFixed(3) + ')'
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweep) * len, cy + Math.sin(sweep) * len)
      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="beat" id="origination">
      <div className="stage stage-dark">
        <div className="canvas-wrap">
          <canvas ref={ref} />
        </div>
        <div className="scrim" />
        <div className="beat-content">
          <p className="eyebrow" data-reveal>Origination</p>
          <h2 data-reveal>Most of what we buy is never on the market.</h2>
          <p className="body" data-reveal>
            Off-market and corporate-sourced opportunities in the &euro;5m to &euro;50m segment,
            where competition is structurally thinner.
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
