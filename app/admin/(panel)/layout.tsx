import type { ReactNode } from "react"
import { AdminPanelShell } from "@/components/admin/admin-panel-shell"

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return <AdminPanelShell>{children}</AdminPanelShell>
}
