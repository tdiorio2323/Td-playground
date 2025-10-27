create extension if not exists pgcrypto;

create table if not exists public.room_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  key_slug text not null,
  acquired_at timestamptz not null default now(),
  unique(user_id, key_slug),
  constraint fk_user foreign key (user_id) references auth.users(id) on delete cascade
);

create index if not exists idx_room_keys_user on public.room_keys(user_id);
create index if not exists idx_room_keys_slug on public.room_keys(key_slug);
