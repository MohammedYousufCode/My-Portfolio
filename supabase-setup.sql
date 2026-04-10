-- Run this entire file in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run

create table if not exists profile (
  id serial primary key,
  name text, title text, bio text,
  photo_url text default '', resume_url text default '',
  email text, phone text, location text,
  linkedin text, github text,
  available_from text, cgpa text,
  total_certs int default 5, hackathon_prize text
);

create table if not exists projects (
  id text primary key default gen_random_uuid()::text,
  title text, description text,
  tech_stack text[] default '{}',
  github_url text default '', live_url text default '',
  image_url text default '',
  is_featured boolean default false,
  project_type text default 'main',  -- 'main' = DA/ML, 'hobby' = hackathon/AI
  order_index int default 0
);

create table if not exists skills (
  id text primary key default gen_random_uuid()::text,
  name text, category text, level int default 70,
  order_index int default 0
);

create table if not exists certifications (
  id text primary key default gen_random_uuid()::text,
  title text, issuer text, date text,
  credential_url text default '',
  order_index int default 0
);

create table if not exists education (
  id text primary key default gen_random_uuid()::text,
  degree text, institution text, period text,
  score text, order_index int default 0
);

create table if not exists hackathons (
  id text primary key default gen_random_uuid()::text,
  title text, prize text, year text,
  description text, live_url text default '',
  order_index int default 0
);

-- Enable RLS
alter table profile enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table certifications enable row level security;
alter table education enable row level security;
alter table hackathons enable row level security;

-- Public read
create policy "Public read profile" on profile for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read hackathons" on hackathons for select using (true);

-- Anon write (admin panel)
create policy "Anon upsert profile" on profile for all using (true) with check (true);
create policy "Anon upsert projects" on projects for all using (true) with check (true);
create policy "Anon upsert skills" on skills for all using (true) with check (true);
create policy "Anon upsert certifications" on certifications for all using (true) with check (true);
create policy "Anon upsert education" on education for all using (true) with check (true);
create policy "Anon upsert hackathons" on hackathons for all using (true) with check (true);

-- Storage: create a bucket called "assets" and set it to PUBLIC
