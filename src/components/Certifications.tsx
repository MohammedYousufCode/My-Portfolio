import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../lib/theme'
import { Award, ExternalLink } from 'lucide-react'
import type { Certification } from '../lib/supabase'

// Colors visible in BOTH dark and light modes
const issuerColor: Record<string, { light: string; dark: string }> = {
  'freeCodeCamp': { light: '#15803d', dark: '#4ade80' },   // green
  'Kaggle': { light: '#0369a1', dark: '#38bdf8' },          // sky blue
  'Udemy': { light: '#92400e', dark: '#fb923c' },           // orange
}

export default function Certifications({ certs }: { certs: Certification[] }) {
  const { ref, visible } = useScrollReveal()
  const { theme } = useTheme()

  const getIssuerColor = (issuer: string) => {
    const colors = issuerColor[issuer] || { light: '#0a8fa0', dark: '#4FC3F7' }
    return theme === 'dark' ? colors.dark : colors.light
  }

  const goldColor = theme === 'dark' ? '#C9A84C' : '#8b6914'

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
                style={{ background: `linear-gradient(90deg, transparent, ${goldColor}, transparent)` }} />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <Award size={18} style={{ color: goldColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className=" font-bold text-gray-900 dark:text-white text-base leading-tight mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs tracking-wider"
                      style={{ color: getIssuerColor(cert.issuer) }}>
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{cert.date}</span>
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