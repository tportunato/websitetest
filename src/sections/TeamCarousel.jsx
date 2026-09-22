/* The team, as a row you drag sideways.

   The cards are the SAME cards the three-up grid used - same width, same 108px
   circular portrait, same truncated bio and Read more toggle. Five members
   simply do not fit across, so the row scrolls instead of wrapping to three
   and two, which read as a team with a hole in it.

   IT IS A NATIVE SCROLLER, not a transform track. That buys momentum on a
   phone, two-finger trackpad scrolling, keyboard and scroll-snap for nothing,
   and it is the same lesson Lenis taught this repo: a hand-driven scroll rig
   fights the browser's own. Only mouse-drag is missing from the native set, so
   that is the one thing added by hand below. Lenis itself is constructed by
   Landing and destroyed on a route change, so nothing is hijacking wheel
   events on this page.

   THE VIEWPORT IS 3.18 CARDS WIDE ON PURPOSE. A sliver of the fourth card is
   what tells you the row continues; three cards fitting exactly would look
   like a grid that happens to be short. */
import { useCallback, useEffect, useRef, useState } from 'react'
import { TEAM } from '../data/team.js'
import TeamCard from './TeamCard.jsx'
import { prefersReducedMotion } from '../lib/motion.js'

export default function TeamCarousel() {
  const view = useRef(null)
  const drag = useRef(null)
  const moved = useRef(false)
  const [edge, setEdge] = useState({ l: false, r: true })
  const [thumb, setThumb] = useState({ w: 30, x: 0 })

  /* One card plus one gap: what an arrow press and a snap step are worth. */
  const stride = () => {
    const el = view.current
    if (!el) return 0
    const card = el.querySelector('.teamtrack-card')
    if (!card) return el.clientWidth
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    return card.getBoundingClientRect().width + gap
  }

  const readPosition = useCallback(() => {
    const el = view.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const frac = el.clientWidth / el.scrollWidth
    const at = max > 0 ? el.scrollLeft / max : 0
    setEdge({ l: el.scrollLeft > 2, r: el.scrollLeft < max - 2 })
    setThumb({ w: frac * 100, x: at * (100 - frac * 100) })
  }, [])

  useEffect(() => {
    const el = view.current
    if (!el) return
    readPosition()
    el.addEventListener('scroll', readPosition, { passive: true })
    window.addEventListener('resize', readPosition)
    return () => {
      el.removeEventListener('scroll', readPosition)
      window.removeEventListener('resize', readPosition)
    }
  }, [readPosition])

  const step = (d) => {
    const el = view.current
    if (!el) return
    el.scrollBy({ left: d * stride(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  /* Mouse drag. Touch is left to the browser, which already does it better.

     THE POINTER IS CAPTURED ONLY ONCE A DRAG ACTUALLY STARTS, never on
     pointerdown. Capturing up front retargets the pointerup to the scroller,
     and the click is then dispatched at the common ancestor rather than at the
     button under the cursor - which silently killed every Read more and
     LinkedIn in the row. Snapping is switched off for the same window:
     mandatory snap pulls the row back under the cursor on every frame. */
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: view.current.scrollLeft, on: false }
    moved.current = false
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.on) {
      if (Math.abs(dx) <= 4) return        /* still a click, not a drag */
      d.on = true
      moved.current = true
      view.current.style.scrollSnapType = 'none'
      view.current.setPointerCapture(e.pointerId)
    }
    view.current.scrollLeft = d.left - dx
  }

  const endDrag = (e) => {
    const d = drag.current
    if (!d) return
    drag.current = null
    if (!d.on) return
    const el = view.current
    el.style.scrollSnapType = ''          /* back to the stylesheet's mandatory snap */
    if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }

  /* A drag that ends over "Read more" must not also toggle it. The click fires
     after pointerup, so it is swallowed here rather than guarded in the card. */
  const onClickCapture = (e) => {
    if (moved.current) { e.preventDefault(); e.stopPropagation() }
    moved.current = false
  }

  return (
    <div className="teamtrack">
      <div className="teamtrack-head">
        <button className="teamcar-arrow" onClick={() => step(-1)}
                disabled={!edge.l} aria-label="Previous team members">
          <span aria-hidden="true">&larr;</span>
        </button>
        <button className="teamcar-arrow" onClick={() => step(1)}
                disabled={!edge.r} aria-label="More team members">
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div
        className={'teamtrack-view' + (edge.l ? ' fade-l' : '') + (edge.r ? ' fade-r' : '')}
        ref={view}
        tabIndex={0}
        role="group"
        aria-label="Team members, scroll sideways for more"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {TEAM.map((p) => (
          <div className="teamtrack-card" key={p.name}>
            <TeamCard person={p} />
          </div>
        ))}
      </div>

      {/* The rail is the scrollbar, drawn in the page's own hairline: the thumb
          is as wide a share of it as the viewport is of the row. */}
      <div className="teamtrack-rail" aria-hidden="true">
        <span className="teamtrack-thumb"
              style={{ width: thumb.w + '%', left: thumb.x + '%' }} />
      </div>
    </div>
  )
}
