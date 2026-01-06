"use client"

import type React from "react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Mail, Phone, Send, Building2, User, MessageCircle, Globe2, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
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
      const form = new FormData()
      form.append("nombre", formData.nombre)
      form.append("empresa", formData.empresa)
      form.append("email", formData.email)
      form.append("telefono", formData.telefono)
      form.append("industria", formData.industria)
      form.append("asunto", formData.asunto)
      form.append("mensaje", formData.mensaje)

      const response = await fetch("https://formspree.io/f/xjgkwqao", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
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
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Lado izquierdo: propuesta */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="font-display font-bold text-4xl sm:text-5xl text-blue-dark leading-tight">
                  Conversa con un experto en soluciones digitales.
                </h1>
                <p className="text-xl text-gray-700">Te ayudamos a:</p>
              </div>
              <ul className="space-y-3 text-lg text-gray-700">
                {[
                  "Discovery y diseño de soluciones tecnológicas alineadas a negocio.",
                  "Implementación ágil y software factory con QA y CI/CD.",
                  "Integración de sistemas, datos e IA con gobierno y trazabilidad.",
                  "Equipos senior para delivery, soporte y evolución continua.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-blue-dark mt-1.5">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-sm text-gray-600">
                +150 proyectos en producción respaldan nuestra experiencia.
              </div>
            </div>

            {/* Lado derecho: formulario */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-[0.1em]">Completa el formulario</p>
                <h2 className="font-display text-2xl font-bold text-blue-dark mt-1">Te contactamos a la brevedad</h2>
              </div>

              {submitted && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mensaje enviado. Te contactaremos en menos de 24 horas.</span>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
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
                  {loading ? "Enviando..." : <>Enviar mensaje <Send size={20} /></>}
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
                      <p className="font-semibold text-blue-dark">+56 9 6192 8852</p>
                      <p className="text-gray-500 text-xs">WhatsApp habilitado</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <circle cx="11" cy="11" r="7" />
  <line x1="16.65" y1="16.65" x2="21" y2="21" />
</svg>

const FileTextIcon = () => <FileText className="w-4 h-4" />
const SettingsIcon = () => <Settings2 className="w-4 h-4" />
