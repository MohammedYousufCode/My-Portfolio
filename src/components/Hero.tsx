import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Download } from 'lucide-react'
import type { Profile } from '../lib/supabase'

const roles = [
  'Data Analyst',
  'Python Developer',
  'SQL Enthusiast',
  'Insight Engineer',
]

export default function Hero({ profile }: { profile: Profile }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
      {/* Iron Man ambient glow */}
      <div className="hero-glow" />
      <div className="max-w-6xl w-full mx-auto">
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left: Text */}
          <div>
            <motion.p variants={item} className="section-label flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-cyan-400 inline-block" style={{ background: 'var(--cyan)' }} />
              Available from {profile.available_from}
            </motion.p>

            <motion.h1 variants={item}
              className="font-cinzel font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
              <span className="block text-gray-900 dark:text-white">Mohammed</span>
              <span className="block shimmer-text">Yousuf</span>
            </motion.h1>

            <motion.div variants={item} className="text-base md:text-lg mb-6 h-7 font-mono font-medium"
              style={{ color: 'var(--cyan)' }}>
              {displayed}<span className="cursor-blink" />
            </motion.div>

            <motion.p variants={item}
              className="body-text text-base md:text-lg mb-8 max-w-md">
              {profile.bio}
            </motion.p>

            <motion.div variants={item} className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-mono">
              <MapPin size={13} style={{ color: 'var(--gold)' }} />
              {profile.location}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-10">
              {profile.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-gold flex items-center gap-2">
                  <Download size={14} /> Resume
                </a>
              )}
              <a href="#contact" className="btn-gold" style={{ borderColor: 'rgba(79,195,247,0.4)', color: 'var(--cyan)' }}>
                Hire Me
              </a>
            </motion.div>

            {/* Social */}
            <motion.div variants={item} className="flex gap-4">
              {[
                { icon: Github, href: profile.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center
                    text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400
                    hover:border-yellow-500 transition-all duration-200 hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo / Avatar */}
          <motion.div variants={item} className="flex justify-center">
            <div className="relative w-48 h-48 md:w-72 md:h-72">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border border-yellow-500/20 animate-spin"
                style={{ animationDuration: '12s' }} />
              <div className="absolute inset-3 rounded-full border border-cyan-400/15 animate-spin"
                style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

              {/* Photo or fallback */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-2 animate-float"
                style={{ borderColor: 'var(--gold)', boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}>
                {profile.photo_url ? (
                  <img src={profile.photo_url} alt={profile.name}
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0a101e 0%, #131c35 100%)' }}>
                    <span className="name-heading text-4xl shimmer-text">MY</span>
                    <span className="font-mono text-xs tracking-widest mt-2" style={{ color: 'var(--cyan)' }}>
                      DATA ANALYST
                    </span>
                  </div>
                )}
              </div>

              {/* HUD corners */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5`}
                  style={{ borderColor: 'var(--gold)', opacity: 0.5,
                    borderTopWidth: i < 2 ? '1px' : '0', borderBottomWidth: i >= 2 ? '1px' : '0',
                    borderLeftWidth: i % 2 === 0 ? '1px' : '0', borderRightWidth: i % 2 !== 0 ? '1px' : '0' }} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden">
          {[
            { value: profile.cgpa, label: 'CGPA', suffix: '/10' },
            { value: profile.total_certs, label: 'Certifications', suffix: '+' },
            { value: '3', label: 'Portfolio Projects', suffix: '' },
            { value: profile.hackathon_prize, label: 'Hackathon', suffix: '' },
          ].map(({ value, label, suffix }) => (
            <div key={label}
              className="bg-gray-50 dark:bg-dark-card px-6 py-5 text-center hover:bg-yellow-50 dark:hover:bg-white/5 transition-colors">
              <div className="font-playfair font-bold text-xl md:text-2xl shimmer-text">
                {value}{suffix}
              </div>
              <div className="font-mono text-xs text-gray-400 tracking-widest uppercase mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
