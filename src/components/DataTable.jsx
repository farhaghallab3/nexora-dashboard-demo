import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { orders } from '../data/mockData'
import StatusBadge from './StatusBadge'
import { useLanguage } from '../context/LanguageContext'

const STATUS_FILTERS = ['all', 'active', 'pending', 'completed']

export default function DataTable() {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { style: 'currency', currency: 'USD' }),
    [lang]
  )
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [lang]
  )

  const filtered = useMemo(() => {
    let rows = orders.filter((o) => o.name[lang].toLowerCase().includes(search.toLowerCase()))
    if (statusFilter !== 'all') rows = rows.filter((o) => o.status === statusFilter)

    rows = [...rows].sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]
      if (sortKey === 'name') {
        av = a.name[lang]
        bv = b.name[lang]
      }
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })

    return rows
  }, [search, statusFilter, sortKey, sortDir, lang])

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }) {
    if (sortKey !== column) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-300" />
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-accent-600" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-accent-600" />
    )
  }

  const columns = [
    { key: 'name', label: t('dashboard.table.columns.name') },
    { key: 'status', label: t('dashboard.table.columns.status') },
    { key: 'date', label: t('dashboard.table.columns.date') },
    { key: 'amount', label: t('dashboard.table.columns.amount') },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('dashboard.table.title')}</h3>
          <p className="text-sm text-slate-500 mt-0.5 dark:text-slate-400">{t('dashboard.table.subtitle')}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('dashboard.table.searchPlaceholder')}
              className="w-full sm:w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 ps-9 pe-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? t('dashboard.table.filterAll') : t(`status.${s}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-start">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 sm:px-6 font-medium">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1.5 hover:text-slate-600 transition-colors dark:hover:text-slate-300"
                  >
                    {col.label}
                    <SortIcon column={col.key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <td className="px-5 py-3.5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-semibold text-accent-700 dark:bg-accent-900/50 dark:text-accent-400">
                      {row.name[lang].charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{row.name[lang]}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 sm:px-6">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-5 py-3.5 sm:px-6 text-sm text-slate-500 dark:text-slate-400">
                  {dateFormatter.format(new Date(row.date))}
                </td>
                <td className="px-5 py-3.5 sm:px-6 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {currencyFormatter.format(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            {t('dashboard.table.noResults')}
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3.5 sm:px-6 text-xs text-slate-400 dark:border-slate-800">
          {t('dashboard.table.showing', { count: filtered.length, total: orders.length })}
        </div>
      )}
    </div>
  )
}
