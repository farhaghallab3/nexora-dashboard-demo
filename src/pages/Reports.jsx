import { useTranslation } from 'react-i18next'
import { Receipt, Repeat, ShoppingCart, Smile } from 'lucide-react'
import StatCard from '../components/StatCard'
import OrdersByStatusChart from '../components/OrdersByStatusChart'
import ChannelBreakdownChart from '../components/ChannelBreakdownChart'
import { reportStats } from '../data/mockData'

const ICONS = {
  avgOrderValue: Receipt,
  repeatRate: Repeat,
  totalOrders: ShoppingCart,
  satisfaction: Smile,
}

export default function Reports() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight dark:text-white">{t('reports.title')}</h1>
        <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{t('reports.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((card) => (
          <StatCard
            key={card.key}
            label={t(`reports.stats.${card.key}`)}
            value={card.value}
            delta={card.delta}
            trend={card.trend}
            icon={ICONS[card.key]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrdersByStatusChart />
        <ChannelBreakdownChart />
      </div>
    </div>
  )
}
