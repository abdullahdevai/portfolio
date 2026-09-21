import type { Variants, Transition } from 'framer-motion'

/**
 * Shared Framer Motion variants. Every scroll reveal in the site uses one of
 * these so timing and easing stay consistent. The `visible` state accepts a
 * `custom` delay (seconds) so parents can sequence children without new variants.
 */

export const EASE_OUT: Transition['ease'] = [0.16, 1, 0.3, 1]

const base: Transition = { duration: 0.9, ease: EASE_OUT }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { ...base, delay } }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: { duration: 1.1, ease: 'easeOut', delay } }),
}

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({ opacity: 1, x: 0, transition: { ...base, delay } }),
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({ opacity: 1, x: 0, transition: { ...base, delay } }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({ opacity: 1, scale: 1, transition: { duration: 1, ease: EASE_OUT, delay } }),
}

/** Masked line reveal — pair with an `overflow-hidden` parent. */
export const textReveal: Variants = {
  hidden: { y: '110%' },
  visible: (delay: number = 0) => ({ y: 0, transition: { duration: 1, ease: EASE_OUT, delay } }),
}

/** Image reveal — clip from the bottom while the image settles from a slight zoom. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', scale: 1.08 },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0% 0 0 0)',
    scale: 1,
    transition: { duration: 1.2, ease: EASE_OUT, delay },
  }),
}

export const staggerChildren = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** Default viewport config: trigger once, slightly before the element is fully visible. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
