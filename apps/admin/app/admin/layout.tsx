import type { ReactNode } from "react"
import { AppShell } from "@/components/admin/app-shell"
import { requireAdminSession } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession()

  return (
    <AppShell
      fullName={session.profile.fullName}
      email={session.user.email ?? ""}
      role={session.profile.role}
    >
      {children}
    </AppShell>
  )
}
