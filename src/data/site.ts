import type { ComponentType } from 'react'
import { Mail, Briefcase } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons/BrandIcons'

export type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>

export const site = {
  initials: 'AB',
  name: 'Abdullah',
  role: 'Full-Stack Developer',
  email: 'developerabweb@gmail.com',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  availability: 'Available for freelance projects',
  url: 'https://github.com/abdullahdevai',
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

// Upwork is still a placeholder — swap for the real profile or remove it.
export const socialLinks: SocialLink[] = [
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
  { label: 'GitHub', href: 'https://github.com/abdullahdevai', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdullahai', icon: LinkedinIcon },
  { label: 'Upwork', href: 'https://upwork.com/freelancers/username', icon: Briefcase },
]
