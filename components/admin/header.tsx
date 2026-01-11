"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, BriefcaseBusiness, FolderKanban, Home, Settings, MessageCircle, Menu, X } from "lucide-react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Ofertas", href: "/admin/ofertas", icon: BriefcaseBusiness },
  { label: "Portafolio", href: "/admin/portafolio", icon: FolderKanban },
  { label: "Contactos", href: "/admin/contactos", icon: MessageCircle },
  { label: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export function AdminHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="w-full">
      <header className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
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
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`md:hidden mt-3 rounded-2xl border border-gray-200 bg-white shadow-sm ${mobileOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Home size={16} />
            Volver al sitio
          </Link>
        </nav>
      </div>
    </div>
  )
}
