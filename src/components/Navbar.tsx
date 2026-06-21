import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, Settings } from 'lucide-react'
import { useTheme } from '../lib/theme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const goldColor = theme === 'dark' ? '#C9A84C' : '#8b6914'

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  // One-time theme toggle hint — fires 2s after first ever visit
  useEffect(() => {
    const seen = localStorage.getItem('theme-hint-seen')
    if (seen) return
    const t = setTimeout(() => {
      setShowHint(true)
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setShowHint(false)
        localStorage.setItem('theme-hint-seen', '1')
      }, 4000)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  const handleToggle = () => {
    // If user clicks while hint is showing, dismiss hint immediately
    if (showHint) {
      setShowHint(false)
      localStorage.setItem('theme-hint-seen', '1')
    }
    toggle()
  }

  return (
    <>
      {/* Pulse keyframe injected once */}
      <style>{`
        @keyframes theme-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.7); }
          50%  { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }
        .theme-btn-pulse {
          animation: theme-pulse 1s ease-out infinite;
          border-color: #C9A84C !important;
          color: #C9A84C !important;
        }
        @keyframes hint-pop {
          0%   { opacity: 0; transform: translateY(4px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hint-pop {
          animation: hint-pop 0.25s ease-out forwards;
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-nav/90 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-10 h-14 md:h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="font-playfair text-sm font-bold tracking-widest"
            style={{ color: goldColor }}>
            M.YOUSUF
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  className="font-mono text-xs tracking-[2px] uppercase text-gray-500 dark:text-gray-400
                    hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200
                    relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px
                    after:bg-yellow-500 after:transition-all hover:after:w-full">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Theme toggle with hint */}
            <div className="relative">
              <button
                onClick={handleToggle}
                title="Toggle Light/Dark Mode"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 text-gray-600 dark:text-gray-300
                  ${showHint
                    ? 'theme-btn-pulse border-yellow-500'
                    : 'border-gray-200 dark:border-white/10 hover:border-yellow-500'
                  }`}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Tooltip hint */}
              {showHint && (
                <div className="hint-pop absolute top-11 right-0 z-50 pointer-events-none">
                  {/* Arrow */}
                  <div className="absolute -top-1.5 right-3.5 w-3 h-3 rotate-45"
                    style={{ background: 'var(--gold, #C9A84C)', opacity: 0.95 }} />
                  <div
                    className="relative whitespace-nowrap rounded-lg px-3 py-2 text-xs font-mono tracking-wide shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #1a1208, #2a1f0a)',
                      border: '1px solid rgba(201,168,76,0.5)',
                      color: '#C9A84C',
                    }}
                  >
                    ☀️ Try light mode
                  </div>
                </div>
              )}
            </div>

            {/* Admin toggle */}
            <a href="/admin"
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center
                hover:border-yellow-500 transition-colors duration-200 text-gray-400 hover:text-yellow-500"
              title="Admin Panel">
              <Settings size={15} />
            </a>

            <button onClick={() => setOpen(o => !o)} className="md:hidden text-gray-600 dark:text-gray-300 ml-1">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white dark:bg-dark-nav border-t border-gray-100 dark:border-white/5 px-6 pb-6 pt-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm tracking-widest uppercase text-gray-600 dark:text-gray-300
                  border-b border-gray-100 dark:border-white/5 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="/admin" className="block py-3 font-mono text-sm tracking-widest uppercase
              text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-2 mt-1">
              <Settings size={14} /> Admin Panel
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
