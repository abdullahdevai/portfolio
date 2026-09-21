import { createContext, useContext } from 'react'

export interface AppState {
  /** True once the loader has finished and the intro sequence may start. */
  ready: boolean
  markReady: () => void
}

export const AppStateContext = createContext<AppState | null>(null)

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
