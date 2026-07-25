create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "anyone can join the waitlist" on public.waitlist;

create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- verification: run this after the block above and confirm one row
-- with cmd = 'INSERT', roles = '{anon}' comes back.
select policyname, cmd, roles, with_check
from pg_policies
where schemaname = 'public' and tablename = 'waitlist';
