import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills, type Skill } from '../data/skills'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TABLET_QUERY } from '../lib/motion'
import { EASE_OUT, scaleIn, staggerChildren, viewportOnce } from '../animations/variants'
import Reveal from './ui/Reveal'

const DEFAULT_COPY = 'Hover a technology to see how I use it.'

interface PillProps {
  skill: Skill
  active: boolean
  floating: boolean
  onActivate: (skill: Skill | null) => void
  style?: React.CSSProperties
  className?: string
}

function Pill({ skill, active, floating, onActivate, style, className = '' }: PillProps) {
  const Icon = skill.icon
  return (
    <motion.li variants={scaleIn} style={style} className={className}>
      <button
        type="button"
        onMouseEnter={() => onActivate(skill)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(skill)}
        onBlur={() => onActivate(null)}
        aria-describedby="tech-description"
        className={`group relative flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-display text-sm font-medium whitespace-nowrap transition-[translate,scale,border-color,background-color,box-shadow] duration-500 ease-out-expo ${
          floating ? 'animate-float-y' : ''
        } ${
          active
            ? 'z-10 -translate-y-1 scale-105 border-accent/60 bg-accent-soft shadow-[0_0_40px_rgba(123,97,255,0.25)]'
            : 'border-white/10 bg-card/70 hover:border-white/25'
        }`}
        // Individual delays keep the pills from bobbing in sync.
        style={{ animationDelay: `${skill.delay}s` }}
      >
        <span
          className={`grid place-items-center overflow-hidden transition-[width,opacity] duration-500 ease-out-expo ${
            active ? 'w-4 opacity-100' : 'w-0 opacity-0'
          }`}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4 text-accent" />
        </span>
        {skill.name}
      </button>
    </motion.li>
  )
}

export default function TechStack() {
  const [active, setActive] = useState<Skill | null>(null)
  const isTablet = useMediaQuery(TABLET_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const floating = !reduced && !isTablet

  return (
    <section id="stack" className="section-y relative" aria-labelledby="stack-heading">
      <div className="container-x">
        <Reveal className="flex items-center gap-4">
          <span className="font-display text-xs text-accent">02</span>
          <span className="text-label">Technology</span>
          <span className="hairline max-w-24 flex-1" aria-hidden="true" />
        </Reveal>

        <div className="relative mt-10 lg:mt-0 lg:min-h-[44rem]">
          {/* Orbit guides (desktop) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <span className="absolute h-[30rem] w-[52rem] rounded-full border border-white/[0.05]" />
            <span className="absolute h-[40rem] w-[76rem] rounded-full border border-white/[0.04]" />
          </div>
          {/* Center: heading + live description */}
          <div className="relative z-10 flex flex-col items-center text-center lg:absolute lg:inset-0 lg:justify-center">
            <Reveal>
              <h2 id="stack-heading" className="text-display-md">
                Tech Stack
              </h2>
            </Reveal>
            <div id="tech-description" className="mt-6 min-h-[3.5rem] max-w-sm" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active?.name ?? 'default'}
                  className={`text-sm leading-relaxed sm:text-base ${active ? 'text-white' : 'text-muted'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  {active ? (
                    <>
                      <span className="mr-2 font-display text-accent">{active.name}</span>
                      {active.description}
                    </>
                  ) : (
                    DEFAULT_COPY
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: pills scattered around the center. Tablet/mobile: wrapped grid. */}
          <motion.ul
            variants={staggerChildren(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mt-10 flex flex-wrap justify-center gap-3 lg:absolute lg:inset-0 lg:mt-0 lg:block"
            aria-label="Technologies"
          >
            {skills.map((skill) => (
              <Pill
                key={skill.name}
                skill={skill}
                active={active?.name === skill.name}
                floating={floating}
                onActivate={setActive}
                className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2"
                style={isTablet ? undefined : { left: `${skill.position.x}%`, top: `${skill.position.y}%` }}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
