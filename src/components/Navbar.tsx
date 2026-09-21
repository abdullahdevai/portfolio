import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { navLinks, site, socialLinks } from '../data/site'
import { useAppState } from '../context/appStateContext'
import { useSmoothScroll } from '../context/smoothScrollContext'
import { useSectionNavigation } from '../hooks/useSectionNavigation'
import { EASE_OUT } from '../animations/variants'
import Magnetic from './ui/Magnetic'

const SCROLL_THRESHOLD = 40

export default function Navbar() {
  const { ready } = useAppState()
  const { stop, start } = useSmoothScroll()
  const goTo = useSectionNavigation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll and manage focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    stop()
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => firstLinkRef.current?.focus(), 350)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      start()
      toggle?.focus()
    }
  }, [open, stop, start])

  const handleNav = (hash: string) => {
    setOpen(false)
    // Let the menu unlock scrolling before the page moves.
    requestAnimationFrame(() => goTo(hash))
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
      >
        <nav
          aria-label="Primary"
          className={`glass flex w-full max-w-6xl items-center justify-between rounded-full transition-[padding,background-color] duration-500 ease-out-expo ${
            scrolled ? 'px-4 py-2 sm:px-5' : 'px-5 py-3 sm:px-7'
          }`}
        >
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight"
            aria-label={`${site.name} — home`}
            onClick={(e) => {
              setOpen(false)
              if (location.pathname === '/') {
                e.preventDefault()
                goTo('top')
              }
            }}
          >
            {site.initials}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <button
                  type="button"
                  onClick={() => handleNav(link.hash)}
                  className="group relative rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:text-white"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 ease-out-expo group-hover:w-4"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                Let&apos;s Talk
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <button
              ref={toggleRef}
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : '-translate-y-[3px]'}`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-out-expo ${open ? '-rotate-45' : 'translate-y-[3px]'}`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pt-28 pb-10 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.hash}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.06 }}
                >
                  <button
                    ref={i === 0 ? firstLinkRef : undefined}
                    type="button"
                    onClick={() => handleNav(link.hash)}
                    className="flex w-full items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-display text-xs text-accent">0{i + 1}</span>
                    <span className="font-display text-5xl font-bold tracking-tight uppercase">{link.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-auto flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="hairline" aria-hidden="true" />
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-sm font-semibold text-black"
              >
                Let&apos;s Talk <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
