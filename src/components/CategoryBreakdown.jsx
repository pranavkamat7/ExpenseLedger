import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORIES } from '../lib/categories'

export default function CategoryBreakdown({ entries }) {
  const totals = CATEGORIES.map((c) => ({
    ...c,
    value: entries.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
  })).filter((c) => c.value > 0)

  if (totals.length === 0) {
    return <div className="empty-state">No entries yet this month — log your first expense to see the split.</div>
  }

  const total = totals.reduce((s, c) => s + c.value, 0)
  const sorted = [...totals].sort((a, b) => b.value - a.value)

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ width: 150, height: 150, flexShrink: 0 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={totals} dataKey="value" nameKey="label" innerRadius={45} outerRadius={70} paddingAngle={2} stroke="none">
              {totals.map((c) => <Cell key={c.id} fill={c.color} />)}
            </Pie>
            <Tooltip
              formatter={(v) => `₹${v.toLocaleString('en-IN')}`}
              contentStyle={{ background: '#1C2A37', border: '1px solid #2A3947', borderRadius: 4, fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        {sorted.map((c) => (
          <div className="legend-row" key={c.id}>
            <span className="legend-dot" style={{ background: c.color }} />
            <span>{c.label}</span>
            <span className="legend-amount">
              ₹{c.value.toLocaleString('en-IN')} · {Math.round((c.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
