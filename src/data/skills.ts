import {
  CodeXml,
  Flame,
  Layers,
  Mountain,
  Atom,
  Zap,
  Braces,
  Hexagon,
  Server,
  Database,
  Wind,
  GitBranch,
  type LucideIcon,
} from 'lucide-react'

export interface Skill {
  name: string
  description: string
  icon: LucideIcon
  /** Position (percentage of the ecosystem area) used on desktop. */
  position: { x: number; y: number }
  /** Float animation offset in seconds so pills don't move in sync. */
  delay: number
}

export const skills: Skill[] = [
  { name: 'PHP', description: 'Modern PHP 8 — typed, tested backends and long-running business logic.', icon: CodeXml, position: { x: 18, y: 18 }, delay: 0 },
  { name: 'Laravel', description: 'REST APIs, queues, auth, Eloquent and admin panels — my primary backend framework.', icon: Flame, position: { x: 50, y: 8 }, delay: 0.6 },
  { name: 'Vue', description: 'Composition API, Pinia and Inertia for interactive product UIs.', icon: Layers, position: { x: 82, y: 18 }, delay: 1.2 },
  { name: 'Nuxt', description: 'SSR and content-driven frontends on top of Vue.', icon: Mountain, position: { x: 8, y: 48 }, delay: 1.8 },
  { name: 'React', description: 'Component architecture, hooks and performance tuning.', icon: Atom, position: { x: 92, y: 48 }, delay: 2.4 },
  { name: 'Next.js', description: 'Full-stack React with server components, routing and SEO built in.', icon: Zap, position: { x: 18, y: 80 }, delay: 3 },
  { name: 'JavaScript', description: 'Modern ES features, tooling and the browser platform.', icon: Braces, position: { x: 50, y: 92 }, delay: 3.6 },
  { name: 'TypeScript', description: 'Typed APIs, safer refactors and better developer experience.', icon: Hexagon, position: { x: 82, y: 80 }, delay: 4.2 },
  { name: 'Node.js', description: 'Lightweight services, tooling and real-time backends.', icon: Server, position: { x: 24, y: 32 }, delay: 0.9 },
  { name: 'MySQL', description: 'Schema design, indexing, migrations and query optimisation.', icon: Database, position: { x: 76, y: 32 }, delay: 2.1 },
  { name: 'Tailwind', description: 'Design systems and rapid, consistent UI implementation.', icon: Wind, position: { x: 24, y: 70 }, delay: 3.3 },
  { name: 'Git', description: 'Branching workflows, code review and CI pipelines.', icon: GitBranch, position: { x: 76, y: 70 }, delay: 4.5 },
]
