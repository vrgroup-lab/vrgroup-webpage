import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin/header"
import { requireAdminSession } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession()

  return (
    <main style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 20px 80px" }}>
      <AdminHeader fullName={session.profile.fullName} role={session.profile.role} />
      <div style={{ marginTop: 20 }}>{children}</div>
    </main>
  )
}
