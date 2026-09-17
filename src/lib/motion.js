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
