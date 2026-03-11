"use client"

import { useEffect, useState } from "react"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

type UserProfile = {
  id: string
  full_name: string | null
  role: string
  created_at: string
}

const roles = ["admin", "editor", "viewer"]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "editor" })
  const [confirmState, setConfirmState] = useState<{ open: boolean; id: string | null; name: string | null }>({
    open: false,
    id: null,
    name: null,
  })

  async function fetchUsers() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/users")
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudieron cargar los usuarios.")
      setUsers(payload.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar los usuarios.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function createUser(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo crear el usuario.")
      setForm({ email: "", password: "", full_name: "", role: "editor" })
      setShowForm(false)
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear el usuario.")
    } finally {
      setSaving(false)
    }
  }

  async function updateUser(id: string, role: string, fullName: string | null) {
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, full_name: fullName }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo actualizar el usuario.")
      setUsers((current) => current.map((user) => (user.id === id ? { ...user, role } : user)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el usuario.")
    }
  }

  async function deleteUser(id: string) {
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo eliminar el usuario.")
      setUsers((current) => current.filter((user) => user.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el usuario.")
    }
  }

  return (
    <section style={{ display: "grid", gap: 20 }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #d8e0ea",
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "end" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#ff5a5f" }}>
              Usuarios
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: 40 }}>Accesos al panel</h1>
            <p style={{ margin: "10px 0 0", color: "#4f5d75", lineHeight: 1.6 }}>
              Gestiona usuarios de <code>auth.users</code> y sus perfiles en <code>user_profiles</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            style={{
              borderRadius: 999,
              border: "1px solid #ff5a5f",
              background: "#ff5a5f",
              color: "#fff",
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {showForm ? "Cerrar formulario" : "Nuevo usuario"}
          </button>
        </div>
      </div>

      {error ? (
        <div style={{ borderRadius: 20, border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", padding: 16 }}>{error}</div>
      ) : null}

      {showForm ? (
        <form
          onSubmit={createUser}
          style={{
            display: "grid",
            gap: 16,
            background: "#fff",
            border: "1px solid #d8e0ea",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Nombre completo</span>
              <input
                value={form.full_name}
                onChange={(event) => setForm((current) => ({ ...current, full_name: event.target.value }))}
                style={{ borderRadius: 14, border: "1px solid #d8e0ea", padding: "12px 14px", fontSize: 14 }}
              />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                style={{ borderRadius: 14, border: "1px solid #d8e0ea", padding: "12px 14px", fontSize: 14 }}
              />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Contrasena</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                style={{ borderRadius: 14, border: "1px solid #d8e0ea", padding: "12px 14px", fontSize: 14 }}
              />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Rol</span>
              <select
                value={form.role}
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                style={{ borderRadius: 14, border: "1px solid #d8e0ea", padding: "12px 14px", fontSize: 14 }}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                borderRadius: 999,
                border: "1px solid #d8e0ea",
                background: "#fff",
                color: "#0b1b33",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                borderRadius: 999,
                border: "1px solid #0b1b33",
                background: "#0b1b33",
                color: "#fff",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Guardando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      ) : null}

      <div style={{ display: "grid", gap: 14 }}>
        {loading ? (
          <div style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 24, padding: 24 }}>Cargando usuarios...</div>
        ) : users.length === 0 ? (
          <div style={{ background: "#fff", border: "1px dashed #cbd5e1", borderRadius: 24, padding: 24, color: "#4f5d75" }}>
            No hay usuarios registrados.
          </div>
        ) : (
          users.map((user) => (
            <article
              key={user.id}
              style={{
                background: "#fff",
                border: "1px solid #d8e0ea",
                borderRadius: 24,
                padding: 22,
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "center",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 22 }}>{user.full_name || "Sin nombre"}</h2>
                <p style={{ margin: "8px 0 0", color: "#4f5d75", fontSize: 14 }}>{user.id}</p>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <select
                  value={user.role}
                  onChange={(event) => updateUser(user.id, event.target.value, user.full_name)}
                  style={{ borderRadius: 14, border: "1px solid #d8e0ea", padding: "12px 14px", fontSize: 14 }}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setConfirmState({ open: true, id: user.id, name: user.full_name })}
                  style={{
                    borderRadius: 999,
                    border: "1px solid #fecaca",
                    background: "#fff1f2",
                    color: "#be123c",
                    padding: "10px 14px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <ConfirmDialog
        open={confirmState.open}
        title="Eliminar usuario"
        description={`Se eliminara ${confirmState.name || "este usuario"} de auth y de user_profiles.`}
        confirmLabel="Eliminar usuario"
        onCancel={() => setConfirmState({ open: false, id: null, name: null })}
        onConfirm={async () => {
          if (!confirmState.id) return
          await deleteUser(confirmState.id)
          setConfirmState({ open: false, id: null, name: null })
        }}
      />
    </section>
  )
}
