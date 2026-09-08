import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell, ShoppingCart, UserPlus, Wallet, FileBarChart, AlertTriangle } from 'lucide-react'
import { notifications as initialNotifications } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const ICONS = {
  order: ShoppingCart,
  customer: UserPlus,
  payment: Wallet,
  report: FileBarChart,
  alert: AlertTriangle,
}

export default function NotificationsDropdown() {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initialNotifications)
  const containerRef = useRef(null)

  const unreadCount = items.filter((n) => !n.read).length

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label={t('notifications.title')}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white dark:ring-slate-900">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-40 mt-2 w-80 max-w-[90vw] animate-fade-in rounded-2xl border border-slate-200 bg-white shadow-lg sm:w-96 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t('notifications.title')}</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                {t('notifications.markAllRead')}
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.map((n) => {
              const Icon = ICONS[n.type]
              return (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-start transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.title[lang]}</p>
                      {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{n.message[lang]}</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{n.time[lang]}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
