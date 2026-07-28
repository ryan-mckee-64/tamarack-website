-- supabase/schema.sql
--
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste →
-- Run. It is safe to re-run.
--
-- Supabase stores accounts in auth.users, which you do not touch directly.
-- Everything you want to know about a customer beyond their login lives in
-- public.profiles, keyed by the same id.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security is the whole game. With it on and no policies, nobody
-- can read anything — then each policy opens exactly one door.
alter table public.profiles enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Create the profile row automatically whenever an account is created, so no
-- signed-in customer is ever missing one.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, company)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();


-- ---------------------------------------------------------------------------
-- Sketch for what comes next. Uncomment when you are ready for order history.
-- The shape that matters: every customer-facing table carries the owning
-- user's id, and every policy filters on it.
-- ---------------------------------------------------------------------------

-- create table if not exists public.orders (
--   id uuid primary key default gen_random_uuid(),
--   user_id uuid not null references auth.users (id) on delete cascade,
--   order_number text not null,
--   placed_on date not null,
--   status text not null default 'open',
--   total_cents integer,
--   created_at timestamptz not null default now()
-- );
--
-- alter table public.orders enable row level security;
--
-- create policy "Users read own orders"
--   on public.orders for select
--   using ((select auth.uid()) = user_id);
--
-- create index if not exists orders_user_id_idx on public.orders (user_id);
