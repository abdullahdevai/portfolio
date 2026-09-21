import { motion } from 'framer-motion'
import { staggerChildren, textReveal, viewportOnce } from '../../animations/variants'

interface RevealLinesProps {
  lines: string[]
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  stagger?: number
}

/** Masked, line-by-line text reveal. */
export default function RevealLines({ lines, className, lineClassName, as = 'h2', stagger = 0.1 }: RevealLinesProps) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={staggerChildren(stagger)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {lines.map((line) => (
        <span key={line} className="line-mask">
          <motion.span className={`block ${lineClassName ?? ''}`} variants={textReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
