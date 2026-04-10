import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Award, ExternalLink } from 'lucide-react'
import type { Certification } from '../lib/supabase'

// Colors visible in BOTH dark and light modes
const issuerColor: Record<string, string> = {
  'freeCodeCamp': '#4ade80',   // green - visible on both
  'Kaggle': '#38bdf8',          // sky blue
  'Udemy': '#fb923c',           // orange
}

export default function Certifications({ certs }: { certs: Certification[] }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="certifications" className="relative z-10 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title font-playfair">Certifications</h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div key={cert.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card-base p-5 group cursor-default relative overflow-hidden">

              {/* Shimmer stripe on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className=" font-bold text-gray-900 dark:text-white text-base leading-tight mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs tracking-wider"
                      style={{ color: issuerColor[cert.issuer] || 'var(--cyan)' }}>
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-xs text-gray-400">{cert.date}</span>
                  </div>
                </div>
              </div>

              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noreferrer"
                  className="mt-3 flex items-center gap-1 font-mono text-xs text-gray-400 hover:text-yellow-500 transition-colors">
                  <ExternalLink size={11} /> View Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}