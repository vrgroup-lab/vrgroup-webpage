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
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Usuarios</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Administración de usuarios</h1>
          <p className="text-gray-600">Crea, edita roles o elimina accesos.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          <Plus size={14} />
          {showForm ? "Cerrar" : "Nuevo usuario"}
        </button>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <h2 className="font-display text-xl font-semibold text-gray-900">Usuarios</h2>
        </div>
        {loading ? (
          <p className="text-gray-600 text-sm">Cargando...</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-semibold">
                    {user.full_name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.full_name || "Sin nombre"}</p>
                    <p className="text-xs text-gray-500">Rol: {user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2"
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
                    className="text-red-500 hover:text-red-600"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && <p className="text-gray-500 text-sm">No hay usuarios cargados.</p>}
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserRoundPen className="w-4 h-4 text-gray-500" />
                <h2 className="font-display text-xl font-semibold text-gray-900">Nuevo usuario</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form className="space-y-3" onSubmit={createUser}>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="usuario@empresa.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                  placeholder="********"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Rol</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
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
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 transition-all disabled:opacity-60"
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
