import Reveal from './Reveal'

interface SectionHeadingProps {
  id?: string
  index: string
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** Editorial section header: index + label on a hairline, then a big display title. */
export default function SectionHeading({ id, index, label, title, description, align = 'left', className = '' }: SectionHeadingProps) {
  return (
    <div className={`${className} ${align === 'center' ? 'text-center' : ''}`}>
      <Reveal className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-display text-xs text-accent">{index}</span>
        <span className="text-label">{label}</span>
        {align === 'left' && <span className="hairline max-w-24 flex-1" aria-hidden="true" />}
      </Reveal>
      <Reveal delay={0.1}>
        <h2 id={id} className="text-display-md mt-6">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-xl text-base text-muted md:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
