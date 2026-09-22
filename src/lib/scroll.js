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

/* The Back to top button: an eased ride up the page the reader asked for. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: reduced() ? 0 : 1.1 })
    return
  }
  window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })
}

/* Opening a new page. This must be INSTANT, and it is deliberately not the
   function above.

   Navigating used to call scrollToTop() from the hashchange handler, which
   failed twice over: it ran before React had rendered the new page, so it
   scrolled the old one; and on the landing page it started a 1.1s Lenis
   animation on an instance that Landing destroys a moment later when it
   unmounts, killing the scroll in flight. Clicking through to Strategy left you
   halfway down the new page.

   A new page has no relationship to where the reader was, so there is nothing
   to animate between. Jump. */
export function jumpToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  } catch (e) {
    window.scrollTo(0, 0)
  }
}

/* In-page anchors (#market, #news, ...). The header is fixed and overlaps the
   top of whatever we land on, so every target is offset by its height.

   This exists because App used to call window.scrollTo(0, 0) on EVERY
   hashchange, including in-page ones: clicking Market or News threw you to the
   top of the page instead of to the section, and did it by the one mechanism
   CLAUDE.md warns fights Lenis. */
export function scrollToHash(hash) {
  if (!hash || hash.startsWith('#/') || hash === '#') return false
  let id = null
  try {
    id = decodeURIComponent(hash.slice(1))
  } catch (e) {
    return false
  }
  return goToSection(id)
}

/* Move the page to a section by id, with the fixed header taken off the top.

   `instant` is the difference between arriving and moving. The About page
   gathers Vision & Mission, Sustainability and Leadership, and each still has
   its own URL: coming to one of those from another page is a page opening, so
   it jumps, exactly as jumpToTop does and for the same reason. Clicking
   between them while already on About is an in-page anchor, so it eases.
   App.jsx decides which; this only carries it out. */
export function goToSection(id, { instant = false } = {}) {
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false

  const bar = document.querySelector('.nav, .page-bar')
  const offset = bar ? -bar.offsetHeight : 0

  if (lenis) {
    lenis.scrollTo(el, instant ? { offset, immediate: true }
                               : { offset, duration: reduced() ? 0 : 1.2 })
    return true
  }
  const y = el.getBoundingClientRect().top + window.pageYOffset + offset
  window.scrollTo({ top: y, behavior: instant || reduced() ? 'auto' : 'smooth' })
  return true
}
