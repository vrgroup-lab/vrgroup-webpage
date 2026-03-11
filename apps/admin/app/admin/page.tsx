import Link from "next/link"

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
        background: "#fff",
        border: "1px solid #d8e0ea",
        borderRadius: 28,
        padding: 24,
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#ff5a5f" }}>
        Admin
      </p>
      <h1 style={{ margin: "12px 0 10px", fontSize: 40 }}>Resumen operativo</h1>
      <p style={{ margin: 0, color: "#4f5d75", fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
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
              color: "#0b1b33",
              background: "#fff",
              border: "1px solid #d8e0ea",
              borderRadius: 24,
              padding: 24,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 24 }}>{item.title}</h2>
            <p style={{ margin: "12px 0 0", lineHeight: 1.6, color: "#4f5d75" }}>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
