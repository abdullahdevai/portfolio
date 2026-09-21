export interface ExperienceItem {
  id: number
  title: string
  period: string
  description: string
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    title: 'Frontend Development',
    period: '2021 — 2022',
    description:
      'Built responsive, accessible interfaces for marketing sites and web apps. Established component libraries and introduced motion as part of the product language.',
    tags: ['React', 'Vue', 'Tailwind', 'GSAP'],
  },
  {
    id: 2,
    title: 'Full Stack Development',
    period: '2022 — 2023',
    description:
      'Owned features end to end — from database schema and REST APIs to the UI that consumed them. Worked across Java, Spring Boot and Node.js services.',
    tags: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Dashboard & Admin Systems',
    period: '2023 — 2024',
    description:
      'Specialised in data-heavy admin panels and analytics dashboards: virtualised tables, role-based access and real-time updates at scale.',
    tags: ['React', 'TypeScript', 'Charts', 'WebSockets'],
  },
  {
    id: 4,
    title: 'Freelance / Client Projects',
    period: '2024 — Present',
    description:
      'Partnering with startups and agencies on storefronts, SaaS products and interactive experiences — from concept to launch.',
    tags: ['Product', 'E-Commerce', 'Three.js', 'Consulting'],
  },
]
