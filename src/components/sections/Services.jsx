import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  Code: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Cpu: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.5} />
      <rect x="9" y="9" width="6" height="6" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  ),
  Palette: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.28-.22-.5-.5-.5H13c-2.76 0-5-2.24-5-5s2.24-5 5-5h5.5c.28 0 .5-.22.5-.5V8c0-3.31-2.69-6-6-6z" />
    </svg>
  ),
  Package: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
}

export default function Services() {
  const { t } = useTranslation('sections')
  const sectionRef = useRef()
  const items = t('services.items', { returnObjects: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-32 cyber-grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-tag">{t('services.tag')}</span>
          <h2
            className="font-mono font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {t('services.title')}
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{t('services.subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={i}
                className="service-card card-cyber group opacity-0"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div
                  className="inline-flex p-3 rounded-none mb-5 text-accent transition-all duration-300 group-hover:text-white"
                  style={{
                    border: '1px solid rgba(6,182,212,0.3)',
                    background: 'rgba(6,182,212,0.05)',
                  }}
                >
                  {Icon && <Icon />}
                </div>

                {/* Number */}
                <div className="font-mono text-xs text-white/20 mb-2">0{i + 1}</div>

                <h3 className="font-mono font-bold text-white text-lg mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
