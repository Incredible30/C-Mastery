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
- [ ] **5. Coding practice + Judge0**: problem list, Monaco editor, submissions queued server-side, hidden tests read with the service role only, Judge0 in an isolated network with CPU, memory and time limits, per-user submission rate limits
- [ ] **6. Code playground**: Monaco with C syntax, stdin, run via the same isolated Judge0 path
- [ ] **7. AI tutor (Claude API)**: four modes, streaming from a server route, `consume_ai_message()` quota per plan, prompt rules that give hints before answers
- [ ] **8. Razorpay subscriptions**: server-created orders, signature-verified webhooks, idempotent `webhook_events`, plan changes only from webhooks
- [ ] **9. Debugging lab and assessments**
- [ ] **10. Analytics and profile**
- [ ] **11. Production hardening**: monitoring, backups, CSP headers, load tests, end-to-end tests (Playwright)
