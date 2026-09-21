import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../../animations/variants'

const components = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  figure: motion.figure,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
} as const

interface RevealProps {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
  as?: keyof typeof components
}

/** Scroll-triggered reveal using the shared variant system. */
export default function Reveal({ children, variants = fadeUp, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = components[as]
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </Component>
  )
}
