import { requireRole } from "@/lib/auth/session";
import { STAFF_ROLES } from "@/lib/auth/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(STAFF_ROLES);
  return children;
}
