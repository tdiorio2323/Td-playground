create table if not exists public.daily_spin_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  spun_at timestamptz not null default now(),
  result text not null,
  win boolean not null,
  route text,
  constraint fk_user foreign key (user_id) references auth.users(id) on delete cascade
);

create index if not exists idx_daily_spin_user_day
  on public.daily_spin_log (user_id, date_trunc('day', spun_at));
