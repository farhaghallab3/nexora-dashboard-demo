import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle({ variant = 'default' }) {
  const { lang, changeLanguage } = useLanguage()

  const baseBtn = 'px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors'

  if (variant === 'compact') {
    return (
      <button
        onClick={() => changeLanguage(lang === 'en' ? 'ar' : 'en')}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-accent-300 hover:text-accent-600 transition-colors"
      >
        <Languages className="h-3.5 w-3.5" />
        {lang === 'en' ? 'العربية' : 'English'}
      </button>
    )
  }

  return (
    <div className="inline-flex items-center rounded-lg bg-slate-100 p-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`${baseBtn} ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`${baseBtn} ${lang === 'ar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        عربي
      </button>
    </div>
  )
}
