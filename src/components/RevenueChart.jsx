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
import { useTheme } from '../context/ThemeContext'

function CustomTooltip({ active, payload, label, t }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg text-sm dark:border-slate-700 dark:bg-slate-800">
      <p className="font-medium text-slate-900 mb-1 dark:text-white">{t(`months.${label}`)}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-500 dark:text-slate-400">{t(`dashboard.chart.${entry.dataKey}`)}:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">${entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart() {
  const { t } = useTranslation()
  const { isRTL } = useLanguage()
  const { isDark } = useTheme()

  const data = isRTL ? [...revenueChartData].reverse() : revenueChartData

  const gridStroke = isDark ? '#1e293b' : '#e2e8f0'
  const tickFill = isDark ? '#94a3b8' : '#64748b'
  const targetStroke = isDark ? '#475569' : '#cbd5e1'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('dashboard.chart.title')}</h3>
        <p className="text-sm text-slate-500 mt-0.5 dark:text-slate-400">{t('dashboard.chart.subtitle')}</p>
      </div>
      <div className="h-72 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={isDark ? 0.4 : 0.28} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis
              dataKey="month"
              tickFormatter={(m) => t(`months.${m}`)}
              tick={{ fill: tickFill, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fill: tickFill, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              orientation={isRTL ? 'right' : 'left'}
            />
            <Tooltip content={<CustomTooltip t={t} />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#818cf8"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              activeDot={{ r: 5, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke={targetStroke}
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
              activeDot={{ r: 4, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          {t('dashboard.chart.revenue')}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
          {t('dashboard.chart.target')}
        </div>
      </div>
    </div>
  )
}
