import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'
import { EASE_OUT } from '../animations/variants'

const MIN_DURATION = 900

interface LoaderProps {
  onComplete: () => void
}

/**
 * Minimal intro screen. Waits for web fonts (so the hero type doesn't reflow)
 * and a short minimum so the transition reads as intentional, then hands off.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const start = performance.now()
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const timeout = new Promise((r) => setTimeout(r, 2500))

    Promise.race([fonts, timeout]).then(() => {
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start))
      setTimeout(() => {
        if (!cancelled) setDone(true)
      }, wait)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE_OUT } }}
          aria-label="Loading"
          role="status"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
            >
              <img src="/images/logo-128.png" alt="" width={128} height={128} className="h-16 w-16 rounded-full" />
              <span className="font-display text-2xl font-bold tracking-tight">
                {site.initials}
                <span className="text-accent">.</span>
              </span>
            </motion.div>
            <span className="relative h-px w-24 overflow-hidden bg-white/10" aria-hidden="true">
              <motion.span
                className="absolute inset-y-0 left-0 w-full bg-accent"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: MIN_DURATION / 1000, ease: 'easeInOut' }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
