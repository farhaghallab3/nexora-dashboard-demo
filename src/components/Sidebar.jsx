import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, X, Hexagon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { key: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
  { key: 'customers', path: '/customers', icon: Users },
  { key: 'reports', path: '/reports', icon: BarChart3 },
  { key: 'settings', path: '/settings', icon: Settings },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { t } = useTranslation()
  const { logout } = useAuth()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-64 shrink-0 flex-col border-e border-slate-200 bg-white transition-transform duration-200 ease-out lg:static lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900
        ${mobileOpen ? 'translate-x-0' : 'max-lg:-translate-x-full max-lg:rtl:translate-x-full'}`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white">
              <Hexagon className="h-[18px] w-[18px]" fill="currentColor" fillOpacity={0.15} />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">{t('app.name')}</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
            {t('nav.logout')}
          </button>
        </div>
      </aside>
    </>
  )
}
