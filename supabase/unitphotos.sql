-- supabase/unit-photos.sql
--
-- "Send us a picture of your unit" submissions. Run once in the Supabase SQL
-- Editor. Safe to re-run.
--
-- This is a PUBLIC endpoint: visitors are not signed in, so anon can insert a
-- row and upload into the bucket. Everything else stays shut — anon cannot
-- read the table or read back the photos. Marketing reviews submissions in the
-- Supabase dashboard, which uses the service role and bypasses these policies.

-- ---------------------------------------------------------------------------
-- Submissions
-- ---------------------------------------------------------------------------
create table if not exists public.unit_photo_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text,
  phone text,
  model text,
  location text,
  notes text,
  -- Object paths inside the unit-photos bucket, not URLs.
  photo_paths text[] not null default '{}',
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'contacted', 'closed')),
  created_at timestamptz not null default now(),

  -- The two required fields are enforced here as well as in the form, since
  -- the insert policy below trusts the caller for everything else.
  constraint unit_photo_name_not_blank check (length(btrim(name)) > 0),
  constraint unit_photo_company_not_blank check (length(btrim(company)) > 0),
  constraint unit_photo_count check (cardinality(photo_paths) between 1 and 6)
);

create index if not exists unit_photo_submissions_created_at_idx
  on public.unit_photo_submissions (created_at desc);

alter table public.unit_photo_submissions enable row level security;

-- Insert only. No select policy exists, so no visitor can read submissions.
drop policy if exists "Anyone can submit unit photos"
  on public.unit_photo_submissions;
create policy "Anyone can submit unit photos"
  on public.unit_photo_submissions for insert
  to anon, authenticated
  with check (true);


-- ---------------------------------------------------------------------------
-- Photo storage
--
-- Private bucket. The size and mime limits are set on the bucket itself, so
-- they hold even if someone calls the storage API directly rather than using
-- our form.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'unit-photos',
  'unit-photos',
  false,
  10485760, -- 10 MB per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can upload a unit photo" on storage.objects;
create policy "Anyone can upload a unit photo"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'unit-photos');

-- Deliberately no select, update or delete policy on this bucket: uploads go
-- in and only staff, through the dashboard, can get them back out.
