import { site } from '../../data/site'
import { asset } from '../../lib/asset'

const SIZES = { sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-16 w-16' } as const

interface LogoProps {
  size?: keyof typeof SIZES
  /** Show the "AB." wordmark next to the avatar. */
  wordmark?: boolean
  className?: string
}

/** Circular portrait mark with the accent ring, optionally paired with the AB. wordmark. */
export default function Logo({ size = 'md', wordmark = true, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={asset('/images/logo-128.png')}
        alt=""
        width={128}
        height={128}
        className={`${SIZES[size]} rounded-full object-cover`}
        decoding="async"
      />
      {wordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          {site.initials}
          <span className="text-accent">.</span>
        </span>
      )}
    </span>
  )
}
