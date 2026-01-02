"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BriefcaseBusiness, FolderKanban, Home, LayoutDashboard, LogOut, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Ofertas de empleo", href: "/admin/ofertas", icon: BriefcaseBusiness },
  { label: "Portafolio", href: "/admin/portafolio", icon: FolderKanban },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full max-w-[240px] bg-[#0b1224] text-white border-r border-white/10 rounded-2xl p-4 h-full shadow-[0_18px_40px_rgba(6,12,30,0.35)]">
      <div className="mb-6 space-y-1 px-2">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">Panel</p>
        <h2 className="font-display font-bold text-xl">VR Group Admin</h2>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-[0_10px_30px_rgba(6,12,30,0.35)] border border-white/10"
                  : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4 px-2 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
        >
          <Home size={16} />
          Volver al sitio
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
