const WARN = 50000
const CAP = 60000
const SCALE_MAX = 70000

function statusOf(total) {
  if (total < WARN) return { key: 'safe', label: 'On track — clear runway' }
  if (total < CAP) return { key: 'warn', label: 'Approaching the cap — ease off' }
  return { key: 'danger', label: 'Over the cap — stop non-essential spend' }
}

export default function BudgetRunway({ total }) {
  const status = statusOf(total)
  const fillPct = Math.min((total / SCALE_MAX) * 100, 100)
  const warnPct = (WARN / SCALE_MAX) * 100
  const capPct = (CAP / SCALE_MAX) * 100

  const fillColor =
    status.key === 'safe' ? 'var(--safe)' :
    status.key === 'warn' ? 'var(--warn)' : 'var(--danger)'

  return (
    <div className="runway">
      <div className="runway-total">₹{total.toLocaleString('en-IN')}</div>
      <div className={`runway-status ${status.key}`}>{status.label}</div>

      <div className="runway-track">
        <div className="runway-fill" style={{ width: `${fillPct}%`, background: fillColor }} />
        <div className="runway-mark warn-line" style={{ left: `${warnPct}%` }}>
          <span className="tag">₹50k</span>
        </div>
        <div className="runway-mark cap-line" style={{ left: `${capPct}%` }}>
          <span className="tag">₹60k cap</span>
        </div>
      </div>

      <div className="runway-scale">
        <span>₹0</span>
        <span>₹{SCALE_MAX.toLocaleString('en-IN')}</span>
      </div>

      <div className="runway-note">
        Comfort zone ends at <strong>₹50,000</strong>. Hard cap for the month is{' '}
        <strong>₹60,000</strong>. {status.key === 'safe' && `You have ₹${(WARN - total).toLocaleString('en-IN')} left before the warning line.`}
        {status.key === 'warn' && `You're in the amber zone — ₹${(CAP - total).toLocaleString('en-IN')} left before the cap.`}
        {status.key === 'danger' && `You've crossed the cap by ₹${(total - CAP).toLocaleString('en-IN')}.`}
      </div>
    </div>
  )
}
