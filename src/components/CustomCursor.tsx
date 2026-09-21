import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../lib/motion'

/**
 * Cursor modes are declared in markup with `data-cursor="view|hover|link"`.
 * Plain links and buttons automatically get the `link` treatment. State is
 * driven with DOM classes so pointer movement never re-renders React.
 */
type CursorMode = 'default' | 'link' | 'hover' | 'view'

const SIZE: Record<CursorMode, number> = { default: 12, link: 40, hover: 56, view: 88 }

export default function CustomCursor() {
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const enabled = !isTouch && !reduced

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.documentElement.classList.add('has-custom-cursor')

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' })

    let mode: CursorMode = 'default'
    let shown = false

    const setMode = (next: CursorMode) => {
      if (next === mode) return
      mode = next
      const size = SIZE[next]
      gsap.to(ring, {
        width: size,
        height: size,
        backgroundColor: next === 'view' ? 'rgba(123,97,255,0.9)' : 'rgba(255,255,255,0)',
        borderColor: next === 'default' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: next === 'default' ? 1 : 0, duration: 0.25 })
      gsap.to(label, { opacity: next === 'view' ? 1 : 0, scale: next === 'view' ? 1 : 0.6, duration: 0.25 })
    }

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return 'default'
      const tagged = target.closest<HTMLElement>('[data-cursor]')
      if (tagged) {
        const value = tagged.dataset.cursor as CursorMode | undefined
        if (value && value in SIZE) return value
      }
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) return 'link'
      return 'default'
    }

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const onOver = (e: MouseEvent) => setMode(resolveMode(e.target))
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 })
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border opacity-0 will-change-transform"
        style={{ width: SIZE.default, height: SIZE.default, borderColor: 'rgba(255,255,255,0.5)' }}
      >
        <span
          ref={labelRef}
          className="font-display text-[10px] font-semibold tracking-[0.2em] text-white opacity-0"
        >
          VIEW
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference"
      />
    </div>
  )
}
