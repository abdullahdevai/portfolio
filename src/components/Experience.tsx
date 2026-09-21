import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { experience } from '../data/experience'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY } from '../lib/motion'
import { fadeUp, slideIn, staggerChildren, viewportOnce } from '../animations/variants'
import { formatProjectNumber } from '../data/projects'
import SectionHeading from './ui/SectionHeading'

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)

  // The vertical line draws itself as the user scrolls through the timeline.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" ref={root} className="section-y relative" aria-labelledby="experience-heading">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="experience-heading"
                index="04"
                label="Experience"
                title="Experience"
                description="A path from pixel-level frontend work to owning full products."
              />
            </div>
          </div>

          <div className="relative lg:col-span-7 lg:col-start-6" data-timeline>
            {/* Track + animated line */}
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10 sm:left-[9px]" />
            <span
              aria-hidden="true"
              data-timeline-line
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent sm:left-[9px]"
            />

            <motion.ol
              className="flex flex-col gap-14 lg:gap-20"
              variants={staggerChildren(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {experience.map((item) => (
                <motion.li key={item.id} variants={slideIn} className="group relative pl-10 sm:pl-14">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white/20 bg-bg transition-colors duration-500 group-hover:border-accent sm:h-[19px] sm:w-[19px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 transition-[background-color,transform] duration-500 group-hover:scale-125 group-hover:bg-accent" />
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-accent">{formatProjectNumber(item.id)}</span>
                      <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1 sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-label">{item.period}</span>
                  </div>

                  <motion.p variants={fadeUp} className="mt-4 max-w-xl leading-relaxed text-muted">
                    {item.description}
                  </motion.p>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/60" aria-label="Key technologies">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  )
}
