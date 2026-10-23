import { useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ScrollTrigger } from './lib/gsap'
import { AppStateProvider } from './context/AppState'
import { useAppState } from './context/appStateContext'
import { SmoothScrollProvider } from './context/SmoothScrollProvider'
import { useSmoothScroll } from './context/smoothScrollContext'
import { pageTransition } from './animations/pageTransition'
import Loader from './components/Loader'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'

function AnimatedRoutes() {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()

  // New page: start at the top and let ScrollTrigger re-measure the fresh layout.
  const resetScroll = () => {
    window.scrollTo(0, 0)
    scrollTo(0, { immediate: true })
  }

  useLayoutEffect(() => {
    resetScroll()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when the route changes
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
      <motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

function Shell() {
  const { markReady } = useAppState()
  return (
    <>
      <Loader onComplete={markReady} />
      <Background />
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppStateProvider>
          <SmoothScrollProvider>
            <Shell />
          </SmoothScrollProvider>
        </AppStateProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
