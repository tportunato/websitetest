/* Single source of truth for the motion preference. Honoured by the scroll rig,
   the scrub-linked tweens and the canvas beats, so that "reduce" means the
   whole page settles rather than just the intro veil and the scroll cue. */
export function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (e) {
    return false
  }
}

/* Touch devices scroll natively and smoothly already. Lenis drives the scroll
   position from a rAF loop, and on a phone that fights the browser's own
   momentum and rubber-banding: the page stalls, overshoots, or refuses to move.
   It is a wheel-smoothing tool, so it is only constructed for a mouse. */
export function isTouchDevice() {
  try {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches
  } catch (e) {
    return false
  }
}
