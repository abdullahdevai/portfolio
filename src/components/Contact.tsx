import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { site, socialLinks } from '../data/site'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../lib/motion'
import Reveal from './ui/Reveal'
import RevealLines from './ui/RevealLines'
import Magnetic from './ui/Magnetic'

const HEADLINE = ["Let's build", 'something', 'great.']

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const interactive = !isTouch && !reduced

  // Large soft light that trails the cursor behind the CTA.
  useEffect(() => {
    const section = root.current
    const glow = glowRef.current
    if (!section || !glow || !interactive) return

    const x = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' })
    const y = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' })
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      x(e.clientX - rect.left)
      y(e.clientY - rect.top)
    }
    const onEnter = () => gsap.to(glow, { opacity: 1, duration: 0.8 })
    const onLeave = () => gsap.to(glow, { opacity: 0.35, duration: 0.8 })

    section.addEventListener('mousemove', onMove, { passive: true })
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [interactive])

  return (
    <section id="contact" ref={root} className="section-y relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Cursor-following light */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(123,97,255,0.22),transparent)] opacity-35 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal className="flex items-center gap-4">
          <span className="font-display text-xs text-accent">07</span>
          <span className="text-label">Contact</span>
          <span className="hairline max-w-24 flex-1" aria-hidden="true" />
        </Reveal>

        <div className="mt-16 flex flex-col items-start gap-12 lg:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealLines as="h2" lines={HEADLINE} className="text-display" stagger={0.14} />
            <span id="contact-heading" className="sr-only">
              Let&apos;s build something great.
            </span>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg text-muted sm:text-xl">Have an idea, product or project in mind?</p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="shrink-0">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${site.email}`}
                data-cursor="hover"
                className="group relative inline-flex min-h-14 items-center gap-4 overflow-hidden rounded-full border border-white/20 px-8 py-5 font-display text-sm font-semibold tracking-[0.2em] uppercase transition-[border-color] duration-500 hover:border-accent sm:px-10 sm:text-base"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                <span className="relative">Start a project</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-20 lg:mt-28">
          <div className="grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-2"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-[border-color,background-color] duration-500 group-hover:border-accent/60 group-hover:bg-accent-soft">
                    <s.icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label">{s.label}</span>
                    <span className="mt-1 text-sm text-white/80 transition-colors group-hover:text-white">
                      {s.label === 'Email' ? site.email : s.href.replace(/^https?:\/\//, '')}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-muted transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availability}
          </span>
          <span>{site.location}</span>
        </Reveal>
      </div>
    </section>
  )
}
