import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { processSteps } from '../data/process'
import { formatProjectNumber } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TABLET_QUERY } from '../lib/motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import SectionHeading from './ui/SectionHeading'

export default function Process() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const isTablet = useMediaQuery(TABLET_QUERY)

  // Desktop: a horizontal line draws across the steps as they enter the viewport.
  useLayoutEffect(() => {
    if (reduced || isTablet) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-process-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-process-steps]', start: 'top 80%', end: 'top 35%', scrub: 0.6 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced, isTablet])

  return (
    <section id="process" ref={root} className="section-y relative overflow-hidden" aria-labelledby="process-heading">
      <div className="container-x">
        <SectionHeading id="process-heading" index="06" label="Process" title="How I Work" align="center" />

        <div className="relative mt-20 lg:mt-28" data-process-steps>
          {/* Horizontal track (desktop) */}
          <span aria-hidden="true" className="absolute top-[11px] right-0 left-0 hidden h-px bg-white/10 lg:block" />
          <span
            aria-hidden="true"
            data-process-line
            className="absolute top-[11px] right-0 left-0 hidden h-px origin-left bg-accent lg:block"
          />

          <motion.ol
            className="grid gap-12 lg:grid-cols-4 lg:gap-8"
            variants={staggerChildren(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {processSteps.map((step) => (
              <motion.li key={step.id} variants={fadeUp} className="group relative flex gap-6 lg:block">
                {/* Node */}
                <span aria-hidden="true" className="relative mt-1 flex h-[23px] w-[23px] shrink-0 items-center justify-center lg:mt-0">
                  <span className="absolute inset-0 rounded-full border border-white/20 bg-bg transition-colors duration-500 group-hover:border-accent" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>

                <div className="lg:mt-10">
                  <span className="text-outline font-display text-6xl leading-none font-bold sm:text-7xl lg:text-8xl">
                    {formatProjectNumber(step.id)}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
