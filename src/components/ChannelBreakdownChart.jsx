import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { channelBreakdown } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'

const CHANNEL_COLORS = ['#6366f1', '#a5b4fc', '#94a3b8', '#cbd5e1']

function CustomTooltip({ active, payload, t }) {
  if (!active || !payload || !payload.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg text-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
        <span className="text-slate-500 dark:text-slate-400">{t(`reports.channels.${entry.name}`)}:</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200">{entry.value}%</span>
      </div>
    </div>
  )
}

export default function ChannelBreakdownChart() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const data = channelBreakdown.map((d, i) => ({ ...d, fill: CHANNEL_COLORS[i % CHANNEL_COLORS.length] }))

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t('reports.charts.channelBreakdown.title')}</h3>
        <p className="text-sm text-slate-500 mt-0.5 dark:text-slate-400">{t('reports.charts.channelBreakdown.subtitle')}</p>
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around">
        <div className="h-56 w-56 shrink-0" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="channel"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={3}
                stroke={isDark ? '#0f172a' : '#fff'}
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.channel} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip t={t} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-1">
          {data.map((entry) => (
            <div key={entry.channel} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-slate-600 dark:text-slate-300">{t(`reports.channels.${entry.channel}`)}</span>
              <span className="ms-auto font-semibold text-slate-800 dark:text-slate-200 sm:ms-2">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
