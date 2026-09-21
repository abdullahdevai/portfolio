import { projects } from '../data/projects'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="work" className="section-y relative" aria-labelledby="work-heading">
      <div className="container-x">
        <SectionHeading
          id="work-heading"
          index="03"
          label="Selected Work"
          title="Selected Work"
          description="A selection of projects I've designed and built."
        />

        <div className="mt-24 flex flex-col gap-32 lg:mt-32 lg:gap-48">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
