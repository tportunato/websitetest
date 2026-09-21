/* The DAA wordmark, drawn rather than placed.

   Inline SVG so the logo can write itself on, in the order the mark is built:
   down the D's stem, round to close the D, out along the bottom of the first
   A, round the second A, then back along the top of the first A. Phases may
   overlap in time, so each one is positioned by its own start/end window
   rather than by a running total. The mechanism, the phase list and the
   measured timing maps live in src/lib/wordmark.js — read the comment at the
   top of that file before changing anything here.

   mode:
     'mount' - draws once when it appears (the arrival veil, subpage bars)
     'hover' - draws on pointer enter (the nav, where watching it on every
               route change would wear thin)
     'none'  - static fill

   Under prefers-reduced-motion it is always the static fill: this is a logo,
   not content, so nothing is lost by holding still. */
import { useEffect, useId, useRef, useState } from 'react'
import { FILL_A, FILL_B, BRUSH, CAP, PHASES, phaseDash } from '../lib/wordmark.js'

/* gentle ease either side of a constant middle: a pen starts and stops, but
   does not accelerate through the word */
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function Wordmark({
  mode = 'none',
  duration = 2200,
  delay = 0,
  className = 'logo-img',
  title = 'DAA Capital Partners'
}) {
  const uid = useId().replace(/:/g, '')
  const strokes = useRef([])
  const rafRef = useRef(0)
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduced(mq.matches)
      const on = () => setReduced(mq.matches)
      mq.addEventListener('change', on)
      return () => mq.removeEventListener('change', on)
    } catch (e) {
      setReduced(true)
    }
  }, [])

  const paint = (t) => {
    PHASES.forEach((_, i) => {
      const el = strokes.current[i]
      if (!el) return
      const d = phaseDash(i, t, el.getTotalLength())
      el.style.strokeDasharray = d.dasharray
      el.style.strokeDashoffset = d.dashoffset
      el.style.opacity = d.visible ? '1' : '0'
    })
  }

  const run = () => {
    if (reduced) return
    cancelAnimationFrame(rafRef.current)
    /* null, not 0: a rAF timestamp of exactly 0 is legal, and `!t0` would then
       re-stamp the start every frame and freeze the draw at its first step */
    let t0 = null
    const tick = (now) => {
      if (t0 === null) t0 = now
      const elapsed = now - t0 - delay
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(tick); return }
      const t = Math.min(1, elapsed / duration)
      paint(ease(t))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    paint(0)
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (reduced || mode === 'none') { paint(1); return }
    if (mode === 'mount') run()
    else paint(1)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, mode])

  const hover = mode === 'hover' ? { onMouseEnter: run } : {}

  return (
    <svg
      className={className}
      viewBox="0 0 127 52"
      role="img"
      aria-label={title}
      preserveAspectRatio="xMinYMid meet"
      {...hover}
    >
      <defs>
        <mask id={`wm${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width="127" height="52">
          <path d={FILL_A} fill="#fff" />
          <path d={FILL_B} fill="#fff" />
        </mask>
      </defs>
      <g mask={`url(#wm${uid})`} fill="none" stroke="currentColor"
         strokeWidth={BRUSH} strokeLinecap={CAP} strokeLinejoin="round">
        {/* per-phase brush: the second A's inner edge curves tighter than 7.6
            reaches from the side the pen travels - see wordmark.js */}
        {PHASES.map((ph, i) => (
          <path key={i} ref={(el) => { strokes.current[i] = el }} d={ph.d}
                strokeWidth={ph.brush} />
        ))}
      </g>
    </svg>
  )
}
