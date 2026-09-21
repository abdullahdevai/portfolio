import { useSyncExternalStore } from 'react'

const subscribe = (query: string) => (callback: () => void) => {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

/** Reactive `matchMedia` without extra state or effects. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  )
}
