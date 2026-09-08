import { useTranslation } from 'react-i18next'
import { Menu, Search } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import NotificationsDropdown from './NotificationsDropdown'
import { currentUser } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

export default function Topbar({ onMenuClick }) {
  const { t } = useTranslation()
  const { lang } = useLanguage()

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-sm sm:block">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={t('topbar.search')}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 ps-9 pe-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        <LanguageToggle variant="compact" />

        <NotificationsDropdown />

        <div className="flex items-center gap-2.5 border-s border-slate-200 ps-3 dark:border-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 text-sm font-semibold text-white">
            {currentUser.fullName[lang].charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800 leading-tight dark:text-slate-200">{currentUser.fullName[lang]}</p>
            <p className="text-xs text-slate-400 leading-tight">{currentUser.role[lang]}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
