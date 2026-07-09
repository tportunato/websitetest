import { useEffect, useRef } from 'react'

const NODES = [
  [0.14, 0.78], [0.22, 0.55], [0.27, 0.36], [0.36, 0.24], [0.45, 0.18],
  [0.52, 0.30], [0.47, 0.44], [0.55, 0.56], [0.63, 0.40], [0.70, 0.26],
  [0.66, 0.66], [0.76, 0.52], [0.84, 0.70], [0.58, 0.78]
]

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [5, 8], [8, 9], [7, 10], [10, 11], [11, 12], [7, 13]
]

export default function Portfolio() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    const draw = (now) => {
      const w = canvas.width
      const h = canvas.height
      const t = ((now - start) % 14000) / 14000
      ctx.clearRect(0, 0, w, h)
      const r = Math.max(3, w / 280)

      EDGES.forEach((e, i) => {
        const t0 = 0.04 + i * 0.055
        const p = Math.min(1, Math.max(0, (t - t0) / 0.1))
        if (p <= 0) return
        const a = NODES[e[0]]
        const b = NODES[e[1]]
        const x1 = a[0] * w
        const y1 = a[1] * h
        const x2 = x1 + (b[0] * w - x1) * p
        const y2 = y1 + (b[1] * h - y1) * p
        ctx.strokeStyle = 'rgba(232,163,61,0.5)'
        ctx.lineWidth = Math.max(1, w / 1600)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      NODES.forEach((n, i) => {
        const t0 = 0.02 + i * 0.05
        if (t < t0) return
        const pulse = 0.6 + 0.4 * Math.sin(now / 600 + i)
        const x = n[0] * w
        const y = n[1] * h
        ctx.fillStyle = 'rgba(232,163,61,' + (0.85 * pulse).toFixed(3) + ')'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(232,163,61,0.12)'
        ctx.beginPath()
        ctx.arc(x, y, r * 3, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="beat" id="portfolio-story">
      <div className="stage stage-dark">
        <div className="canvas-wrap">
          <canvas ref={ref} />
        </div>
        <div className="scrim" />
        <div className="beat-content">
          <p className="eyebrow" data-reveal>The portfolio</p>
          <h2 data-reveal>Asset by asset, corridor by corridor.</h2>
          <p className="body" data-reveal>
            A consolidation strategy in a fragmented market: aggregating urban logistics assets
            across Western Europe&rsquo;s main corridors into an institutional portfolio.
          </p>
          <a className="beat-cta" data-reveal href="#/portfolio">Explore the portfolio &rarr;</a>
        </div>
        <div className="caption">Illustrative visual</div>
      </div>
    </section>
  )
}
