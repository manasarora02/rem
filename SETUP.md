# Setup

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**, pick a name/region/password, and wait for it to finish provisioning (~2 min).

## 2. Get your API keys

1. In the project, go to **Settings → API → API Keys**.
2. Copy the **Project URL** and the **publishable** key (this replaced the old "anon public" key naming — same purpose, safe to expose client-side).

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste in the values from step 2:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## 4. Confirm email verification is on

In **Authentication → Sign In / Providers → Email**, make sure **Confirm email** is enabled (it's on by default for new projects). This is what makes signup send a confirmation link before the account can log in.

## 5. Set the redirect URL

In **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000` (for local dev)
- **Redirect URLs**: add `http://localhost:3000/auth/callback`

When you deploy, add your production URL(s) here too (e.g. `https://your-domain.com/auth/callback`), and update **Site URL**.

## 6. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/signup`, create an account, check your email for the confirmation link, then log in at `/login`. A verified session lands you on `/dashboard`. `/` itself is the public marketing/waitlist page.

## 7. Waitlist table

The marketing page's "Join Early Access" form writes to a `waitlist` table. Run this once in the Supabase SQL editor (**SQL Editor → New query**):

```sql
create extension if not exists pgcrypto;

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

create policy "Allow anonymous insert"
  on waitlist
  for insert
  to anon
  with check (true);
```

No `select` policy is created, so the table is write-only from the client (anon/authenticated roles can insert an email but can't read the list back).

## Troubleshooting

- **Confirmation email never arrives**: check spam, or check **Authentication → Logs** in Supabase for send errors. Supabase's default email provider has low rate limits — fine for testing, swap in a custom SMTP provider (Settings → Auth → SMTP) before real traffic.
- **Redirected in a loop between `/dashboard` and `/login`**: usually stale cookies — clear cookies for `localhost:3000` and log in again.
- **"Invalid Redirect URL" error after clicking the email link**: the callback URL isn't in the Redirect URLs allowlist from step 5.
- **Waitlist form errors with something about a missing table/relation**: the SQL in step 7 hasn't been run yet against your Supabase project.
