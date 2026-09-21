import { useState, type ReactNode } from 'react'
import { AppStateContext } from './appStateContext'

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  return (
    <AppStateContext.Provider value={{ ready, markReady: () => setReady(true) }}>{children}</AppStateContext.Provider>
  )
}
