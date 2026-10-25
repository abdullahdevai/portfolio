import { asset } from '../lib/asset'

export const about = {
  portrait: {
    webp: asset('/images/portrait-1200.webp'),
    jpg: asset('/images/portrait-1200.jpg'),
    smallWebp: asset('/images/portrait-640.webp'),
    smallJpg: asset('/images/portrait-640.jpg'),
    alt: 'Portrait of Abdullah, full-stack developer, in a dark blazer against a blue-violet background',
  },
  statementLines: ['I build products where', 'solid backends, clean interfaces', 'and motion come together.'],
  paragraphs: [
    'I am a backend-focused full-stack developer. Most of my work starts in PHP and Laravel — designing data models, REST APIs, queues and admin systems — and carries through to the interfaces people actually use, built with Vue, Nuxt, React and Next.js.',
    'I care about the details that make software feel considered: fast responses, clear hierarchy, purposeful motion and interfaces that stay calm under heavy data. From dashboards and e-commerce to customer-facing web apps, I ship products people rely on every day.',
  ],
  rotatingTechnologies: ['Laravel', 'PHP', 'Vue', 'Nuxt', 'React', 'Next.js', 'MySQL', 'TypeScript'],
  facts: [
    { label: 'Focus', value: 'Backend & Full-Stack' },
    { label: 'Based in', value: 'Dhaka, BD' },
    { label: 'Working with', value: 'Startups & Agencies' },
  ],
  education: {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Presidency University',
    location: 'Dhaka, Bangladesh',
  },
}
