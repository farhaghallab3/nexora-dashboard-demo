import { useTranslation } from 'react-i18next'
import { DollarSign, Users, Clock, TrendingUp } from 'lucide-react'
import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import DataTable from '../components/DataTable'
import { statCards } from '../data/mockData'

const ICONS = {
  revenue: DollarSign,
  customers: Users,
  pending: Clock,
  growth: TrendingUp,
}

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight dark:text-white">{t('dashboard.title')}</h1>
        <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard
            key={card.key}
            label={t(`dashboard.stats.${card.key}`)}
            value={card.value}
            delta={card.delta}
            trend={card.trend}
            icon={ICONS[card.key]}
          />
        ))}
      </div>

      <RevenueChart />

      <DataTable />
    </div>
  )
}
