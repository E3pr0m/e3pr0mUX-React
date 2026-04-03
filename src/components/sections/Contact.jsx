import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t } = useTranslation('sections')
  const sectionRef = useRef()
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting }, reset } = useForm()

  const budgetOptions = t('contact.form.budget_options', { returnObjects: true })

  const onSubmit = async (data) => {
    // Placeholder: replace with real form submission (e.g. formspree, emailjs, api)
    await new Promise(r => setTimeout(r, 1200))
    reset()
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-col',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputClass = `
    w-full bg-white/3 border border-white/10 px-4 py-3 font-mono text-sm text-white
    placeholder-white/20 outline-none transition-all duration-300
    focus:border-accent focus:bg-white/5
    [box-shadow:none] focus:[box-shadow:0_0_20px_rgba(6,182,212,0.15)]
  `

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[180px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, #06b6d4)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2
            className="font-mono font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            {t('contact.title')}
          </h2>
          <p className="text-white/40 text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="contact-col opacity-0 md:col-span-2 space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Email</div>
              <a
                href={`mailto:${t('contact.info.email')}`}
                className="text-white/60 hover:text-accent transition-colors font-mono text-sm"
              >
                {t('contact.info.email')}
              </a>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Location</div>
              <p className="text-white/60 font-mono text-sm">{t('contact.info.location')}</p>
            </div>

            {/* Social links placeholder */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Follow</div>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'X'].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="font-mono text-xs text-white/30 hover:text-accent border border-white/10 hover:border-accent/30 px-3 py-2 transition-all duration-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="font-mono text-xs text-green-400 uppercase tracking-widest">Available for projects</span>
            </div>
          </div>

          {/* Form */}
          <div className="contact-col opacity-0 md:col-span-3">
            {isSubmitSuccessful ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full gap-4 text-center py-20"
              >
                <div className="text-5xl">✓</div>
                <p className="font-mono text-accent text-lg">{t('contact.form.success')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <input
                      {...register('name', { required: true })}
                      placeholder={t('contact.form.name')}
                      className={inputClass}
                      style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                    />
                  </div>
                  <div>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder={t('contact.form.email')}
                      className={inputClass}
                      style={{ borderColor: errors.email ? '#ef4444' : undefined }}
                    />
                  </div>
                </div>

                <select
                  {...register('budget')}
                  className={inputClass}
                  style={{ appearance: 'none' }}
                >
                  <option value="" className="bg-[#0a0010]">{t('contact.form.budget')}</option>
                  {budgetOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-[#0a0010]">{opt}</option>
                  ))}
                </select>

                <textarea
                  {...register('message', { required: true })}
                  rows={6}
                  placeholder={t('contact.form.message')}
                  className={inputClass}
                  style={{ resize: 'none', borderColor: errors.message ? '#ef4444' : undefined }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cyber w-full flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border border-accent border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
