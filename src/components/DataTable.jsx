import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { orders } from '../data/mockData'
import StatusBadge from './StatusBadge'
import RecordsTable from './RecordsTable'
import { useLanguage } from '../context/LanguageContext'

const STATUSES = ['active', 'pending', 'completed']

export default function DataTable() {
  const { t } = useTranslation()
  const { lang } = useLanguage()

  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { style: 'currency', currency: 'USD' }),
    [lang]
  )
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [lang]
  )

  const columns = [
    {
      key: 'name',
      label: t('dashboard.table.columns.name'),
      sortValue: (o) => o.name[lang],
      render: (o) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-semibold text-accent-700 dark:bg-accent-900/50 dark:text-accent-400">
            {o.name[lang].charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{o.name[lang]}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: t('dashboard.table.columns.status'),
      sortValue: (o) => o.status,
      render: (o) => <StatusBadge status={o.status} />,
    },
    {
      key: 'date',
      label: t('dashboard.table.columns.date'),
      sortValue: (o) => o.date,
      render: (o) => (
        <span className="text-sm text-slate-500 dark:text-slate-400">{dateFormatter.format(new Date(o.date))}</span>
      ),
    },
    {
      key: 'amount',
      label: t('dashboard.table.columns.amount'),
      sortValue: (o) => o.amount,
      render: (o) => (
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {currencyFormatter.format(o.amount)}
        </span>
      ),
    },
  ]

  return (
    <RecordsTable
      data={orders}
      columns={columns}
      rowKey={(o) => o.id}
      getSearchText={(o) => o.name[lang]}
      searchPlaceholder={t('dashboard.table.searchPlaceholder')}
      statusOptions={STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
      getStatus={(o) => o.status}
      filterAllLabel={t('dashboard.table.filterAll')}
      title={t('dashboard.table.title')}
      subtitle={t('dashboard.table.subtitle')}
      noResultsLabel={t('dashboard.table.noResults')}
      showingLabel={(count, total) => t('dashboard.table.showing', { count, total })}
      defaultSortKey="date"
      defaultSortDir="desc"
    />
  )
}
