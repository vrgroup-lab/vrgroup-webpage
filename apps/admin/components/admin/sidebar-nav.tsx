"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Briefcase, Inbox, LayoutDashboard, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavItem = {
  href: string
  label: string
  icon: React.ElementType
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/ofertas", label: "Ofertas", icon: Briefcase },
  { href: "/admin/contactos", label: "Contactos", icon: Inbox },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
]

export function SidebarNav({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-6 p-3">
      <Link
        href="/admin"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-2 py-2 transition-opacity hover:opacity-80",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white">
          <Image
            src="/logos/brand/logo_vrgroup_cuadrado.png"
            alt="VR Group"
            width={28}
            height={28}
            className="rounded-sm"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold leading-tight text-white">VR Group</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">Admin</span>
          </div>
        )}
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--coral)] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="mt-auto rounded-md bg-white/5 p-3 text-[11px] leading-relaxed text-white/50">
          VR Group · Backoffice
          <br />
          <span className="text-white/30">v0.1</span>
        </div>
      )}
    </div>
  )
}
