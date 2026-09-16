/* Back to top. Appears once you are a screen or so down, sits clear of the
   bottom-right captions, and goes through lib/scroll so it eases with Lenis on
   the landing page instead of fighting it. */
import { useEffect, useState } from 'react'
import { scrollToTop } from '../lib/scroll.js'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={'to-top' + (show ? ' to-top--on' : '')}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V6M12 6l-6 6M12 6l6 6" />
      </svg>
    </button>
  )
}
