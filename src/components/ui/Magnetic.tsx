import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../../lib/motion'

interface MagneticProps {
  children: ReactNode
  /** How far the element follows the cursor (0–1). */
  strength?: number
  className?: string
}

/** Wraps an element so it gently pulls toward the cursor while hovered. */
export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const enabled = !isTouch && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      xTo(dx * strength)
      yTo(dy * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, strength])

  return (
    <div ref={ref} className={className ?? 'inline-block'}>
      {children}
    </div>
  )
}
