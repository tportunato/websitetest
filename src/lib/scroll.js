/* The landing page drives scrolling through Lenis, so window.scrollTo fights
   it — the page jumps and Lenis keeps easing from where it thought it was.
   Landing registers its instance here; anything that needs to move the page
   goes through scrollToTop and gets the right behaviour on every route. */
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 })
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
