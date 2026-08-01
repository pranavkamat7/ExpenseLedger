-- Run this in Supabase: Project → SQL Editor → New query → paste → Run

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  category text not null,
  amount numeric not null check (amount > 0),
  note text default '',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table expenses enable row level security;

-- Simple open policy since this is a single-user personal tracker
-- using only the public anon key (no login screen). Anyone with your
-- anon key + URL could read/write, so don't share them publicly.
create policy "allow all for anon" on expenses
  for all
  using (true)
  with check (true);
