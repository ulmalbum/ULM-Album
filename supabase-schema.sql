-- ULM Smart Gallery starter schema for Supabase
-- Run in Supabase SQL Editor. Create a PRIVATE Storage bucket named gallery-photos separately.
create extension if not exists pgcrypto;

create table if not exists public.gallery_photos (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  album text not null default 'Unsorted',
  favorite boolean not null default false,
  added_at timestamptz not null default now(),
  storage_path text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;
drop policy if exists "Users read own gallery photos" on public.gallery_photos;
create policy "Users read own gallery photos" on public.gallery_photos
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users insert own gallery photos" on public.gallery_photos;
create policy "Users insert own gallery photos" on public.gallery_photos
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users update own gallery photos" on public.gallery_photos;
create policy "Users update own gallery photos" on public.gallery_photos
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users delete own gallery photos" on public.gallery_photos;
create policy "Users delete own gallery photos" on public.gallery_photos
  for delete to authenticated using (auth.uid() = user_id);

-- Storage bucket: create a PRIVATE bucket named gallery-photos in Dashboard > Storage.
-- These policies limit each object's first path segment to the authenticated user's UUID.
drop policy if exists "Users read own gallery objects" on storage.objects;
create policy "Users read own gallery objects" on storage.objects
  for select to authenticated using (bucket_id = 'gallery-photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users upload own gallery objects" on storage.objects;
create policy "Users upload own gallery objects" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery-photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users update own gallery objects" on storage.objects;
create policy "Users update own gallery objects" on storage.objects
  for update to authenticated using (bucket_id = 'gallery-photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'gallery-photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users delete own gallery objects" on storage.objects;
create policy "Users delete own gallery objects" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery-photos' and (storage.foldername(name))[1] = auth.uid()::text);
