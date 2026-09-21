import { useEffect, useRef, type RefObject } from 'react'

export interface MousePosition {
  /** Pixel coordinates. */
  x: number
  y: number
  /** Normalised to [-1, 1] across the viewport (y up). */
  nx: number
  ny: number
}

/**
 * Tracks the pointer in a ref so consumers (rAF loops, GSAP, R3F) can read the
 * latest value without triggering React re-renders on every mouse move.
 */
export function useMousePosition(enabled = true): RefObject<MousePosition> {
  const ref = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      const m = ref.current
      m.x = e.clientX
      m.y = e.clientY
      m.nx = (e.clientX / window.innerWidth) * 2 - 1
      m.ny = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  return ref
}
