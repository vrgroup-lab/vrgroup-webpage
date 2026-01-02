"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Lock, Mail, ShieldCheck, Sparkles } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSupabaseError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseBrowser()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message || "No pudimos iniciar sesión. Intenta otra vez.")
        setLoading(false)
        return
      }

      router.push("/admin")
    } catch (err: any) {
      setSupabaseError(err?.message || "Supabase no está configurado. Revisa tus variables de entorno.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050711] text-white flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6 items-stretch">
        <div className="hidden md:flex flex-col justify-center rounded-3xl p-8 bg-gradient-to-br from-[#0B1B33] via-[#0e2240] to-[#FF5A5F] shadow-[0_24px_60px_rgba(6,12,30,0.45)]">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-[0.2em]">
              <ShieldCheck size={14} />
              Acceso privado
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight">Panel de administración</h1>
            <p className="text-white/80">
              Inicia sesión para acceder al panel interno de VR Group.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 shadow-[0_18px_48px_rgba(6,12,30,0.4)] backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-sm text-white/60">VR Group</p>
              <h2 className="font-display text-2xl font-bold text-white">Iniciar sesión</h2>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-100 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {supabaseError && (
            <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-100 px-4 py-3 text-sm">
              {supabaseError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                  placeholder="tu@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                  placeholder="********"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] shadow-[0_14px_40px_rgba(255,90,95,0.35)] hover:shadow-[0_18px_50px_rgba(255,90,95,0.4)] transition-all disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
              <Sparkles size={18} />
            </button>

            <p className="text-xs text-white/60">
              ¿Olvidaste tu contraseña? Escríbele a un administrador para restablecer tu acceso.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
