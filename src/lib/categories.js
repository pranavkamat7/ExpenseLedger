// Every category the ledger understands, with a fixed accent color so the
// same category always reads the same way across the gauge, charts, and list.
export const CATEGORIES = [
  { id: 'rent',        label: 'House Rent',           color: '#C9A24B' },
  { id: 'groceries',   label: 'Groceries',             color: '#7FA582' },
  { id: 'petrol',      label: 'Petrol',                color: '#B4763E' },
  { id: 'sip',         label: 'SIP / Investment',      color: '#4C8FA5' },
  { id: 'team_salary', label: 'Team Salary',           color: '#8B6DAD' },
  { id: 'electricity', label: 'Electricity',           color: '#D9B23F' },
  { id: 'mobile',      label: 'Mobile Subscriptions',  color: '#5B9BD5' },
  { id: 'food_junk',   label: 'Junk / Party Food',     color: '#C1553D' },
  { id: 'grooming',    label: 'Grooming (Beard/Hair)', color: '#6FAE8C' },
  { id: 'movies',      label: 'Movies & Entertainment',color: '#A85C9A' },
  { id: 'fashion',     label: 'Fashion & Clothes',     color: '#D97757' },
  { id: 'health',      label: 'Health & Medical',      color: '#5AACA0' },
  { id: 'travel',      label: 'Travel / Commute',      color: '#7C93C7' },
  { id: 'gifts',       label: 'Gifts & Donations',     color: '#C79A8F' },
  { id: 'misc',        label: 'Miscellaneous',         color: '#8A97A3' },
]

export const categoryById = (id) => CATEGORIES.find((c) => c.id === id)
