import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import type { Profile } from '../lib/supabase'

export default function Contact({ profile }: { profile: Profile }) {
  const { ref, visible } = useScrollReveal()

  const contacts = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
    { icon: Github, label: 'GitHub', value: 'MohammedYousufCode', href: profile.github },
    { icon: Linkedin, label: 'LinkedIn', value: 'mohammed-yousuf-aiml', href: profile.linkedin },
  ]

  return (
    <section id="contact" className="relative z-10 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title font-playfair">Contact</h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: CTA */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <h3 className=" font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-4">
              Open to{' '}
              <span className="shimmer-text">opportunities</span>
            </h3>
            <p className="body-text text-base mb-6">
              I'm actively looking for Data Analyst or Junior Data Analyst roles in Bangalore or Hyderabad. Available from <strong className="text-yellow-600 dark:text-yellow-400">{profile.available_from}</strong>. Let's connect!
            </p>
            <a href={`mailto:${profile.email}`} className="btn-gold inline-flex items-center gap-2">
              <Mail size={14} /> Send Email
            </a>
          </motion.div>

          {/* Right: Contact cards */}
          <div className="space-y-3">
            {contacts.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: 30 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="card-base p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                      <Icon size={15} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-gray-400 tracking-widest uppercase">{label}</div>
                      <div className=" font-semibold text-gray-700 dark:text-gray-200 text-sm">{value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="card-base p-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                      <Icon size={15} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-gray-400 tracking-widest uppercase">{label}</div>
                      <div className=" font-semibold text-gray-700 dark:text-gray-200 text-sm">{value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-gray-400 tracking-widest">
            © {new Date().getFullYear()} MOHAMMED YOUSUF — BUILT WITH AI
          </span>
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--gold)' }}>
            OPEN TO WORK
          </span>
        </motion.div>
      </div>
    </section>
  )
}
