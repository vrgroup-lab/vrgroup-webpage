"use client"

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
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          border: "1px solid #d8e0ea",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 24px 60px rgba(11, 27, 51, 0.08)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#ff5a5f" }}>
          Acceso privado
        </p>
        <h1 style={{ margin: "12px 0 10px", fontSize: 40, lineHeight: 1.05 }}>Iniciar sesion</h1>
        <p style={{ margin: 0, color: "#4f5d75", lineHeight: 1.6 }}>
          Este acceso protege el panel de ofertas, contactos y usuarios. Solo usuarios presentes en{" "}
          <code>user_profiles</code> con rol valido pueden ingresar.
        </p>

        {error ? (
          <div
            style={{
              marginTop: 18,
              borderRadius: 18,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
              padding: "14px 16px",
            }}
          >
            {error}
          </div>
        ) : null}

        <form
          style={{ display: "grid", gap: 16, marginTop: 22 }}
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
            <span style={{ fontWeight: 700 }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="tu@empresa.com"
              style={{
                width: "100%",
                borderRadius: 16,
                border: "1px solid #d8e0ea",
                padding: "14px 16px",
                fontSize: 16,
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontWeight: 700 }}>Contrasena</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="********"
              style={{
                width: "100%",
                borderRadius: 16,
                border: "1px solid #d8e0ea",
                padding: "14px 16px",
                fontSize: 16,
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              borderRadius: 999,
              border: "1px solid #ff5a5f",
              background: "#ff5a5f",
              color: "#fff",
              padding: "14px 18px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  )
}
