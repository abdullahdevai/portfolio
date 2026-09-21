import type { Variants } from 'framer-motion'
import { EASE_OUT } from './variants'

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4, ease: 'easeIn' } },
}
