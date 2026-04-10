import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
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

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-dark-nav/90 backdrop-blur-md shadow-lg shadow-black/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="font-playfair text-sm font-bold tracking-widest"
          style={{ color: 'var(--gold)' }}>
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
        <div className="flex items-center gap-3">
          <button onClick={toggle}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center
              hover:border-yellow-500 transition-colors duration-200 text-gray-600 dark:text-gray-300">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setOpen(o => !o)} className="md:hidden text-gray-600 dark:text-gray-300">
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
        </div>
      )}
    </nav>
  )
}
