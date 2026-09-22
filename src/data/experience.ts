export interface ExperienceItem {
  id: number
  title: string
  period: string
  description: string
  tags: string[]
}

// Periods are placeholders — replace with the real dates.
export const experience: ExperienceItem[] = [
  {
    id: 1,
    title: 'Frontend Development',
    period: '2021 — 2022',
    description:
      'Built responsive, accessible interfaces with Vue and React for marketing sites and web apps. Introduced component libraries and motion as part of the product language.',
    tags: ['Vue', 'React', 'Tailwind', 'GSAP'],
  },
  {
    id: 2,
    title: 'Backend & Full Stack Development',
    period: '2022 — 2023',
    description:
      'Owned features end to end — database schema, Laravel REST APIs, queues and auth, plus the Vue/Nuxt and React/Next.js frontends that consumed them.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Nuxt', 'Next.js'],
  },
  {
    id: 3,
    title: 'Dashboard & Admin Systems',
    period: '2023 — 2024',
    description:
      'Specialised in data-heavy admin panels and analytics dashboards on Laravel with Blade and Inertia + Vue: role-based access, reporting, exports and real-time updates at scale.',
    tags: ['Laravel', 'Inertia', 'Vue', 'Redis'],
  },
  {
    id: 4,
    title: 'Freelance / Client Projects',
    period: '2024 — Present',
    description:
      'Partnering with startups and agencies on storefronts, SaaS products and interactive experiences — from API design to launch.',
    tags: ['Laravel', 'React', 'Next.js', 'Consulting'],
  },
]
