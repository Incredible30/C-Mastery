# C Mastery Platform: Instruction Book

This is the real C Mastery application: Next.js, TypeScript, Tailwind CSS and Supabase (PostgreSQL + Auth). It stores accounts, courses and progress in a real database with Row Level Security.

**What works today (milestones 0–4):** sign-up and sign-in, the student dashboard, the learning roadmap, module and lesson pages, marking lessons complete, logging study time, and a staff admin area for managing modules and lessons.

**Not built yet:** coding practice with Judge0, the Monaco playground, the AI tutor, Razorpay payments, the debugging lab, assessments and analytics. The database tables for these already exist. See [DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md).

---

## 1. What you need

| Tool | Version | Why |
| --- | --- | --- |
| Node.js | 20.9 or newer | Runs the app (this PC has v24) |
| A Supabase project | Free tier is fine | Database and login. Create one at supabase.com |
| Docker Desktop | Optional | Only to run Supabase locally instead of in the cloud |
| Git | Any recent | Version control |

The project lives in `D:\Claude_Tools\C_Mastery_Platform`. Run every command below from that folder in Command Prompt, PowerShell or a VS Code terminal.

---

## 2. First-time setup

### Step 1: Install packages

```bash
npm install
```

If npm warns that install scripts were blocked, allow the Supabase CLI to finish installing:

```bash
npm approve-scripts supabase
```

### Step 2: Set up the database

Pick **one** option.

**Option A: Supabase cloud (no Docker needed, recommended)**

1. At supabase.com, create a project. Choose the Mumbai (ap-south-1) region for Indian users. Save the database password.
2. Sign the CLI in and link the project. The project ref is in the project URL, `https://<ref>.supabase.co`.
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```
3. Create the tables and load the course content:
   ```bash
   npx supabase db push --include-seed
   ```
4. In the Supabase dashboard, open **Authentication → URL Configuration**. Set **Site URL** to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to **Redirect URLs**.

**Option B: Supabase on your PC (needs Docker Desktop running)**

```bash
npm run db:start
npm run db:reset
```

`db:start` prints the API URL, anon key and service role key. `db:reset` creates the tables and loads the seed. Confirmation emails go to a test inbox at http://localhost:54324 instead of real email.

### Step 3: Add your keys

1. Copy `.env.example` to `.env.local`.
2. Fill in the values from **Supabase → Project Settings → API** (or from `db:start` output):

| Variable | Where it comes from | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public key | No (protected by RLS) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally, your domain in production | No |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key | **Yes, never share it** |

Leave the Anthropic, Judge0 and Razorpay keys blank until those milestones. `.env.local` is ignored by Git, so keys are never committed.

### Step 4: Start the app

```bash
npm run dev
```

Open http://localhost:3000.

### Step 5: Make yourself an admin

1. Click **Start free**, sign up, and click the link in the confirmation email.
2. In **Supabase → SQL Editor**, run this with your email:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```
3. Refresh the app. **Course Admin** now appears in the sidebar.

Roles: `student` (default), `instructor` (can manage content), `admin` (manages content and roles). Users can never change their own role; the database blocks it.

---

## 3. Using the app

### As a learner

| Page | What you can do |
| --- | --- |
| **Dashboard** | See your streak, level and XP, today's goal ring and weekly minutes. Log study time. Jump to the recommended next lesson. |
| **Learning Roadmap** | See all modules with progress. Modules on a paid plan show a Pro badge. |
| **Module page** | See its lessons and outcomes. Click **Start module** or any lesson. |
| **Lesson page** | Read the lesson, click **Mark complete** (adds minutes to today and +25 XP once), move to the next lesson. |

Plans: Modules 1–3 are free. Modules 4–8 need Pro, except lessons marked **Preview**. Until payments arrive, change a learner's plan in the SQL Editor:

```sql
update public.subscriptions set plan = 'pro'
where user_id = (select id from auth.users where email = 'learner@example.com');
```

### As an instructor or admin

1. Open **Course Admin**.
2. **Edit course** changes the course title, description and status.
3. **New module** creates a module. Set its level, position, required plan and outcomes (one per line).
4. Inside a module, **New lesson** creates a lesson. Write content in Markdown: `##` for headings and ```` ```c ```` fences for code.
5. Content starts as **Draft**, hidden from learners. Change Status to **Published** when ready, then use **View as learner** to check it.
6. Tick **Free preview** to let every plan read a lesson.
7. **Delete** asks for confirmation and also removes everything inside (a module's lessons, a lesson's progress records).

---

## 4. Giving other people access

Running on your PC only you can use it. To let others in, deploy it.

**Deploy to Vercel (recommended for Next.js):**

1. Push the project to a private GitHub repository.
2. At vercel.com, choose **Add New → Project** and import the repository.
3. Under **Environment Variables**, add the same four variables as `.env.local`, with `NEXT_PUBLIC_SITE_URL` set to your live address, for example `https://cmastery.in`.
4. Deploy. Vercel gives you an address; you can attach your own domain.
5. In **Supabase → Authentication → URL Configuration**, change **Site URL** to the live address and add `https://YOUR-DOMAIN/auth/callback` to Redirect URLs.
6. For real emails, set up custom SMTP in **Supabase → Authentication → Emails**. The built-in sender is limited to a few emails an hour.

People then visit your address and sign up themselves. Promote instructors with the SQL in Step 5, using `'instructor'`.

---

## 5. Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the app with live reload at http://localhost:3000 |
| `npm run build` then `npm start` | Production build and server |
| `npm run check` | Typecheck, lint and unit tests together |
| `npm test` | Unit tests (40 tests) |
| `npm run test:db` | Row Level Security tests (needs `db:start`) |
| `npm run db:start` / `db:reset` | Start local Supabase / rebuild it with seed data |
| `npm run db:push` | Apply new migrations to the linked cloud project |
| `npm run db:types` | Generate database types from the local schema |

---

## 6. How data is protected

- **Row Level Security on every table.** Learners read only their own profile, progress and payments. Draft content is hidden. Paid lesson bodies are returned only to entitled plans.
- **No direct writes to progress.** Completing lessons and logging time go through database functions that validate the request.
- **Hidden test cases** are never readable by learners; the judge (milestone 5) reads them with the server-only service key.
- **Secrets stay on the server.** The service key lives in `env.server.ts`, which fails the build if browser code imports it. A scan of the built browser bundle found no secret names.
- **Rate limits** on sign-in and sign-up, stored in Postgres so they work across servers. Payment webhooks and AI quotas use the same pattern in later milestones.
- **Safe redirects:** the `?next=` value after sign-in only accepts paths on this site.

---

## 7. Project structure

```
supabase/
  migrations/      database schema, RLS policies and functions
  seed.sql         the C course: 8 modules, 42 lessons, sample problems
  tests/           pgTAP Row Level Security tests
src/
  app/(auth)/      sign-in and sign-up pages and actions
  app/(app)/       signed-in area: dashboard, learn, admin
  app/auth/        email confirmation callback and sign-out
  components/      shared UI: buttons, cards, forms, chart, navigation
  lib/             env validation, Supabase clients, auth, validation, progress maths, rate limiting
docs/              this book and the development checklist
```

---

## 8. Troubleshooting

| Problem | Fix |
| --- | --- |
| "Invalid public environment" on the page | `.env.local` is missing or a value is empty. Restart `npm run dev` after editing it. |
| Sign-in says "Too many attempts" straight away | The service role key is missing or wrong, so the rate limiter refuses requests. Check `SUPABASE_SERVICE_ROLE_KEY`. |
| Confirmation link says it expired | The Redirect URL is not allowed in Supabase. Add `/auth/callback` for your address (Step 2.4). |
| No confirmation email arrives | Local: check http://localhost:54324. Cloud: check spam, or set up custom SMTP. |
| Course Admin missing from the sidebar | Your role is still `student`. Run the SQL in Step 5 and refresh. |
| Roadmap says "No course published yet" | The seed did not run. Run `npx supabase db push --include-seed` or `npm run db:reset`. |
| `supabase` command fails after install | Run `npm approve-scripts supabase`, then `npm install` again. |
| `db:start` fails | Docker Desktop must be installed and running. Otherwise use Option A. |
