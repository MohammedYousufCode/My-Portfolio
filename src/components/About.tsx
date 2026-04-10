import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BarChart2, Database, LineChart } from 'lucide-react'
import type { Profile } from '../lib/supabase'

const what = [
  { icon: BarChart2, title: 'Data Analysis', desc: 'Cleaning, wrangling, and extracting actionable insights from complex datasets using Python & Pandas.' },
  { icon: LineChart, title: 'Visualization', desc: 'Building clear, compelling visuals with Matplotlib, Seaborn, and Power BI that drive decisions.' },
  { icon: Database, title: 'SQL & Databases', desc: 'Writing efficient queries, joins, and subqueries in PostgreSQL to answer real business questions.' },
]

export default function About({ profile }: { profile: Profile }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="about" className="relative z-10 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="section-label">About Me</p>
          <h2 className="section-title font-playfair">Who I Am</h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="body-text text-lg mb-6 ">
              {profile.bio}
            </p>
            <p className="body-text text-base mb-8 ">
              Currently pursuing <span className="text-yellow-600 dark:text-yellow-400 font-semibold">BCA at NIE First Grade College, Mysore</span> with a CGPA of <span className="text-yellow-600 dark:text-yellow-400 font-semibold">{profile.cgpa}/10</span>. Open to remote and relocation to Bangalore or Hyderabad from {profile.available_from}.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'Pandas', 'Power BI', 'PostgreSQL'].map(s => (
                <span key={s} className="font-mono text-xs px-3 py-1.5 rounded border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 tracking-widest">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="grid gap-4" initial={{ opacity: 0, x: 30 }} animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}>
            {what.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="card-base p-5 flex gap-4 cursor-default group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                  bg-yellow-50 dark:bg-white/5 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/20">
                  <Icon size={18} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className=" font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="body-text text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
