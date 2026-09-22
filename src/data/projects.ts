export interface CaseStudySection {
  title: string
  description: string
}

export interface CaseStudyResult {
  value: string
  label: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  liveUrl: string
  githubUrl: string
  featured: boolean
  year: string
  role: string
  caseStudy: {
    overview: string
    problem: string
    solution: string
    features: CaseStudySection[]
    process: CaseStudySection[]
    results: CaseStudyResult[]
    gallery: string[]
  }
}

// Placeholder projects. Replace copy, links and images (public/images) with real work.
export const projects: Project[] = [
  {
    id: 1,
    slug: 'admin-management-system',
    title: 'Admin Management System',
    category: 'Web Application',
    description:
      'A modern management platform with interactive dashboards, CRUD workflows and real-time analytics for operations teams.',
    technologies: ['Laravel', 'Inertia', 'Vue', 'MySQL'],
    image: '/images/project-1.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    caseStudy: {
      overview:
        'An internal operations platform used daily by administrators to manage users, roles, content and reporting. The goal was a fast, keyboard-friendly interface that scales from a handful of records to hundreds of thousands.',
      problem:
        'The legacy admin was a collection of disconnected screens with slow page loads, inconsistent forms and no shared component language. Every new module took weeks and looked different from the last.',
      solution:
        'I designed a modular architecture around a shared data-table, form and layout system. Every module is composed from the same primitives, so new features ship in days and behave consistently. Heavy lists are virtualised and all mutations are optimistic.',
      features: [
        { title: 'Composable data tables', description: 'Server-side pagination, sorting, filtering and column presets shared by every module.' },
        { title: 'Role-based access', description: 'Granular permission model rendered directly into navigation and actions.' },
        { title: 'Analytics dashboards', description: 'Live KPIs with drill-down charts and exportable reports.' },
        { title: 'Audit trail', description: 'Every mutation is recorded and browsable with diff views.' },
      ],
      process: [
        { title: 'Audit', description: 'Mapped every existing screen and interviewed the operations team.' },
        { title: 'System design', description: 'Defined the component primitives and data-fetching layer.' },
        { title: 'Build', description: 'Migrated modules one by one behind feature flags.' },
        { title: 'Rollout', description: 'Shipped to all teams with zero downtime.' },
      ],
      results: [
        { value: '3.4×', label: 'Faster page loads' },
        { value: '−60%', label: 'Time to ship a module' },
        { value: '40+', label: 'Screens migrated' },
      ],
      gallery: ['/images/project-1.svg', '/images/project-1-alt.svg'],
    },
  },
  {
    id: 2,
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Storefront & Checkout',
    description:
      'A high-conversion storefront with product discovery, a frictionless checkout and a merchant back office.',
    technologies: ['Laravel', 'Nuxt', 'MySQL', 'Stripe'],
    image: '/images/project-2.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    role: 'Full Stack Developer',
    caseStudy: {
      overview:
        'A complete commerce experience for a growing retail brand: catalogue, search, cart, checkout and a merchant dashboard for orders and inventory.',
      problem:
        'The previous store was template-based, slow on mobile and had a multi-step checkout with a high abandonment rate.',
      solution:
        'I rebuilt the storefront as a performance-first single-page experience with an instant search index, a single-page checkout and a clean merchant panel built on the same design system.',
      features: [
        { title: 'Instant search', description: 'Typo-tolerant product search with faceted filters.' },
        { title: 'One-page checkout', description: 'Address autocomplete, saved payment methods and express wallets.' },
        { title: 'Merchant dashboard', description: 'Orders, fulfilment, inventory and promotions in one place.' },
        { title: 'Performance budget', description: 'Sub-second LCP on mid-range mobile devices.' },
      ],
      process: [
        { title: 'Research', description: 'Analysed funnel drop-off and shopper interviews.' },
        { title: 'Prototype', description: 'Tested the new checkout flow with real customers.' },
        { title: 'Build', description: 'Storefront first, then the merchant tools.' },
        { title: 'Optimise', description: 'Iterated on speed and conversion after launch.' },
      ],
      results: [
        { value: '+28%', label: 'Checkout conversion' },
        { value: '0.9s', label: 'Mobile LCP' },
        { value: '2×', label: 'Mobile revenue' },
      ],
      gallery: ['/images/project-2.svg', '/images/project-2-alt.svg'],
    },
  },
  {
    id: 3,
    slug: 'pos-inventory-system',
    title: 'POS & Inventory System',
    category: 'Business Software',
    description:
      'A point-of-sale and inventory system built for speed at the counter, with offline support and multi-branch stock tracking.',
    technologies: ['Laravel', 'React', 'MySQL', 'PWA'],
    image: '/images/project-3.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    role: 'Product Engineer',
    caseStudy: {
      overview:
        'A touch-friendly POS for retail counters connected to a central inventory service across multiple branches.',
      problem:
        'Staff needed to sell quickly even when the internet dropped, and managers had no live view of stock across locations.',
      solution:
        'An offline-first PWA that queues sales locally and syncs when back online, with a real-time stock ledger and low-stock alerts for managers.',
      features: [
        { title: 'Offline-first sales', description: 'Sales are recorded locally and reconciled automatically.' },
        { title: 'Barcode workflows', description: 'Scan to sell, receive and count stock.' },
        { title: 'Multi-branch ledger', description: 'Transfers, adjustments and audits per location.' },
        { title: 'Shift reports', description: 'Cash-up and end-of-day summaries.' },
      ],
      process: [
        { title: 'Shadowing', description: 'Spent days at the counter to learn real workflows.' },
        { title: 'Architecture', description: 'Designed the sync and conflict-resolution model.' },
        { title: 'Build', description: 'POS first, inventory second, reporting last.' },
        { title: 'Pilot', description: 'Ran in two branches before the full rollout.' },
      ],
      results: [
        { value: '<1s', label: 'Checkout per item' },
        { value: '100%', label: 'Uptime at the counter' },
        { value: '12', label: 'Branches connected' },
      ],
      gallery: ['/images/project-3.svg', '/images/project-3-alt.svg'],
    },
  },
  {
    id: 4,
    slug: 'developer-dashboard',
    title: 'Developer Dashboard',
    category: 'Developer Tools',
    description:
      'A monitoring dashboard for engineering teams with deployment timelines, log search and service health at a glance.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'WebSockets'],
    image: '/images/project-4.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2025',
    role: 'Full-Stack Engineer',
    caseStudy: {
      overview:
        'A single pane of glass for engineering teams: deployments, service health, logs and alerts streamed in real time.',
      problem:
        'Teams were switching between five tools to answer a single question about a deployment, and incidents took too long to triage.',
      solution:
        'A dense but calm interface with a live service map, a unified timeline and a fast log explorer, all driven by a single WebSocket stream.',
      features: [
        { title: 'Live service map', description: 'Dependencies and health rendered as an interactive graph.' },
        { title: 'Unified timeline', description: 'Deploys, alerts and incidents on one scrubbable line.' },
        { title: 'Log explorer', description: 'Structured search with saved queries and sharing.' },
        { title: 'Command palette', description: 'Everything reachable from the keyboard.' },
      ],
      process: [
        { title: 'Discovery', description: 'Traced how engineers actually triaged incidents.' },
        { title: 'Information design', description: 'Prioritised what needs to be visible at a glance.' },
        { title: 'Build', description: 'Streaming architecture and the visual system.' },
        { title: 'Adoption', description: 'Rolled out team by team with feedback loops.' },
      ],
      results: [
        { value: '−45%', label: 'Mean time to triage' },
        { value: '5 → 1', label: 'Tools during incidents' },
        { value: '60fps', label: 'Live graph rendering' },
      ],
      gallery: ['/images/project-4.svg', '/images/project-4-alt.svg'],
    },
  },
]

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length]
}

export const formatProjectNumber = (id: number) => String(id).padStart(2, '0')
