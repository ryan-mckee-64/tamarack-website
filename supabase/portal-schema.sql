-- supabase/portal-schema.sql
--
-- Everything behind the customer portal. Run after schema.sql, in the
-- Supabase SQL Editor. Safe to re-run.
--
-- The pattern throughout: catalogue tables (parts, bulletins, service
-- centres, maintenance) are readable by any signed-in customer, while
-- anything belonging to a customer (machines, claims, orders, enquiries) is
-- readable only by the customer it belongs to. Staff load catalogue content
-- through the Supabase dashboard, which bypasses these policies.

-- ---------------------------------------------------------------------------
-- Customer-specific pricing lives on the profile.
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists discount_percent numeric(5, 2) not null default 0;

comment on column public.profiles.discount_percent is
  'Per-customer discount off list price, e.g. 10.00 for 10%.';


-- ---------------------------------------------------------------------------
-- Parts catalogue: pricing and availability
-- ---------------------------------------------------------------------------
create table if not exists public.parts (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  description text,
  product_line text,
  category text,
  list_price_cents integer,
  stock_qty integer not null default 0,
  lead_time_days integer,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists parts_product_line_idx on public.parts (product_line);
create index if not exists parts_sku_idx on public.parts (sku);

alter table public.parts enable row level security;

drop policy if exists "Signed in customers read parts" on public.parts;
create policy "Signed in customers read parts"
  on public.parts for select
  to authenticated
  using (is_active);


-- ---------------------------------------------------------------------------
-- Machines a customer owns. Powers serial lookup and warranty claims.
-- ---------------------------------------------------------------------------
create table if not exists public.machines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  serial_number text not null,
  product_line text,
  model text,
  model_year integer,
  purchased_on date,
  created_at timestamptz not null default now()
);

create index if not exists machines_user_id_idx on public.machines (user_id);

alter table public.machines enable row level security;

drop policy if exists "Users read own machines" on public.machines;
create policy "Users read own machines"
  on public.machines for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users add own machines" on public.machines;
create policy "Users add own machines"
  on public.machines for insert
  to authenticated
  with check ((select auth.uid()) = user_id);


-- ---------------------------------------------------------------------------
-- Recalls and service bulletins
-- ---------------------------------------------------------------------------
create table if not exists public.bulletins (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'bulletin' check (kind in ('recall', 'bulletin')),
  reference text,
  title text not null,
  summary text,
  details text,
  product_line text,
  models text[],
  serial_from text,
  serial_to text,
  published_on date not null default current_date,
  document_url text,
  is_active boolean not null default true
);

create index if not exists bulletins_product_line_idx on public.bulletins (product_line);

alter table public.bulletins enable row level security;

drop policy if exists "Signed in customers read bulletins" on public.bulletins;
create policy "Signed in customers read bulletins"
  on public.bulletins for select
  to authenticated
  using (is_active);


-- ---------------------------------------------------------------------------
-- Serial enquiries: when a lookup finds nothing, support follows up.
-- ---------------------------------------------------------------------------
create table if not exists public.serial_enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  serial_number text not null,
  note text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create index if not exists serial_enquiries_user_id_idx on public.serial_enquiries (user_id);

alter table public.serial_enquiries enable row level security;

drop policy if exists "Users read own serial enquiries" on public.serial_enquiries;
create policy "Users read own serial enquiries"
  on public.serial_enquiries for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create own serial enquiries" on public.serial_enquiries;
create policy "Users create own serial enquiries"
  on public.serial_enquiries for insert
  to authenticated
  with check ((select auth.uid()) = user_id);


-- ---------------------------------------------------------------------------
-- Warranty claims
-- ---------------------------------------------------------------------------
create table if not exists public.warranty_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  serial_number text not null,
  product_line text,
  model text,
  purchased_on date,
  failed_on date,
  hours_on_unit integer,
  description text not null,
  status text not null default 'submitted'
    check (status in ('submitted', 'in_review', 'approved', 'declined', 'closed')),
  staff_notes text,
  created_at timestamptz not null default now()
);

create index if not exists warranty_claims_user_id_idx on public.warranty_claims (user_id);

alter table public.warranty_claims enable row level security;

drop policy if exists "Users read own claims" on public.warranty_claims;
create policy "Users read own claims"
  on public.warranty_claims for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users submit own claims" on public.warranty_claims;
create policy "Users submit own claims"
  on public.warranty_claims for insert
  to authenticated
  with check ((select auth.uid()) = user_id);


-- ---------------------------------------------------------------------------
-- Service centres
-- ---------------------------------------------------------------------------
create table if not exists public.service_centers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  region text,
  postal_code text,
  country text default 'Canada',
  phone text,
  email text,
  services text[],
  is_authorized boolean not null default true,
  notes text,
  sort_order integer not null default 0
);

alter table public.service_centers enable row level security;

drop policy if exists "Signed in customers read service centers" on public.service_centers;
create policy "Signed in customers read service centers"
  on public.service_centers for select
  to authenticated
  using (true);


-- ---------------------------------------------------------------------------
-- Maintenance schedules by product
-- ---------------------------------------------------------------------------
create table if not exists public.maintenance_schedules (
  id uuid primary key default gen_random_uuid(),
  product_line text not null,
  model text,
  interval_label text not null,
  interval_hours integer,
  tasks text[] not null default '{}',
  document_url text,
  sort_order integer not null default 0
);

create index if not exists maintenance_product_line_idx
  on public.maintenance_schedules (product_line);

alter table public.maintenance_schedules enable row level security;

drop policy if exists "Signed in customers read maintenance" on public.maintenance_schedules;
create policy "Signed in customers read maintenance"
  on public.maintenance_schedules for select
  to authenticated
  using (true);


-- ---------------------------------------------------------------------------
-- Parts orders. Customers submit; staff price, confirm and fulfil.
-- No payment is taken online — these are order requests against an account.
-- ---------------------------------------------------------------------------
create sequence if not exists public.order_number_seq start 1000;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  order_number text not null unique
    default 'TI-' || to_char(now(), 'YY') || '-' || nextval('public.order_number_seq'),
  po_number text,
  status text not null default 'submitted'
    check (status in ('submitted', 'confirmed', 'shipped', 'complete', 'cancelled')),
  notes text,
  subtotal_cents integer not null default 0,
  submitted_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

drop policy if exists "Users read own orders" on public.orders;
create policy "Users read own orders"
  on public.orders for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create own orders" on public.orders;
create policy "Users create own orders"
  on public.orders for insert
  to authenticated
  with check ((select auth.uid()) = user_id);


create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  part_id uuid references public.parts (id),
  sku text not null,
  name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null default 0
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.order_items enable row level security;

-- Items are reachable only through an order the customer owns.
drop policy if exists "Users read own order items" on public.order_items;
create policy "Users read own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = (select auth.uid())
    )
  );

drop policy if exists "Users add items to own orders" on public.order_items;
create policy "Users add items to own orders"
  on public.order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = (select auth.uid())
    )
  );
