-- Aamira dashboard foundation: team profiles and Bridal appointments.
-- Run this migration once in the Supabase SQL Editor.

create extension if not exists pgcrypto;

do $$ begin
  create type public.dashboard_role as enum (
    'owner',
    'admin',
    'bridal_consultant',
    'content_editor',
    'viewer'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.appointment_status as enum (
    'new',
    'contacted',
    'consultation_scheduled',
    'confirmed',
    'completed',
    'cancelled',
    'no_show'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.dashboard_role not null default 'viewer',
  brand_access text[] not null default array['aamira-basic', 'aamira-bridal'],
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default (
    'ABR-' || to_char(now(), 'YYYYMMDD') || '-' ||
    upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))
  ),
  full_name text not null check (char_length(full_name) between 2 and 160),
  email text not null check (char_length(email) between 5 and 254),
  phone text not null check (char_length(phone) between 5 and 40),
  wedding_date date not null,
  consultation_date date not null,
  collection_interest text not null default 'No preference',
  message text not null default '' check (char_length(message) <= 4000),
  status public.appointment_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_notes (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict,
  note text not null check (char_length(note) between 1 and 4000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_audit_logs (
  id bigint generated always as identity primary key,
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create index if not exists appointments_status_idx on public.appointments(status);
create index if not exists appointments_created_at_idx on public.appointments(created_at desc);
create index if not exists appointments_consultation_date_idx on public.appointments(consultation_date);
create index if not exists appointments_assigned_to_idx on public.appointments(assigned_to);
create index if not exists appointment_notes_appointment_idx on public.appointment_notes(appointment_id, created_at desc);
create index if not exists appointment_audit_appointment_idx on public.appointment_audit_logs(appointment_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at before update on public.appointments
for each row execute function public.set_updated_at();

drop trigger if exists appointment_notes_set_updated_at on public.appointment_notes;
create trigger appointment_notes_set_updated_at before update on public.appointment_notes
for each row execute function public.set_updated_at();

create or replace function public.handle_new_dashboard_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_dashboard_profile on auth.users;
create trigger on_auth_user_created_dashboard_profile
after insert on auth.users
for each row execute function public.handle_new_dashboard_user();

-- Backfill users created before this migration. The oldest existing user is
-- made owner; later users remain viewers until an owner changes their role.
insert into public.profiles (id, full_name, role)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', ''),
  case
    when row_number() over (order by created_at, id) = 1 then 'owner'::public.dashboard_role
    else 'viewer'::public.dashboard_role
  end
from auth.users
on conflict (id) do nothing;

create or replace function public.is_dashboard_member(allowed_roles public.dashboard_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and active = true
      and role = any(allowed_roles)
  );
$$;

create or replace function public.submit_bridal_appointment(
  p_full_name text,
  p_email text,
  p_phone text,
  p_wedding_date date,
  p_consultation_date date,
  p_collection_interest text default 'No preference',
  p_message text default ''
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  created_reference text;
begin
  if char_length(trim(p_full_name)) < 2
    or char_length(trim(p_email)) < 5
    or position('@' in p_email) = 0
    or char_length(trim(p_phone)) < 5 then
    raise exception 'Invalid appointment details';
  end if;

  insert into public.appointments (
    full_name,
    email,
    phone,
    wedding_date,
    consultation_date,
    collection_interest,
    message
  ) values (
    trim(p_full_name),
    lower(trim(p_email)),
    trim(p_phone),
    p_wedding_date,
    p_consultation_date,
    coalesce(nullif(trim(p_collection_interest), ''), 'No preference'),
    left(coalesce(trim(p_message), ''), 4000)
  )
  returning reference into created_reference;

  return created_reference;
end;
$$;

create or replace function public.log_appointment_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.status is distinct from new.status then
    insert into public.appointment_audit_logs (
      appointment_id, actor_id, action, old_value, new_value
    ) values (
      new.id, auth.uid(), 'status_changed',
      jsonb_build_object('status', old.status),
      jsonb_build_object('status', new.status)
    );
  end if;

  if old.assigned_to is distinct from new.assigned_to then
    insert into public.appointment_audit_logs (
      appointment_id, actor_id, action, old_value, new_value
    ) values (
      new.id, auth.uid(), 'consultant_assigned',
      jsonb_build_object('assigned_to', old.assigned_to),
      jsonb_build_object('assigned_to', new.assigned_to)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists appointments_audit_changes on public.appointments;
create trigger appointments_audit_changes after update on public.appointments
for each row execute function public.log_appointment_change();

alter table public.profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_notes enable row level security;
alter table public.appointment_audit_logs enable row level security;

drop policy if exists "profiles_select_dashboard" on public.profiles;
create policy "profiles_select_dashboard" on public.profiles for select to authenticated
using (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant', 'content_editor', 'viewer']::public.dashboard_role[]));

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles for update to authenticated
using (public.is_dashboard_member(array['owner', 'admin']::public.dashboard_role[]))
with check (public.is_dashboard_member(array['owner', 'admin']::public.dashboard_role[]));

drop policy if exists "appointments_select_bridal_team" on public.appointments;
create policy "appointments_select_bridal_team" on public.appointments for select to authenticated
using (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant', 'viewer']::public.dashboard_role[]));

drop policy if exists "appointments_update_bridal_team" on public.appointments;
create policy "appointments_update_bridal_team" on public.appointments for update to authenticated
using (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant']::public.dashboard_role[]))
with check (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant']::public.dashboard_role[]));

drop policy if exists "notes_select_bridal_team" on public.appointment_notes;
create policy "notes_select_bridal_team" on public.appointment_notes for select to authenticated
using (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant', 'viewer']::public.dashboard_role[]));

drop policy if exists "notes_insert_bridal_team" on public.appointment_notes;
create policy "notes_insert_bridal_team" on public.appointment_notes for insert to authenticated
with check (
  author_id = auth.uid()
  and public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant']::public.dashboard_role[])
);

drop policy if exists "notes_update_own" on public.appointment_notes;
create policy "notes_update_own" on public.appointment_notes for update to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid());

drop policy if exists "audit_select_bridal_team" on public.appointment_audit_logs;
create policy "audit_select_bridal_team" on public.appointment_audit_logs for select to authenticated
using (public.is_dashboard_member(array['owner', 'admin', 'bridal_consultant', 'viewer']::public.dashboard_role[]));

revoke execute on function public.submit_bridal_appointment(text, text, text, date, date, text, text) from public;
revoke all on public.appointments from anon;
revoke all on public.appointment_notes from anon;
revoke all on public.appointment_audit_logs from anon;
grant execute on function public.submit_bridal_appointment(text, text, text, date, date, text, text) to anon, authenticated;
grant select, update on public.appointments to authenticated;
grant select, insert, update on public.appointment_notes to authenticated;
grant select on public.appointment_audit_logs to authenticated;
grant select, update on public.profiles to authenticated;

comment on function public.submit_bridal_appointment is
  'Public, column-scoped appointment intake. Dashboard-only fields cannot be supplied by website visitors.';
