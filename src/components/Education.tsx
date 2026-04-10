import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { GraduationCap, Trophy, ExternalLink } from 'lucide-react'
import type { Education, Hackathon } from '../lib/supabase'

export default function EducationSection({ education, hackathons }: { education: Education[]; hackathons: Hackathon[] }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="education" className="relative z-10 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="section-label">Background</p>
          <h2 className="section-title font-playfair">Education & Achievements</h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={16} style={{ color: 'var(--gold)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-gray-400">Education</span>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, var(--gold), transparent)' }} />

              {education.map((edu, i) => (
                <motion.div key={edu.id}
                  initial={{ opacity: 0, x: -24 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative pl-10 pb-8">

                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: 'var(--gold)', background: 'var(--black)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
                  </div>

                  <div className="card-base p-5">
                    <h3 className=" font-bold text-gray-900 dark:text-white text-base mb-1">{edu.degree}</h3>
                    <p className="font-mono text-xs text-gray-400 tracking-wider mb-2">{edu.institution}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-mono text-xs text-gray-500">{edu.period}</span>
                      <span className="font-mono text-xs px-2 py-1 rounded"
                        style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                        {edu.score}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hackathons */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy size={16} style={{ color: 'var(--gold)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-gray-400">Hackathons & Prizes</span>
            </div>

            <div className="space-y-4">
              {hackathons.map((h, i) => (
                <motion.div key={h.id}
                  initial={{ opacity: 0, x: 24 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="card-base p-5 group relative overflow-hidden">

                  <div className="absolute top-0 left-0 bottom-0 w-0.5"
                    style={{ background: 'var(--gold)' }} />

                  <div className="flex items-start justify-between gap-4 mb-2 pl-2">
                    <div>
                      <span className="text-xl mr-2">🏆</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
                        {h.prize}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-gray-400">{h.year}</span>
                  </div>

                  <h3 className=" font-bold text-gray-900 dark:text-white mb-2 pl-2">{h.title}</h3>
                  <p className="body-text text-sm pl-2 mb-3">{h.description}</p>

                  {h.live_url && (
                    <a href={h.live_url} target="_blank" rel="noreferrer"
                      className="pl-2 flex items-center gap-1 font-mono text-xs text-gray-400 hover:text-yellow-500 transition-colors">
                      <ExternalLink size={11} /> View Live
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
