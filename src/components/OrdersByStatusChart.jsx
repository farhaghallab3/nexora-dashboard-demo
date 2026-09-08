import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getOrdersByStatus } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'

const STATUS_COLORS = {
  active: '#10b981',
  pending: '#f59e0b',
  completed: '#0ea5e9',
}

function CustomTooltip({ active, payload, t }) {
  if (!active || !payload || !payload.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg text-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
        <span className="text-slate-500 dark:text-slate-400">{t(`status.${entry.payload.status}`)}:</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200">{entry.value}</span>
      </div>
    </div>
  )
}

export default function OrdersByStatusChart() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const data = getOrdersByStatus().map((d) => ({ ...d, fill: STATUS_COLORS[d.status] }))

  const gridStroke = isDark ? '#1e293b' : '#e2e8f0'
  const tickFill = isDark ? '#94a3b8' : '#64748b'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('reports.charts.ordersByStatus.title')}</h3>
        <p className="text-sm text-slate-500 mt-0.5 dark:text-slate-400">{t('reports.charts.ordersByStatus.subtitle')}</p>
      </div>
      <div className="h-64 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis
              dataKey="status"
              tickFormatter={(s) => t(`status.${s}`)}
              tick={{ fill: tickFill, fontSize: 12 }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
            />
            <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip t={t} />} cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
