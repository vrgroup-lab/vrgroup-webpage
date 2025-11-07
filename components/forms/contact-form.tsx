"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitted(true)
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Hubo un error al enviar el mensaje. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Mensaje enviado exitosamente. Nos contactaremos pronto.</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

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
  )
}
