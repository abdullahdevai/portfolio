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
  /** Base path without extension; `.webp`, `.jpg` and `-800.webp` variants exist. */
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

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ready-pos',
    title: 'Ready POS',
    category: 'SaaS / Point of Sale',
    description:
      'An all-in-one cloud POS for modern businesses — sales, inventory, HR and accounting across multiple stores with real-time tracking.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Vue'],
    image: '/images/project-1',
    liveUrl: 'https://readypos.razinsoft.com/',
    githubUrl: '',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    caseStudy: {
      overview:
        'Ready POS is a cloud point-of-sale platform built for retailers running more than one outlet. It brings sales, inventory, employee management and accounting into a single system, with a vendor model that lets each business run its own stores.',
      problem:
        'Small and mid-sized retailers were stitching together separate tools for billing, stock and payroll. Nothing reconciled: stock counts drifted from what was sold, and owners had no single view across branches.',
      solution:
        'A multi-tenant Laravel backend with a strict transaction model — every sale, return and stock movement writes to one ledger. On top of it sits a fast counter UI and an owner dashboard that reports across all stores in real time.',
      features: [
        { title: 'Multi-store management', description: 'One account, many outlets, with per-store stock, staff and reporting.' },
        { title: 'Real-time inventory', description: 'Stock moves with every sale, purchase, transfer and adjustment.' },
        { title: 'HR & payroll', description: 'Employee records, attendance, shifts and salary handling built in.' },
        { title: 'Accounting & reports', description: 'Sales, profit, expense and tax reports exportable for the books.' },
      ],
      process: [
        { title: 'Discover', description: 'Mapped real counter workflows with shop owners and cashiers.' },
        { title: 'Architecture', description: 'Designed the multi-tenant data model and the transaction ledger.' },
        { title: 'Build', description: 'Shipped POS first, then inventory, HR and accounting modules.' },
        { title: 'Launch', description: 'Onboarded vendors and iterated on reporting from real usage.' },
      ],
      results: [
        { value: 'Multi-store', label: 'Vendors run many outlets from one account' },
        { value: 'Real-time', label: 'Stock and sales stay in sync' },
        { value: '4-in-1', label: 'POS, inventory, HR and accounting' },
      ],
      gallery: ['/images/project-1', '/images/project-1-alt'],
    },
  },
  {
    id: 2,
    slug: 'ready-restaurant',
    title: 'Ready Restaurant',
    category: 'Food Delivery Platform',
    description:
      'A multi-restaurant food ordering and delivery platform with pickup and delivery flows, live order tracking and online payment.',
    technologies: ['Laravel', 'Nuxt', 'MySQL', 'REST API'],
    image: '/images/project-2',
    liveUrl: 'https://foodget.razinsoft.com/',
    githubUrl: '',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    caseStudy: {
      overview:
        'A food ordering platform connecting customers to nearby restaurants. Customers choose a delivery area, browse menus by cuisine, order for pickup or delivery, and follow the order live until it arrives.',
      problem:
        'Restaurants needed their own ordering channel instead of paying aggregator commissions, but customers still expected aggregator-grade speed: instant menus, saved addresses and a checkout that does not lose them.',
      solution:
        'A Laravel API serving a Nuxt storefront. Delivery areas are resolved before browsing so every price and delivery fee shown is real, menus are cached for instant category switching, and orders stream status updates to the customer.',
      features: [
        { title: 'Area-based ordering', description: 'Delivery zones decide availability, fees and timing up front.' },
        { title: 'Pickup or delivery', description: 'One checkout handling both fulfilment modes.' },
        { title: 'Live order tracking', description: 'Status updates from kitchen to doorstep.' },
        { title: 'Offers & promotions', description: 'Discounts, deals and category campaigns managed from the admin.' },
      ],
      process: [
        { title: 'Discover', description: 'Studied ordering funnels and where customers drop off.' },
        { title: 'Design', description: 'Planned the area-first flow so prices are never wrong.' },
        { title: 'Build', description: 'API and storefront, then the restaurant back office.' },
        { title: 'Optimise', description: 'Tuned menu loading and checkout after launch.' },
      ],
      results: [
        { value: 'Live', label: 'Order tracking end to end' },
        { value: 'Multi-vendor', label: 'Many restaurants on one platform' },
        { value: '0%', label: 'Aggregator commission for owners' },
      ],
      gallery: ['/images/project-2', '/images/project-2-alt'],
    },
  },
  {
    id: 3,
    slug: 'rentdo',
    title: 'Rentdo',
    category: 'Property Marketplace',
    description:
      'A property marketplace for rent, sale and investment listings — with agent profiles, rich search and a multi-currency, multi-language front end.',
    technologies: ['Laravel', 'Vue', 'MySQL', 'Tailwind'],
    image: '/images/project-3',
    liveUrl: 'https://rentdonew.razinsoft.com/',
    githubUrl: '',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    caseStudy: {
      overview:
        'Rentdo is a property platform where owners and agents list homes, hotels, land, offices and rooms, and buyers filter by location, area, type and price to find the right one.',
      problem:
        'Listing sites in the market were slow and full of stale inventory. Buyers could not trust what they saw, and agents had no simple way to publish and maintain their own listings.',
      solution:
        'A Laravel backend with a verified-listing workflow and agent accounts, paired with a Vue front end built around a single fast search. Listings carry structured attributes so filters stay accurate, and the UI supports multiple currencies and languages.',
      features: [
        { title: 'Faceted property search', description: 'Location, area, type and price range in one query.' },
        { title: 'Agent profiles', description: 'Agents publish and manage their own verified listings.' },
        { title: 'Multi-currency & language', description: 'Prices and UI adapt to the visitor.' },
        { title: 'Listing workflow', description: 'Submission, review and publishing with ratings and reviews.' },
      ],
      process: [
        { title: 'Discover', description: 'Interviewed agents about how listings actually get maintained.' },
        { title: 'Design', description: 'Built the search and listing data model around real filters.' },
        { title: 'Build', description: 'Public marketplace first, then the agent and admin tools.' },
        { title: 'Launch', description: 'Onboarded agents and refined search from query logs.' },
      ],
      results: [
        { value: '6', label: 'Property types in one search' },
        { value: '3.7/5', label: 'User rating from verified reviews' },
        { value: 'Verified', label: 'Listings reviewed before publishing' },
      ],
      gallery: ['/images/project-3', '/images/project-3-alt'],
    },
  },
  {
    id: 4,
    slug: 'alicom',
    title: 'Alicom',
    category: 'E-Commerce Marketplace',
    description:
      'A multi-category e-commerce marketplace with campaign banners, category browsing, wishlist and a full account area — from electronics to books.',
    technologies: ['Laravel', 'Vue', 'MySQL', 'REST API'],
    image: '/images/project-4',
    liveUrl: 'https://uat-alicom.razinsoft.com/',
    githubUrl: '',
    featured: true,
    year: '2026',
    role: 'Full-Stack Developer',
    caseStudy: {
      overview:
        'Alicom is a general marketplace selling across many categories — phones, laptops, audio, wearables, home appliances, fashion and books — with merchandising campaigns driving the storefront.',
      problem:
        'A catalogue this broad breaks generic store templates: every category needs different attributes and filters, and the marketing team needed to run campaigns without a developer touching the code.',
      solution:
        'A Laravel commerce backend with per-category attribute sets, and a merchandising layer where banners, offers and featured blocks on the home page are configured from the admin. Search and filters read the same attribute data, so new categories work immediately.',
      features: [
        { title: 'Category-aware catalogue', description: 'Per-category attributes drive filters and product pages.' },
        { title: 'Campaign merchandising', description: 'Banners, deals and featured sections managed from the admin.' },
        { title: 'Account area', description: 'Orders, wishlist, addresses and returns in one place.' },
        { title: 'Search & discovery', description: 'Fast type-ahead search across the whole catalogue.' },
      ],
      process: [
        { title: 'Discover', description: 'Mapped the catalogue and what each category actually needs.' },
        { title: 'Design', description: 'Built the attribute model and merchandising system.' },
        { title: 'Build', description: 'Storefront and checkout, then the admin tooling.' },
        { title: 'UAT', description: 'Running user acceptance testing before public launch.' },
      ],
      results: [
        { value: '8+', label: 'Product categories live' },
        { value: 'No-code', label: 'Campaigns without developer time' },
        { value: 'UAT', label: 'In user acceptance testing' },
      ],
      gallery: ['/images/project-4', '/images/project-4-alt'],
    },
  },
]

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length]
}

export const formatProjectNumber = (id: number) => String(id).padStart(2, '0')
