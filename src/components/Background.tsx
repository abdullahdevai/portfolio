import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { MOBILE_QUERY, REDUCED_MOTION_QUERY } from '../lib/motion'

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

/**
 * Fixed page background: slow radial light drift, a faint grid, film grain and
 * a tiny 2D particle field. Everything is GPU-composited or cheap enough to
 * run continuously; the particle loop pauses when the tab is hidden.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const count = isMobile ? 18 : 48
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let raf = 0
    let running = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.12,
        r: 0.6 + Math.random() * 1.2,
        a: 0.15 + Math.random() * 0.35,
      }))
    }

    const frame = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        if (p.x < -4) p.x = width + 4
        else if (p.x > width + 4) p.x = -4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 195, 255, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) raf = requestAnimationFrame(frame)
      else cancelAnimationFrame(raf)
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [isMobile, reduced])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Moving light sources */}
      <div className="animate-drift-a absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(123,97,255,0.16),transparent)] blur-3xl" />
      <div className="animate-drift-b absolute -right-[15%] -bottom-[25%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(56,120,255,0.1),transparent)] blur-3xl" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Particles */}
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0" />}

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.045] mix-blend-overlay" style={{ backgroundImage: NOISE_SVG }} />
    </div>
  )
}
