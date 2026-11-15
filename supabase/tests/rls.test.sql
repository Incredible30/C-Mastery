-- Row Level Security tests. Run with: npx supabase test db
-- Requires the local Supabase stack (npx supabase start), which runs pgTAP.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

-- Two learners and one instructor.
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a1', 'free@test.dev', '{"full_name":"Free Learner"}'),
  ('00000000-0000-0000-0000-0000000000b2', 'pro@test.dev',  '{"full_name":"Pro Learner"}'),
  ('00000000-0000-0000-0000-0000000000c3', 'staff@test.dev', '{"full_name":"Instructor"}');
update public.subscriptions set plan = 'pro' where user_id = '00000000-0000-0000-0000-0000000000b2';
update public.profiles set role = 'instructor' where id = '00000000-0000-0000-0000-0000000000c3';

select is((select count(*)::int from public.profiles where id in
  ('00000000-0000-0000-0000-0000000000a1','00000000-0000-0000-0000-0000000000b2')), 2, 'signup trigger created profiles');

-- Act as the free learner.
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}';

select is((select count(*)::int from public.profiles), 1, 'a learner sees only their own profile');
select throws_ok($$ update public.profiles set role = 'admin' where id = auth.uid() $$, '42501', null, 'a learner cannot change their role');
select lives_ok($$ update public.profiles set full_name = 'Renamed' where id = auth.uid() $$, 'a learner can edit their name');

select ok((select count(*) from public.lessons) > 40, 'published lesson titles are listed');
select is((select count(*)::int from public.lesson_contents lc join public.lessons l on l.id = lc.lesson_id
           join public.modules m on m.id = l.module_id where m.required_plan = 'pro' and not l.is_free_preview), 0,
          'free learner cannot read Pro lesson bodies');
select ok((select count(*) from public.lesson_contents lc join public.lessons l on l.id = lc.lesson_id where l.is_free_preview) > 0,
          'free learner can read free-preview lessons');

select is((select count(*)::int from public.test_cases where is_hidden), 0, 'hidden test cases are invisible to learners');
select ok((select count(*) from public.test_cases where not is_hidden) > 0, 'public sample tests are visible');

select throws_ok($$ insert into public.lesson_progress (user_id, lesson_id) select auth.uid(), id from public.lessons limit 1 $$,
                 '42501', null, 'progress cannot be inserted directly');
select ok(public.complete_lesson((select l.id from public.lessons l join public.modules m on m.id = l.module_id
                                  where m.slug = 'foundations' and l.slug = 'first-program')), 'complete_lesson works for an entitled lesson');
select throws_ok($$ select public.complete_lesson((select l.id from public.lessons l join public.modules m on m.id = l.module_id
                                                   where m.slug = 'pointers' and l.slug = 'pointer-arithmetic')) $$,
                 '42501', null, 'complete_lesson rejects a Pro lesson for a free learner');
select throws_ok($$ select * from public.check_rate_limit('x', 1, 60) $$, '42501', null, 'rate limiter is service-role only');

-- Act as the pro learner.
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}';
select ok((select count(*) from public.lesson_contents lc join public.lessons l on l.id = lc.lesson_id
           join public.modules m on m.id = l.module_id where m.required_plan = 'pro') > 0, 'pro learner reads Pro lesson bodies');

select * from finish();
rollback;
