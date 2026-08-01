import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts'

export default function DailyTrend({ entries }) {
  if (entries.length === 0) {
    return <div className="empty-state">Your cumulative spend line will build up here as you log entries.</div>
  }

  const byDate = {}
  entries.forEach((e) => { byDate[e.date] = (byDate[e.date] || 0) + e.amount })

  const dates = Object.keys(byDate).sort()
  let running = 0
  const data = dates.map((date) => {
    running += byDate[date]
    return { date: date.slice(5), cumulative: running }
  })

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}>
        <defs>
          <linearGradient id="fillGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#2A3947" strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#8A97A3', fontSize: 11, fontFamily: 'IBM Plex Mono' }} axisLine={{ stroke: '#2A3947' }} tickLine={false} />
        <YAxis tick={{ fill: '#8A97A3', fontSize: 11, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Cumulative']}
          contentStyle={{ background: '#1C2A37', border: '1px solid #2A3947', borderRadius: 4, fontSize: 12 }}
        />
        <ReferenceLine y={50000} stroke="#D99B3F" strokeDasharray="3 3" label={{ value: '50k', position: 'right', fill: '#D99B3F', fontSize: 10 }} />
        <ReferenceLine y={60000} stroke="#C1553D" strokeDasharray="3 3" label={{ value: '60k', position: 'right', fill: '#C1553D', fontSize: 10 }} />
        <Area type="monotone" dataKey="cumulative" stroke="#C9A24B" strokeWidth={2} fill="url(#fillGold)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
