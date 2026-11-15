/**
 * Database types for the Supabase client.
 * Hand-written to match supabase/migrations. After connecting a project, regenerate with:
 *   npm run db:types
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "student" | "instructor" | "admin";
export type PlanTier = "free" | "pro" | "premium";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ProblemLevel = "easy" | "medium" | "hard";
export type LessonKind = "lesson" | "quiz" | "project";
export type ContentStatus = "draft" | "published" | "archived";
export type SubStatus = "active" | "past_due" | "cancelled" | "expired";
export type SubmissionStatus =
  | "queued" | "running" | "accepted" | "wrong_answer" | "compile_error" | "runtime_error" | "time_limit" | "internal_error";

type Table<Row, Required extends keyof Row = never> = {
  Row: Row;
  Insert: Partial<Row> & Pick<Row, Required>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Profile = {
  id: string; full_name: string; username: string | null; college: string; city: string; bio: string;
  role: AppRole; daily_goal_minutes: number; timezone: string; created_at: string; updated_at: string;
};
export type Subscription = {
  user_id: string; plan: PlanTier; status: SubStatus; current_period_end: string | null;
  razorpay_subscription_id: string | null; updated_at: string;
};
export type Payment = {
  id: string; user_id: string; plan: PlanTier; billing_cycle: "monthly" | "yearly"; amount_paise: number; currency: string;
  razorpay_order_id: string; razorpay_payment_id: string | null; status: "created" | "paid" | "failed" | "refunded"; created_at: string;
};
export type WebhookEvent = { id: string; event: string; payload: Json; received_at: string };
export type Course = {
  id: string; slug: string; title: string; description: string; status: ContentStatus; position: number; created_at: string; updated_at: string;
};
export type Module = {
  id: string; course_id: string; slug: string; title: string; summary: string; level: Difficulty; position: number;
  estimated_hours: number; outcomes: string[]; required_plan: PlanTier; status: ContentStatus; created_at: string; updated_at: string;
};
export type Lesson = {
  id: string; module_id: string; slug: string; title: string; kind: LessonKind; estimated_minutes: number; position: number;
  is_free_preview: boolean; status: ContentStatus; created_at: string; updated_at: string;
};
export type LessonContent = { lesson_id: string; body_md: string; updated_at: string };
export type LessonProgress = { user_id: string; lesson_id: string; completed_at: string };
export type DailyActivity = { user_id: string; day: string; minutes: number; lessons_done: number; problems_solved: number };
export type Problem = {
  id: string; slug: string; title: string; difficulty: ProblemLevel; topic: string; module_id: string | null; statement_md: string;
  starter_code: string; hints: string[]; xp: number; time_limit_ms: number; memory_kb: number; required_plan: PlanTier;
  status: ContentStatus; created_at: string; updated_at: string;
};
export type TestCase = { id: string; problem_id: string; input: string; expected_output: string; is_hidden: boolean; position: number };
export type Submission = {
  id: string; user_id: string; problem_id: string; source_code: string; status: SubmissionStatus; passed: number; total: number;
  runtime_ms: number | null; created_at: string;
};
export type AiUsage = { user_id: string; day: string; messages: number; input_tokens: number; output_tokens: number };
export type RateLimitRow = { key: string; window_start: string; hits: number };

export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile, "id">;
      subscriptions: Table<Subscription, "user_id">;
      payments: Table<Payment, "user_id" | "plan" | "billing_cycle" | "amount_paise" | "razorpay_order_id">;
      webhook_events: Table<WebhookEvent, "id" | "event" | "payload">;
      courses: Table<Course, "slug" | "title">;
      modules: Table<Module, "course_id" | "slug" | "title">;
      lessons: Table<Lesson, "module_id" | "slug" | "title">;
      lesson_contents: Table<LessonContent, "lesson_id">;
      lesson_progress: Table<LessonProgress, "user_id" | "lesson_id">;
      daily_activity: Table<DailyActivity, "user_id" | "day">;
      problems: Table<Problem, "slug" | "title" | "difficulty" | "topic">;
      test_cases: Table<TestCase, "problem_id" | "expected_output">;
      submissions: Table<Submission, "user_id" | "problem_id" | "source_code">;
      ai_usage: Table<AiUsage, "user_id" | "day">;
      rate_limits: Table<RateLimitRow, "key" | "window_start">;
    };
    Views: { [_ in never]: never };
    Functions: {
      complete_lesson: { Args: { p_lesson_id: string }; Returns: boolean };
      log_study_minutes: { Args: { p_minutes: number }; Returns: number };
      consume_ai_message: { Args: Record<string, never>; Returns: number };
      check_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: { allowed: boolean; remaining: number; reset_at: string }[];
      };
      current_plan: { Args: Record<string, never>; Returns: PlanTier };
      admin_set_role: { Args: { p_user: string; p_role: AppRole }; Returns: undefined };
      can_read_lesson: { Args: { p_lesson_id: string }; Returns: boolean };
    };
    Enums: {
      app_role: AppRole; plan_tier: PlanTier; difficulty: Difficulty; problem_level: ProblemLevel;
      lesson_kind: LessonKind; content_status: ContentStatus; sub_status: SubStatus; submission_status: SubmissionStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
};
