-- C MASTERY · Milestone 5: coding practice
-- Submissions are written only by the server (service role) after the judge runs.
-- Hidden test cases stay readable by staff and the service role only (see migration 1).

alter table public.submissions
  add column compile_output text check (compile_output is null or char_length(compile_output) <= 20000),
  add column memory_kb int,
  add column details jsonb not null default '[]'::jsonb;  -- per-test summary; never contains hidden inputs or outputs

create index submissions_user_problem_idx on public.submissions (user_id, problem_id, status);
create index problems_status_idx on public.problems (status, difficulty);

-- Credits a solved problem to the learner's day the first time they get it accepted.
-- Returns true when this accepted submission is their first for the problem.
create or replace function public.credit_problem_solved(p_submission uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid;
  v_problem uuid;
  v_tz text;
  v_day date;
begin
  select user_id, problem_id into v_user, v_problem
    from public.submissions where id = p_submission and status = 'accepted';
  if v_user is null then return false; end if;

  if exists (select 1 from public.submissions
              where user_id = v_user and problem_id = v_problem and status = 'accepted' and id <> p_submission) then
    return false;
  end if;

  select timezone into v_tz from public.profiles where id = v_user;
  v_day := (now() at time zone coalesce(v_tz, 'Asia/Kolkata'))::date;
  insert into public.daily_activity (user_id, day, problems_solved) values (v_user, v_day, 1)
  on conflict (user_id, day) do update set problems_solved = public.daily_activity.problems_solved + 1;
  return true;
end $$;

revoke execute on function public.credit_problem_solved(uuid) from public, anon, authenticated;
grant execute on function public.credit_problem_solved(uuid) to service_role;

-- Leaderboard: first name and last initial only, so learners' full names aren't exposed.
create or replace function public.leaderboard(p_limit int default 50)
returns table (rank bigint, display_name text, solved bigint, points bigint, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with solved as (
    select distinct s.user_id, s.problem_id from public.submissions s where s.status = 'accepted'
  ),
  scores as (
    select sv.user_id, count(*) as solved, coalesce(sum(p.xp), 0) as points
      from solved sv join public.problems p on p.id = sv.problem_id
     group by sv.user_id
  )
  select rank() over (order by sc.points desc, sc.solved desc),
         coalesce(nullif(trim(split_part(pr.full_name, ' ', 1) || ' ' ||
           left(nullif(split_part(pr.full_name, ' ', 2), ''), 1)), ''), 'Learner'),
         sc.solved, sc.points, sc.user_id = auth.uid()
    from scores sc join public.profiles pr on pr.id = sc.user_id
   order by 1, 2
   limit least(greatest(coalesce(p_limit, 50), 1), 100)
$$;

revoke execute on function public.leaderboard(int) from public, anon;
grant execute on function public.leaderboard(int) to authenticated;
