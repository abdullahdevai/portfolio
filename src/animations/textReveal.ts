import { gsap } from '../lib/gsap'

/**
 * GSAP helper for the hero: slides masked lines up into view.
 * Elements are expected to be `<span class="line-mask"><span>…</span></span>`.
 */
export function textRevealTween(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    yPercent: 110,
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.1,
    ...vars,
  })
}
