import { useLocation, useNavigate } from 'react-router-dom'
import { useSmoothScroll } from '../context/smoothScrollContext'

export interface ScrollState {
  scrollTo?: string
}

/**
 * Navigates to a home-page section from anywhere: smooth-scrolls when already
 * on the home page, otherwise routes home and lets the page scroll on mount.
 */
export function useSectionNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()

  return (hash: string) => {
    if (location.pathname === '/') {
      scrollTo(`#${hash}`)
    } else {
      navigate('/', { state: { scrollTo: hash } satisfies ScrollState })
    }
  }
}
