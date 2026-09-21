import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'
import { useSmoothScroll } from '../context/smoothScrollContext'
import type { ScrollState } from '../hooks/useSectionNavigation'
import Hero from '../components/Hero'
import About from '../components/About'
import TechStack from '../components/TechStack'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Services from '../components/Services'
import Process from '../components/Process'
import Contact from '../components/Contact'

/** Document-space top of an element, independent of any CSS transforms in flight. */
const layoutTop = (el: HTMLElement) => {
  let top = 0
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop
  return top
}

export default function Home() {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()

  // Arriving from another route with a section target: jump there once mounted.
  useLayoutEffect(() => {
    const target = (location.state as ScrollState | null)?.scrollTo
    if (!target) return
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const el = document.getElementById(target)
      if (el) scrollTo(layoutTop(el), { immediate: true })
      window.history.replaceState({}, '')
    })
    return () => cancelAnimationFrame(id)
  }, [location.state, scrollTo])

  return (
    <main>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Services />
      <Process />
      <Contact />
    </main>
  )
}
