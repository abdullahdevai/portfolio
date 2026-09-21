export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const TOUCH_QUERY = '(hover: none), (pointer: coarse)'
export const MOBILE_QUERY = '(max-width: 767px)'
export const TABLET_QUERY = '(max-width: 1023px)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches

export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia(TOUCH_QUERY).matches
