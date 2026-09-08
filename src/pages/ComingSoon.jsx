import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Construction, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ComingSoon({ titleKey }) {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const navigate = useNavigate()
  const BackIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-fade-in">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400">
        <Construction className="h-8 w-8" />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
        {titleKey ? t(titleKey) : ''} — {t('comingSoon.title')}
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t('comingSoon.subtitle')}</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-accent-300 hover:text-accent-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-accent-500 dark:hover:text-accent-400"
      >
        <BackIcon className="h-4 w-4" />
        {t('comingSoon.back')}
      </button>
    </div>
  )
}
