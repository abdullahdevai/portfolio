import { motion } from 'framer-motion'
import { about } from '../data/about'
import { site } from '../data/site'
import { imageReveal, viewportOnce } from '../animations/variants'

/**
 * Editorial portrait: masked reveal on scroll, desaturated at rest and full
 * colour on hover, with a small caption strip and an accent corner mark.
 */
export default function Portrait() {
  const { portrait } = about
  return (
    <motion.figure
      className="group relative"
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-card" data-cursor="hover">
        <picture>
          <source srcSet={`${portrait.smallWebp} 640w, ${portrait.webp} 1200w`} sizes="(min-width: 1024px) 34vw, 90vw" type="image/webp" />
          <img
            src={portrait.jpg}
            srcSet={`${portrait.smallJpg} 640w, ${portrait.jpg} 1200w`}
            sizes="(min-width: 1024px) 34vw, 90vw"
            alt={portrait.alt}
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale-[0.55] transition-[filter,transform] duration-[1400ms] ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:grayscale-0"
          />
        </picture>
        {/* Bottom fade so the caption sits on a calm surface */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(5,5,5,0.85),transparent)]" />
        {/* Corner mark */}
        <span aria-hidden="true" className="absolute top-5 right-5 h-6 w-6 border-t border-r border-accent/80" />
        <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
          <span>
            <span className="block font-display text-lg font-semibold">{site.name}</span>
            <span className="text-label mt-1 block">{site.role}</span>
          </span>
          <span className="text-label hidden text-right sm:block xl:hidden">{site.location}</span>
        </figcaption>
      </div>
    </motion.figure>
  )
}
