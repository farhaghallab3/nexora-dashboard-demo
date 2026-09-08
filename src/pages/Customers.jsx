import { useTranslation } from 'react-i18next'
import { Users, UserPlus, Activity, Wallet } from 'lucide-react'
import StatCard from '../components/StatCard'
import CustomersTable from '../components/CustomersTable'
import { customerStats } from '../data/mockData'

const ICONS = {
  totalCustomers: Users,
  newThisMonth: UserPlus,
  activeRate: Activity,
  lifetimeValue: Wallet,
}

export default function Customers() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight dark:text-white">{t('customers.title')}</h1>
        <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{t('customers.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {customerStats.map((card) => (
          <StatCard
            key={card.key}
            label={t(`customers.stats.${card.key}`)}
            value={card.value}
            delta={card.delta}
            trend={card.trend}
            icon={ICONS[card.key]}
          />
        ))}
      </div>

      <CustomersTable />
    </div>
  )
}
