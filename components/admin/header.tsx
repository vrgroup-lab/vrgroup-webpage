"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BriefcaseBusiness, FolderKanban, Home, Settings } from "lucide-react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Ofertas", href: "/admin/ofertas", icon: BriefcaseBusiness },
  { label: "Portafolio", href: "/admin/portafolio", icon: FolderKanban },
  { label: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export function AdminHeader() {
  const pathname = usePathname()

  return (
    <header className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src="/logos/brand/logo_vrgroup_cuadrado.png" alt="VR Group" fill className="object-contain" sizes="80px" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.18em]">Admin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Home size={16} />
            Volver al sitio
          </Link>
        </div>
      </div>
    </header>
  )
}
