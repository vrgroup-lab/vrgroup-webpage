"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, Send, Building2, User, MessageCircle, Globe2, CheckCircle2 } from "lucide-react"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    } catch (err: any) {
      setError(err?.message || "Hubo un problema al enviar. Inténtalo otra vez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-[0.1em]">Completa el formulario</p>
        <h2 className="font-display text-2xl font-bold text-blue-dark mt-1">Te contactamos a la brevedad</h2>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B1B33] via-[#0a1730] to-[#05060b] p-8 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-300 min-h-[420px] flex flex-col items-center justify-center gap-4 text-white">
          <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-display text-2xl font-bold">¡Mensaje enviado!</h3>
          <p className="text-white/85 text-sm sm:text-base max-w-md">
            Gracias por escribirnos. Nuestro equipo te contactará pronto para ayudarte a avanzar con tu proyecto.
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B1B33] via-[#0a1730] to-[#05060b] p-5 text-white flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white rotate-45" />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">No pudimos enviar tu mensaje</p>
                <p className="text-white/80 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Compañía</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral"
                    placeholder="Tu empresa"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email corporativo *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral"
                    placeholder="tu@empresa.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Teléfono</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral"
                    placeholder="+56 9 0000 0000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industria</label>
                <div className="relative">
                  <Globe2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <select
                    name="industria"
                    value={formData.industria}
                    onChange={handleChange as any}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-coral appearance-none"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">¿Cómo podemos ayudarte?</label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral"
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
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-coral resize-none"
                placeholder="Cuéntanos tu desafío, el impacto esperado y el plazo objetivo..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-sm hover:bg-gray-900 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Enviando..."
              ) : (
                <>
                  Enviar mensaje <Send size={20} />
                </>
              )}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3">
                <Mail className="w-4 h-4 text-coral" />
                <div>
                  <p className="font-semibold text-blue-dark">contacto@vrgroup.cl</p>
                  <p className="text-gray-500 text-xs">Respuesta en &lt; 24h</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3">
                <Phone className="w-4 h-4 text-coral" />
                <div>
                  <p className="font-semibold text-blue-dark">+56 9 8950 6375</p>
                  <p className="text-gray-500 text-xs">WhatsApp habilitado</p>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
