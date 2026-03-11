import Link from "next/link"

const modules = [
  {
    title: "Trabaja con nosotros",
    description: "Vista publica dinamica de vacantes publicadas sobre la tabla jobs.",
    href: "/trabaja-con-nosotros",
  },
  {
    title: "Login admin",
    description: "Acceso al panel protegido para gestionar ofertas, contactos y usuarios.",
    href: "/login",
  },
  {
    title: "Panel",
    description: "Tablero privado con modulos reales basados en jobs, contact_submissions y user_profiles.",
    href: "/admin",
  },
]

export default function AdminHomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 920,
          background: "#fff",
          border: "1px solid #d8e0ea",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 24px 60px rgba(11, 27, 51, 0.08)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ff5a5f" }}>
          Scaffold inicial
        </p>
        <h1 style={{ margin: "12px 0 10px", fontSize: 40, lineHeight: 1.1 }}>VR Group Admin</h1>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#4f5d75" }}>
          Capa dinamica separada del sitio estatico para operar vacantes, leads comerciales y accesos del backoffice
          usando Supabase y auth server-side.
        </p>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              style={{
                textDecoration: "none",
                color: "#0b1b33",
                border: "1px solid #d8e0ea",
                borderRadius: 20,
                padding: 20,
                background: "#f8fafc",
                fontWeight: 600,
              }}
            >
              <div style={{ fontSize: 18 }}>{module.title}</div>
              <p style={{ margin: "10px 0 0", color: "#4f5d75", fontSize: 14, lineHeight: 1.5 }}>{module.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
