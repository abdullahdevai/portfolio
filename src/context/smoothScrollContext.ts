import { createContext, useContext, type RefObject } from 'react'
import type Lenis from 'lenis'

export interface SmoothScrollContextValue {
  lenis: RefObject<Lenis | null>
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void
  stop: () => void
  start: () => void
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used inside SmoothScrollProvider')
  return ctx
}
