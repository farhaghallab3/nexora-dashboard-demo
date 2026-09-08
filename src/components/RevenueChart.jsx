import { useTranslation } from 'react-i18next'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { revenueChartData } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

function CustomTooltip({ active, payload, label, t }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg text-sm">
      <p className="font-medium text-slate-900 mb-1">{t(`months.${label}`)}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-500">{t(`dashboard.chart.${entry.dataKey}`)}:</span>
          <span className="font-semibold text-slate-800">${entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart() {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()

  const data = isRTL ? [...revenueChartData].reverse() : revenueChartData

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900">{t('dashboard.chart.title')}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{t('dashboard.chart.subtitle')}</p>
      </div>
      <div className="h-72 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tickFormatter={(m) => t(`months.${m}`)}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              orientation={isRTL ? 'right' : 'left'}
            />
            <Tooltip content={<CustomTooltip t={t} />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#cbd5e1"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
              activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          {t('dashboard.chart.revenue')}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          {t('dashboard.chart.target')}
        </div>
      </div>
    </div>
  )
}
