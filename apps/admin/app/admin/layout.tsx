import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin/header"
import { requireAdminSession } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession()

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", color: "#111827" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "16px 20px 80px" }}>
        <div
          style={{
            position: "sticky",
            top: 16,
            zIndex: 40,
          }}
        >
          <AdminHeader fullName={session.profile.fullName} role={session.profile.role} />
        </div>
        <main style={{ marginTop: 24 }}>{children}</main>
      </div>
    </div>
  )
}
