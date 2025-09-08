-- VIP waitlist table
create table if not exists public.vip_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.vip_waitlist enable row level security;

-- Allow public inserts (for signup)
create policy "vip_waitlist_insert_public" on public.vip_waitlist
for insert to anon, authenticated with check (true);

-- Allow admins to read all waitlist entries
create policy "vip_waitlist_read_admin" on public.vip_waitlist
for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Creators table
create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  username text not null unique,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.creators enable row level security;

-- Allow public to read creator profiles
create policy "creators_read_public" on public.creators
for select to anon, authenticated using (true);

-- Allow creators to insert their own profile
create policy "creators_insert_owner" on public.creators
for insert to authenticated with check (auth.uid() = user_id);

-- Allow creators to update their own profile
create policy "creators_update_owner" on public.creators
for update to authenticated using (auth.uid() = user_id);

-- Allow admins to manage all creators
create policy "creators_admin_all" on public.creators
for all to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Bio links table
create table if not exists public.bio_links (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators(id) on delete cascade,
  label text not null,
  url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.bio_links enable row level security;

-- Allow public to read bio links
create policy "bio_links_read_public" on public.bio_links
for select to anon, authenticated using (true);

-- Allow creators to manage their own bio links
create policy "bio_links_rw_owner" on public.bio_links
for all to authenticated using (
  exists(
    select 1 from public.creators c 
    where c.id = creator_id and c.user_id = auth.uid()
  )
)
with check (
  exists(
    select 1 from public.creators c 
    where c.id = creator_id and c.user_id = auth.uid()
  )
);

-- Allow admins to manage all bio links
create policy "bio_links_admin_all" on public.bio_links
for all to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function if not exists
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_creators_updated_at
  before update on public.creators
  for each row execute procedure public.handle_updated_at();

create trigger handle_bio_links_updated_at
  before update on public.bio_links
  for each row execute procedure public.handle_updated_at();