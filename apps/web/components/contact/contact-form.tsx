"use client"

import type React from "react"
import { useState } from "react"
import {
  Mail,
  Phone,
  Send,
  Building2,
  User,
  MessageCircle,
  Globe2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    industria: "",
    mensaje: "",
    asunto: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload = {
        nombre: formData.nombre,
        empresa: formData.empresa || null,
        email: formData.email,
        telefono: formData.telefono || null,
        industria: formData.industria || null,
        asunto: formData.asunto || null,
        mensaje: formData.mensaje,
      }

      const functionsBase = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE?.replace(/\/$/, "")
      if (!functionsBase) {
        throw new Error("Falta configurar NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE.")
      }

      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!supabaseAnonKey) {
        throw new Error("Falta configurar NEXT_PUBLIC_SUPABASE_ANON_KEY.")
      }

      const response = await fetch(`${functionsBase}/contact_form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const message = data?.error || "No pudimos enviar tu mensaje. Intenta nuevamente."
        throw new Error(message)
      }

      setSubmitted(true)
      setFormData({ nombre: "", empresa: "", email: "", telefono: "", industria: "", mensaje: "", asunto: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Hubo un problema al enviar. Inténtalo otra vez."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7 lg:sticky lg:top-28">
      <div className="text-center mb-6">
        <p className="text-xs text-coral font-semibold uppercase tracking-[0.25em]">
          Formulario
        </p>
        <h2 className="font-display text-2xl font-bold text-blue-dark mt-1">
          Cuéntanos de tu proyecto
        </h2>
        <p className="text-sm text-gray-500 mt-1">Respondemos en menos de 24h hábiles.</p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B1B33] via-[#0a1730] to-[#05060b] p-8 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-300 min-h-[420px] flex flex-col items-center justify-center gap-4 text-white">
          <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-display text-2xl font-bold">¡Mensaje enviado!</h3>
          <p className="text-white/85 text-sm sm:text-base max-w-md">
            Gracias por escribirnos. Nuestro equipo te contactará pronto para ayudarte a avanzar
            con tu proyecto.
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="h-9 w-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-red-700 mb-0.5">No pudimos enviar tu mensaje</p>
                <p className="text-red-600/90 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Paso 1 — Tus datos */}
            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 mb-3">
                <span className="h-6 w-6 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="font-display font-semibold text-blue-dark">Tus datos</span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compañía
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition"
                      placeholder="Tu empresa"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email corporativo *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp / Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition"
                      placeholder="+56 9 0000 0000"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Paso 2 — Sobre tu proyecto */}
            <fieldset className="space-y-4 pt-2 border-t border-gray-100">
              <legend className="flex items-center gap-2 mb-3 pt-4">
                <span className="h-6 w-6 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="font-display font-semibold text-blue-dark">
                  Sobre tu proyecto
                </span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industria
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <select
                      name="industria"
                      value={formData.industria}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition appearance-none"
                    >
                      {[
                        "",
                        "Banca y Servicios Financieros",
                        "Seguros",
                        "Retail y Consumo Masivo",
                        "Telecomunicaciones",
                        "Salud y Farmacéutica",
                        "Energía y Utilities",
                        "Manufactura",
                        "Logística y Transporte",
                        "Educación",
                        "Sector Público",
                        "Tecnología y Software",
                        "E-commerce",
                        "Turismo y Hospitalidad",
                        "Medios y Entretenimiento",
                        "Inmobiliario y Construcción",
                        "Otro",
                      ].map((option) => (
                        <option key={option || "default"} value={option} className="text-blue-dark">
                          {option === "" ? "Selecciona una industria" : option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Cómo podemos ayudarte?
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition"
                      placeholder="Automatización, IA, integraciones..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition resize-none"
                  placeholder="Cuéntanos tu desafío, el impacto esperado y el plazo objetivo..."
                ></textarea>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-coral text-white rounded-lg font-semibold shadow-sm hover:bg-[#FF6A6F] hover:shadow-md transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Enviando..."
              ) : (
                <>
                  Enviar mensaje <Send size={18} />
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Al enviar aceptas nuestra política de privacidad.
            </p>
          </form>
        </>
      )}
    </div>
  )
}
