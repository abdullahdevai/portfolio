import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { about } from '../data/about'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TABLET_QUERY } from '../lib/motion'
import { fadeIn } from '../animations/variants'
import Reveal from './ui/Reveal'
import RevealLines from './ui/RevealLines'
import TechPanel from './TechPanel'

const STATEMENT_LINES = ['I build interfaces', 'where design, technology', 'and motion come together.']

export default function About() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const isTablet = useMediaQuery(TABLET_QUERY)

  // Parallax the panel against the copy on larger screens.
  useLayoutEffect(() => {
    if (reduced || isTablet) return
    const ctx = gsap.context(() => {
      gsap.to('[data-about-panel]', {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
      gsap.to('[data-about-word]', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced, isTablet])

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

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <RevealLines as="p" lines={STATEMENT_LINES} className="text-statement max-w-4xl" stagger={0.12} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-4">
            <div data-about-panel className="lg:-mt-24">
              <Reveal variants={fadeIn} delay={0.2}>
                <TechPanel />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-2 lg:row-start-2 lg:mt-16">
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
