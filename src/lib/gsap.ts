import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Single registration point so every module shares the same plugin instance.
gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export { gsap, ScrollTrigger }
