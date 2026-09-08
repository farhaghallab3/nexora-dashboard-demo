import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

const stored = typeof window !== 'undefined' ? localStorage.getItem('nexora-lang') : null
const initialLang = stored || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export const RTL_LANGUAGES = ['ar']

export function applyDocumentDirection(lang) {
  const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lang)
}

applyDocumentDirection(initialLang)

export default i18n
