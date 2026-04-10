import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Marquee from './Marquee'
import type { Skill } from '../lib/supabase'

const categoryColor: Record<string, string> = {
  Languages: '#C9A84C',
  Libraries: '#4FC3F7',
  Databases: '#a78bfa',
  Visualization: '#34d399',
  Tools: '#f87171',
  Web: '#fb923c',
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const { ref, visible } = useScrollReveal()

  const categories = Array.from(new Set(skills.map(s => s.category)))

  // Split for two marquee rows
  const row1 = skills.slice(0, Math.ceil(skills.length / 2)).map(s => s.name)
  const row2 = skills.slice(Math.ceil(skills.length / 2)).map(s => s.name)

  return (
    <section id="skills" className="relative z-10 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="section-label">Technical Arsenal</p>
          <h2 className="section-title font-playfair">Skills & Tools</h2>
          <div className="gold-line" />
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 md:mb-16">
          {categories.map((cat, i) => {
            const catSkills = skills.filter(s => s.category === cat)
            const color = categoryColor[cat] || '#C9A84C'
            return (
              <motion.div key={cat}
                initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="card-base p-5 group cursor-default">

                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="font-mono text-xs tracking-widest uppercase text-gray-400">{cat}</span>
                </div>

                <div className="space-y-3">
                  {catSkills.map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className=" font-semibold text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="font-mono text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                        <motion.div className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                          initial={{ width: 0 }}
                          animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-4">
          <Marquee items={row1} speed={40} />
          <Marquee items={row2} speed={32} reverse />
        </motion.div>
      </div>
    </section>
  )
}
