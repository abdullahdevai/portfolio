import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { about } from '../data/about'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY } from '../lib/motion'
import { EASE_OUT } from '../animations/variants'
import TiltCard from './ui/TiltCard'

const INTERVAL = 2200

/** Floating glass panel that cycles through technology names. */
export default function TechPanel() {
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const [index, setIndex] = useState(0)
  const items = about.rotatingTechnologies

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => clearInterval(id)
  }, [items.length, reduced])

  return (
    <TiltCard max={5} className="relative">
      <div className="animate-float-y">
        <div className="glass relative overflow-hidden rounded-2xl p-7 sm:p-9">
          <div aria-hidden="true" className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative">
            <span className="text-label">Developer / Designer</span>
            <div className="mt-6 h-[1.15em] overflow-hidden font-display text-4xl font-semibold tracking-tight sm:text-5xl" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={items[index]}
                  className="block"
                  initial={reduced ? false : { y: '110%', rotateX: -40, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  exit={{ y: '-110%', rotateX: 40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  {items[index]}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies">
              {items.map((item, i) => (
                <li
                  key={item}
                  className={`text-xs transition-colors duration-500 ${i === index ? 'text-white' : 'text-muted/60'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <span aria-hidden="true" className="absolute right-6 bottom-6 font-display text-[11px] tracking-[0.3em] text-muted/50">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
