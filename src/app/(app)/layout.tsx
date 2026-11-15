import { AppNav, type NavItem } from "@/components/app-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { isStaff } from "@/lib/auth/roles";
import { PLAN_LABEL } from "@/lib/plans";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  const items: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: "home" },
    { href: "/learn", label: "Learning Roadmap", icon: "map" },
  ];
  if (isStaff(viewer.profile.role)) items.push({ href: "/admin", label: "Course Admin", icon: "settings" });

  const name = viewer.profile.full_name || viewer.email;
  const footer = (
    <div className="grid gap-3 rounded-xl bg-surface-2 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-semibold">{name}</div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Badge tone={viewer.plan === "free" ? "neutral" : "amber"}>{PLAN_LABEL[viewer.plan]}</Badge>
            <span className="capitalize">{viewer.profile.role}</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <form action="/auth/signout" method="post">
        <button className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] font-medium hover:bg-surface-3">Sign out</button>
      </form>
    </div>
  );

  return (
    <div className="md:grid md:grid-cols-[256px_minmax(0,1fr)]">
      <AppNav items={items} footer={footer} />
      <main className="mx-auto w-full max-w-[1240px] px-[max(16px,env(safe-area-inset-left))] pb-12 pt-16 md:px-7 md:pt-7">{children}</main>
    </div>
  );
}
