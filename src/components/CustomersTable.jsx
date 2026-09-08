import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { customers } from '../data/mockData'
import StatusBadge from './StatusBadge'
import RecordsTable from './RecordsTable'
import { useLanguage } from '../context/LanguageContext'

const STATUSES = ['active', 'pending', 'inactive']

export default function CustomersTable() {
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
      label: t('customers.table.columns.name'),
      sortValue: (c) => c.name[lang],
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-semibold text-accent-700 dark:bg-accent-900/50 dark:text-accent-400">
            {c.name[lang].charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.name[lang]}</p>
            <p className="text-xs text-slate-400" dir="ltr">{c.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: t('customers.table.columns.status'),
      sortValue: (c) => c.status,
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'joinedDate',
      label: t('customers.table.columns.joined'),
      sortValue: (c) => c.joinedDate,
      render: (c) => (
        <span className="text-sm text-slate-500 dark:text-slate-400">{dateFormatter.format(new Date(c.joinedDate))}</span>
      ),
    },
    {
      key: 'orders',
      label: t('customers.table.columns.orders'),
      sortValue: (c) => c.orders,
      render: (c) => <span className="text-sm text-slate-500 dark:text-slate-400">{c.orders}</span>,
    },
    {
      key: 'totalSpent',
      label: t('customers.table.columns.totalSpent'),
      sortValue: (c) => c.totalSpent,
      render: (c) => (
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {currencyFormatter.format(c.totalSpent)}
        </span>
      ),
    },
  ]

  return (
    <RecordsTable
      data={customers}
      columns={columns}
      rowKey={(c) => c.id}
      getSearchText={(c) => `${c.name[lang]} ${c.email}`}
      searchPlaceholder={t('customers.table.searchPlaceholder')}
      statusOptions={STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
      getStatus={(c) => c.status}
      filterAllLabel={t('customers.table.filterAll')}
      title={t('customers.table.title')}
      subtitle={t('customers.table.subtitle')}
      noResultsLabel={t('customers.table.noResults')}
      showingLabel={(count, total) => t('customers.table.showing', { count, total })}
      defaultSortKey="joinedDate"
      defaultSortDir="desc"
    />
  )
}
