import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { formatProjectNumber, type Project } from '../data/projects'
import { fadeUp, imageReveal, staggerChildren, viewportOnce } from '../animations/variants'
import TiltCard from './ui/TiltCard'
import Button from './ui/Button'

interface ProjectCardProps {
  project: Project
  index: number
}

/** Full-width case-study teaser. Image and copy alternate sides on desktop. */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate()
  const flipped = index % 2 === 1
  const number = formatProjectNumber(project.id)
  const detailPath = `/work/${project.slug}`

  return (
    <motion.article
      className="group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      variants={staggerChildren(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Hover backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-10 -z-10 rounded-[2rem] lg:-inset-x-6 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(123,97,255,0.12),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Visual */}
      <motion.div
        variants={imageReveal}
        className={`relative lg:col-span-7 ${flipped ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1'}`}
      >
        <TiltCard max={4}>
          <button
            type="button"
            data-cursor="view"
            onClick={() => navigate(detailPath)}
            aria-label={`View case study: ${project.title}`}
            className="relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-card"
          >
            <span className="block aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} interface preview`}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
              />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.5),transparent_45%)] opacity-60 transition-opacity duration-700 group-hover:opacity-30"
            />
            <span className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-display text-[11px] tracking-[0.2em] uppercase backdrop-blur">
              {project.category}
            </span>
          </button>
        </TiltCard>
      </motion.div>

      {/* Copy */}
      <div className={`relative lg:col-span-5 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
        <motion.span
          variants={fadeUp}
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -top-20 -left-2 font-display text-[7rem] leading-none font-bold select-none lg:-top-32 lg:text-[9rem]"
        >
          {number}
        </motion.span>

        <motion.div variants={fadeUp} className="relative">
          <span className="text-label">
            {number} — {project.year}
          </span>
          <h3 id={`project-${project.id}-title`} className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <button
              type="button"
              onClick={() => navigate(detailPath)}
              className="inline-flex items-baseline gap-3 text-left transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
            >
              {project.title}
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6 shrink-0 self-center text-accent opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:opacity-100"
              />
            </button>
          </h3>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-muted">
          {project.description}
        </motion.p>

        <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted" aria-label="Technologies">
          {project.technologies.map((tech, i) => (
            <li key={tech} className="flex items-center gap-3">
              <span>{tech}</span>
              {i < project.technologies.length - 1 && (
                <span aria-hidden="true" className="text-white/20">
                  /
                </span>
              )}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={project.liveUrl} target={project.liveUrl.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            Live Demo
          </Button>
          <Button to={detailPath} variant="ghost" arrow={false}>
            View Case Study
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.article>
  )
}
