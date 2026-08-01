import { categoryById } from '../lib/categories'

export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return <div className="empty-state">Nothing logged this month yet.</div>
  }

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <table className="ledger-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th style={{ textAlign: 'right' }}>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((e) => {
          const cat = categoryById(e.category)
          return (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>
                <span className="cat-chip">
                  <span className="cat-dot" style={{ background: cat?.color || '#8A97A3' }} />
                  {cat?.label || e.category}
                </span>
              </td>
              <td style={{ color: 'var(--paper-dim)' }}>{e.note || '—'}</td>
              <td className="amount">₹{e.amount.toLocaleString('en-IN')}</td>
              <td>
                <button className="delete-btn" onClick={() => onDelete(e.id)}>remove</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
