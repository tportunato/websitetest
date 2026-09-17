/* The landing page drives scrolling through Lenis, so window.scrollTo fights
   it — the page jumps and Lenis keeps easing from where it thought it was.
   Landing registers its instance here; anything that needs to move the page
   goes through these helpers and gets the right behaviour on every route. */
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

function reduced() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (e) {
    return false
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: reduced() ? 0 : 1.1 })
    return
  }
  window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })
}

/* In-page anchors (#market, #news, ...). The header is fixed and overlaps the
   top of whatever we land on, so every target is offset by its height.

   This exists because App used to call window.scrollTo(0, 0) on EVERY
   hashchange, including in-page ones: clicking Market or News threw you to the
   top of the page instead of to the section, and did it by the one mechanism
   CLAUDE.md warns fights Lenis. */
export function scrollToHash(hash) {
  if (!hash || hash.startsWith('#/') || hash === '#') return false
  let el = null
  try {
    el = document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch (e) {
    return false
  }
  if (!el) return false

  const bar = document.querySelector('.nav, .page-bar')
  const offset = bar ? -bar.offsetHeight : 0

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: reduced() ? 0 : 1.2 })
  } else {
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top: y, behavior: reduced() ? 'auto' : 'smooth' })
  }
  return true
}
