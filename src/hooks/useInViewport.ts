import { useEffect, useState, type RefObject } from 'react'

/** Boolean visibility of an element, used to pause work that is off-screen. */
export function useInViewport<T extends Element>(ref: RefObject<T | null>, rootMargin = '0px') {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return visible
}
