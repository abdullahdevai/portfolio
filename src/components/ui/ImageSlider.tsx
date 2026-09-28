import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { REDUCED_MOTION_QUERY } from '../../lib/motion'
import { EASE_OUT } from '../../animations/variants'
import ProjectImage from './ProjectImage'

export interface SlideItem {
  /** Base image path without extension. */
  src: string
  caption?: string
}

interface ImageSliderProps {
  slides: SlideItem[]
  /** Used for alt text and the accessible label. */
  label: string
  className?: string
}

interface DotsProps {
  slides: SlideItem[]
  index: number
  go: (next: number, dir: number) => void
  className?: string
}

function Dots({ slides, index, go, className = '' }: DotsProps) {
  return (
    <div className={`items-center gap-2 ${className}`}>
      {slides.map((s, i) => (
        <button
          key={s.src}
          type="button"
          onClick={() => go(i, i > index ? 1 : -1)}
          aria-label={`Go to screen ${i + 1}`}
          aria-current={i === index}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo ${
            i === index ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Case-study image slider: drag or arrow keys to move, dots to jump. Slides
 * cross-fade with a slight horizontal offset in the direction of travel; with
 * reduced motion the change is instant.
 */
export default function ImageSlider({ slides, label, className = '' }: ImageSliderProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const regionRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const count = slides.length

  const go = useCallback(
    (next: number, dir: number) => setState([((next % count) + count) % count, dir]),
    [count],
  )

  // Arrow keys work whenever the slider (or anything inside it) has focus.
  useEffect(() => {
    const el = regionRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, -1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, 1) }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [go, index])

  if (count === 0) return null

  const slide = slides[index]
  const offset = reduced ? 0 : 48

  return (
    <div
      ref={regionRef}
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} screens`}
      tabIndex={-1}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card">
        <div className="relative aspect-[16/10]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={slide.src}
              className="absolute inset-0"
              custom={direction}
              initial={{ opacity: 0, x: direction * offset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -offset }}
              transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              drag={reduced ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              // Vertical scrolling must still pass through on touch.
              style={{ touchAction: 'pan-y' }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(index + 1, 1)
                else if (info.offset.x > 60) go(index - 1, -1)
              }}
            >
              <ProjectImage
                src={slide.src}
                alt={`${label} — screen ${index + 1} of ${count}${slide.caption ? `: ${slide.caption}` : ''}`}
                className="h-full w-full object-cover select-none"
                sizes="(min-width: 1024px) 80vw, 100vw"
                draggable={false}
              />
            </motion.figure>
          </AnimatePresence>

          {/* Counter */}
          <span className="pointer-events-none absolute top-4 right-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-display text-[11px] tracking-[0.2em] backdrop-blur">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>

        {/* Live region so screen readers hear the slide change */}
        <span aria-live="polite" className="sr-only">
          {slide.caption ?? `Screen ${index + 1} of ${count}`}
        </span>
      </div>

      {/*
        Controls. One row on mobile (arrows + dots), with the caption below.
        From `sm` the caption sits between them. Order is CSS-only so the dots
        exist once in the DOM and the accessibility tree.
      */}
      <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 sm:grid-cols-[auto_1fr_auto] sm:gap-x-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Previous screen"
            aria-controls={id}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-white/5"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Next screen"
            aria-controls={id}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-white/5"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <Dots slides={slides} index={index} go={go} className="flex justify-end sm:order-3" />

        {slide.caption && (
          <p className="col-span-2 text-sm text-muted sm:col-span-1 sm:order-2">{slide.caption}</p>
        )}
      </div>
    </div>
  )
}
