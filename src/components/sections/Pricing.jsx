import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const { t } = useTranslation('sections')
  const [annual, setAnnual] = useState(false)
  const sectionRef = useRef()

  const plans = t('pricing.plans', { returnObjects: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="relative py-32 cyber-grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag">{t('pricing.tag')}</span>
          <h2
            className="font-mono font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {t('pricing.title')}
          </h2>
          <p className="text-white/40 text-lg mb-8">{t('pricing.subtitle')}</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-mono text-sm ${!annual ? 'text-white' : 'text-white/40'}`}>
              {t('pricing.toggle_monthly')}
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-all duration-300"
              style={{ background: annual ? '#7c3aed' : 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 rounded-full bg-white"
                animate={{ x: annual ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`font-mono text-sm ${annual ? 'text-white' : 'text-white/40'}`}>
              {t('pricing.toggle_annual')}
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-xs text-green-400 border border-green-400/30 px-2 py-0.5"
              >
                {t('pricing.discount')}
              </motion.span>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className="pricing-grid grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const isPopular = plan.popular
            const price = annual ? plan.price_annual : plan.price_monthly
            const isCustom = price === 'Custom'

            return (
              <div
                key={i}
                className="pricing-card opacity-0 relative"
                style={{
                  border: `1px solid ${isPopular ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.08)'}`,
                  background: isPopular ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  boxShadow: isPopular ? '0 0 40px rgba(124,58,237,0.2)' : 'none',
                }}
              >
                {isPopular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest px-4 py-1"
                    style={{ background: '#7c3aed', color: '#fff' }}
                  >
                    {t('pricing.popular')}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="font-mono font-bold text-white text-xl mb-2">{plan.name}</h3>
                  <p className="text-white/40 text-sm mb-6">{plan.desc}</p>

                  <div className="mb-8">
                    {isCustom ? (
                      <span className="font-mono font-bold text-4xl text-white">Custom</span>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="font-mono text-lg text-white/40">€</span>
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-mono font-bold text-4xl text-white"
                        >
                          {price}
                        </motion.span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm">
                        <span className="text-accent flex-shrink-0">▸</span>
                        <span className="text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={isCustom || !isPopular ? 'btn-cyber-outline w-full text-center block' : 'btn-cyber w-full text-center block'}
                  >
                    {isCustom ? t('pricing.cta_custom') : t('pricing.cta')}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
