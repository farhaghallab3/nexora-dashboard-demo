import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Clock, TrendingUp } from 'lucide-react'

const ICONS = {
  revenue: DollarSign,
  customers: Users,
  pending: Clock,
  growth: TrendingUp,
}

export default function StatCard({ card }) {
  const { t } = useTranslation()
  const Icon = ICONS[card.key]
  const isUp = card.trend === 'up'

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{t(`dashboard.stats.${card.key}`)}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 tracking-tight">{card.value}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-100">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm">
        <span className={`flex items-center gap-0.5 font-medium ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {card.delta}
        </span>
        <span className="text-slate-400">{t('dashboard.stats.vsLastMonth')}</span>
      </div>
    </div>
  )
}
