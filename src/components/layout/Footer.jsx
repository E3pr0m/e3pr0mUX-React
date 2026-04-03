import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-mono font-bold text-xl mb-3">
              <span className="text-accent">E3</span>
              <span className="text-white">pr0m</span>
              <span className="text-primary">-UX</span>
            </div>
            <p className="text-white/40 text-sm font-mono">{t('footer.tagline')}</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['about', 'services', 'portfolio', 'pricing', 'contact'].map(k => (
                <li key={k}>
                  <a href={`#${k}`} className="text-white/40 hover:text-accent text-sm font-mono uppercase tracking-wider transition-colors">
                    {t(`nav.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Contact</h4>
            <p className="text-white/40 text-sm font-mono">hello@e3pr0m-ux.com</p>
            <p className="text-white/40 text-sm font-mono mt-1">Remote-first · Worldwide</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-mono">
            © {year} E3pr0m-UX. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-accent text-xs font-mono transition-colors">
              {t('footer.links.privacy')}
            </a>
            <a href="#" className="text-white/20 hover:text-accent text-xs font-mono transition-colors">
              {t('footer.links.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
