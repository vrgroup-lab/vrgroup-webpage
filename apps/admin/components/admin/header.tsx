"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoutButton } from "@/components/admin/logout-button"

const navItems = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/ofertas", label: "Ofertas" },
  { href: "/admin/contactos", label: "Contactos" },
  { href: "/admin/usuarios", label: "Usuarios" },
]

export function AdminHeader({ fullName, role }: { fullName: string | null; role: string }) {
  const pathname = usePathname()

  return (
    <div style={{ width: "100%" }}>
      <header
        style={{
          width: "100%",
          border: "1px solid #e5e7eb",
          borderRadius: 24,
          background: "rgba(255,255,255,0.96)",
          padding: 20,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#ff5a5f" }}>
              VR Group Admin
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 700, color: "#111827" }}>
              {fullName || "Usuario autenticado"} <span style={{ color: "#5b6b82", fontWeight: 500 }}>· {role}</span>
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="/trabaja-con-nosotros"
              style={{
                borderRadius: 999,
                border: "1px solid #d8e0ea",
                background: "#fff",
                color: "#0b1b33",
                padding: "10px 14px",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Vista publica
            </Link>
            <LogoutButton />
          </div>
        </div>

        <nav style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  borderRadius: 999,
                  border: active ? "1px solid #0b1b33" : "1px solid #d8e0ea",
                  background: active ? "#0b1b33" : "#fff",
                  color: active ? "#fff" : "#0b1b33",
                  padding: "10px 14px",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>
    </div>
  )
}
