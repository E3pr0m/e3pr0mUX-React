import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ target, label }) {
  const numRef = useRef()

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const isNumeric = !isNaN(parseInt(target))
    const suffix = target.replace(/[0-9]/g, '')
    const numValue = parseInt(target) || 0

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (isNumeric) {
          gsap.fromTo(
            { val: 0 },
            {
              val: numValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = Math.round(this.targets()[0].val) + suffix
              },
            }
          )
        }
      },
    })
  }, [target])

  return (
    <div className="text-center">
      <div
        ref={numRef}
        className="font-mono font-bold text-4xl md:text-5xl neon-text mb-2"
        style={{ color: '#06b6d4' }}
      >
        {target}
      </div>
      <div className="text-white/40 text-sm font-mono uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  const { t } = useTranslation('sections')
  const sectionRef = useRef()
  const textRef = useRef()
  const statsRef = useRef()

  const stats = t('about.stats', { returnObjects: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on section
      gsap.to('.about-parallax', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Text reveal
      gsap.fromTo(
        textRef.current.querySelectorAll('.reveal-item'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Parallax background blob */}
      <div
        className="about-parallax absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, #06b6d4)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <span className="reveal-item section-tag opacity-0">
              {t('about.tag')}
            </span>
            <h2
              className="reveal-item opacity-0 font-mono font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              {t('about.title')}
            </h2>
            <p className="reveal-item opacity-0 text-white/50 leading-relaxed text-lg">
              {t('about.body')}
            </p>

            {/* Decorative line */}
            <div className="reveal-item opacity-0 mt-8 flex items-center gap-4">
              <div className="w-12 h-px" style={{ background: '#06b6d4' }} />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">Est. 2019</span>
            </div>
          </div>

          {/* Code block decoration */}
          <div className="hidden md:block">
            <div
              className="card-cyber font-mono text-sm leading-7 text-white/30"
              style={{ borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28ca41' }} />
              </div>
              <div><span className="text-primary">const</span> <span className="text-accent">agency</span> = {'{'}</div>
              <div className="pl-4"><span className="text-white/50">name</span>: <span className="text-yellow-400">'E3pr0m-UX'</span>,</div>
              <div className="pl-4"><span className="text-white/50">stack</span>: [<span className="text-yellow-400">'React'</span>, <span className="text-yellow-400">'AI'</span>, <span className="text-yellow-400">'Design'</span>],</div>
              <div className="pl-4"><span className="text-white/50">mission</span>: <span className="text-yellow-400">'build the future'</span>,</div>
              <div className="pl-4"><span className="text-white/50">clients</span>: <span className="text-accent">worldwide</span>,</div>
              <div className="pl-4"><span className="text-white/50">quality</span>: <span className="text-green-400">Infinity</span>,</div>
              <div>{'}'}</div>
              <div className="mt-2 text-white/20">// Always shipping ✓</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s, i) => (
            <AnimatedCounter key={i} target={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
