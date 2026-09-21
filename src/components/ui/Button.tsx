import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Magnetic from './Magnetic'

type Variant = 'primary' | 'ghost'

const base =
  'group relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-display text-sm font-medium tracking-wide transition-[background-color,border-color,color] duration-300 select-none min-h-12'

const variants: Record<Variant, string> = {
  primary: 'bg-white text-black hover:bg-accent hover:text-white',
  ghost: 'border border-white/15 text-white hover:border-white/40',
}

interface CommonProps {
  variant?: Variant
  arrow?: boolean
  magnetic?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined }

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span className="relative overflow-hidden">
        <span className="flex items-center gap-2 transition-transform duration-500 ease-out-expo group-hover:-translate-y-[110%]">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 flex translate-y-[110%] items-center gap-2 transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )
}

/**
 * Pill button with a rolling label. Renders a `<Link>`, `<a>` or `<button>`
 * depending on which of `to`/`href` is supplied.
 */
const Button = forwardRef<HTMLElement, ButtonProps | AnchorProps | LinkProps>(function Button(props, ref) {
  const { variant = 'primary', arrow = true, magnetic = true, children, className = '', ...rest } = props
  const classes = `${base} ${variants[variant]} ${className}`

  let element: ReactNode
  if ('to' in rest && rest.to) {
    element = (
      <Link to={rest.to} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    )
  } else if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps
    element = (
      <a href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>} {...anchorRest}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    )
  } else {
    const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
    element = (
      <button type="button" className={classes} ref={ref as React.Ref<HTMLButtonElement>} {...buttonRest}>
        <Inner arrow={arrow}>{children}</Inner>
      </button>
    )
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element
})

export default Button
