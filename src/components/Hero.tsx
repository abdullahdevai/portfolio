import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useAppState } from '../context/appStateContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useMousePosition } from '../hooks/useMousePosition'
import { useSectionNavigation } from '../hooks/useSectionNavigation'
import { MOBILE_QUERY, REDUCED_MOTION_QUERY, TOUCH_QUERY } from '../lib/motion'
import { isWebGLAvailable } from '../lib/webgl'
import { textRevealTween } from '../animations/textReveal'
import Button from './ui/Button'
import ErrorBoundary from './ErrorBoundary'
import HeroFallback from './HeroFallback'

const HeroScene = lazy(() => import('./HeroScene'))

const HEADLINE = ['Building', 'Digital', 'Experiences']

export default function Hero() {
  const { ready } = useAppState()
  const goTo = useSectionNavigation()
  const root = useRef<HTMLElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const mouse = useMousePosition(!isTouch)
  const webgl = isWebGLAvailable()

  // Build the intro paused so initial states are applied before first paint,
  // then play it when the loader hands off.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-bg]', { opacity: 0, duration: 1 }, 0)
        .from('[data-hero-label]', { opacity: 0, y: 12, duration: 0.7 }, 0.35)
        .add(textRevealTween('[data-hero-line] > span', { duration: 1.2 }), 0.45)
        .from('[data-hero-desc]', { opacity: 0, y: 24, duration: 0.9 }, 0.95)
        .from('[data-hero-cta]', { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 }, 1.1)
        .from('[data-hero-scene]', { opacity: 0, scale: 0.92, duration: 1.4, ease: 'power2.out' }, 0.5)
        .from('[data-hero-scroll]', { opacity: 0, y: 10, duration: 0.7 }, 1.5)
      timeline.current = tl
    }, root)
    return () => {
      ctx.revert()
      timeline.current = null
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (ready) timeline.current?.play()
  }, [ready])

  const sceneActive = ready || reduced

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh items-end overflow-hidden pt-28 pb-24 md:items-center md:pt-24 md:pb-20"
      aria-label="Introduction"
    >
      {/* Local light so the hero feels lit from behind the orb */}
      <div
        data-hero-bg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_45%,rgba(123,97,255,0.18),transparent_70%)]"
      />

      {/* 3D scene: right half on desktop, dimmed backdrop behind the text on mobile */}
      <div
        data-hero-scene
        className="pointer-events-none absolute inset-x-0 top-0 h-[58%] w-full opacity-90 md:pointer-events-auto md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-[58%] md:opacity-100 lg:w-[55%]"
        aria-hidden="true"
      >
        <div className="h-full w-full md:translate-x-[4%]">
          {webgl ? (
            <ErrorBoundary fallback={<HeroFallback />}>
              <Suspense fallback={null}>
                <HeroScene mouse={mouse} quality={isMobile ? 'low' : 'high'} animate={!reduced} active={sceneActive} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <HeroFallback />
          )}
        </div>
        {/* Keep text readable when the scene sits behind it on small screens */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(5,5,5,0.9),transparent)] md:hidden" />
      </div>

      <div className="container-x relative z-10">
        <div className="max-w-3xl pt-[42svh] md:pt-0 lg:max-w-4xl">
          <p data-hero-label className="text-label mb-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Backend-focused Full-Stack Developer
          </p>

          <h1 className="text-display">
            {HEADLINE.map((line, i) => (
              <span key={line} data-hero-line className="line-mask">
                <span className={`block ${i === HEADLINE.length - 1 ? 'text-outline' : ''}`}>{line}</span>
              </span>
            ))}
          </h1>

          <p data-hero-desc className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            I design and build modern web applications — from Laravel APIs to Vue, Nuxt, React and Next.js frontends —
            with a strong focus on performance and user experience.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <span data-hero-cta className="inline-block">
              <Button onClick={() => goTo('work')}>View My Work</Button>
            </span>
            <span data-hero-cta className="inline-block">
              <Button variant="ghost" onClick={() => goTo('contact')}>
                Contact Me
              </Button>
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-hero-scroll
        onClick={() => goTo('work')}
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-label whitespace-nowrap transition-colors hover:text-white sm:left-auto sm:right-[clamp(1.25rem,4vw,4rem)] sm:translate-x-0"
        aria-label="Scroll to explore"
      >
        <span>Scroll to explore</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
          <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 animate-arrow-down" />
        </span>
      </button>
    </section>
  )
}
