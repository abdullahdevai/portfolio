import type { ComponentType } from 'react'
import { Mail, Briefcase } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons/BrandIcons'

export type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>

export const site = {
  initials: 'AB',
  name: 'AB',
  role: 'Creative Developer',
  email: 'hello@example.com',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  availability: 'Available for freelance projects',
  url: 'https://example.com',
}

export interface NavLink {
  label: string
  hash: string
}

export const navLinks: NavLink[] = [
  { label: 'Work', hash: 'work' },
  { label: 'About', hash: 'about' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Services', hash: 'services' },
  { label: 'Contact', hash: 'contact' },
]

export interface SocialLink {
  label: string
  href: string
  icon: IconComponent
}

// Placeholder handles — swap for the real profiles.
export const socialLinks: SocialLink[] = [
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
  { label: 'GitHub', href: 'https://github.com/username', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username', icon: LinkedinIcon },
  { label: 'Upwork', href: 'https://upwork.com/freelancers/username', icon: Briefcase },
]
