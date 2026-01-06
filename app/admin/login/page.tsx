"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Lock, Mail, ShieldCheck, Sparkles } from "lucide-react"
import Image from "next/image"

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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white">
          <div className="grid md:grid-rows-[1fr_auto]">
            {/* Top hero block */}
            <div className="bg-[#0b1224] text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                  <Image src="/logos/brand/logo_vrgroup_cuadrado.png" alt="VR Group" fill className="object-contain" sizes="128px" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/70">Admin</p>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight">Panel de administración</h1>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-[0.2em] self-start sm:self-auto">
                <ShieldCheck size={14} />
                Acceso privado
              </span>
            </div>

            {/* Form block */}
            <div className="px-6 sm:px-10 py-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image src="/logos/brand/logo_vrgroup_cuadrado.png" alt="VR Group" fill className="object-contain" sizes="96px" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">VR Group</p>
                    <h2 className="font-display text-2xl font-bold text-gray-900">Iniciar sesión</h2>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Lock size={18} />
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {supabaseError && (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3 text-sm">
                  {supabaseError}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                      placeholder="********"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 transition-all disabled:opacity-60"
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                  <Sparkles size={18} />
                </button>

                <p className="text-xs text-gray-500">
                  ¿Olvidaste tu contraseña? Escríbele a un administrador para restablecer tu acceso.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
