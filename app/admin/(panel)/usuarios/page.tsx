"use client"

import { useEffect, useMemo, useState } from "react"
import { Mail, Plus, ShieldCheck, Trash2, User, UserRoundPen } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"

type UserProfile = {
  id: string
  full_name: string | null
  role: string
  created_at: string
}

const roles = ["admin", "editor", "viewer"]

export default function AdminUsersPage() {
  const supabase = useMemo(() => getSupabaseBrowser(), [])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "editor" })
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/users")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al cargar usuarios")
      setUsers(json.data || [])
    } catch (err: any) {
      setError(err?.message || "No se pudieron cargar los usuarios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al crear usuario")
      setForm({ email: "", password: "", full_name: "", role: "editor" })
      fetchUsers()
    } catch (err: any) {
      setError(err?.message || "No se pudo crear el usuario")
    } finally {
      setSaving(false)
    }
  }

  const updateUser = async (id: string, role: string, full_name?: string | null) => {
    setError(null)
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, full_name }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al actualizar usuario")
      fetchUsers()
    } catch (err: any) {
      setError(err?.message || "No se pudo actualizar el usuario")
    }
  }

  const deleteUser = async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al eliminar usuario")
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar el usuario")
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Usuarios</p>
          <h1 className="font-display text-3xl font-bold">Administración de usuarios</h1>
          <p className="text-white/70">Crea, edita roles o elimina accesos.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] text-sm font-semibold text-white shadow-[0_10px_28px_rgba(255,90,95,0.35)] hover:shadow-[0_12px_34px_rgba(255,90,95,0.45)] transition-all"
        >
          <Plus size={14} />
          {showForm ? "Cerrar" : "Nuevo usuario"}
        </button>
      </header>

      {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 text-red-100 px-4 py-3 text-sm">{error}</div>}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-white/70" />
          <h2 className="font-display text-xl font-semibold text-white">Usuarios</h2>
        </div>
        {loading ? (
          <p className="text-white/70 text-sm">Cargando...</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center font-semibold">
                    {user.full_name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.full_name || "Sin nombre"}</p>
                    <p className="text-xs text-white/60">Rol: {user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2"
                    value={user.role}
                    onChange={(e) => updateUser(user.id, e.target.value, user.full_name)}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r} className="text-blue-dark">
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => deleteUser(user.id)}
                    className="text-red-200 hover:text-red-100"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && <p className="text-white/60 text-sm">No hay usuarios cargados.</p>}
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0b1224] border border-white/10 p-6 shadow-[0_24px_60px_rgba(6,12,30,0.6)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRoundPen className="w-4 h-4 text-white/70" />
                <h2 className="font-display text-xl font-semibold text-white">Nuevo usuario</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form className="space-y-3" onSubmit={createUser}>
              <div>
                <label className="block text-sm text-white/80 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                    placeholder="usuario@empresa.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                  placeholder="********"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Rol</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF5A5F]"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="text-blue-dark">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] shadow-[0_12px_32px_rgba(255,90,95,0.35)] hover:shadow-[0_16px_42px_rgba(255,90,95,0.4)] transition-all disabled:opacity-60"
                >
                  <Plus size={16} />
                  {saving ? "Creando..." : "Crear usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
