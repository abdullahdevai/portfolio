import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { SmoothScrollContext, type SmoothScrollContextValue } from './smoothScrollContext'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Route changes manage their own scroll position.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

    // Respect reduced motion: native scrolling, no smoothing.
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share one clock.
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const value: SmoothScrollContextValue = {
    lenis: lenisRef,
    scrollTo: (target, options) => {
      const lenis = lenisRef.current
      if (lenis) {
        // `force` lets navigation work even while the mobile menu has scrolling paused.
        lenis.scrollTo(target, { offset: options?.offset ?? 0, immediate: options?.immediate, duration: 1.4, force: true })
        return
      }
      // Fallback for reduced-motion / no Lenis.
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
      if (typeof el === 'number') window.scrollTo({ top: el })
      else el?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
