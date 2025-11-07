"use client"

import type React from "react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
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
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
    setLoading(false)

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Contacto"
        subtitle="Estamos aquí para ayudarte. Cuéntanos sobre tu proyecto y nos pondremos en contacto pronto."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display font-bold text-2xl text-blue-dark mb-8">Información de contacto</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-dark mb-1">Dirección</h3>
                  <p className="text-gray-600">
                    Libertador Bernardo O'Higgins 949, piso 25 Of. 4<br />
                    Santiago, Chile
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-dark mb-1">Teléfono</h3>
                  <a href="tel:+56961928852" className="text-gray-600 hover:text-coral">
                    (+56) 9 6192 8852
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-dark mb-1">Email</h3>
                  <a href="mailto:contacto@vrgroup.cl" className="text-gray-600 hover:text-coral">
                    contacto@vrgroup.cl
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold text-blue-dark mb-4">Horario de atención</h3>
              <p className="text-gray-600">
                Lunes a Viernes: 09:00 - 18:00
                <br />
                Sábados y Domingos: Cerrado
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display font-bold text-2xl text-blue-dark mb-8">Envíanos un mensaje</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✓ Mensaje enviado exitosamente. Nos contactaremos pronto.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral"
                  placeholder="Asunto de tu mensaje"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar mensaje <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
