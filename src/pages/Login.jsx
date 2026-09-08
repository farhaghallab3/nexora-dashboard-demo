import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Hexagon, Mail, Lock, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LanguageToggle from '../components/LanguageToggle'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    login()
    navigate('/dashboard')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="pointer-events-none absolute -top-32 start-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-900/20" />

      <div className="absolute top-5 end-5 z-10">
        <LanguageToggle />
      </div>

      <div className="relative w-full max-w-sm animate-fade-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600 text-white shadow-lg shadow-accent-600/25">
            <Hexagon className="h-6 w-6" fill="currentColor" fillOpacity={0.15} />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{t('app.name')}</h1>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{t('app.tagline')}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('login.welcome')}</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6 dark:text-slate-400">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('login.email')}</label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 ps-9 pe-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 ps-9 pe-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-400 dark:border-slate-600 dark:bg-slate-800" />
                {t('login.rememberMe')}
              </label>
              <button type="button" className="font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300">
                {t('login.forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-600/20 transition-colors hover:bg-accent-700 active:bg-accent-800"
            >
              {t('login.signIn')}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-accent-50 p-3 text-xs text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{t('login.demoNotice')}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {t('login.noAccount')}{' '}
          <button className="font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300">{t('login.signUp')}</button>
        </p>
      </div>
    </div>
  )
}
