import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User, Moon, Mail } from 'lucide-react'
import { currentUser } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import LanguageToggle from '../components/LanguageToggle'

const INPUT_CLASS =
  'w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-700 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-accent-600' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <span
        className={`absolute start-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform
        ${checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

export default function Settings() {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const { showToast } = useToast()

  const [fullName, setFullName] = useState(currentUser.fullName[lang])
  const [emailNotifs, setEmailNotifs] = useState(true)

  function handleSave(e) {
    e.preventDefault()
    showToast(t('settings.saveSuccess'))
  }

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{t('settings.title')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('settings.subtitle')}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">{t('settings.profile')}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.profileSubtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.fullName')}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.email')}</label>
              <input type="email" defaultValue={currentUser.email} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.role')}</label>
              <input type="text" defaultValue={currentUser.role[lang]} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.company')}</label>
              <input type="text" defaultValue={currentUser.company[lang]} className={INPUT_CLASS} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400">
              <Moon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">{t('settings.preferences')}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.preferencesSubtitle')}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.language')}</span>
              <LanguageToggle />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.emailNotifications')}</p>
                  <p className="text-xs text-slate-400">{t('settings.emailNotificationsDesc')}</p>
                </div>
              </div>
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.darkMode')}</p>
                  <p className="text-xs text-slate-400">{t('settings.darkModeDesc')}</p>
                </div>
              </div>
              <Toggle checked={isDark} onChange={toggleTheme} />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-600/20 transition-colors hover:bg-accent-700 active:bg-accent-800"
          >
            {t('settings.save')}
          </button>
        </div>
      </form>
    </div>
  )
}
