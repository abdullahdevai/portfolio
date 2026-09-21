import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../../lib/motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
}

/** 3D tilt on hover, driven by GSAP for smoothness. Disabled on touch/reduced motion. */
export default function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const enabled = !isTouch && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rx(-py * max * 2)
      ry(px * max * 2)
    }
    const onLeave = () => {
      rx(0)
      ry(0)
    }

    gsap.set(el, { transformPerspective: 1200, transformStyle: 'preserve-3d' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, max])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
