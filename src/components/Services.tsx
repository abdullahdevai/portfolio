import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { services } from '../data/services'
import { formatProjectNumber } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../lib/motion'
import { fadeUp, staggerChildren, viewportOnce } from '../animations/variants'
import SectionHeading from './ui/SectionHeading'

export default function Services() {
  const [active, setActive] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const showPreview = !isTouch && !reduced

  // A floating preview tile follows the cursor over the list.
  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview || !showPreview) return

    const x = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' })
    const onMove = (e: MouseEvent) => {
      const rect = list.getBoundingClientRect()
      x(e.clientX - rect.left)
      y(e.clientY - rect.top)
    }
    list.addEventListener('mousemove', onMove)
    return () => list.removeEventListener('mousemove', onMove)
  }, [showPreview])

  const activeService = services.find((s) => s.id === active)

  return (
    <section id="services" className="section-y relative" aria-labelledby="services-heading">
      <div className="container-x">
        <SectionHeading
          id="services-heading"
          index="05"
          label="Services"
          title="What I Do"
          description="From a first prototype to a production application — with motion, performance and maintainability built in."
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Hover preview */}
          {showPreview && (
            <div
              ref={previewRef}
              aria-hidden="true"
              className={`pointer-events-none absolute top-0 left-0 z-10 hidden h-44 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 transition-[opacity,scale] duration-500 ease-out-expo lg:block ${
                activeService ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
              style={{
                background: activeService
                  ? `radial-gradient(120% 120% at 20% 10%, hsl(${activeService.hue} 90% 70% / 0.55), transparent 60%), linear-gradient(160deg, hsl(${activeService.hue} 60% 14%), #0a0a0a)`
                  : undefined,
              }}
            >
              {activeService && (
                <div className="flex h-full flex-col justify-between p-5">
                  <activeService.icon className="h-6 w-6 text-white" />
                  <span className="font-display text-xs tracking-[0.2em] text-white/70 uppercase">{activeService.title}</span>
                </div>
              )}
            </div>
          )}

          <motion.ul
            ref={listRef}
            className="border-t border-white/10"
            variants={staggerChildren(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onMouseLeave={() => setActive(null)}
          >
            {services.map((service) => {
              const isActive = active === service.id
              return (
                <motion.li key={service.id} variants={fadeUp} className="border-b border-white/10">
                  <div
                    role="group"
                    onMouseEnter={() => setActive(service.id)}
                    onFocus={() => setActive(service.id)}
                    onBlur={() => setActive(null)}
                    className={`grid grid-cols-[auto_1fr_auto] items-start gap-x-5 transition-[padding,background-color] duration-500 ease-out-expo sm:gap-x-8 lg:grid-cols-[4rem_1fr_minmax(0,20rem)_3rem] ${
                      isActive ? 'bg-white/[0.02] py-9 sm:py-10' : 'py-7 sm:py-8'
                    }`}
                  >
                    <span className="pt-1.5 font-display text-sm text-accent">{formatProjectNumber(service.id)}</span>

                    <div className="min-w-0">
                      <h3 className="flex items-center gap-4">
                        <service.icon
                          aria-hidden="true"
                          className={`h-5 w-5 shrink-0 transition-[color,transform] duration-500 ${isActive ? 'rotate-[-8deg] text-accent' : 'text-muted'}`}
                        />
                        <span
                          className={`font-display text-2xl font-semibold tracking-tight transition-transform duration-500 ease-out-expo sm:text-3xl lg:text-4xl ${
                            isActive ? 'translate-x-2' : ''
                          }`}
                        >
                          {service.title}
                        </span>
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted lg:hidden">{service.description}</p>
                    </div>

                    <p
                      className={`hidden max-w-xs text-sm leading-relaxed text-muted transition-[opacity,transform] duration-500 ease-out-expo lg:block ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-60'
                      }`}
                    >
                      {service.description}
                    </p>

                    <span
                      aria-hidden="true"
                      className={`hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/15 transition-[transform,border-color,background-color] duration-500 ease-out-expo lg:flex ${
                        isActive ? 'border-accent bg-accent' : ''
                      }`}
                    >
                      <ArrowUpRight className={`h-4 w-4 transition-transform duration-500 ${isActive ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
