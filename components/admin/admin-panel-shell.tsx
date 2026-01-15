"use client"

import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { AdminHeader } from "@/components/admin/header"

export function AdminPanelShell({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => getSupabaseBrowser(), [])
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace("/admin/login")
        return
      }
      setChecking(false)
    }
    verifySession()
  }, [router, supabase])

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-700 flex items-center justify-center">
        <div className="text-sm">Verificando sesión...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdminHeader />
      </div>
      <main className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
