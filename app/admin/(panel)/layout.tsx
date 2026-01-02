"use client"

import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
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
      <div className="min-h-screen bg-[#050711] text-white flex items-center justify-center">
        <div className="text-white/70 text-sm">Verificando sesión...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050711] text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-6">
          <AdminSidebar />
          <main className="bg-white/5 border border-white/10 rounded-3xl p-5 lg:p-6 shadow-[0_18px_45px_rgba(6,12,30,0.35)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
