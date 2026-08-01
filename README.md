# Ledger — Monthly Expense Tracker

A single-page React app (Vite) for logging daily expenses against a ₹50,000 comfort
line and a ₹60,000 hard cap. Categories included: House Rent, Groceries, Petrol,
SIP/Investment, Team Salary, Electricity, Mobile Subscriptions, Junk/Party Food,
Grooming, Movies & Entertainment, Fashion & Clothes, Health & Medical,
Travel/Commute, Gifts & Donations, Miscellaneous. Edit `src/lib/categories.js`
to add/remove/rename any of these.

Works two ways:
- **No setup**: runs immediately, saving entries to your browser's `localStorage`
  (private to that browser/device, cleared if you clear site data).
- **With free Supabase database** (recommended): entries are stored in the cloud,
  synced across every device and browser.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. It'll work right away in local-storage mode.

---

## 2. Free cloud database (Supabase)

Supabase gives a free hosted Postgres database with a REST API — no backend
server needed, the React app talks to it directly.

1. Go to https://supabase.com → sign up free → **New project**.
2. Once it's created, open **SQL Editor** → **New query**, paste the contents of
   `supabase_schema.sql` (included in this project) → **Run**. This creates the
   `expenses` table.
3. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon public key**.
4. Create a `.env` file locally (copy `.env.example`) and fill in:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
   ```
5. Restart `npm run dev` — the "local mode" banner disappears once it's connected.

Free tier limits (as of writing): 500MB database, paused after 1 week of
inactivity (just visit the dashboard to wake it up) — more than enough for a
personal expense log. Since the anon key is public in the browser bundle, the
included policy allows open read/write — fine for a private single-user tracker,
just don't publish the URL/key elsewhere.

---

## 3. Deploy on Render (free)

1. Push this project to a GitHub repo.
2. In Render: **New → Static Site** → connect the repo.
3. Build settings:
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
4. Under **Environment**, add the same two variables from your `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. Render gives you a free `*.onrender.com` URL.

That's it — no backend service needed, since the React app calls Supabase
directly. Static Site hosting on Render is free and doesn't spin down like
their free web services do.

---

## Notes

- The "runway" bar on the top sheet is color-coded: green under ₹50k, amber
  ₹50k–60k, red past ₹60k.
- The month picker switches between the last 12 months; each month's data is
  loaded and totalled independently.
- To change the ₹50,000 / ₹60,000 lines, edit `WARN` and `CAP` at the top of
  `src/components/BudgetRunway.jsx` (and the reference lines in
  `src/components/DailyTrend.jsx`).
