import Link from "next/link"
import { colors, radii, shadows } from "@vrgroup/brand"

const items = [
  {
    href: "/admin/ofertas",
    title: "Ofertas",
    description: "CRUD de vacantes sobre la tabla jobs.",
  },
  {
    href: "/admin/contactos",
    title: "Contactos",
    description: "Leads y mensajes del formulario comercial.",
  },
  {
    href: "/admin/usuarios",
    title: "Usuarios",
    description: "Gestión de accesos y roles del panel.",
  },
]

export default function AdminDashboardPage() {
  return (
    <section
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radii.xl,
        padding: 24,
        boxShadow: shadows.card,
      }}
    >
      <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: colors.coral }}>
        Admin
      </p>
      <h1 style={{ margin: "12px 0 10px", fontSize: 40 }}>Resumen operativo</h1>
      <p style={{ margin: 0, color: colors.textMuted, fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
        Este panel ya no mezcla conceptos. Las vacantes viven en <code>jobs</code>, los leads en{" "}
        <code>contact_submissions</code> y los accesos en <code>user_profiles</code>.
      </p>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 28 }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              color: colors.blueDark,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radii.lg,
              padding: 24,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 24 }}>{item.title}</h2>
            <p style={{ margin: "12px 0 0", lineHeight: 1.6, color: colors.textMuted }}>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
