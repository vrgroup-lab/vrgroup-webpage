"use client"

import type React from "react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Mail, Phone, MapPin, Send, Building2, User, MessageCircle, Globe2, CheckCircle2, FileText, Settings2 } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    industria: "",
    mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitted(true)
    setFormData({ nombre: "", empresa: "", email: "", telefono: "", industria: "", mensaje: "" })
    setLoading(false)

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Section
        className="bg-gradient-to-br from-[#050711] via-[#0B1B33] to-[#0f1729] text-white"
        variant="dark"
        paddingClass="pb-20 pt-12"
      >
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <span className="inline-flex items-center px-4 py-1 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Conversemos sobre tu estrategia
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl">
            Transforma tu visión en <span className="text-[#FF5A5F]">resultados reales</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Cuéntanos tu desafío y diseña con VR Group una solución tecnológica medible, escalable y lista para producción.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
          {/* Formulario */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur">
            <h2 className="font-display font-bold text-2xl mb-6 text-white">Conversemos sobre tus desafíos</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/40 rounded-lg text-green-100">
                ✓ Mensaje enviado. Te contactaremos en menos de 24 horas.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Nombre *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Compañía *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                      placeholder="Tu empresa"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Email corporativo *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">WhatsApp / Teléfono *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                      placeholder="+56 9 0000 0000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Industria</label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <select
                      name="industria"
                      value={formData.industria}
                      onChange={handleChange as any}
                      className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5A5F] appearance-none"
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
                  <label className="block text-sm font-semibold text-white/80 mb-2">¿Cómo podemos ayudarte?</label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F]"
                      placeholder="Automatización, IA, integraciones..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF5A5F] resize-none"
                  placeholder="Cuéntanos tu desafío, el impacto esperado y el plazo objetivo..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] text-white rounded-xl font-semibold shadow-[0_14px_40px_rgba(255,90,95,0.35)] hover:shadow-[0_18px_50px_rgba(255,90,95,0.4)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? "Enviando..." : <>Enviar mensaje <Send size={20} /></>}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF7A7F]" />
                  <div>
                    <p className="font-semibold text-white">contacto@vrgroup.cl</p>
                    <p className="text-white/60 text-xs">Respuesta en &lt; 24h</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF7A7F]" />
                  <div>
                    <p className="font-semibold text-white">+56 9 6192 8852</p>
                    <p className="text-white/60 text-xs">WhatsApp habilitado</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Lateral: pasos */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur space-y-4">
              <h3 className="font-display font-bold text-xl text-white">3 pasos, resultados concretos</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: SearchIcon(), title: "Análisis", desc: "Evaluamos necesidades y objetivos." },
                  { icon: FileTextIcon(), title: "Propuesta", desc: "Solución personalizada y estratégica." },
                  { icon: SettingsIcon(), title: "Implementación", desc: "Ejecución y seguimiento continuo." },
                ].map((step, idx) => (
                  <div
                    key={step.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FF5A5F]/15 text-[#FF7A7F] flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="text-white/70 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

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
