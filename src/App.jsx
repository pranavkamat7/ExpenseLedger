import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './lib/supabaseClient'
import BudgetRunway from './components/BudgetRunway'
import EntryForm from './components/EntryForm'
import CategoryBreakdown from './components/CategoryBreakdown'
import DailyTrend from './components/DailyTrend'
import EntryList from './components/EntryList'

const LOCAL_KEY = 'ledger_entries_v1'

const monthOptions = () => {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 36; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    opts.push(d.toISOString().slice(0, 7))
  }
  return opts
}

export default function App() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadEntries() }, [month])

  async function loadEntries() {
    setLoading(true)
    if (supabaseConfigured) {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', `${month}-01`)
        .lte('date', `${month}-31`)
        .order('date', { ascending: false })
      if (!error) setEntries(data || [])
    } else {
      const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
      setEntries(all.filter((e) => e.date.startsWith(month)))
    }
    setLoading(false)
  }

  async function addEntry(entry) {
    setSaving(true)
    if (supabaseConfigured) {
      const { data, error } = await supabase.from('expenses').insert(entry).select()
      if (!error && data) setEntries((prev) => [data[0], ...prev])
    } else {
      const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
      const withId = { ...entry, id: crypto.randomUUID() }
      all.push(withId)
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
      if (entry.date.startsWith(month)) setEntries((prev) => [withId, ...prev])
    }
    setSaving(false)
  }

  async function deleteEntry(id) {
    if (supabaseConfigured) {
      await supabase.from('expenses').delete().eq('id', id)
    } else {
      const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
      localStorage.setItem(LOCAL_KEY, JSON.stringify(all.filter((e) => e.id !== id)))
    }
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const total = entries.reduce((s, e) => s + Number(e.amount), 0)

  return (
    <div className="app">
      <header className="ledger-header">
        <div>
          <div className="eyebrow">Personal Ledger</div>
          <h1>Monthly Expense Sheet</h1>
        </div>
        <select className="month-picker" value={month} onChange={(e) => setMonth(e.target.value)}>
          {monthOptions().map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </header>

      {!supabaseConfigured && (
        <div className="banner">
          Running in local mode — entries are saved to this browser only (<code>localStorage</code>), not synced across devices.
          Connect Supabase by setting <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> as environment
          variables (see README) to get free, permanent cloud storage.
        </div>
      )}

      <section className="top-sheet">
        <div className="card">
          <h2>Where you stand</h2>
          <div className="sub">{month} · Cap ₹60,000 · Comfort line ₹50,000</div>
          <BudgetRunway total={total} />
        </div>

        <div className="card">
          <h2>Log an expense</h2>
          <div className="sub">Add today's spend</div>
          <EntryForm onAdd={addEntry} saving={saving} />
        </div>
      </section>

      <section className="lower-grid">
        <div className="card">
          <h2>By category</h2>
          <div className="sub">{month} split</div>
          {!loading && <CategoryBreakdown entries={entries} />}
        </div>

        <div className="card">
          <h2>Cumulative spend</h2>
          <div className="sub">Running total across the month</div>
          {!loading && <DailyTrend entries={entries} />}
        </div>

        <div className="card entry-list-card">
          <h2>Entries</h2>
          <div className="sub">{month}</div>
          {!loading && <EntryList entries={entries} onDelete={deleteEntry} />}
        </div>
      </section>

      <div className="footer-note">LOG DAILY · WATCH THE 50K LINE · STOP AT 60K</div>
    </div>
  )
}
