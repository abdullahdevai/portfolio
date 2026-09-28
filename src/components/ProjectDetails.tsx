import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'
import { formatProjectNumber, getNextProject, getProjectBySlug } from '../data/projects'
import { site } from '../data/site'
import { fadeUp, imageReveal, staggerChildren, viewportOnce } from '../animations/variants'
import Reveal from './ui/Reveal'
import RevealLines from './ui/RevealLines'
import Button from './ui/Button'
import ProjectImage from './ui/ProjectImage'
import ImageSlider from './ui/ImageSlider'

const MAX_LINE_CHARS = 16

/** Greedily packs title words into lines so huge type never overflows. */
function splitTitle(title: string): string[] {
  const lines: string[] = []
  for (const word of title.split(' ')) {
    const last = lines[lines.length - 1]
    if (last !== undefined && `${last} ${word}`.length <= MAX_LINE_CHARS) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines
}

function SectionLabel({ index, id, children }: { index: string; id?: string; children: string }) {
  return (
    <Reveal className="flex items-center gap-4">
      <span className="font-display text-xs text-accent">{index}</span>
      <h2 id={id} className="text-label">
        {children}
      </h2>
      <span className="hairline max-w-24 flex-1" aria-hidden="true" />
    </Reveal>
  )
}

function Prose({ index, label, children }: { index: string; label: string; children: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionLabel index={index}>{label}</SectionLabel>
      </div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <p className="text-lg leading-relaxed text-white/85 sm:text-xl lg:text-2xl">{children}</p>
      </Reveal>
    </div>
  )
}

/** Premium case-study layout. Data comes entirely from `data/projects`. */
export default function ProjectDetails() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    if (!project) navigate('/', { replace: true })
  }, [project, navigate])

  useEffect(() => {
    if (project) document.title = `${project.title} — ${site.name}`
    return () => {
      document.title = `${site.name} — ${site.role}`
    }
  }, [project])

  if (!project) return null

  const next = getNextProject(project.slug)
  const { caseStudy } = project
  const number = formatProjectNumber(project.id)

  return (
    <article className="relative pt-32 pb-24 md:pt-40" aria-label={`${project.title} case study`}>
      {/* ---------------------------------------------------------------- */}
      {/* Project hero                                                      */}
      {/* ---------------------------------------------------------------- */}
      <header className="container-x">
        <Reveal>
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white">
            <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
            All work
          </Link>
        </Reveal>

        <div className="mt-12 flex items-center gap-4">
          <span className="font-display text-xs text-accent">{number}</span>
          <span className="text-label">{project.category}</span>
        </div>

        <RevealLines as="h1" lines={splitTitle(project.title)} className="text-display-md mt-6" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={project.liveUrl} target={project.liveUrl.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                Live Demo
              </Button>
              {project.githubUrl && (
                <Button href={project.githubUrl} target="_blank" rel="noreferrer" variant="ghost" arrow={false}>
                  <GithubIcon aria-hidden="true" className="h-4 w-4" />
                  Source
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-label">Role</dt>
                <dd className="mt-2 font-display text-sm font-medium">{project.role}</dd>
              </div>
              <div>
                <dt className="text-label">Year</dt>
                <dd className="mt-2 font-display text-sm font-medium">{project.year}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-label">Stack</dt>
                <dd className="mt-2 font-display text-sm font-medium">{project.technologies.join(', ')}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <div className="container-x mt-16 lg:mt-24">
        <Reveal variants={imageReveal}>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-card">
            <ProjectImage src={project.image} alt={`${project.title} main interface`} eager className="aspect-[16/10] w-full object-cover" sizes="(min-width: 1024px) 90vw, 100vw" />
          </figure>
        </Reveal>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Overview / Problem / Solution                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="container-x mt-28 flex flex-col gap-24 lg:mt-40 lg:gap-32">
        <Prose index="01" label="Overview">
          {caseStudy.overview}
        </Prose>
        <Prose index="02" label="Problem">
          {caseStudy.problem}
        </Prose>
        <Prose index="03" label="Solution">
          {caseStudy.solution}
        </Prose>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-28 lg:mt-40" aria-labelledby="features-heading">
        <SectionLabel index="04" id="features-heading">
          Features
        </SectionLabel>
        <motion.ul
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
          variants={staggerChildren(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {caseStudy.features.map((feature, i) => (
            <motion.li key={feature.title} variants={fadeUp} className="group bg-bg p-8 transition-colors duration-500 hover:bg-card">
              <span className="font-display text-xs text-accent">{formatProjectNumber(i + 1)}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Technology                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-28 lg:mt-40" aria-labelledby="tech-heading">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="05" id="tech-heading">
              Technology
            </SectionLabel>
          </div>
          <motion.ul
            className="flex flex-wrap gap-3 lg:col-span-7 lg:col-start-6"
            variants={staggerChildren(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {project.technologies.map((tech) => (
              <motion.li
                key={tech}
                variants={fadeUp}
                className="rounded-full border border-white/10 bg-card/70 px-5 py-2.5 font-display text-sm font-medium transition-colors duration-300 hover:border-accent/60"
              >
                {tech}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* UI Showcase                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-28 lg:mt-40" aria-labelledby="showcase-heading">
        <SectionLabel index="06" id="showcase-heading">
          UI Showcase
        </SectionLabel>
        <Reveal variants={imageReveal} className="mt-10">
          <ImageSlider slides={caseStudy.gallery} label={project.title} />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Development process                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-28 lg:mt-40" aria-labelledby="process-heading">
        <SectionLabel index="07" id="process-heading">
          Development Process
        </SectionLabel>
        <motion.ol
          className="mt-10 border-t border-white/10"
          variants={staggerChildren(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {caseStudy.process.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-12 sm:items-baseline">
              <span className="font-display text-sm text-accent sm:col-span-1">{formatProjectNumber(i + 1)}</span>
              <h3 className="font-display text-2xl font-semibold sm:col-span-4">{step.title}</h3>
              <p className="text-muted sm:col-span-6 sm:col-start-7">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Results                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-28 lg:mt-40" aria-labelledby="results-heading">
        <SectionLabel index="08" id="results-heading">
          Results
        </SectionLabel>
        <motion.dl
          className="mt-10 grid gap-10 sm:grid-cols-3"
          variants={staggerChildren(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {caseStudy.results.map((result) => (
            <motion.div key={result.label} variants={fadeUp} className="border-l border-accent/50 pl-6">
              <dd className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">{result.value}</dd>
              <dt className="mt-3 text-sm text-muted">{result.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Next project                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x mt-32 lg:mt-48" aria-labelledby="next-heading">
        <Reveal>
          <Link
            to={`/work/${next.slug}`}
            className="group block border-t border-white/10 pt-10"
            data-cursor="hover"
          >
            <span className="text-label">Next project</span>
            <span className="mt-4 flex items-center justify-between gap-6">
              <h2 id="next-heading" className="text-display-md transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {next.title}
              </h2>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 transition-[background-color,border-color] duration-500 group-hover:border-accent group-hover:bg-accent sm:h-24 sm:w-24">
                <ArrowUpRight aria-hidden="true" className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-8 sm:w-8" />
              </span>
            </span>
            <span className="mt-4 block text-muted">{next.category}</span>
          </Link>
        </Reveal>
      </section>
    </article>
  )
}
