/* The team, one member at a time.

   EVERY SLIDE IS IN THE DOM AT ONCE, stacked in a single grid cell. Two
   reasons, both of which bit the obvious implementations first:

   - The stage then measures the TALLEST bio, so moving between Tomaso's three
     lines and Dominique's eight does not resize the page under the reader's
     cursor. Absolutely positioning the slides would have hidden them from the
     height the same way it hides them from the flow.
   - It makes the fade a real crossfade rather than a swap: the outgoing member
     is still there to fade out of.

   The two fades are STAGGERED, not simultaneous. Run together, both slides sit
   near half opacity in the middle of the transition and the two faces ghost
   over each other. The outgoing one leaves first and the incoming one waits
   for it, which is also what "in and out" describes.

   An inactive slide is hidden THREE ways - opacity, visibility and
   pointer-events. Opacity alone leaves a full-size layer over the live one
   swallowing every click, which is the same bug the mobile nav panel shipped
   with. */
import { useCallback, useEffect, useRef, useState } from 'react'
import { TEAM } from '../data/team.js'

const pad = (n) => String(n).padStart(2, '0')

export default function TeamCarousel() {
  const [i, setI] = useState(0)
  const stage = useRef(null)
  const touch = useRef(null)

  const go = useCallback((n) => setI((n + TEAM.length) % TEAM.length), [])
  const step = useCallback((d) => setI((c) => (c + d + TEAM.length) % TEAM.length), [])

  /* Arrow keys, but only while the carousel itself has focus: capturing them
     on the document would fight the page scroll. */
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
  }

  /* Swipe. Without it the arrows are the only way through on a phone, where
     a row of five faces is exactly the thing a thumb expects to drag. */
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const start = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
    const end = (e) => {
      const s = touch.current
      if (!s) return
      touch.current = null
      const dx = e.changedTouches[0].clientX - s.x
      const dy = e.changedTouches[0].clientY - s.y
      /* Horizontal intent only: a mostly-vertical drag is the reader scrolling
         the page past the carousel, not turning it. */
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1)
    }
    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', end, { passive: true })
    return () => { el.removeEventListener('touchstart', start); el.removeEventListener('touchend', end) }
  }, [step])

  return (
    <div
      className="teamcar"
      role="group"
      aria-roledescription="carousel"
      aria-label="Team"
      tabIndex={0}
      onKeyDown={onKey}
    >
      {/* No eyebrow here. The section's own hero says "Team" a screen above,
          and repeating it over the controls just puts the word on the page
          twice. The controls carry the hairline on their own. */}
      <div className="teamcar-head">
        <div className="teamcar-controls">
          <button className="teamcar-arrow" onClick={() => step(-1)} aria-label="Previous team member">
            <span aria-hidden="true">&larr;</span>
          </button>
          <p className="teamcar-count">
            <span className="teamcar-count-now">{pad(i + 1)}</span>
            <span className="teamcar-count-sep">/</span>
            {pad(TEAM.length)}
          </p>
          <button className="teamcar-arrow" onClick={() => step(1)} aria-label="Next team member">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div className="teamcar-stage" ref={stage}>
        {TEAM.map((p, n) => {
          const on = n === i
          return (
            <article
              className={'teamcar-slide' + (on ? ' is-on' : '')}
              key={p.name}
              aria-hidden={!on}
            >
              <div className="teamcar-portrait">
                <img src={p.img} alt={p.name} loading={n === 0 ? 'eager' : 'lazy'} />
              </div>
              <div className="teamcar-copy">
                <h3 className="teamcar-name">{p.name}</h3>
                <p className="team-role">{p.role}</p>
                <p className="teamcar-bio">{p.bio}</p>
                {p.linkedin && (
                  <a className="team-li" href={p.linkedin} target="_blank" rel="noreferrer" tabIndex={on ? 0 : -1}>
                    LinkedIn
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* A rail of five ticks rather than dots: the same hairline the rest of
          the page is ruled with, and it reads as a position in a sequence
          instead of decoration. */}
      <div className="teamcar-rail">
        {TEAM.map((p, n) => (
          <button
            key={p.name}
            className={'teamcar-tick' + (n === i ? ' is-on' : '')}
            onClick={() => go(n)}
            aria-label={p.name}
            aria-current={n === i}
          >
            <span className="teamcar-tick-name">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
