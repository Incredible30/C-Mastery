-- C MASTERY · Milestone 1: foundation schema
-- Every table has Row Level Security enabled. Writes that carry business rules
-- (completing lessons, logging study time, quotas, rate limits) go through
-- SECURITY DEFINER functions so clients cannot write those tables directly.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- enums
create type public.app_role       as enum ('student', 'instructor', 'admin');
create type public.plan_tier      as enum ('free', 'pro', 'premium');
create type public.difficulty     as enum ('beginner', 'intermediate', 'advanced');
create type public.problem_level  as enum ('easy', 'medium', 'hard');
create type public.lesson_kind    as enum ('lesson', 'quiz', 'project');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.sub_status     as enum ('active', 'past_due', 'cancelled', 'expired');
create type public.submission_status as enum
  ('queued', 'running', 'accepted', 'wrong_answer', 'compile_error', 'runtime_error', 'time_limit', 'internal_error');

-- ---------------------------------------------------------------- shared helpers
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

create or replace function public.plan_rank(p public.plan_tier)
returns int language sql immutable as $$
  select case p when 'free' then 0 when 'pro' then 1 when 'premium' then 2 end
$$;

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  full_name          text not null default '' check (char_length(full_name) <= 80),
  username           text unique check (username ~ '^[a-z0-9_.]{3,30}$'),
  college            text not null default '' check (char_length(college) <= 120),
  city               text not null default '' check (char_length(city) <= 80),
  bio                text not null default '' check (char_length(bio) <= 280),
  role               public.app_role not null default 'student',
  daily_goal_minutes int  not null default 60 check (daily_goal_minutes between 10 and 600),
  timezone           text not null default 'Asia/Kolkata',
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Role helpers read profiles as definer so policies on profiles do not recurse.
create or replace function public.current_role_name()
returns public.app_role language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false)
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select role in ('instructor', 'admin') from public.profiles where id = auth.uid()), false)
$$;

-- ---------------------------------------------------------------- subscriptions & payments
create table public.subscriptions (
  user_id                  uuid primary key references public.profiles (id) on delete cascade,
  plan                     public.plan_tier  not null default 'free',
  status                   public.sub_status not null default 'active',
  current_period_end       timestamptz,
  razorpay_subscription_id text unique,
  updated_at               timestamptz not null default now()
);
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();

create table public.payments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles (id) on delete cascade,
  plan                public.plan_tier not null,
  billing_cycle       text not null check (billing_cycle in ('monthly', 'yearly')),
  amount_paise        int  not null check (amount_paise > 0),
  currency            text not null default 'INR',
  razorpay_order_id   text not null unique,
  razorpay_payment_id text unique,
  status              text not null default 'created' check (status in ('created', 'paid', 'failed', 'refunded')),
  created_at          timestamptz not null default now()
);
create index payments_user_idx on public.payments (user_id, created_at desc);

-- Razorpay webhook deliveries, used for idempotency. Server (service role) only.
create table public.webhook_events (
  id          text primary key,
  event       text not null,
  payload     jsonb not null,
  received_at timestamptz not null default now()
);

create or replace function public.current_plan()
returns public.plan_tier language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select plan from public.subscriptions
      where user_id = auth.uid()
        and status = 'active'
        and (current_period_end is null or current_period_end > now())),
    'free'::public.plan_tier)
$$;

-- New users get a profile and a Free subscription.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(left(new.raw_user_meta_data ->> 'full_name', 80), ''));
  insert into public.subscriptions (user_id) values (new.id);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- catalogue
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9-]{2,60}$'),
  title       text not null check (char_length(title) between 2 and 120),
  description text not null default '' check (char_length(description) <= 2000),
  status      public.content_status not null default 'draft',
  position    int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger courses_updated_at before update on public.courses
  for each row execute function public.set_updated_at();

create table public.modules (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid not null references public.courses (id) on delete cascade,
  slug            text not null check (slug ~ '^[a-z0-9-]{2,60}$'),
  title           text not null check (char_length(title) between 2 and 120),
  summary         text not null default '' check (char_length(summary) <= 1000),
  level           public.difficulty not null default 'beginner',
  position        int not null default 0,
  estimated_hours numeric(4,1) not null default 1 check (estimated_hours > 0),
  outcomes        text[] not null default '{}',
  required_plan   public.plan_tier not null default 'free',
  status          public.content_status not null default 'draft',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (course_id, slug)
);
create index modules_course_idx on public.modules (course_id, position);
create trigger modules_updated_at before update on public.modules
  for each row execute function public.set_updated_at();

-- Lesson metadata is visible for published lessons so locked lessons can be listed.
create table public.lessons (
  id                uuid primary key default gen_random_uuid(),
  module_id         uuid not null references public.modules (id) on delete cascade,
  slug              text not null check (slug ~ '^[a-z0-9-]{2,80}$'),
  title             text not null check (char_length(title) between 2 and 160),
  kind              public.lesson_kind not null default 'lesson',
  estimated_minutes int not null default 10 check (estimated_minutes between 1 and 600),
  position          int not null default 0,
  is_free_preview   boolean not null default false,
  status            public.content_status not null default 'draft',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (module_id, slug)
);
create index lessons_module_idx on public.lessons (module_id, position);
create trigger lessons_updated_at before update on public.lessons
  for each row execute function public.set_updated_at();

-- Lesson bodies are gated by plan, so they live in their own table.
create table public.lesson_contents (
  lesson_id  uuid primary key references public.lessons (id) on delete cascade,
  body_md    text not null default '' check (char_length(body_md) <= 100000),
  updated_at timestamptz not null default now()
);
create trigger lesson_contents_updated_at before update on public.lesson_contents
  for each row execute function public.set_updated_at();

create or replace function public.can_read_lesson(p_lesson_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select public.is_staff() or exists (
    select 1
      from public.lessons l
      join public.modules m on m.id = l.module_id
      join public.courses c on c.id = m.course_id
     where l.id = p_lesson_id
       and l.status = 'published' and m.status = 'published' and c.status = 'published'
       and (l.is_free_preview or public.plan_rank(public.current_plan()) >= public.plan_rank(m.required_plan))
  )
$$;

-- ---------------------------------------------------------------- progress & activity
create table public.lesson_progress (
  user_id      uuid not null references public.profiles (id) on delete cascade,
  lesson_id    uuid not null references public.lessons (id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- One row per learner per local day: drives streaks, the daily goal and weekly charts.
create table public.daily_activity (
  user_id         uuid not null references public.profiles (id) on delete cascade,
  day             date not null,
  minutes         int  not null default 0 check (minutes between 0 and 1440),
  lessons_done    int  not null default 0 check (lessons_done >= 0),
  problems_solved int  not null default 0 check (problems_solved >= 0),
  primary key (user_id, day)
);

create or replace function public.local_today()
returns date language sql stable security definer set search_path = '' as $$
  select (now() at time zone coalesce(
            (select timezone from public.profiles where id = auth.uid()), 'Asia/Kolkata'))::date
$$;

-- Marks a lesson complete once and credits its minutes to today. Returns true if newly completed.
create or replace function public.complete_lesson(p_lesson_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_minutes int;
  v_new boolean;
begin
  if v_uid is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  if not public.can_read_lesson(p_lesson_id) then
    raise exception 'lesson not available' using errcode = '42501';
  end if;
  insert into public.lesson_progress (user_id, lesson_id) values (v_uid, p_lesson_id)
    on conflict do nothing;
  v_new := found;
  if v_new then
    select estimated_minutes into v_minutes from public.lessons where id = p_lesson_id;
    insert into public.daily_activity (user_id, day, minutes, lessons_done)
    values (v_uid, public.local_today(), least(v_minutes, 1440), 1)
    on conflict (user_id, day) do update
      set minutes = least(public.daily_activity.minutes + excluded.minutes, 1440),
          lessons_done = public.daily_activity.lessons_done + 1;
  end if;
  return v_new;
end $$;

-- Self-reported study time for today only, 1–240 minutes per call.
create or replace function public.log_study_minutes(p_minutes int)
returns int language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_total int;
begin
  if v_uid is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  if p_minutes is null or p_minutes < 1 or p_minutes > 240 then
    raise exception 'minutes must be between 1 and 240' using errcode = '22023';
  end if;
  insert into public.daily_activity (user_id, day, minutes)
  values (v_uid, public.local_today(), p_minutes)
  on conflict (user_id, day) do update
    set minutes = least(public.daily_activity.minutes + excluded.minutes, 1440)
  returning minutes into v_total;
  return v_total;
end $$;

-- ---------------------------------------------------------------- practice (used from milestone 3)
create table public.problems (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title         text not null check (char_length(title) between 2 and 160),
  difficulty    public.problem_level not null,
  topic         text not null,
  module_id     uuid references public.modules (id) on delete set null,
  statement_md  text not null default '',
  starter_code  text not null default '',
  hints         text[] not null default '{}',
  xp            int  not null default 20 check (xp between 0 and 500),
  time_limit_ms int  not null default 2000 check (time_limit_ms between 100 and 10000),
  memory_kb     int  not null default 65536 check (memory_kb between 1024 and 524288),
  required_plan public.plan_tier not null default 'free',
  status        public.content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger problems_updated_at before update on public.problems
  for each row execute function public.set_updated_at();

-- Hidden test cases are never readable by students; the judge reads them with the service role.
create table public.test_cases (
  id              uuid primary key default gen_random_uuid(),
  problem_id      uuid not null references public.problems (id) on delete cascade,
  input           text not null default '',
  expected_output text not null,
  is_hidden       boolean not null default true,
  position        int not null default 0
);
create index test_cases_problem_idx on public.test_cases (problem_id, position);

create table public.submissions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  problem_id  uuid not null references public.problems (id) on delete cascade,
  source_code text not null check (octet_length(source_code) <= 65536),
  status      public.submission_status not null default 'queued',
  passed      int not null default 0,
  total       int not null default 0,
  runtime_ms  int,
  created_at  timestamptz not null default now()
);
create index submissions_user_idx on public.submissions (user_id, created_at desc);

-- ---------------------------------------------------------------- AI quotas & rate limits
create table public.ai_usage (
  user_id       uuid not null references public.profiles (id) on delete cascade,
  day           date not null,
  messages      int not null default 0,
  input_tokens  int not null default 0,
  output_tokens int not null default 0,
  primary key (user_id, day)
);

create or replace function public.ai_daily_limit(p public.plan_tier)
returns int language sql immutable as $$
  select case p when 'free' then 10 when 'pro' then 200 when 'premium' then 500 end
$$;

-- Atomically reserves one AI message for the caller. Returns messages left today, or raises.
create or replace function public.consume_ai_message()
returns int language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_limit int := public.ai_daily_limit(public.current_plan());
  v_used int;
begin
  if v_uid is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  insert into public.ai_usage (user_id, day, messages) values (v_uid, public.local_today(), 1)
  on conflict (user_id, day) do update set messages = public.ai_usage.messages + 1
    where public.ai_usage.messages < v_limit
  returning messages into v_used;
  if v_used is null then raise exception 'daily AI quota reached' using errcode = 'P0001', hint = 'quota'; end if;
  return v_limit - v_used;
end $$;

create table public.rate_limits (
  key          text not null,
  window_start timestamptz not null,
  hits         int not null default 0,
  primary key (key, window_start)
);

-- Fixed-window limiter for server routes. Callable by the service role only.
create or replace function public.check_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns table (allowed boolean, remaining int, reset_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare
  v_window timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  v_hits int;
begin
  insert into public.rate_limits (key, window_start, hits) values (p_key, v_window, 1)
  on conflict (key, window_start) do update set hits = public.rate_limits.hits + 1
  returning hits into v_hits;
  delete from public.rate_limits where window_start < now() - interval '1 day';
  return query select v_hits <= p_limit, greatest(p_limit - v_hits, 0), v_window + make_interval(secs => p_window_seconds);
end $$;

-- ---------------------------------------------------------------- privileges
-- Learners may edit only their own descriptive profile fields, never role.
revoke update on public.profiles from authenticated, anon;
grant update (full_name, username, college, city, bio, daily_goal_minutes, timezone) on public.profiles to authenticated;

revoke execute on function public.check_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function public.check_rate_limit(text, int, int) to service_role;
revoke execute on function public.complete_lesson(uuid), public.log_study_minutes(int), public.consume_ai_message() from public, anon;
grant execute on function public.complete_lesson(uuid), public.log_study_minutes(int), public.consume_ai_message() to authenticated;

-- Admin-only role change.
create or replace function public.admin_set_role(p_user uuid, p_role public.app_role)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'admin only' using errcode = '42501'; end if;
  update public.profiles set role = p_role where id = p_user;
end $$;
revoke execute on function public.admin_set_role(uuid, public.app_role) from public, anon;
grant execute on function public.admin_set_role(uuid, public.app_role) to authenticated;

-- ---------------------------------------------------------------- row level security
alter table public.profiles        enable row level security;
alter table public.subscriptions   enable row level security;
alter table public.payments        enable row level security;
alter table public.webhook_events  enable row level security;
alter table public.courses         enable row level security;
alter table public.modules         enable row level security;
alter table public.lessons         enable row level security;
alter table public.lesson_contents enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.daily_activity  enable row level security;
alter table public.problems        enable row level security;
alter table public.test_cases      enable row level security;
alter table public.submissions     enable row level security;
alter table public.ai_usage        enable row level security;
alter table public.rate_limits     enable row level security;
-- webhook_events and rate_limits have no policies: only the service role can touch them.

create policy "profiles: read own or staff" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_staff());
create policy "profiles: update own" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create policy "subscriptions: read own or admin" on public.subscriptions for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
create policy "payments: read own or admin" on public.payments for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "courses: read published" on public.courses for select to anon, authenticated
  using (status = 'published' or public.is_staff());
create policy "courses: staff write" on public.courses for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "modules: read published" on public.modules for select to anon, authenticated
  using ((status = 'published' and exists (select 1 from public.courses c where c.id = course_id and c.status = 'published'))
         or public.is_staff());
create policy "modules: staff write" on public.modules for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "lessons: read published" on public.lessons for select to anon, authenticated
  using ((status = 'published' and exists (select 1 from public.modules m where m.id = module_id and m.status = 'published'))
         or public.is_staff());
create policy "lessons: staff write" on public.lessons for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "lesson_contents: read if entitled" on public.lesson_contents for select to authenticated
  using (public.can_read_lesson(lesson_id));
create policy "lesson_contents: staff write" on public.lesson_contents for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "lesson_progress: read own or staff" on public.lesson_progress for select to authenticated
  using (user_id = auth.uid() or public.is_staff());
create policy "daily_activity: read own" on public.daily_activity for select to authenticated
  using (user_id = auth.uid());

create policy "problems: read published" on public.problems for select to authenticated
  using (status = 'published' or public.is_staff());
create policy "problems: staff write" on public.problems for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "test_cases: read public samples" on public.test_cases for select to authenticated
  using ((not is_hidden and exists (select 1 from public.problems p where p.id = problem_id and p.status = 'published'))
         or public.is_staff());
create policy "test_cases: staff write" on public.test_cases for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "submissions: read own or staff" on public.submissions for select to authenticated
  using (user_id = auth.uid() or public.is_staff());

create policy "ai_usage: read own" on public.ai_usage for select to authenticated
  using (user_id = auth.uid());
