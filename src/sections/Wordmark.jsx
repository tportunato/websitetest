/* The DAA wordmark, drawn rather than placed.

   Swaps the <img> for an inline SVG so the logo can write itself on. The
   mechanism and the measured timing maps are in src/lib/wordmark.js — read the
   comment at the top of that file before changing anything here.

   mode:
     'mount' - draws once when it appears (the arrival veil, subpage bars)
     'hover' - draws on pointer enter (the nav, where it would be tiresome to
               watch on every route change)
     'none'  - static fill

   Under prefers-reduced-motion it is always the static fill: this is a logo,
   not content, so there is nothing to lose by holding still. */
import { useEffect, useId, useRef, useState } from 'react'
import {
  PATH_LEFT, PATH_RIGHT, BRUSH, MAP_LEFT, MAP_RIGHT, dashFor, split
} from '../lib/wordmark.js'

/* gentle ease either side of a constant middle: a pen starts and stops, but
   does not accelerate through the word */
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function Wordmark({
  mode = 'none',
  duration = 1500,
  delay = 0,
  className = 'logo-img',
  title = 'DAA Capital Partners'
}) {
  const uid = useId().replace(/:/g, '')
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const rafRef = useRef(0)
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    let mq
    try {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduced(mq.matches)
      const on = () => setReduced(mq.matches)
      mq.addEventListener('change', on)
      return () => mq.removeEventListener('change', on)
    } catch (e) {
      setReduced(true)
    }
  }, [])

  /* Paint both brushes for one overall progress value. */
  const paint = (t) => {
    const L = leftRef.current
    const R = rightRef.current
    if (!L || !R) return
    const p = split(t)
    const dl = dashFor(MAP_LEFT, p.left, L.getTotalLength(), true)
    const dr = dashFor(MAP_RIGHT, p.right, R.getTotalLength(), false)
    L.style.strokeDasharray = dl.dasharray
    L.style.strokeDashoffset = dl.dashoffset
    R.style.strokeDasharray = dr.dasharray
    R.style.strokeDashoffset = dr.dashoffset
    /* A ZERO-LENGTH DASH IS NOT NOTHING: with stroke-linecap: round it still
       paints a round cap, so both brushes left a dot on screen before their
       turn to draw. Hide each one until it actually has length. */
    L.style.opacity = p.left > 0 ? '1' : '0'
    R.style.opacity = p.right > 0 ? '1' : '0'
  }

  const run = () => {
    if (reduced) return
    cancelAnimationFrame(rafRef.current)
    /* null, not 0: a rAF timestamp of exactly 0 is legal and `!t0` would then
       re-stamp the start on every frame, freezing the draw at its first step */
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
          <path d={PATH_RIGHT} fill="#fff" />
          <path d={PATH_LEFT} fill="#fff" />
        </mask>
      </defs>
      <g mask={`url(#wm${uid})`} fill="none" stroke="currentColor"
         strokeWidth={BRUSH} strokeLinecap="round" strokeLinejoin="round">
        <path ref={leftRef} d={PATH_LEFT} />
        <path ref={rightRef} d={PATH_RIGHT} />
      </g>
    </svg>
  )
}
