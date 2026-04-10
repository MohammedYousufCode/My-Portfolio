import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Github, ExternalLink, ImagePlus, BarChart2, Gamepad2 } from 'lucide-react'
import type { Project } from '../lib/supabase'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useScrollReveal(0.1)
  const fromLeft = index % 2 === 0
  const hasLinks = project.github_url || project.live_url

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 16 }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="card-base overflow-hidden group flex flex-col">

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-dark-nav flex-shrink-0">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <ImagePlus size={24} className="text-gray-300 dark:text-gray-600" />
            <span className="font-mono text-xs text-gray-300 dark:text-gray-600 tracking-widest">NO IMAGE YET</span>
          </div>
        )}

        {/* Desktop hover overlay — hidden on mobile */}
        {hasLinks && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            items-center justify-center gap-3 hidden md:flex"
            style={{ background: 'rgba(6,8,16,0.88)' }}>
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer"
                className="btn-gold flex items-center gap-2 text-xs py-2 px-4">
                <Github size={13} /> Code
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer"
                className="btn-gold flex items-center gap-2 text-xs py-2 px-4"
                style={{ borderColor: 'rgba(79,195,247,0.5)', color: 'var(--cyan)' }}>
                <ExternalLink size={13} /> Live
              </a>
            )}
          </div>
        )}

        {project.is_featured && (
          <div className="absolute top-3 right-3 px-2 py-1 font-mono text-xs tracking-widest rounded"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)' }}>
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white mb-2
          group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
          {project.title}
        </h3>
        <p className="body-text text-sm mb-4 flex-1">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.map(t => (
            <span key={t} className="font-mono text-xs px-2 py-1 rounded"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Mobile links — always visible, hidden on desktop (desktop uses hover overlay) */}
        {hasLinks && (
          <div className="flex gap-3 mt-auto md:hidden">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer"
                className="flex-1 btn-gold flex items-center justify-center gap-2 text-xs py-2.5">
                <Github size={13} /> Code
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer"
                className="flex-1 btn-gold flex items-center justify-center gap-2 text-xs py-2.5"
                style={{ borderColor: 'rgba(79,195,247,0.5)', color: 'var(--cyan)' }}>
                <ExternalLink size={13} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SubSection({ title, icon: Icon, projects, emptyMsg }: {
  title: string
  icon: React.ElementType
  projects: Project[]
  emptyMsg: string
}) {
  const { ref, visible } = useScrollReveal()

  return (
    <div className="mb-16" ref={ref}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <Icon size={15} style={{ color: 'var(--gold)' }} />
        </div>
        <h3 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-200">{title}</h3>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }} />
      </motion.div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-400 font-mono text-xs tracking-widest border border-dashed border-gray-200 dark:border-white/5 rounded-xl">
          {emptyMsg}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      )}
    </div>
  )
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { ref, visible } = useScrollReveal()
  const mainProjects = projects.filter(p => p.project_type === 'main')
  const hobbyProjects = projects.filter(p => p.project_type === 'hobby')

  return (
    <section id="projects" className="relative z-10 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <p className="section-label">Work</p>
            <h2 className="section-title font-playfair">Projects</h2>
            <div className="gold-line" />
          </motion.div>
        </div>

        <SubSection title="Data Analysis & ML" icon={BarChart2} projects={mainProjects} emptyMsg="ADD MAIN PROJECTS VIA ADMIN PANEL" />
        <SubSection title="Hobby & Hackathon" icon={Gamepad2} projects={hobbyProjects} emptyMsg="ADD HOBBY PROJECTS VIA ADMIN PANEL" />
      </div>
    </section>
  )
}
