import { useState } from 'react'
import { CATEGORIES } from '../lib/categories'

const today = () => new Date().toISOString().slice(0, 10)

export default function EntryForm({ onAdd, saving }) {
  const [date, setDate] = useState(today())
  const [category, setCategory] = useState(CATEGORIES[0].id)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const value = Number(amount)
    if (!value || value <= 0) {
      setError('Enter an amount greater than 0.')
      return
    }
    setError('')
    await onAdd({ date, category, amount: value, note: note.trim() })
    setAmount('')
    setNote('')
  }

  return (
    <form className="entry-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="1"
          step="1"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="field full">
        <label htmlFor="note">Note (optional)</label>
        <input id="note" type="text" placeholder="e.g. bike fill-up" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" disabled={saving}>{saving ? 'Logging…' : 'Log expense'}</button>
    </form>
  )
}
