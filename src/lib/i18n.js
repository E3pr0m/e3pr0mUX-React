import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '@/i18n/en/common.json'
import enSections from '@/i18n/en/sections.json'
import itCommon from '@/i18n/it/common.json'
import itSections from '@/i18n/it/sections.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, sections: enSections },
      it: { common: itCommon, sections: itSections },
    },
    defaultNS: 'common',
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
