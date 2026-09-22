import { ArrowUp } from 'lucide-react'
import { site, socialLinks } from '../data/site'
import { useSectionNavigation } from '../hooks/useSectionNavigation'
import Magnetic from './ui/Magnetic'
import Logo from './ui/Logo'

export default function Footer() {
  const goTo = useSectionNavigation()
  const year = new Date().getFullYear()

  return (
    <footer className="container-x relative py-10">
      <span className="hairline mb-8" aria-hidden="true" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="text-sm text-muted">
            © {year} {site.name}. All rights reserved.
          </span>
        </div>

        <ul className="flex items-center gap-5">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors duration-300 hover:text-white"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={() => goTo('top')}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
            </span>
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
