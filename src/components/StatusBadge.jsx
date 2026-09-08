import { useTranslation } from 'react-i18next'

const STYLES = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-400/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-400/20',
  completed: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-950/40 dark:text-sky-400 dark:ring-sky-400/20',
}

const DOT_STYLES = {
  active: 'bg-emerald-500',
  pending: 'bg-amber-500',
  completed: 'bg-sky-500',
}

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]}`} />
      {t(`status.${status}`)}
    </span>
  )
}
