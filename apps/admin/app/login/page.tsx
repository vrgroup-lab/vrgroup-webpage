"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        background: "#f3f4f6",
      }}
    >
      <div style={{ width: "100%", maxWidth: 860 }}>
        <section
          style={{
            overflow: "hidden",
            borderRadius: 24,
            border: "1px solid #e5e7eb",
            background: "#fff",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.14)",
          }}
        >
          <div
            style={{
              background: "#0b1224",
              color: "#fff",
              padding: "32px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", width: 64, height: 64 }}>
                <Image src="/logos/brand/logo_vrgroup_cuadrado.png" alt="VR Group" fill sizes="128px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.72)" }}>
                  Admin
                </p>
                <h1 style={{ margin: "8px 0 0", fontSize: 32, lineHeight: 1.1 }}>Panel de administración</h1>
              </div>
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Acceso privado
            </span>
          </div>

          <div style={{ padding: "32px 40px", background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ position: "relative", width: 48, height: 48 }}>
                <Image src="/logos/brand/logo_vrgroup_cuadrado.png" alt="VR Group" fill sizes="96px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>VR Group</p>
                <h2 style={{ margin: "4px 0 0", fontSize: 28, lineHeight: 1.15 }}>Iniciar sesión</h2>
              </div>
            </div>

            {error ? (
              <div
                style={{
                  marginBottom: 16,
                  borderRadius: 16,
                  border: "1px solid #fecaca",
                  background: "#fef2f2",
                  color: "#b91c1c",
                  padding: "14px 16px",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            ) : null}

            <form
              style={{ display: "grid", gap: 16 }}
              onSubmit={async (event) => {
                event.preventDefault()
                setLoading(true)
                setError(null)

                try {
                  const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                  })

                  const payload = await response.json()
                  if (!response.ok) {
                    throw new Error(payload.error || "No se pudo iniciar sesion.")
                  }

                  router.push("/admin")
                  router.refresh()
                } catch (err) {
                  setError(err instanceof Error ? err.message : "No se pudo iniciar sesion.")
                } finally {
                  setLoading(false)
                }
              }}
            >
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="tu@empresa.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid #e5e7eb",
                    fontSize: 16,
                    color: "#111827",
                  }}
                />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Contraseña</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="********"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid #e5e7eb",
                    fontSize: 16,
                    color: "#111827",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "1px solid #2563eb",
                  background: "#2563eb",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>

              <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
                ¿Olvidaste tu contraseña? Escríbele a un administrador para restablecer tu acceso.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
