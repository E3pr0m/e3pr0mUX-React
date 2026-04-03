import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import gsap from 'gsap'
import FloatingGeometry from '@/components/three/FloatingGeometry'
import GlitchText from '@/components/ui/GlitchText'
import NeonButton from '@/components/ui/NeonButton'

const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, area: 900 } },
    color: { value: ['#7c3aed', '#06b6d4', '#a855f7'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 0.5 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      distance: 130,
      color: '#7c3aed',
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      random: true,
      out_mode: 'out',
    },
  },
  detectRetina: true,
}

export default function Hero() {
  const { t } = useTranslation('sections')
  const tagRef = useRef()
  const h1Ref = useRef()
  const subRef = useRef()
  const btnRef = useRef()
  const scrollRef = useRef()

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(h1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2')
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden scanline-overlay">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="hero-particles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0"
        />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 cyber-grid-bg z-0 opacity-60" />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ background: '#7c3aed' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: '#06b6d4' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-20">
        {/* Text Column */}
        <div>
          <div ref={tagRef} className="opacity-0">
            <span className="section-tag">{t('hero.tag')}</span>
          </div>

          <h1 ref={h1Ref} className="opacity-0 font-mono font-bold leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            <GlitchText
              text={t('hero.headline')}
              className="block text-white"
            />
            <span
              className="block neon-text"
              style={{ color: '#06b6d4' }}
            >
              {t('hero.headline2')}
            </span>
          </h1>

          <p ref={subRef} className="opacity-0 text-white/50 text-lg leading-relaxed mb-10 max-w-md">
            {t('hero.sub')}
          </p>

          <div ref={btnRef} className="opacity-0 flex flex-wrap gap-4">
            <NeonButton href="#portfolio" variant="primary">
              {t('hero.cta_primary')}
            </NeonButton>
            <NeonButton href="#contact" variant="outline">
              {t('hero.cta_secondary')}
            </NeonButton>
          </div>
        </div>

        {/* 3D Column */}
        <div className="hidden md:block h-[500px]">
          <FloatingGeometry />
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
          {t('hero.scroll')}
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, #7c3aed, transparent)' }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </section>
  )
}
