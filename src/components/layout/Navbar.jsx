import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation('common')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it')
  }

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'pricing', href: '#pricing' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,0,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono font-bold text-lg tracking-tight">
          <span className="text-accent">E3</span>
          <span className="text-white">pr0m</span>
          <span className="text-primary">-UX</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-accent transition-colors duration-300"
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-accent transition-colors"
          >
            {t('lang.switch')}
          </button>

          <a
            href="#contact"
            className="hidden md:block btn-cyber text-xs py-2 px-5"
          >
            {t('nav.cta')}
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 border-b border-primary/20"
            style={{ background: 'rgba(10,0,16,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="px-6 py-6 flex flex-col gap-6">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-cyber inline-block text-xs py-2 px-5">
                  {t('nav.cta')}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
