import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { about } from '../data/about'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY } from '../lib/motion'
import { fadeIn } from '../animations/variants'
import Reveal from './ui/Reveal'
import RevealLines from './ui/RevealLines'
import TechPanel from './TechPanel'
import Portrait from './Portrait'

const STATEMENT_LINES = ['I build interfaces', 'where design, technology', 'and motion come together.']

export default function About() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  // The overlapping portrait/panel composition only exists from the xl breakpoint up.
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  // Portrait and panel drift at different speeds against the copy on large screens.
  useLayoutEffect(() => {
    if (reduced || !isDesktop) return
    const ctx = gsap.context(() => {
      const trigger = { trigger: root.current, start: 'top bottom', end: 'bottom top' }
      gsap.to('[data-about-portrait]', { y: -60, ease: 'none', scrollTrigger: { ...trigger, scrub: 1.2 } })
      gsap.to('[data-about-panel]', { y: -70, ease: 'none', scrollTrigger: { ...trigger, scrub: 1 } })
      gsap.to('[data-about-word]', { xPercent: -12, ease: 'none', scrollTrigger: { ...trigger, scrub: 1.5 } })
    }, root)
    return () => ctx.revert()
  }, [reduced, isDesktop])

  useLayoutEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <section id="about" ref={root} className="section-y relative overflow-hidden" aria-labelledby="about-heading">
      {/* Oversized background word */}
      <span
        data-about-word
        aria-hidden="true"
        className="text-outline pointer-events-none absolute top-8 -right-[4%] font-display text-[26vw] leading-none font-bold whitespace-nowrap select-none opacity-40"
      >
        ABOUT
      </span>

      <div className="container-x relative">
        <Reveal className="flex items-center gap-4">
          <span className="font-display text-xs text-accent">01</span>
          <h2 id="about-heading" className="text-label">
            About
          </h2>
          <span className="hairline max-w-24 flex-1" aria-hidden="true" />
        </Reveal>

        <div className="mt-12">
          <RevealLines as="p" lines={STATEMENT_LINES} className="text-statement max-w-4xl" stagger={0.12} />
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Portrait with the tech panel overlapping its lower-right corner */}
          <div className="relative lg:col-span-5 lg:col-start-1">
            <div data-about-portrait className="xl:pr-12">
              <Portrait />
            </div>
            <div
              data-about-panel
              className="mt-6 xl:absolute xl:-right-56 xl:-bottom-12 xl:mt-0 xl:w-[24rem]"
            >
              <Reveal variants={fadeIn} delay={0.25}>
                <TechPanel />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8 xl:col-span-5 xl:col-start-8">
            <div className="flex flex-col gap-6">
              {about.paragraphs.map((text, i) => (
                <Reveal key={text} delay={i * 0.1}>
                  <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-12">
              <dl className="grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-label">{fact.label}</dt>
                    <dd className="mt-2 font-display text-lg font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
