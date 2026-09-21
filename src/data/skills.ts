import {
  Atom,
  Layers,
  Braces,
  FileCode2,
  Coffee,
  Leaf,
  Server,
  Box,
  Wind,
  GitBranch,
  Database,
  Cylinder,
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
  { name: 'React', description: 'Component architecture, hooks, performance tuning and state management.', icon: Atom, position: { x: 18, y: 18 }, delay: 0 },
  { name: 'Vue', description: 'Composition API, Pinia and Nuxt for content-driven applications.', icon: Layers, position: { x: 50, y: 8 }, delay: 0.6 },
  { name: 'JavaScript', description: 'Modern ES features, tooling and the browser platform.', icon: Braces, position: { x: 82, y: 18 }, delay: 1.2 },
  { name: 'TypeScript', description: 'Typed APIs, safer refactors and better developer experience.', icon: FileCode2, position: { x: 8, y: 48 }, delay: 1.8 },
  { name: 'Java', description: 'Backend services, business logic and enterprise integrations.', icon: Coffee, position: { x: 92, y: 48 }, delay: 2.4 },
  { name: 'Spring Boot', description: 'REST APIs, security and data access for Java backends.', icon: Leaf, position: { x: 18, y: 80 }, delay: 3 },
  { name: 'Node.js', description: 'Lightweight services, tooling and real-time backends.', icon: Server, position: { x: 50, y: 92 }, delay: 3.6 },
  { name: 'Three.js', description: '3D scenes, shaders and WebGL experiences on the web.', icon: Box, position: { x: 82, y: 80 }, delay: 4.2 },
  { name: 'Tailwind', description: 'Design systems and rapid, consistent UI implementation.', icon: Wind, position: { x: 24, y: 32 }, delay: 0.9 },
  { name: 'Git', description: 'Branching workflows, code review and CI pipelines.', icon: GitBranch, position: { x: 76, y: 32 }, delay: 2.1 },
  { name: 'Oracle', description: 'Relational modelling, PL/SQL and reporting queries.', icon: Cylinder, position: { x: 24, y: 70 }, delay: 3.3 },
  { name: 'PostgreSQL', description: 'Schema design, indexing and query optimisation.', icon: Database, position: { x: 76, y: 70 }, delay: 4.5 },
]
