import { useMemo, useState } from 'react'
import { Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

export default function RecordsTable({
  data,
  columns,
  rowKey,
  getSearchText,
  searchPlaceholder,
  statusOptions,
  getStatus,
  filterAllLabel,
  title,
  subtitle,
  noResultsLabel,
  showingLabel,
  defaultSortKey,
  defaultSortDir = 'desc',
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState(defaultSortKey)
  const [sortDir, setSortDir] = useState(defaultSortDir)

  const activeColumn = columns.find((c) => c.key === sortKey)

  const filtered = useMemo(() => {
    let rows = data.filter((item) => getSearchText(item).toLowerCase().includes(search.toLowerCase()))
    if (statusOptions && statusFilter !== 'all') rows = rows.filter((item) => getStatus(item) === statusFilter)

    if (activeColumn) {
      rows = [...rows].sort((a, b) => {
        const av = activeColumn.sortValue(a)
        const bv = activeColumn.sortValue(b)
        if (typeof av === 'string') {
          return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
        }
        return sortDir === 'asc' ? av - bv : bv - av
      })
    }

    return rows
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, search, statusFilter, sortKey, sortDir])

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }) {
    if (sortKey !== column) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-300" />
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-accent-600" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-accent-600" />
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 mt-0.5 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full sm:w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 ps-9 pe-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
            />
          </div>
          {statusOptions && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-700 outline-none transition-colors focus:border-accent-400 focus:bg-white focus:ring-2 focus:ring-accent-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-accent-500 dark:focus:bg-slate-800 dark:focus:ring-accent-500/20"
            >
              <option value="all">{filterAllLabel}</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-start">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 sm:px-6 font-medium">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1.5 hover:text-slate-600 transition-colors dark:hover:text-slate-300"
                  >
                    {col.label}
                    <SortIcon column={col.key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={rowKey(item)}
                className="border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 sm:px-6">
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-400">{noResultsLabel}</div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3.5 sm:px-6 text-xs text-slate-400 dark:border-slate-800">
          {showingLabel(filtered.length, data.length)}
        </div>
      )}
    </div>
  )
}
