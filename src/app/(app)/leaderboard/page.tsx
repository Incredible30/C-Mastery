import type { Metadata } from "next";
import Link from "next/link";
import { Card, EmptyState, PageHeader } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Leaderboard" };

export default async function LeaderboardPage() {
  await requireViewer("/leaderboard");
  const supabase = await createClient();
  const { data: rows, error } = await supabase.rpc("leaderboard", { p_limit: 50 });
  if (error) console.error("leaderboard", error.message);

  return (
    <div className="grid gap-5">
      <PageHeader title="Leaderboard" description="Ranked by XP from solved practice problems. Only first names and last initials are shown." />
      <Card>
        {!rows?.length ? (
          <EmptyState title="No one has solved a problem yet">Be the first: <Link href="/practice" className="text-accent">open Coding Practice</Link>.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead><tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
                <th className="w-16 py-2 pr-3">Rank</th><th className="py-2 pr-3">Learner</th><th className="py-2 pr-3 text-right">Solved</th><th className="py-2 text-right">XP</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.rank}-${r.display_name}`} className={`border-b border-border last:border-0 ${r.is_me ? "bg-accent-soft" : ""}`}>
                    <td className="py-2.5 pr-3 font-display text-lg font-bold tabular-nums">{r.rank <= 3 ? ["🥇", "🥈", "🥉"][r.rank - 1] : r.rank}</td>
                    <td className="py-2.5 pr-3 font-medium">{r.display_name}{r.is_me && <span className="ml-2 text-xs text-accent-strong">(you)</span>}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">{r.solved}</td>
                    <td className="py-2.5 text-right font-semibold tabular-nums text-amber">{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
