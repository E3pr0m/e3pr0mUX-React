import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tagColors = {
  'Web Dev': { bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.4)', text: '#a855f7' },
  'AI/Automation': { bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.4)', text: '#06b6d4' },
  'Design': { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)', text: '#ec4899' },
}

export default function Portfolio() {
  const { t, i18n } = useTranslation('sections')
  const sectionRef = useRef()
  const items = t('portfolio.items', { returnObjects: true })
  const filters = t('portfolio.filters', { returnObjects: true })

  const [active, setActive] = useState(filters[0])

  const filtered = active === filters[0]
    ? items
    : items.filter(item => {
        if (i18n.language === 'it') {
          return item.category === active || item.tag === active
        }
        return item.tag === active || item.category === active
      })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #06b6d4, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="portfolio-header opacity-0 text-center mb-16">
          <span className="section-tag">{t('portfolio.tag')}</span>
          <h2
            className="font-mono font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {t('portfolio.title')}
          </h2>
          <p className="text-white/40 text-lg mb-10">{t('portfolio.subtitle')}</p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="font-mono text-xs uppercase tracking-widest px-5 py-2 border transition-all duration-300"
                style={{
                  borderColor: active === f ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                  color: active === f ? '#06b6d4' : 'rgba(255,255,255,0.4)',
                  background: active === f ? 'rgba(6,182,212,0.1)' : 'transparent',
                  boxShadow: active === f ? '0 0 20px rgba(6,182,212,0.2)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const colors = tagColors[item.tag] || tagColors['Web Dev']
              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative card-cyber overflow-hidden cursor-pointer"
                  data-cursor
                >
                  {/* Placeholder visual */}
                  <div
                    className="relative h-48 mb-5 overflow-hidden rounded-none"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {/* Animated grid lines */}
                    <div className="absolute inset-0 cyber-grid-bg opacity-40" />
                    {/* Number */}
                    <div
                      className="absolute inset-0 flex items-center justify-center font-mono text-[80px] font-bold opacity-5"
                      style={{ color: '#7c3aed' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(124,58,237,0.15)' }}
                    >
                      <span className="font-mono text-xs text-accent uppercase tracking-widest border border-accent/30 px-4 py-2">
                        View Project →
                      </span>
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="mb-3">
                    <span
                      className="font-mono text-xs uppercase tracking-widest px-3 py-1 border"
                      style={{ background: colors.bg, borderColor: colors.border, color: colors.text }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-white text-lg mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
