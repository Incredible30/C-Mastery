# C Mastery development checklist

Status as of 15 Nov 2026. Each milestone ends with `npm run check` passing and, where it touches the database, `npm run test:db`.

## Milestone 0: Project structure ✅
- [x] Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4, ESLint
- [x] Environment validation with zod; secrets isolated in `env.server.ts` behind `server-only`
- [x] Vitest unit test setup
- [x] Light and dark themes carried over from the prototype design
- [x] Error page and 404 page

## Milestone 1: Database schema and migrations ✅
- [x] Profiles, roles (student, instructor, admin), subscriptions, payments, webhook events
- [x] Courses, modules, lessons, lesson contents (plan-gated), lesson progress, daily activity
- [x] Problems, public and hidden test cases, submissions (tables ready for milestone 3)
- [x] AI usage quotas and a Postgres rate limiter (functions ready)
- [x] Row Level Security on every table; role column not editable by users
- [x] Business writes only through SECURITY DEFINER functions (`complete_lesson`, `log_study_minutes`, `consume_ai_message`)
- [x] Seed: 8 modules, 42 lessons, 3 problems with hidden tests
- [x] pgTAP RLS tests in `supabase/tests/rls.test.sql`
- [ ] **Run `npm run test:db` against a live Supabase stack** (not run yet: no Docker on the build machine)

## Milestone 2: Authentication and authorization ✅
- [x] Email and password sign-up with confirmation email, sign-in, sign-out (POST only)
- [x] Session refresh and route protection in middleware; pages re-check on the server
- [x] Staff-only admin area (404 for everyone else) plus RLS on every write
- [x] Open-redirect protection on `?next=`
- [x] Rate limits: sign-in 30 per IP and 8 per email per 10 minutes; sign-up 5 per IP per hour
- [x] Generic sign-in errors, so accounts cannot be discovered
- [ ] Password reset flow
- [ ] Profile editing page

## Milestone 3: Student dashboard ✅
- [x] Streak, longest streak, problems solved, level and XP, daily goal ring
- [x] Log study time (validated 1–240 minutes, today only)
- [x] Weekly minutes chart, recommended next lesson, course progress, recent activity

## Milestone 4: Course and lesson management ✅
- [x] Learner roadmap, module page and lesson page with Markdown content
- [x] Plan gating with free preview lessons; locked lessons show an upgrade notice
- [x] Mark lesson complete (credits minutes and XP once)
- [x] Admin: edit course; create, edit, delete modules and lessons; draft and publish
- [x] Validation errors shown per field; duplicate slugs reported clearly
- [x] Full lesson content for all 42 lessons in `supabase/content/`, loaded with `npm run content:sync`; tests check every seeded lesson has content

## Next milestones
## Milestone 5: Coding practice + Judge0 ✅
- [x] 15 problems as files with statements, hints, starter code, reference solutions and 67 tests; `problems:check` verifies every test against the reference solution
- [x] Problem bank expanded to 400 problems (50 per module: 17 easy / 20 medium / 13 hard; hard = Pro) in per-module folders; `problems:build` fills expected outputs from reference solutions; slugs unique across modules
- [x] Problem list with filters and progress; problem page with Monaco editor, run on examples, custom input, submit
- [x] Judge0 runner (hosted RapidAPI or self-hosted), expected outputs never sent to Judge0; development-only gcc runner refused in production
- [x] Hidden tests read with the service role only and never returned to the browser; per-test results redacted for hidden tests
- [x] Submissions saved server-side; first accepted solve credits XP and the daily activity once
- [x] Rate limits: runs 30 per 5 minutes; submissions 10 per 5 minutes and 150 per day
- [x] Leaderboard showing first name and last initial only
- [x] Tests: grading rules, hidden-data redaction, Judge0 mapping, request validation, real gcc end-to-end runs
- [ ] Admin screens for editing problems (problems are edited as files today)
- [ ] Run against a live Judge0 instance (needs a Judge0 key or server)

## Next milestones
- [ ] **6. Code playground**: free-form Monaco editor with stdin, reusing the same judge runner
- [ ] **7. AI tutor (Claude API)**: four modes, streaming from a server route, `consume_ai_message()` quota per plan, prompt rules that give hints before answers
- [ ] **8. Razorpay subscriptions**: server-created orders, signature-verified webhooks, idempotent `webhook_events`, plan changes only from webhooks
- [ ] **9. Debugging lab and assessments**
- [ ] **10. Analytics and profile**
- [ ] **11. Production hardening**: monitoring, backups, CSP headers, load tests, end-to-end tests (Playwright)
