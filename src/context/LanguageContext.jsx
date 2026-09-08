import { createContext, useContext, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { applyDocumentDirection, RTL_LANGUAGES } from '../i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language || 'en')

  const changeLanguage = useCallback((next) => {
    i18n.changeLanguage(next)
    applyDocumentDirection(next)
    localStorage.setItem('nexora-lang', next)
    setLang(next)
  }, [i18n])

  const toggleLanguage = useCallback(() => {
    changeLanguage(lang === 'en' ? 'ar' : 'en')
  }, [lang, changeLanguage])

  const isRTL = RTL_LANGUAGES.includes(lang)

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
